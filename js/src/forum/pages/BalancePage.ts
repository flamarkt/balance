import Page from 'flarum/common/components/Page';
import HistoryState from '../states/HistoryState';
import BalanceLayout from '../layouts/BalanceLayout';

export default class BalancePage extends Page {
    state!: HistoryState;

    oninit(vnode) {
        super.oninit(vnode);

        // @ts-ignore
        this.state = new HistoryState({
            filter: {
                //TODO: if logged out
                user: app.session.user.username(),
            },
        });
        this.state.refresh();
    }

    view() {
        return BalanceLayout.component({
            state: this.state,
        });
    }
}
