import AbstractListState from 'flamarkt/core/common/states/AbstractListState';

export default class HistoryState extends AbstractListState {
    type() {
        return 'flamarkt/balance';
    }
}
