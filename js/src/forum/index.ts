import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import AccountControls from 'flamarkt/core/forum/utils/AccountControls';
import CartPage from 'flamarkt/core/forum/pages/CartPage';
import History from '../common/models/History';
import BalancePage from './pages/BalancePage';
import ItemList from 'flarum/common/utils/ItemList';
import formatPrice from 'flamarkt/core/common/helpers/formatPrice';
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

    extend(AccountControls, 'controls', items => {
        items.add('balance', LinkButton.component({
            href: app.route('flamarkt.account.balance'),
        }, 'Balance'));
    });

    extend(CartPage.prototype, 'oninit', function (this: CartPage) {
        this.payWithBalance = false;
    });

    extend(CartPage.prototype, 'sectionPayment', function (this: CartPage, items: ItemList) {
        const balance = app.session.user.attribute('flamarktBalance');

        items.add('balance', m('.Form-group', [
            m('label', [
                m('input', {
                    type: 'checkbox',
                    checked: this.payWithBalance,
                    onchange: () => {
                        this.payWithBalance = !this.payWithBalance;
                    },
                    disabled: balance < this.cart.priceTotal(),
                }),
                ' Pay with balance (',
                formatPrice(balance),
                ')',
            ]),
        ]));
    });

    extend(CartPage.prototype, 'data', function (this: CartPage, data) {
        data.payWithBalance = this.payWithBalance;
    });
});
