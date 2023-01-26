<?php

namespace Flamarkt\Balance\Listener;

use Flamarkt\Core\Cart\Event\Saving;
use Illuminate\Support\Arr;

class SaveCart
{
    public function handle(Saving $event): void
    {
        $attributes = (array)Arr::get($event->data, 'attributes');

        if (Arr::exists($attributes, 'payWithBalance')) {
            $event->actor->assertCan('checkout', $event->cart);

            $event->cart->pay_with_balance = (boolean)Arr::get($attributes, 'payWithBalance');

            // Flamarkt will automatically refresh meta after save
        }
    }
}
