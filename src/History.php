<?php

namespace Flamarkt\Balance;

use Carbon\Carbon;
use Flamarkt\Core\Order\Order;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property int $user_id
 * @property int $order_id
 * @property int $amount
 * @property string $comment
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property User $user
 * @property Order|null $order
 */
class History extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'flamarkt_balance_history';

    public $timestamps = true;

    protected $casts = [
        'amount' => 'int',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function order(): Relations\BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
