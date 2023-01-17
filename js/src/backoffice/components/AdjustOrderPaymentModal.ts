import {Children, Vnode} from 'mithril';
import Modal, {IInternalModalAttrs} from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import Order from 'flamarkt/core/common/models/Order';
import PriceInput from 'flamarkt/core/common/components/PriceInput';

interface AdjustOrderPaymentModalAttrs extends IInternalModalAttrs {
    order: Order
}

export default class AdjustOrderPaymentModal extends Modal<AdjustOrderPaymentModalAttrs> {
    amount: number = 0;
    saving: boolean = false;

    className() {
        return 'AdjustOrderPayment';
    }

    title() {
        return 'Pay/reimburse order with balance';
    }

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.amount = this.attrs.order.priceTotal() - this.attrs.order.paidAmount();
    }

    content() {
        return m('.Modal-body', this.fields().toArray());
    }

    fields(): ItemList<Children> {
        const fields = new ItemList<Children>();

        fields.add('amount', m('.Form-group', [
            m('label', 'Amount'),
            m(PriceInput, {
                value: this.amount,
                onchange: (value: number) => {
                    this.amount = value;
                },
            }),
        ]));

        fields.add('submit', m('.Form-group', [
            Button.component({
                type: 'submit',
                className: 'Button Button--primary',
            }, 'Apply'),
        ]), -10);

        return fields;
    }

    data() {
        return {
            manualBalancePayAdjustment: this.amount,
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.saving = true;

        this.attrs.order.save(this.data()).then(() => {
            this.saving = false;

            m.redraw();

            this.hide();
        }).catch(error => {
            this.saving = false;

            m.redraw();

            throw error;
        });
    }
}
