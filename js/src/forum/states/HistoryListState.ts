import AbstractListState from 'flamarkt/backoffice/common/states/AbstractListState';
import History from '../../common/models/History';

export default class HistoryListState extends AbstractListState<History> {
    type() {
        return 'flamarkt/balance';
    }
}
