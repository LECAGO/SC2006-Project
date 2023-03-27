import 'bootstrap/dist/css/bootstrap.min.css';
import CarparkBasic from "../components/CarparkBasic";
import {useLoaderData, useLocation} from "react-router-dom";

function ListCarpark() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    var coordinates = []
    try { coordinates = queryParams.get('coordinates').split(',').map((item) => (parseFloat(item))) }
    catch { coordinates = [NaN] }
    var label = 'None';
    try { label = queryParams.get('label') }
    catch { label = [NaN] }

    var carpark_data = useLoaderData();

    function calcDistanceTwoPoints([x1,y1], [x2,y2]) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        const distance = Math.sqrt(dx*dx + dy*dy);
        return (distance / 1000).toFixed(2);
    }

    function GetDistance(data) {
        for(var i = 0; i < data.length; i++) {
            var address = data[i]["address"].split(",");
            if(address.length!==2 || address[0]===NaN) data[i]["distance"] = NaN;
            else {
                address[0] = parseFloat(address[0]);
                address[1] = parseFloat(address[1]);
                data[i]["distance"] = calcDistanceTwoPoints(coordinates, address)
            }
        }
        return data;
    }

    function compareData(first, second) {
        if (first.lots_available < 10) return 1;
        if (second.lots_available < 10) return -1;
        return first.distance - second.distance;
    }

    function sortData(data) {
        const sorted = data.sort(compareData);
        return sorted;
    }

    carpark_data = sortData(GetDistance(carpark_data));

    return (
        <>
            <div className="container mt-4">
                <div className="row border-bottom border-dark py-3">
                    <h2>Recommended Carparks for {label}:</h2>
                </div>
                { coordinates[0] !== NaN && coordinates.length === 2 && carpark_data.length > 0 ?
                    carpark_data.map((carpark, i) => (
                        <div className="row border-bottom border-dark py-3" key={i}>
                            <CarparkBasic 
                                id={carpark.carpark_id}
                                key={i}
                                name={carpark.name} 
                                availability={carpark.lots_available}
                                totalslot={carpark.total_lots}
                                distance={carpark.distance}
                                address={carpark.address}
                            />
                        </div>
                    )) :
                    <div className="row border-bottom border-dark py-3">
                        <p> Error, there is no data found </p>
                    </div>
                }
            </div>
        </>
    )
}

export default ListCarpark;

export async function GetURACarparkAvailability() {
    try {
        const response_1 = await fetch('./uraavail.json');
        const jsonrep_1 = await response_1.json();
        const formatrepapi_1 = JSON.parse(JSON.stringify(jsonrep_1));
        const carpark_avail_data = formatrepapi_1["Result"];

        const response_2 = await fetch('./uradetails.json');
        const jsonrep_2 = await response_2.json();
        const formatrepapi_2 = JSON.parse(JSON.stringify(jsonrep_2));
        const carpark_details = formatrepapi_2["Result"]
        
        const carpark_details_dict = {}
        for (let i = 0; i < carpark_details.length; i++) {
            const curr = carpark_details[i];
            
            var name;
            try {
                name = curr['ppName'];
            }
            catch {
                continue;
            }

            var coordinate;
            try {
                coordinate = curr['geometries'][0]['coordinates'];
            }
            catch {
                coordinate = '-';
            }

            var total_lots;
            try {
                total_lots = curr['parkCapacity'];
            }
            catch {
                total_lots = '-';
            }
            
            if (carpark_details_dict[curr['ppCode']]) {
                carpark_details_dict[curr['ppCode']]['total_lots'] += total_lots;
            }
            else {
                carpark_details_dict[curr['ppCode']] = {
                    name: name,
                    total_lots: total_lots,
                    address: coordinate
                }
            }
        }
        
        const CarparkAvail = [];
        for (let i = 0; i < carpark_avail_data.length; i++) {
            try { 
                const carpark_id = carpark_avail_data[i]["carparkNo"]
                CarparkAvail.push({
                    carpark_id: carpark_id,
                    name: carpark_details_dict[carpark_id]['name'],
                    lots_available: carpark_avail_data[i]["lotsAvailable"],
                    total_lots: carpark_details_dict[carpark_id]['total_lots'],
                    address: carpark_details_dict[carpark_id]['address'],
                });
            }
            catch {continue;}
        }
        return CarparkAvail;
    } 
    catch (error) {
        return [{name:"Error"}];
    }
}