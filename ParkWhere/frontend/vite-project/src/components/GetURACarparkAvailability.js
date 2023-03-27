export default async function GetURACarparkAvailability() {
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