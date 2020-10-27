import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import Menu from '../core/Menu';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import {listOrders} from './apiAdmin';
import moment from "moment";
import '../style/order.css';



const Orders = () => {
    const [orders, setOrders] = useState([]);
    // const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };


    useEffect(() => {
        loadOrders();
        // loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h2 className="text-danger display-2">
                    Total orders: {orders.length}
                </h2>
            );
        } else {
            return <h1 className="text-danger">No Orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );
    return (
        <div className="order">
            <Menu />
            <div className="row">
                <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-sm-12">
                    {showOrdersLength()}
                    {/* {JSON.stringify(orders)} */}

                     {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid yellow" }}
                            >
                                <h2 className="mb-5">
                                    <span className="bg-warning order_id">
                                        Order ID: {o._id}
                                    </span>
                                </h2>

                                 <ul className="list-group mb-2 ">
                                    {/* <li className="list-group-item"> */}
                                        {/* {showStatus(o)} */}
                                    {/* </li> */}
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: Rs.{o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.pubgname}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic Total_room">
                                    Total Rooms in the order:{" "}
                                    {o.services.length}
                                </h3>

                                {o.services.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid yellow"
                                        }}
                                    >
                                        {showInput("Room Type", p.name)}
                                        {showInput("Entry Fees", p.price)}
                                        {showInput("Room total", p.count)}
                                        {showInput("Room Id", p._id)}
                                    </div>
                                ))} 
                            </div>
                        );
                    })} 
                </div>
            </div>
        </div>
    );
};

export default Orders;