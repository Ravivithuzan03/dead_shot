import { API } from "../config";



export const signup =(user) => {

  // to get in console
  // console.log(name, email, password)

  // send data to backend as JSON

  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err);
  })
}


export const signin =(user) => {

  // to get in console
  // console.log(name, email, password)

  // send data to backend as JSON

  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err);
  })
}


export const authenticate = (data, next) => {
  if(typeof window !== 'undefined') {
    localStorage.setItem("status", "login")
    localStorage.setItem('jwt', JSON.stringify(data))
    
    next()
  }
}


export const signout = (next) => {
  if(typeof window !== 'undefined') {
    localStorage.removeItem("status")
    localStorage.removeItem('jwt')
    next()
    return fetch(`${API}/signout`, {
      method: "GET",

    })
    .then(response => {
      console.log('signout', response)
    })
    .catch(err => console.log(err))
  }
}


export const isAuthenticated = () => {
  if(typeof window == 'undefined') {
    return false
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  }else {
    return false
  }
}