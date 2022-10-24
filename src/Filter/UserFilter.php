<?php

namespace Flamarkt\Balance\Filter;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\Http\SlugManager;
use Flarum\User\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserFilter implements FilterInterface
{
    protected $slugManager;

    public function __construct(SlugManager $slugManager)
    {
        $this->slugManager = $slugManager;
    }

    public function getFilterKey(): string
    {
        return 'user';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $slugs = trim($filterValue, '"');
        $slugs = explode(',', $slugs);

        if (count($slugs) === 0) {
            return;
        }

        $slugger = $this->slugManager->forResource(User::class);

        $ids = [];
        foreach ($slugs as $slug) {
            try {
                $ids[] = $slugger->fromSlug($slug, $filterState->getActor())->id;
            } catch (ModelNotFoundException $exception) {
                // If there's an invalid or invisible user slug requested, return no results
                // TODO: we could throw a 400 error for invalid parameter
                $filterState->getQuery()->whereRaw('1=0');
                return;
            }
        }

        $filterState->getQuery()->whereIn('flamarkt_balance_history.user_id', $ids, 'and', $negate);
    }
}
