<?php

namespace Flamarkt\Balance\Api\Serializer;

use Flamarkt\Balance\History;
use Flamarkt\Core\Api\Serializer\BasicOrderSerializer;
use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Relationship;

class HistorySerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-balance-history';

    /**
     * @param History $history
     * @return int[]
     */
    protected function getDefaultAttributes($history): array
    {
        return [
            'amount' => $history->amount,
            'comment' => $history->comment,
            'createdAt' => $this->formatDate($history->created_at),
        ];
    }

    public function order($history): ?Relationship
    {
        return $this->hasOne($history, BasicOrderSerializer::class);
    }
}
