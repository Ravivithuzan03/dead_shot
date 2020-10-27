import { API } from '../config';


export const createCategory = (userId, token, category) => {
    // console.log(name, email, password);
   return  fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
};
  




export const createService = (userId, token, service) => {
   return  fetch(`${API}/service/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: service
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    });
};
  






export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}







// room crud method


export const getServices = () => {
   return  fetch(`${API}/services?limit=undefined`, {
        method: "GET"
   })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
    
  
};
  



export const deleteService = (serviceId,userId, token) => {
   return  fetch(`${API}/service/${serviceId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
       
    })
    .then(response => {
        return response.json()
    })

    .catch(err => console.log(err));
   

};
  




export const getService = serviceId => {
    return fetch(`${API}/service/${serviceId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};





 export const updateService = (serviceId, userId, token, service) => {
    return fetch(`${API}/service/${serviceId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: service
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};










