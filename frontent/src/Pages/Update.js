import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log(id);
    const [formData, setFormData] = useState({
        priceNative: '',
        priceUsd: '',
        volume: { h24: '', h6: '', h1: '', m5: '' }
    });
    
    // Fetch data for pre-filling the form
    useEffect(() => {
        fetchData();
    }, []);
    
    // Function to fetch existing data
    const fetchData = async () => {
        try {
            // Make a GET request to fetch existing data
            const response = await axios.get(`http://localhost:7000/api/getdataById/${id}`); // Replace ':id' with the actual ID
            // Update the form data state with the fetched data
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    
    // Function to handle form input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("volume.")) {
            const volumeField = name.split(".")[1]; // Extract volume field name
            setFormData(prevState => ({
                ...prevState,
                volume: {
                    ...prevState.volume,
                    [volumeField]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:7000/api/updatedata/${id}`, formData); // Replace ':id' with the actual ID
            alert('Data Updated successfully!');
            console.log(response.data); // Log response data for debugging
            navigate('/');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Update Data</h1>
                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col-12 col-lg-6 contact-input-field">
                            <input type="text" name="priceNative" className="form-control" placeholder="Price Native" value={formData.priceNative} onChange={handleInput} />
                        </div>
                        <div className="col-12 col-lg-6 contact-input-field">
                            <input type="text" name="priceUsd" className="form-control" placeholder="Price USD" value={formData.priceUsd} onChange={handleInput} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-lg-3 contact-input-field">
                            <input type="text" name="volume.h24" className="form-control" placeholder="Volume H24" value={formData.volume.h24} onChange={handleInput} />
                        </div>
                        <div className="col-12 col-lg-3 contact-input-field">
                            <input type="text" name="volume.h6" className="form-control" placeholder="Volume H6" value={formData.volume.h6} onChange={handleInput} />
                        </div>
                        <div className="col-12 col-lg-3 contact-input-field">
                            <input type="text" name="volume.h1" className="form-control" placeholder="Volume H1" value={formData.volume.h1} onChange={handleInput} />
                        </div>
                        <div className="col-12 col-lg-3 contact-input-field">
                            <input type="text" name="volume.m5" className="form-control" placeholder="Volume M5" value={formData.volume.m5} onChange={handleInput} />
                        </div>
                    </div>
                    <div className="text-center mt-4 mb-5">
                        <button type="submit" className="btn btn-primary">Update Data</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Update;
