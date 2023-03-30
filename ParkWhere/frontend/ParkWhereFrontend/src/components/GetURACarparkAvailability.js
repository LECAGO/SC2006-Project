export default async function GetURACarparkAvailability() {
    try {
        const response_1 = await fetch('http://localhost:8080/https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability', {
            'headers' : {
                'AccessKey': '2a097165-1ba0-4a44-9d9e-4a7b2586322b',
                'Token': '4rDjwk9-h-24VBtb42aWqf1-9KbSD0ks6Mfha7p2t4--9aKa-B045784tCb90U4CRqX9d76C2bG77D92d8--C-x@-2U4WGfZ6549',
            }
        });
        const jsonrep_1 = await response_1.json();
        const formatrepapi_1 = JSON.parse(JSON.stringify(jsonrep_1));
        const carpark_avail_data = formatrepapi_1["Result"];

        const response_2 = await fetch('http://localhost:8080/https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details', {
            'headers' : {
                'AccessKey': '2a097165-1ba0-4a44-9d9e-4a7b2586322b',
                'Token': '4rDjwk9-h-24VBtb42aWqf1-9KbSD0ks6Mfha7p2t4--9aKa-B045784tCb90U4CRqX9d76C2bG77D92d8--C-x@-2U4WGfZ6549',
            }
        });
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
        return NaN;
    }
}