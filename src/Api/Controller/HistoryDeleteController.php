<?php

namespace Flamarkt\Balance\Api\Controller;

use Flamarkt\Balance\History;
use Flarum\Api\Controller\AbstractDeleteController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class HistoryDeleteController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $request->getAttribute('actor')->assertCan('backoffice');

        $id = Arr::get($request->getQueryParams(), 'id');

        /**
         * @var History $history
         */
        $history = History::findOrFail($id);

        $history->delete();
    }
}
