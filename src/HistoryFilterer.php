<?php

namespace Flamarkt\Balance;

use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class HistoryFilterer extends AbstractFilterer
{
    protected function getQuery(User $actor): Builder
    {
        return History::whereVisibleTo($actor);
    }
}
