import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import HistoryState from '../states/HistoryState';
import BalanceLayout from '../layouts/BalanceLayout';

export default class BalancePage extends Page {
    historyState!: HistoryState;

    oninit(vnode: any) {
        super.oninit(vnode);

        // @ts-ignore
        this.historyState = new HistoryState({
            filter: {
                user: app.session.user?.slug(),
            },
        });
        this.historyState.refresh();
    }

    view() {
        return BalanceLayout.component({
            state: this.historyState,
        });
    }
}
