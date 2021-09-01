import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {findAllPointCards, PointCard} from "../modules/client";
import Card, {CardBody, CardSubtitle, CardTitle} from "../components/Card";
import useArray from "../hooks/useArray";
import {Link} from "react-router-dom";

const PointCardsPage = () => {
    const [pointCards, setPointCards] = useState<PointCard[]>([]);

    const loadPointCards = async () => {
        try {
            const response = await findAllPointCards();
            setPointCards(response.data.response);
        } catch (e) {
            alert(e);
        }
    };

    useEffect(() => {
        loadPointCards();
    }, []);

    const [array, add, remove] = useArray<PointCard>([]);

    const togglePointCard = (pointCard: PointCard) => {
        if (!array.includes(pointCard)) {
            add(pointCard);
        } else {
            remove(pointCard);
        }
    };

    return (
        <>
            <div className="container">
                <h3>Point Cards</h3>
                <div className="row row-cols-2 row-cols-md-6">
                    {pointCards.map((pointCard, index) => (
                        <div className="col p-2" key={index}>
                            <Card className={array.includes(pointCard) ? "border-primary bg-primary bg-opacity-10" : ""}
                                  onClick={togglePointCard.bind(this, pointCard)}>
                                <CardBody className={array.includes(pointCard) ? "text-primary" : ""}>
                                    <CardTitle>{pointCard.name}</CardTitle>
                                    <CardSubtitle>{pointCard.point}</CardSubtitle>
                                    \{pointCard.price}
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-5"/>
            <div className="fixed-bottom card shadow">
                <div className="container card-body d-flex justify-content-between">
                    <span>
                        <span className="h6 text-muted">Subtotal</span>
                        <span className="h2 text-primary ms-1 ms-md-3">
                            \{array.map(e => e.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
                        </span>
                    </span>
                    <Link className="btn btn-primary" to={{
                        pathname: '/checkout',
                        state: {
                            cart: array
                        }
                    }}>
                        Checkout {array.length > 0 ?
                        <span className="badge text-primary bg-white">{array.length}</span> : undefined}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PointCardsPage;
