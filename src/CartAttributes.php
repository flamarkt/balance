<?php

namespace Flamarkt\Balance;

use Flamarkt\Core\Api\Serializer\CartSerializer;
use Flamarkt\Core\Cart\Cart;

class CartAttributes
{
    public function __invoke(CartSerializer $serializer, Cart $cart): array
    {
        return [
            'payWithBalance' => (int)$cart->pay_with_balance,
        ];
    }
}
