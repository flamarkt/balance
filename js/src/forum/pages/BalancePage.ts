import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import HistoryListState from '../states/HistoryListState';
import BalanceLayout from '../layouts/BalanceLayout';

export default class BalancePage extends Page {
    list!: HistoryListState;

    oninit(vnode: any) {
        super.oninit(vnode);

        this.list = new HistoryListState({
            filter: {
                user: app.session.user?.slug(),
            },
        });
        this.list.refresh();
    }

    view() {
        return BalanceLayout.component({
            list: this.list,
        });
    }
}
