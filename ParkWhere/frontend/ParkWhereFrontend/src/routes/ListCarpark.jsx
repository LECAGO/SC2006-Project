import 'bootstrap/dist/css/bootstrap.min.css';
import CarparkBasic from "../components/CarparkBasic";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SortCarpark from "../components/SortCarpark";
import { useAuth } from '../components/AuthProvider';
import Loading from '../components/Loading';
import { GetCarparks } from '../components/GetCarparks';

function ListCarpark() {
    const [isLoading, setIsLoading] = useState(true);
    const [carpark_data, setCarparkData] = useState([]);
    const { user, getCurrentUser } = useAuth();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let coordinates = []
    try { coordinates = queryParams.get('coordinates').split(',').map((item) => (parseFloat(item))) }
    catch { coordinates = [NaN] }
    let label = 'None';
    try { label = queryParams.get('label') }
    catch { label = [NaN] }

    // set interval to refresh data every 300 seconds (5 minutes)
    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 300 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await getCurrentUser();
            const data = await GetCarparks();
            if (!currentUser) {
                const new_carpark_data = SortCarpark(coordinates, data, [], []);
                setCarparkData(new_carpark_data);
            }
            else {
                const user_favorite = currentUser.favorite.map((item) => (item.carpark_id));
                const user_blacklist = currentUser.blacklist.map((item) => (item.carpark_id));
                const new_carpark_data = SortCarpark(coordinates, data, user_favorite, user_blacklist);
                setCarparkData(new_carpark_data);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="container mt-4">
            <div className="row border-bottom border-dark py-3">
                <h2>Recommended Carparks for {label}:</h2>
            </div>
            {coordinates[0] && coordinates.length === 2 && carpark_data.length > 0 ?
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
                    <p> There is no data found </p>
                </div>
            }
        </div>
    )
}

export default ListCarpark;

