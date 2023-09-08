import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonMenu,
    IonMenuButton,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonButton,
    IonRouterLink,
} from "@ionic/react";
import "./Home.css";
import axios from "axios";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import ProductActionTypes from "../../redux/product/action-types";
import { useSelector, useDispatch } from "react-redux";
import ProductState from "../../redux/product/reducer";
const Home: React.FC = () => {
    const [products, setData] = useState([]);

    const { currentProducts } = useSelector(
        (rootReducer: any) => rootReducer.productReducer
    );
    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Verifique se o currentProducts não é vazio antes de executar a lógica
        // console.log(currentProducts);
    }, [currentProducts]);

    const dispatch = useDispatch();

    const handleBuyClick = (product: any) => {
        dispatch({
            type: ProductActionTypes.ADD,
            payload: { product },
        });
    };
    const removeBuyClick = (product: any) => {
        dispatch({
            type: ProductActionTypes.REMOVE,
            payload: { product },
        });
    };
    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Produtos</IonTitle>
                        <IonRouterLink routerLink="/cart">
                            Ir para Página 1
                        </IonRouterLink>
                        <IonButtons slot="end">
                            <IonMenuButton>
                                <div className="custom-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi bi-bag-check-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                                        />
                                    </svg>
                                </div>
                            </IonMenuButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <div className="cards-container">
                        {products.length > 0 ? (
                            products.map((product: any) => (
                                <IonCard
                                    className="custom-card"
                                    key={product.id}
                                >
                                    <img
                                        alt="Silhouette of mountains"
                                        src={product.image}
                                    />
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            {product.title}
                                        </IonCardTitle>
                                        <IonCardSubtitle>
                                            {product.category}
                                        </IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        {product.description}
                                    </IonCardContent>
                                    <IonCardContent>
                                        <IonButton
                                            color="tertiary"
                                            onClick={() =>
                                                handleBuyClick(product)
                                            }
                                        >
                                            Comprar
                                        </IonButton>
                                        <IonButton
                                            color="danger"
                                            onClick={() =>
                                                removeBuyClick(product)
                                            }
                                        >
                                            Remover
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
                            ))
                        ) : (
                            <p>Carregando...</p>
                        )}
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Home;
