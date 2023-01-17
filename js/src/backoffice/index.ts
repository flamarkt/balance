import app from 'flamarkt/backoffice/backoffice/app';
import History from '../common/models/History';
import UserList from 'flamarkt/backoffice/backoffice/components/UserList';
import UserShowPage from 'flamarkt/backoffice/backoffice/pages/UserShowPage';
import OrderPaymentSection from 'flamarkt/core/backoffice/components/OrderPaymentSection';
import PriceInput from 'flamarkt/core/common/components/PriceInput';
import PriceLabel from 'flamarkt/core/common/components/PriceLabel';
import {extend} from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import AdjustBalanceModal from './components/AdjustBalanceModal';
import AdjustOrderPaymentModal from './components/AdjustOrderPaymentModal';
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
            m(PriceInput, {
                value: this.user!.attribute('flamarktBalance'),
                readonly: true,
            }),
            Button.component({
                className: 'Button',
                onclick: () => {
                    app.modal.show(AdjustBalanceModal, {
                        userId: this.user!.id(),
                    });
                },
            }, 'Update balance'),
        ]));
    });

    extend(OrderPaymentSection.prototype, 'fields', function (fields) {
        fields.add('balance', m('.Form-group', [
            Button.component({
                className: 'Button',
                onclick: () => {
                    app.modal.show(AdjustOrderPaymentModal, {
                        order: this.attrs.order,
                    });
                },
            }, 'Pay/reimburse with customer balance'),
        ]), 50);
    });
});
