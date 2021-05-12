<?php

namespace Flamarkt\Balance\Listener;

use Flamarkt\Balance\History;
use Flamarkt\Core\Order\Event\Paying;
use Flarum\Foundation\ValidationException;
use Illuminate\Support\Arr;

class PayingOrder
{
    public function handle(Paying $event)
    {
        if (Arr::get($event->data, 'data.attributes.payWithBalance')) {
            $amount = $event->order->price_total;

            if ($event->actor->flamarkt_balance < $amount) {
                throw new ValidationException([
                    'payment' => 'Not enough funds in your user balance',
                ]);
            }

            $event->actor->flamarkt_balance -= $amount;
            $event->actor->save();

            $event->builder->addPayment('balance', $amount);

            $event->order->afterSave(function ($order) use ($event, $amount) {
                //TODO: create history entry beforehand to avoid missing history items in case of unhandled error
                $history = new History();
                $history->user()->associate($event->actor);
                $history->order()->associate($order);
                $history->amount = -$amount;
                $history->save();
            });
        }
    }
}
