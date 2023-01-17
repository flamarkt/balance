<?php

namespace Flamarkt\Balance\Listener;

use Flamarkt\Balance\History;
use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Payment\Payment;
use Flarum\Foundation\ValidationException;
use Illuminate\Support\Arr;

class SaveOrder
{
    public function handle(Saving $event): void
    {
        $attributes = (array)Arr::get($event->data, 'attributes');

        if (Arr::exists($attributes, 'manualBalancePayAdjustment')) {
            $event->actor->assertCan('backoffice');

            if (!$event->order->user) {
                throw new ValidationException([
                    'manualBalancePayAdjustment' => 'Order has no customer associated',
                ]);
            }

            $amount = (int)Arr::get($attributes, 'manualBalancePayAdjustment');

            $event->order->getConnection()->transaction(function () use ($event, $amount) {
                $event->order->user->flamarkt_balance -= $amount;
                $event->order->user->save();

                $history = new History();
                $history->user()->associate($event->order->user);
                $history->amount = -$amount;
                $history->order()->associate($event->order);
                $history->save();

                $payment = new Payment();
                $payment->method = 'balance';
                $payment->amount = $amount;
                $payment->identifier = $history->id;

                $event->order->payments()->save($payment);
            });
        }
    }
}
