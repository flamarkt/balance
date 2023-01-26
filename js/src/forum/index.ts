import {Children} from 'mithril';
import app from 'flarum/forum/app';
import {extend, override} from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import LinkButton from 'flarum/common/components/LinkButton';
import Switch from 'flarum/common/components/Switch';
import ItemList from 'flarum/common/utils/ItemList';
import PriceLabel from 'flamarkt/core/common/components/PriceLabel';
import AccountControls from 'flamarkt/core/forum/utils/AccountControls';
import OrderFactPayment from 'flamarkt/core/forum/components/OrderFactPayment';
import CartLayout from 'flamarkt/core/forum/layouts/CartLayout';
import History from '../common/models/History';
import BalancePage from './pages/BalancePage';
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

    CartLayout.prototype.balancePaymentVisible = function (): boolean {
        return !app.forum.attribute('flamarktBalanceHidePaymentMethodNoFunds');
    }

    CartLayout.prototype.balanceLinks = function (checkoutMode: boolean): ItemList<Children> {
        const items = new ItemList<Children>();

        if (app.session.user) {
            if (checkoutMode) {
                items.add('amount', app.translator.trans('flamarkt-balance.forum.cart.info.amount', {
                    amount: PriceLabel.component({
                        value: app.session.user.attribute<number>('flamarktBalance'),
                    }),
                }), 20);
            }

            items.add('account', app.translator.trans('flamarkt-balance.forum.cart.info.account', {
                a: Link.component({
                    href: app.route('flamarkt.account.balance'),
                }),
            }), 10);
        }

        return items;
    }

    extend(CartLayout.prototype, 'oninit', function () {
        this.submittingBalance = false;
        this.savingBalance = false;
    });

    override(CartLayout.prototype, 'formDisabled', function (original) {
        if (this.submittingBalance || this.savingBalance) {
            return true;
        }

        return original();
    });

    extend(CartLayout.prototype, 'partialPaymentOptions', function (items) {
        const balance = app.session.user ? app.session.user.attribute<number>('flamarktBalance') : 0;
        const payWithBalance = this.attrs.cart!.attribute('payWithBalance');
        const checkoutMode = balance >= this.attrs.cart!.priceTotal();

        if (checkoutMode) {
            items.add('balance-checkout', m('.Form-group', [
                Button.component({
                    className: 'Button Button--primary',
                    loading: this.submittingBalance,
                    disabled: this.submitDisabled(),
                    onclick: () => {
                        this.submittingBalance = true;

                        // Pass payWithBalance attribute so that even if the checkbox was disabled, using the balance checkout button forces the balance to be used
                        this.submitOrder({
                            payWithBalance: true,
                        });
                    },
                }, app.translator.trans('flamarkt-balance.forum.cart.checkout')),
            ]));
        } else {
            items.add('balance-partial', m('.Form-group', [
                Switch.component({
                    state: payWithBalance,
                    onchange: (state: boolean) => {
                        this.savingBalance = true;

                        this.attrs.cart!.save({
                            payWithBalance: state,
                        }).then(() => {
                            this.savingBalance = false;
                            m.redraw();
                        }).catch(error => {
                            this.savingBalance = false;
                            m.redraw();
                            throw error;
                        });
                    },
                    disabled: this.formDisabled(),
                    loading: this.savingBalance,
                }, app.translator.trans('flamarkt-balance.forum.cart.use', {
                    amount: PriceLabel.component({
                        value: balance,
                    }),
                })),
            ]));
        }

        items.add('balance-links', m('.FlamarktBalanceLinks', this.balanceLinks(checkoutMode).toArray()));
    });

    override(CartLayout.prototype, 'afterFailedSubmit', function (original: any) {
        this.submittingBalance = false;

        return original();
    });

    override(CartLayout.prototype, 'partialPaymentCoversIncompleteAmount', function (original: any) {
        const balance = app.session.user ? app.session.user.attribute<number>('flamarktBalance') : 0;
        const payWithBalance = this.attrs.cart!.attribute('payWithBalance');

        if (payWithBalance && balance < this.attrs.cart!.priceTotal()) {
            return true;
        }

        return original();
    });

    override(OrderFactPayment.prototype, 'label', function (original) {
        if (this.attrs.payment.method() === 'balance') {
            // TODO: option to use icon
            return app.translator.trans('flamarkt-balance.forum.order.paymentLabel');
        }

        return original();
    });
});
