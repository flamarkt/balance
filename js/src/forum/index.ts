import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import AccountControls from 'flamarkt/core/forum/utils/AccountControls';
import CartLayout from 'flamarkt/core/forum/layouts/CartLayout';
import History from '../common/models/History';
import BalancePage from './pages/BalancePage';
import PriceLabel from 'flamarkt/core/common/components/PriceLabel';
import {common} from '../common/compat';
import {forum} from './compat';

export {
    common,
    forum,
};

app.initializers.add('flamarkt-balance', () => {
    app.store.models['flamarkt-balance-history'] = History;

    app.routes['flamarkt.account.balance'] = {
        path: '/account/balance',
        component: BalancePage,
    };

    extend(AccountControls, 'controls', function (items) {
        items.add('balance', LinkButton.component({
            href: app.route('flamarkt.account.balance'),
        }, 'Balance'));
    });

    extend(CartLayout.prototype, 'oninit', function () {
        this.payWithBalance = false;
    });

    extend(CartLayout.prototype, 'sectionPayment', function (items) {
        const balance = app.session.user.attribute('flamarktBalance');

        items.add('balance', m('.Form-group', [
            m('label', [
                m('input', {
                    type: 'checkbox',
                    checked: this.payWithBalance,
                    onchange: () => {
                        this.payWithBalance = !this.payWithBalance;
                    },
                    disabled: balance < this.attrs.cart.priceTotal() || this.submitting,
                }),
                ' Pay with balance (',
                PriceLabel.component({
                    value: balance,
                }),
                ')',
            ]),
        ]));
    });

    extend(CartLayout.prototype, 'data', function (this: CartLayout, data: any) {
        data.payWithBalance = this.payWithBalance;
    });
});
