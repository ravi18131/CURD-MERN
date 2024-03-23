import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import img from "../img/curd.jpeg"
import "../stylesheets/Home.css"

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="card text-center">
                <div className="card-header">
                    CURD Featured
                </div>
                <div className="card-body">
                    <div className="container mt-2">
                        <div className="row">
                            <div className="col">
                                <img src={img} alt="" className="img-fluid mx-auto w-50 img-h d-block" />
                            </div>
                        </div>
                    </div>
                    <p className="card-text mt-3">CRUD operations in a MERN stack involve creating new data using POST requests to the backend API, reading existing data with GET requests, updating data through PUT or PATCH requests, and deleting data with DELETE requests. These operations enable full interaction with a MongoDB database, providing essential functionality for web Applications.</p>
                    <div className="row justify-content-center ">
                        <div className="col-1">
                            <a href="/Create" className="btn btn-color">Create</a>
                        </div>
                        <div className="col-1">
                            <a href="/Read" className="btn btn-color">Read</a>
                        </div>
                        <div className="col-1">
                            <a href="/Read" className="btn btn-color">Update</a>
                        </div>
                        <div className="col-1">
                            <a href="/Read" className="btn btn-color">Delete</a>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-body-secondary">
                    2 days ago
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;
