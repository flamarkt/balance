import Model from 'flarum/common/Model';
import Order from 'flamarkt/core/common/models/Order';

export default class History extends Model {
    amount = Model.attribute<number>('amount');
    comment = Model.attribute<string>('comment');
    createdAt = Model.attribute('createdAt', Model.transformDate);

    order = Model.hasOne<Order>('order');

    apiEndpoint() {
        return '/flamarkt/balance/' + (this.data as any).id;
    }
}
