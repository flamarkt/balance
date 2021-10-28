<?php

namespace Flamarkt\Balance\Listener;

use Flamarkt\Balance\History;
use Flamarkt\Core\Order\Event\Paying;
use Illuminate\Support\Arr;

class PayingOrder
{
    // TODO: use payment extender
    public function handle(Paying $event)
    {
        if (!Arr::get($event->data, 'data.attributes.payWithBalance')) {
            return;
        }

        // Pay the maximum possible from user balance
        // If there isn't actually enough for the full order, the frontend shouldn't offer the option in the first place
        // If a request is submitted with insuffisant funds, the default Flamarkt forceOrderPrepayment logic will cover it
        $amount = max(0, min($event->actor->flamarkt_balance, $event->order->price_total));

        if ($amount === 0) {
            return;
        }

        $event->actor->flamarkt_balance -= $amount;
        $event->actor->save();

        $history = new History();
        $history->user()->associate($event->actor);
        $history->amount = -$amount;
        $history->save();

        $event->builder->addPayment('balance', $amount, $history->id);

        $event->order->afterSave(function ($order) use ($history) {
            // We can only link the order after it's created
            // If there is an error in between, at least the balance history already exists
            $history->order()->associate($order);
            $history->save();
        });
    }
}
