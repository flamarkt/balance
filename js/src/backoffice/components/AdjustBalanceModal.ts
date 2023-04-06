import app from 'flamarkt/backoffice/backoffice/app';
import {Children} from 'mithril';
import Modal, {IInternalModalAttrs} from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import PriceInput from 'flamarkt/core/common/components/PriceInput';

interface AdjustBalanceModalAttrs extends IInternalModalAttrs {
    userId: string
}

export default class AdjustBalanceModal extends Modal<AdjustBalanceModalAttrs> {
    amount: number = 0;
    comment: string = '';
    saving: boolean = false;

    className() {
        return 'AdjustBalanceModal';
    }

    title() {
        return 'Adjust Balance';
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

        fields.add('comment', m('.Form-group', [
            m('label', 'Comment'),
            m('textarea.FormControl', {
                value: this.comment,
                onchange: (event: InputEvent) => {
                    this.comment = (event.target as HTMLInputElement).value;
                },
                disabled: this.saving,
            }),
        ]));

        fields.add('submit', m('.Form-group', [
            Button.component({
                type: 'submit',
                className: 'Button Button--primary',
                loading: this.saving,
            }, 'Apply'),
        ]), -10);

        return fields;
    }

    data() {
        return {
            amount: this.amount,
            comment: this.comment,
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.saving = true;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/flamarkt/users/' + this.attrs.userId + '/balance',
            body: {
                data: {
                    attributes: this.data(),
                },
            },
        }).then(() => {
            this.hide();
        }).catch(error => {
            this.saving = false;
            m.redraw();
            throw error;
        });
    }
}
