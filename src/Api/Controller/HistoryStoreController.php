<?php

namespace Flamarkt\Balance\Api\Controller;

use Flamarkt\Balance\Api\Serializer\HistorySerializer;
use Flamarkt\Balance\History;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Flarum\User\UserRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class HistoryStoreController extends AbstractCreateController
{
    public $serializer = HistorySerializer::class;

    protected $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $actor->assertCan('backoffice');

        $userId = Arr::get($request->getQueryParams(), 'id');

        $user = $this->repository->findOrFail($userId, $actor);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // TODO: validation
        // TODO: transaction

        $amount = (int)Arr::get($attributes, 'amount');

        $user->flamarkt_balance += $amount;
        $user->save();

        $history = new History();
        $history->user()->associate($user);
        $history->amount = $amount;
        $history->comment = Arr::get($attributes, 'comment');
        $history->save();

        return $history;
    }
}
