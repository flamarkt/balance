import History from '../common/models/History';
import UserList from 'flamarkt/core/backoffice/components/UserList';
import UserShowPage from 'flamarkt/core/backoffice/pages/UserShowPage';
import formatPrice from 'flamarkt/core/common/helpers/formatPrice';
import {extend} from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import AdjustBalanceModal from './components/AdjustBalanceModal';

app.initializers.add('flamarkt-balance', () => {
    app.store.models['flamarkt-balance-history'] = History;

    extend(UserList.prototype, 'head', function (columns) {
        columns.add('balance', m('th', 'Balance'));
    });

    extend(UserList.prototype, 'columns', function (columns, user) {
        columns.add('balance', m('td', formatPrice(user.attribute('flamarktBalance'))));
    });

    extend(UserShowPage.prototype, 'fields', function (this: UserShowPage, fields: ItemList) {
        fields.add('balance', m('.Form-group', [
            m('local', 'Amount'),
            m('input.FormControl', {
                type: 'number',
                value: this.user.attribute('flamarktBalance'),
                readonly: true,
            }),
            Button.component({
                className: 'Button',
                onclick: () => {
                    app.modal.show(AdjustBalanceModal, {
                        userId: this.user.id(),
                    });
                }
            }, 'Update balance'),
        ]));
    });
});