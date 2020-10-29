import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import Menu from '../core/Menu';
import { isAuthenticated } from '../auth/index';
import '../style/addroom.css';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import { createService, getCategories } from './apiAdmin';

const AddService = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        // roomnumber:'',
        // password:'',
        loading: false,
        error: '',
        createdService: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        // eslint-disable-next-line
        category,
        quantity,
        // roomnumber,
        // password,
        loading,
        error,
        createdService,
        // eslint-disable-next-line
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createService(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    // roomnumber,
                    // password,
                    loading: false,
                    createdService: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3 room_form " onSubmit={clickSubmit}>
            <h4 className="post_photo">Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Match Type</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Winning Price</label>
                <input onChange={handleChange('description')}type="number" className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Entry Fees</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Select Map</label>
                <select onChange={handleChange('category')}  className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Start Time</label>
                <input onChange={handleChange('quantity')} type="text" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-warning btn-block rb">Create Room</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger validate" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdService ? '' : 'none' }}>
            <h5 className="validate">{`${createdService}`} is created!</h5>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success ">
                <h5 className="validate">Loading...</h5>
            </div>
        );

    return (
        <div className="room">
             <Menu />
            <div className="row ">
                <div className="col-md-6 offset-md-3">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    );
};

export default AddService;































































