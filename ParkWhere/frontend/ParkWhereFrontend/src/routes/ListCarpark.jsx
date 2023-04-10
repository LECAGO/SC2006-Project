import 'bootstrap/dist/css/bootstrap.min.css';
import CarparkBasic from "../components/CarparkBasic";
import {useState, useEffect} from "react";
import {useLoaderData, useLocation} from "react-router-dom";
import SortCarpark from "../components/SortCarpark";
import { useAuth } from '../components/AuthProvider';
import Loading from '../components/Loading';

function ListCarpark() {
    const [isLoading, setIsLoading] = useState(true);
    const {user, getCurrentUser} = useAuth();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    var coordinates = []
    try { coordinates = queryParams.get('coordinates').split(',').map((item) => (parseFloat(item))) }
    catch { coordinates = [NaN] }
    var label = 'None';
    try { label = queryParams.get('label') }
    catch { label = [NaN] }

    // set interval to refresh data every 300 seconds (5 minutes)
    useEffect(() => {
        getCurrentUser();
        const interval = setInterval(() => {
            window.location.reload();
        }, 300 * 1000);
        return () => clearInterval(interval);
    }, []);

    var carpark_data = useLoaderData();
    if(carpark_data) {
        const user_favorite = user.favorite.map((item) => (item.carpark_id));
        const user_blacklist = user.blacklist.map((item) => (item.carpark_id));
        carpark_data = SortCarpark(coordinates, carpark_data, user_favorite, user_blacklist);
        useEffect(() => {
            setIsLoading(false)
        }, []);
    }

    return (
        <>
            {isLoading ?
                <Loading /> :
            <>
            <div className="container mt-4">
                <div className="row border-bottom border-dark py-3">
                    <h2>Recommended Carparks for {label}:</h2>
                </div>
                { coordinates[0] && coordinates.length === 2 && carpark_data.length > 0 ?
                    carpark_data.map((carpark, i) => (
                        <div className="row border-bottom border-dark py-3" key={i}>
                            <CarparkBasic 
                                currentLocation={label}
                                id={carpark.carpark_id}
                                key={i}
                                availability={carpark.lots_available}
                                totalslot={carpark.total_lots}
                                distance={carpark.distance}
                                address={carpark.address}
                                favorite={carpark.favorite}
                            />
                        </div>
                    )) :
                    <div className="row border-bottom border-dark py-3">
                        <p> Error, there is no data found </p>
                    </div>
                }
            </div>
            </>
            }
        </>
    )
}

export default ListCarpark;

