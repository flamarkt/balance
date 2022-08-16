import History from '../common/models/History';
import UserList from 'flamarkt/backoffice/backoffice/components/UserList';
import UserShowPage from 'flamarkt/backoffice/backoffice/pages/UserShowPage';
import PriceLabel from 'flamarkt/core/common/components/PriceLabel';
import {extend} from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import AdjustBalanceModal from './components/AdjustBalanceModal';
import {common} from '../common/compat';
import {backoffice} from './compat';

export {
    common,
    backoffice,
};

app.initializers.add('flamarkt-balance', () => {
    app.store.models['flamarkt-balance-history'] = History;

    extend(UserList.prototype, 'head', function (columns) {
        columns.add('balance', m('th', 'Balance'));
    });

    extend(UserList.prototype, 'columns', function (columns, user) {
        columns.add('balance', m('td', PriceLabel.component({
            value: user.attribute('flamarktBalance'),
        })));
    });

    extend(UserShowPage.prototype, 'fields', function (fields) {
        fields.add('balance', m('.Form-group', [
            m('local', 'Amount'),
            m('input.FormControl', {
                type: 'number',
                value: this.user!.attribute('flamarktBalance'),
                readonly: true,
            }),
            Button.component({
                className: 'Button',
                onclick: () => {
                    app.modal.show(AdjustBalanceModal, {
                        userId: this.user!.id(),
                    });
                }
            }, 'Update balance'),
        ]));
    });
});
