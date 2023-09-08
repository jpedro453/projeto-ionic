import { IonBadge, IonItem, IonText, IonThumbnail } from "@ionic/react";
import React from "react";
import "./CartItem.css";

interface CartItemProps {
    id: number;
    category: string;
    description: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    // Outras propriedades do seu objeto de produto, se houver
}

const Cartitem: React.FC<CartItemProps> = ({
    id,
    title,
    price,
    description,
    category,
    image,
    quantity,
}) => {
    function currencyFormat(num: number) {
        return "R$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return (
        <>
            <IonItem className="item">
                <IonThumbnail slot="start">
                    <img alt={title} src={image} />
                </IonThumbnail>
                <div className="container">
                    <IonText className="title" color="dark">
                        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                    </IonText>
                    <IonBadge class="badge">{category}</IonBadge>
                    <IonText className="price" color="dark">
                        {currencyFormat(price)}
                    </IonText>
                    <IonText className="price" color="dark">
                        {quantity}
                    </IonText>
                </div>
            </IonItem>
        </>
    );
};

export default Cartitem;
