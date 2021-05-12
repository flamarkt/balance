<?php

namespace Flamarkt\Balance\Api\Controller;

use Flamarkt\Balance\Api\Serializer\HistorySerializer;
use Flamarkt\Balance\HistoryFilterer;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\UrlGenerator;
use Flarum\Query\QueryCriteria;
use Flarum\User\UserRepository;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class HistoryIndexController extends AbstractListController
{
    public $serializer = HistorySerializer::class;

    public $include = [
        'order',
    ];

    public $sortFields = [
        'createdAt',
    ];

    public $sort = [
        'createdAt' => 'desc',
    ];

    protected $repository;
    protected $filterer;
    protected $url;

    public function __construct(UserRepository $repository, HistoryFilterer $filterer, UrlGenerator $url)
    {
        $this->repository = $repository;
        $this->filterer = $filterer;
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $filters = $this->extractFilter($request);
        $sort = $this->extractSort($request);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = $this->extractInclude($request);

        $criteria = new QueryCriteria($actor, $filters, $sort);
        $results = $this->filterer->filter($criteria, $limit, $offset);

        $document->addPaginationLinks(
            $this->url->to('api')->route('flamarkt.balance.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results->areMoreResults() ? null : 0
        );

        return $results->getResults()->load($include);
    }
}
