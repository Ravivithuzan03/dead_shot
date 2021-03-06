import { API } from '../config';
import queryString from 'query-string'

export const getServices = sortBy => {
    return fetch(`${API}/services?sortBy=${sortBy}&order=desc&limit=12`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = params => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/services/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (serviceId) => {
    return fetch(`${API}/service/${serviceId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = (serviceId) => {
    return fetch(`${API}/services/related/${serviceId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getBraintreeClientToken = (userId,token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization :`Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: createOrderData})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};