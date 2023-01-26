<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('flamarkt_carts', function (Blueprint $table) {
            $table->boolean('pay_with_balance')->default(true)->after('order_id');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('flamarkt_carts', function (Blueprint $table) {
            $table->dropColumn('pay_with_balance');
        });
    },
];
