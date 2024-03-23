import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import createimg from "../img/create.jpeg"

function Create() {
    const [formData, setFormData] = useState({
        priceNative: '',
        priceUsd: '',
        volume: {
            h24: '',
            h6: '',
            h1: '',
            m5: ''
        }
    });

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



    console.log(setFormData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:7000/api/postdata', formData);
            alert('Data added successfully!');
            // Clear form data after submission
            setFormData({
                priceNative: '',
                priceUsd: '',
                volume: {
                    h24: '',
                    h6: '',
                    h1: '',
                    m5: ''
                }
            });
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={createimg} alt="Image not found" className="img-fluid mx-auto d-block" />
                    </div>
                </div>
                <h1>Price Volume Data</h1>
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
                        <button type="submit" className="btn btn-primary">Add Data</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Create;
