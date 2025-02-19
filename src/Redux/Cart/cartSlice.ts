import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
    reducers: {

        addItemToCart: (state: any, action) => {
            const { raffleData, itemValue }: any = action.payload;

            const existingItem: any = state.cartItems.find((cartItem: any) => cartItem._id === raffleData._id);
            const existingIndex: any = state.cartItems.findIndex((cartItem: any) => cartItem._id === raffleData._id);

            console.log(itemValue, raffleData, existingItem);

            if (existingItem) {
                state.cartItems[existingIndex].qty = itemValue;
            } else {
                state.cartItems.push({ ...raffleData, qty: itemValue })
            }

        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems?.filter((cartItem: any) => cartItem._id !== itemId._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        }

    },
})
export const selectCartCount = (state: any) =>
    state.reducer.cart?.cartItems?.reduce((count: number, item: any) => count + item.qty, 0) || 0;

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer