<?php

namespace Flamarkt\Balance;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class UserAttributes
{
    public function __invoke(UserSerializer $serializer, User $user): array
    {
        return [
            'flamarktBalance' => (int)$user->flamarkt_balance,
        ];
    }
}
