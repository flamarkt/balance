import Model from 'flarum/common/Model';

export default class History extends Model {
    amount = Model.attribute<number>('amount');
    comment = Model.attribute<string>('comment');
    createdAt = Model.attribute('createdAt', Model.transformDate);

    apiEndpoint() {
        return '/flamarkt/balance/' + (this.data as any).id;
    }
}
