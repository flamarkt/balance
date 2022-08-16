import Page from 'flarum/common/components/Page';
import HistoryState from '../states/HistoryState';
import BalanceLayout from '../layouts/BalanceLayout';

export default class BalancePage extends Page {
    historyState!: HistoryState;

    oninit(vnode) {
        super.oninit(vnode);

        // @ts-ignore
        this.historyState = new HistoryState({
            filter: {
                //TODO: if logged out
                user: app.session.user.username(),
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
