import CartLayout from 'flamarkt/core/forum/layouts/CartLayout';

declare module 'flamarkt/core/forum/layouts/CartLayout' {
    export default interface CartLayout {
        payWithBalance: boolean
    }
}
