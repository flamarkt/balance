import Modal from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';

export default class AdjustBalanceModal extends Modal {
    amount: number = 0;
    comment: string = '';
    saving: boolean = false;

    content() {
        return m('.Modal-body', this.fields().toArray());
    }

    fields(): ItemList {
        const fields = new ItemList();

        fields.add('amount', m('.Form-group', [
            m('local', 'Amount'),
            m('input.FormControl', {
                type: 'number',
                value: this.amount,
                onchange: event => {
                    this.amount = event.target.value;
                },
            }),
        ]));

        fields.add('comment', m('.Form-group', [
            m('local', 'Comment'),
            m('textarea.FormControl', {
                value: this.comment,
                onchange: event => {
                    this.comment = event.target.value;
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
            amount: this.amount,
            comment: this.comment,
        };
    }

    onsubmit(event) {
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
