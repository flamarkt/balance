import Model from 'flarum/common/Model';

export default class History extends Model {
    amount = Model.attribute('amount');
    comment = Model.attribute('comment');
    createdAt = Model.attribute('createdAt', Model.transformDate);

    apiEndpoint() {
        return '/flamarkt/balance/' + this.data.id;
    }
}
