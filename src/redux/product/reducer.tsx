import { Reducer } from "redux";
import ProductActionTypes from "./action-types";

// Define o tipo de estado inicial
interface ProductState {
    currentProducts: any; // Altere o tipo conforme necessário
}

// Estado inicial
const initialState: ProductState = {
    currentProducts: {
        items: [], // Inicialize items como um array vazio
    },
};

const productReducer: Reducer<ProductState, any> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ProductActionTypes.ADD:
            // Verifique se state.currentProducts.items é definido e é um array
            if (Array.isArray(state.currentProducts.items)) {
                // Verifique se já existe um item com o mesmo id
                const productItem = state.currentProducts.items.find(
                    (item: any) => item.product.id === action.payload.product.id
                );

                if (productItem) {
                    // Se o item já existir, aumente a quantidade em 1
                    productItem.product.quantity += 1;
                } else {
                    // Se o item não existir, adicione-o à matriz
                    action.payload.product.quantity = 1;
                    state.currentProducts.items.push(action.payload);
                }

                return {
                    ...state,
                    currentProducts: {
                        ...state.currentProducts,
                        items: [...state.currentProducts.items], // Mantenha a referência da matriz
                    },
                };
            }
            return state;
        // Se não for um array, retorne o estado atual sem fazer alterações
        case ProductActionTypes.REMOVE:
            if (Array.isArray(state.currentProducts.items)) {
                const productItem = state.currentProducts.items.find(
                    (item: any) => item.product.id === action.payload.product.id
                );
                if (productItem && productItem.product.quantity > 1) {
                    productItem.product.quantity -= 1;

                    return {
                        ...state,
                        currentProducts: {
                            ...state.currentProducts,
                            items: [...state.currentProducts.items],
                        },
                    };
                } else if (productItem && productItem.product.quantity <= 1) {
                    const items = state.currentProducts.items.filter(
                        (item: any) => {
                            return (
                                action.payload.product.id !== item.product.id
                            );
                        }
                    );

                    return {
                        ...state,
                        currentProducts: {
                            ...state.currentProducts,
                            items: items,
                        },
                    };
                }
            }
            return state; // Mantenha o estado atual, não remova os itens
        default:
            return state;
    }
};

export default productReducer;
