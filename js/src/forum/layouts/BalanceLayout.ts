import {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import AbstractAccountLayout from 'flamarkt/core/forum/layouts/AbstractAccountLayout';
import formatPrice from 'flamarkt/core/common/helpers/formatPrice';
import humanTime from 'flarum/common/helpers/humanTime';
import History from '../../common/models/History';
import HistoryState from '../states/HistoryState';

interface BalanceLayoutAttrs extends ComponentAttrs {
    state: HistoryState
}

export default class BalanceLayout extends AbstractAccountLayout<BalanceLayoutAttrs> {
    className() {
        return 'BalancePage';
    }

    title() {
        return 'Balance';
    }

    content() {
        return m('div', this.sections().toArray());
    }

    sections(): ItemList {
        const sections = new ItemList();

        sections.add('current', m('p', [
            'Current balance: ',
            formatPrice(app.session.user.attribute('flamarktBalance')),
        ]), 20);

        // @ts-ignore type-hints on AbstractAccountLayout not available
        sections.add('history', m('ul', this.attrs.state.pages.map(page => page.items.map((history: History) => m('li', [
            humanTime(history.createdAt()),
            ': ',
            formatPrice(history.amount()),
        ])))), 10); //TODO: pagination

        return sections;
    }
}
