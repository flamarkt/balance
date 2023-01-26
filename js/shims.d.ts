import {Children} from 'mithril';
import CartLayout from 'flamarkt/core/forum/layouts/CartLayout';
import ItemList from 'flarum/common/utils/ItemList';

declare module 'flamarkt/core/forum/layouts/CartLayout' {
    export default interface CartLayout {
        submittingBalance: boolean
        savingBalance: boolean

        balancePaymentVisible(): boolean

        balanceLinks(checkoutMode: boolean): ItemList<Children>
    }
}
