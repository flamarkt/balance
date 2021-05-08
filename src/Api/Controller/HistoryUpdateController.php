<?php

namespace Flamarkt\Balance\Api\Controller;

use Flamarkt\Balance\Api\Serializer\HistorySerializer;
use Flamarkt\Balance\History;
use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class HistoryUpdateController extends AbstractShowController
{
    public $serializer = HistorySerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertCan('backoffice');

        $id = Arr::get($request->getQueryParams(), 'id');

        /**
         * @var History $history
         */
        $history = History::findOrFail($id);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        //TODO: validator

        if (Arr::exists($attributes, 'comment')) {
            $history->comment = Arr::get($attributes, 'comment');
        }

        $history->save();

        return $history;
    }
}
