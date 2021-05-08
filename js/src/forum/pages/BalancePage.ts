import AbstractAccountPage from 'flamarkt/core/forum/pages/AbstractAccountPage';
import formatPrice from 'flamarkt/core/common/helpers/formatPrice';
import humanTime from 'flarum/common/helpers/humanTime';
import HistoryState from '../states/HistoryState';
import History from '../../common/models/History';

export default class BalancePage extends AbstractAccountPage {
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

    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('current', m('span.breadcrumb-current', 'Balance'));

        return items;
    }

    content() {
        return m('div', [
            m('p', [
                'Current balance: ',
                formatPrice(app.session.user.attribute('flamarktBalance')),
            ]),
            m('ul', this.state.pages.map(page => page.items.map((history: History) => m('li', [
                humanTime(history.createdAt()),
                ': ',
                formatPrice(history.amount()),
            ])))),
            //TODO: pagination
        ]);
    }
}
