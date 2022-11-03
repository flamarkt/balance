import app from 'flarum/forum/app';
import {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import AbstractAccountLayout from 'flamarkt/core/forum/layouts/AbstractAccountLayout';
import PriceLabel from 'flamarkt/core/common/components/PriceLabel';
import humanTime from 'flarum/common/helpers/humanTime';
import History from '../../common/models/History';
import HistoryListState from '../states/HistoryListState';

interface BalanceLayoutAttrs extends ComponentAttrs {
    list: HistoryListState
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

    sections(): ItemList<any> {
        const sections = new ItemList();

        sections.add('current', m('p', [
            'Current balance: ',
            m(PriceLabel, {
                value: app.session.user?.attribute('flamarktBalance'),
            })
        ]), 20);

        sections.add('history', m('ul', this.attrs.list.pages.map(page => page.items.map((history: History) => m('li', [
            humanTime(history.createdAt()!),
            ': ',
            m(PriceLabel, {
                value: history.amount(),
            }),
            history.comment() ? [
                ' ',
                m('em', '(' + history.comment() + ')'),
            ] : null,
        ])))), 10); //TODO: pagination

        return sections;
    }
}
