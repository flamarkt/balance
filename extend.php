<?php

namespace Flamarkt\Balance;

use Flamarkt\Core\Order\Event\Paying;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\User;

return [
    (new Extend\Frontend('backoffice'))
        ->js(__DIR__ . '/js/dist/backoffice.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->route('/account/balance', 'flamarkt.account.balance'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/flamarkt/balance', 'flamarkt.balance.index', Api\Controller\HistoryIndexController::class)
        ->post('/flamarkt/users/{id:[0-9]+}/balance', 'flamarkt.balance.store', Api\Controller\HistoryStoreController::class)
        ->patch('/flamarkt/balance/{id:[0-9]+}', 'flamarkt.balance.update', Api\Controller\HistoryUpdateController::class)
        ->delete('/flamarkt/balance/{id:[0-9]+}', 'flamarkt.balance.delete', Api\Controller\HistoryDeleteController::class),

    (new Extend\Model(User::class))
        ->hasMany('flamarktBalanceHistory', History::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(UserAttributes::class)
        ->hasMany('flamarktBalanceHistory', Api\Serializer\HistorySerializer::class),

    (new Extend\Filter(HistoryFilterer::class))
        ->addFilter(Filter\UserFilter::class),

    (new Extend\ModelVisibility(History::class))
        ->scope(Scope\View::class),

    (new Extend\Event())
        ->listen(Paying::class, Listener\PayingOrder::class),
];
