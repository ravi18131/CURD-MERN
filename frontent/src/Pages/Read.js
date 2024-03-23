import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BsPencilSquare, BsTrash, BsPlus } from 'react-icons/bs'; // Import icons from Bootstrap

const Read = () => {
    const [priceVolumes, setPriceVolumes] = useState([]);

    useEffect(() => {
        fetchPriceVolumes();
    }, []);

    const fetchPriceVolumes = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/getdata');
            setPriceVolumes(response.data);
        } catch (error) {
            console.error('Error fetching price volumes:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this data?');
            if (confirmed) {
                await axios.delete(`http://localhost:7000/api/deletedata/${id}`);
                fetchPriceVolumes(); // Fetch updated data after deletion
                alert('Data deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting price volume:', error);
        }
    };
    

    return (
        <>
            <Navbar />
            <div className="container">
            <div className="d-flex justify-content-end mb-3 mt-3">
                    <Link to="/Create" className="btn btn-primary">
                        <BsPlus className="me-1" />
                        Add Record
                    </Link>
                </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Price Native</th>
                        <th>Price USD</th>
                        <th>Volume H24</th>
                        <th>Volume H6</th>
                        <th>Volume H1</th>
                        <th>Volume M5</th>
                        <th>Action</th> {/* New column for action buttons */}
                    </tr>
                </thead>
                <tbody>
                    {priceVolumes.map(priceVolume => (
                        <tr key={priceVolume._id}>
                            <td>{priceVolume.priceNative}</td>
                            <td>{priceVolume.priceUsd}</td>
                            <td>{priceVolume.volume.h24}</td>
                            <td>{priceVolume.volume.h6}</td>
                            <td>{priceVolume.volume.h1}</td>
                            <td>{priceVolume.volume.m5}</td>
                            <td>
                                <Link to={`/update/${priceVolume._id}`} className="btn btn-primary me-2">
                                    <BsPencilSquare /> {/* Icon for Update */}
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(priceVolume._id)}>
                                    <BsTrash /> {/* Icon for Delete */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <Footer />
        </>
    );
}

export default Read;
