import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Room from "./core/Room";
import UserDashboard from "./user/UserDashboard";
import Profile from "./user/Profile";
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddService from './admin/AddService';
import Service from './core/Service';
import ManageServices from './admin/ManageService';
import UpdateService from './admin/UpdateService';
import Orders from './admin/Orders';
// import Gateway from './core/Gateway';
import Cart from './core/Cart';
// import Checkout from './core/CheckOut';









const Routes = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact  component={Home}/>
            <Route path="/room" exact  component={Room}/>
            <Route path="/user/dashboard" exact  component={UserDashboard}/>
            {/* <Route path="/gateway" exact  component={Gateway}/> */}
            <Route path="/signin" exact  component={Signin}/>
            <Route path="/signup" exact  component={Signup}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/service" exact component={AddService} />
            <AdminRoute path="/admin/services" exact component={ManageServices} />
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <Route path="/service/:serviceId" exact  component={Service}/>
            <PrivateRoute path="/Profile/:userId" exact component={Profile} />
            <AdminRoute path="/admin/service/update/:serviceId" exact component={UpdateService} />
            {/* <Route path="/gateway" exact  component={Gateway}/> */}
            <Route path="/cart" exact  component={Cart}/>
            {/* <Route path="/Checkout" exact  component={Checkout}/> */}



        </Switch>
    </BrowserRouter>
    );
};

export default Routes;