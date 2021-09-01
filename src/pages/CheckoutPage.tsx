import React, {useState} from "react";
import {RequestPayResponse} from "iamport-typings";
import Button from "../components/Button";
import LabelInput from "../components/LabelInput";
import useInputs from "../hooks/useInputs";
import {RouteComponentProps} from "react-router-dom";
import {chargePoint, ClientResponse, Payment, PaymentPointCard, PointCard, requestPayment} from "../modules/client";
import {importIamport, userCode} from "../modules/iamport";

interface CheckoutPageProps {
    cart: Array<PointCard>;
}

const CheckoutPage = (props: RouteComponentProps) => {
    const cart = props.location.state ? (props.location.state as CheckoutPageProps).cart : [];
    const amount = cart.map(e => e.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const [inputs, onChange] = useInputs({
        buyer_email: '',
        buyer_name: '',
        buyer_tel: ''
    });
    const {buyer_email, buyer_name, buyer_tel} = inputs;
    const [pay_method, set_pay_method] = useState<string>('card');

    importIamport();

    const requestPay = async () => {
        if (cart.length === 0) {
            return;
        }

        const paymentItems: Array<PaymentPointCard> = [];
        cart.forEach(e => {
            paymentItems.push({
                id: e.seq,
                quantity: 1
            });
        });

        try {
            const response = await requestPayment(paymentItems);
            const payment = (response.data as ClientResponse<Payment>).response;

            const {IMP} = window;

            if (payment && IMP) {
                const {orderId: merchant_uid, name} = payment;

                IMP.init(userCode);
                IMP.request_pay({
                    pg: 'kcp',
                    pay_method,
                    merchant_uid,
                    name,
                    amount,
                    buyer_email,
                    buyer_name,
                    buyer_tel,
                }, async (rsp: RequestPayResponse) => {
                    if (rsp.success) {
                        try {
                            const data = await chargePoint({
                                receiptId: rsp.imp_uid!!,
                                orderId: rsp.merchant_uid
                            });
                            console.log(data);
                            alert('Ok');
                        } catch (e) {
                            alert(e);
                        }
                    } else {
                        alert(rsp.error_msg);
                    }
                });
            }
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="container">
            <div className="pt-1 pb-4">
                <h3>Teriser</h3>
            </div>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">{cart.length}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {cart.map((pointCard, index) => (
                            <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                                <div>
                                    <h6 className="my-0">{pointCard.name}</h6>
                                    <small className="text-muted">{pointCard.point}</small>
                                </div>
                                <span className="text-muted">\{pointCard.price}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between list-group-item-primary">
                            Total (KRW)
                            <strong>\{amount}</strong>
                        </li>
                    </ul>
                    <div className="d-none d-md-block">
                        <div className="d-grid gap-2">
                            <Button variant="primary" onClick={requestPay}>Continue to checkout</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4>Billing address</h4>
                    <LabelInput label="Name" name="buyer_name" value={buyer_name} onChange={onChange}/>
                    <LabelInput label="Email" name="buyer_email" type="email" value={buyer_email} onChange={onChange}/>
                    <LabelInput label="Tel" name="buyer_tel" type="tel" value={buyer_tel} onChange={onChange}/>
                    <hr className="my-4"/>
                    <h4>Payment</h4>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="pay_method_card" name="pay_method"
                               value="card" defaultChecked={pay_method === 'card'}
                               onClick={set_pay_method.bind(this, 'card')}/>
                        <label className="form-check-label" htmlFor="pay_method_card">💳 Credit card</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="pay_method_trans" name="pay_method"
                               value="trans" defaultChecked={pay_method === 'trans'}
                               onClick={set_pay_method.bind(this, 'trans')}/>
                        <label className="form-check-label" htmlFor="pay_method_trans">🏛 Real-time bank
                            transfer</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="pay_method_vbank" name="pay_method"
                               value="vbank" defaultChecked={pay_method === 'vbank'}
                               onClick={set_pay_method.bind(this, 'vbank')}/>
                        <label className="form-check-label" htmlFor="pay_method_vbank">🏛 Virtual account</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="pay_method_phone" name="pay_method"
                               value="phone" defaultChecked={pay_method === 'phone'}
                               onClick={set_pay_method.bind(this, 'phone')}/>
                        <label className="form-check-label" htmlFor="pay_method_phone">📱 Mobile payment</label>
                    </div>
                    <hr className="my-4"/>
                    <div className="d-grid gap-2">
                        <Button variant="primary" onClick={requestPay} className="btn-lg">Continue to checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
