import React, { useEffect, useRef, useState } from "react";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ProductActionTypes from "../redux/product/action-types";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./Cartitem";
import Cart from "../pages/Cart/Cart";

interface Product {
    product: any;
}

function Menu() {
    const menuRef = useRef<HTMLIonMenuElement | null>(null);
    const { currentProducts } = useSelector(
        (rootReducer: any) => rootReducer.productReducer
    );
    const [cartProducts, setCartProducts] = useState([]); // Inicialize como uma matriz vazia

    useEffect(() => {
        setCartProducts(currentProducts.items);
        {
            // cartProducts.map((cartProduct: Product) =>
            //     console.log(cartProduct)
            // );
        }
        if (currentProducts.items.length > 0) {
            if (menuRef.current) {
                menuRef.current.open();
            }
        }
    }, [currentProducts]);

    return (
        <>
            <IonMenu side="end" contentId="main-content" ref={menuRef}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Carrinho</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {cartProducts.map((cartProduct: Product) => {
                        if (cartProduct) {
                            return (
                                <CartItem
                                    {...cartProduct.product}
                                    key={cartProduct.product.id}
                                />
                            );
                        }
                    })}
                </IonContent>
            </IonMenu>
        </>
    );
}

export default Menu;
