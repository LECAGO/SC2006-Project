import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import React from 'react';
import Select from 'react-select';
import Favorite from '../components/Favorite';
import Loading from '../components/Loading';
import { GetCarparks } from '../components/GetCarparks';
import { useAuth } from '../components/AuthProvider';

function FavoritesPage() {
    const {user, getCurrentUser} = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [carpark, setCarpark] = useState('');
    const [carparkData, setCarparkData] = useState([]);
    const [options, setOptions] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetCarparks();
            setCarparkData(data);
            const newOptions = await Promise.all(data.map(async (carpark) => ({
                value: carpark.address,
                label: carpark.address,
            })));
            setOptions(newOptions);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if(user) setFavoritesList(user.favorite);
        };
        fetchData();
    }, [user]);

    const handleSearch = (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        const carparkID = carparkData.find((option) => option.address === carpark).carpark_id;
        fetch(`http://localhost:8000/ParkApp/favorites/`, {
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
                getCurrentUser();
                setIsLoading(false);
                return response.json();
            }
            else if (response.status === 400) {
                setIsLoading(false);
                alert('Carpark already in favorites/blacklist');
            }
            else {
                setIsLoading(false);
                alert('Something went wrong');
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
    ).slice(0, 10);

    if (options.length===0 || !user || isLoading) return <Loading />;

    return (
        <>
            <div className="favourites">
                <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Your favorites</h1>
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
                            favoritesList.map((carpark, index) => (
                                <Favorite
                                    key={index}
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
    );
}

export default FavoritesPage;