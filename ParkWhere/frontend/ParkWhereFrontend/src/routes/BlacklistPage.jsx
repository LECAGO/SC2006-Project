import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import React from 'react';
import Select from 'react-select';
import Blacklist from '../components/Blacklist';
import { useLoaderData } from 'react-router-dom';
import Loading from '../components/Loading';

function BlacklistPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [carpark, setCarpark] = useState('');
    const [options, setOptions] = useState([]);
    const [blacklist, setBlacklist] = useState([]);

    const carpark_data = useLoaderData();
    useEffect(() => {
        const newOptions = carpark_data.map((carpark) => ({
            value: carpark.address,
            label: carpark.address,
        }));
        setOptions(newOptions);
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/ParkApp/blacklist/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            }
            else {
                return null;
            }
        })
            .then((data) => {
                setBlacklist(data);
                setIsLoading(false);
            });
    }, []);


    const handleSearch = (event) => {
        event.preventDefault();
        const carparkID = carpark_data.find((option) => option.address === carpark).carpark_id;
        fetch(`http://localhost:8000/ParkApp/blacklist/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                carpark_id: carparkID,
                lot_type: 'C'
            })
        }).then((response) => {
            if (response.status === 200) {
                window.location.reload();
            }
            else if (response.status === 400) {
                alert('Carpark already in favorites/blacklist');
            }
        });
    }

    const handleCarparkChange = (selectedOption) => {
        setCarpark(selectedOption.value);
    }

    const handleInputChange = (inputValue) => {
        setSearchTerm(inputValue);
    }

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            {isLoading ?
                <Loading /> :
                <>
                    <div className="favourites">
                        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Your blacklist</h1>
                        <br></br>
                        <table className="table m-5">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Carpark Address</th>
                                    <th scope="col">Current Availability</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    blacklist.map((carpark, index) => (
                                        <Blacklist
                                            rowIdx={index + 1}
                                            carpark={carpark.address}
                                            availability={carpark.lots_available}
                                            carparkID={carpark.carpark_id}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <form onSubmit={handleSearch} className="d-flex justify-content-center h-100 m-5">
                        <Select
                            id="search-bar"
                            options={filteredOptions}
                            placeholder="Enter search term..."
                            onChange={handleCarparkChange}
                            onInputChange={handleInputChange}
                            value={{ value: carpark, label: carpark }}
                            className="flex-grow-1 me-2"
                        />
                        <button type="submit" className="btn btn-primary"> Add Carpark </button>
                    </form>
                </>
            }
        </>
    );
}

export default BlacklistPage;