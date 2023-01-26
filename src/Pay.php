<?php

namespace Flamarkt\Balance;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderBuilder;
use Flarum\User\User;
use Illuminate\Support\Arr;

class Pay
{
    protected function shouldUseBalance(Order $order, Cart $cart, array $data): bool
    {
        $userBalance = $order->user->flamarkt_balance;

        // If payWithBalance was passed as parameter, always apply balance
        // This is only really needed when the balance exceeds the cart total, see below
        if (Arr::get($data, 'attributes.payWithBalance')) {
            return true;
        }

        // If the balance exceeds the cart total, it's offered like a regular payment method instead of partial
        // and the checkbox will no longer be shown. That's a problem because the checkbox is enabled by default,
        // and it would be confusing to try using a different method while the balance is still checked for use
        // Because of this the cart balance flag only has an effect when the balance is below the cart amount.
        // We use the cart price instead of $builder->totalUnpaid() to better be in sync with what is visible on the cart page.
        // The only potential issue is if the balance gets updated while the user is still on the cart page
        // This code also takes care of correctly updating the amount_due_after_partial value since attributes.payWithBalance
        // will never be present during "pretend" operations and therefore other payment methods will be able to calculate using the full cart price
        if ($userBalance >= $cart->price_total) {
            return false;
        }

        return $cart->pay_with_balance;
    }

    public function __invoke(OrderBuilder $builder, Order $order, User $actor, Cart $cart, array $data): void
    {
        if (!$this->shouldUseBalance($order, $cart, $data)) {
            return;
        }

        // Pay the maximum possible from user balance
        // If there isn't actually enough for the full order, the frontend shouldn't offer the option in the first place
        // If a request is submitted with insuffisant funds, the default Flamarkt forceOrderPrepayment logic will cover it
        $amount = max(0, min($order->user->flamarkt_balance, $builder->totalUnpaid()));

        if ($amount === 0) {
            return;
        }

        // Copy payment reference so we can update the identifier later
        $payment = $builder->addPayment('balance', $amount);

        // This isn't absolutely necessary since afterSave() will never run in pretend mode
        // But this way it's clear that we are only filling in the value for reference in this situation
        if ($builder->pretend) {
            return;
        }

        $order->afterSave(function ($order) use ($actor, $amount, $payment) {
            // This happens inside the order creation transaction so is safe in case of error
            $actor->flamarkt_balance -= $amount;
            $actor->save();

            $history = new History();
            $history->user()->associate($actor);
            $history->order()->associate($order);
            $history->amount = -$amount;
            $history->save();

            $payment->update([
                'identifier' => $history->id,
            ]);
        });
    }
}
