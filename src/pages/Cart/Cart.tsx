import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonMenu,
    IonMenuButton,
    IonToolbar,
    IonButtons,
    IonIcon,
} from "@ionic/react";
import "./Cart.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Cart: React.FC = () => {
    return (
        <>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Carrinho</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>aaaa</IonContent>
            </IonPage>
        </>
    );
};

export default Cart;
