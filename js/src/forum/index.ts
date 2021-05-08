import {extend} from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import AccountControls from 'flamarkt/core/forum/utils/AccountControls';
import History from '../common/models/History';
import BalancePage from './pages/BalancePage';

app.initializers.add('flamarkt-balance', () => {
    app.store.models['flamarkt-balance-history'] = History;

    app.routes['flamarkt.account.balance'] = {
        path: '/account/balance',
        component: BalancePage,
    };

    extend(AccountControls, 'controls', items => {
        items.add('balance', LinkButton.component({
            href: app.route('flamarkt.account.balance'),
        }, 'Balance'));
    });
});
