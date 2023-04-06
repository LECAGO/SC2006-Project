import { SVY21 } from "./ParseSearch";

async function GetURACarparkAvailability() {
    try {

        const response_0 = await fetch('http://localhost:8080/https://www.ura.gov.sg/uraDataService/insertNewToken.action', {
              'headers' : {
                  'AccessKey': '2a097165-1ba0-4a44-9d9e-4a7b2586322b'
              }
        });
        const jsonrep_0 = await response_0.json();
        const formatrepapi_0 = JSON.parse(JSON.stringify(jsonrep_0));
        const token = formatrepapi_0["Result"];
        
        const response_1 = await fetch('http://localhost:8080/https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability', {
            'headers' : {
                'AccessKey': '2a097165-1ba0-4a44-9d9e-4a7b2586322b',
                'Token': token,
            }
        });

        const jsonrep_1 = await response_1.json();
        const formatrepapi_1 = JSON.parse(JSON.stringify(jsonrep_1));
        const carpark_avail_data = formatrepapi_1["Result"];

        const response_2 = await fetch('http://localhost:8080/https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details', {
            'headers' : {
                'AccessKey': '2a097165-1ba0-4a44-9d9e-4a7b2586322b',
                'Token': token,
            }
        });
        const jsonrep_2 = await response_2.json();
        const formatrepapi_2 = JSON.parse(JSON.stringify(jsonrep_2));
        const carpark_details = formatrepapi_2["Result"];

        var freeparkchk = 0;
        var nightparkchk = 0;
        var matchcount = 0;

        var carparkno = 0;
        var addr = 0;
        var coord = 0;
        var lotsavail = 0;
        var lotstotal = 0;
        var lottype = 0;
        var agcy = 0;
        var parkingsys = 0;
        var shorttermpark = 0;
        var freepark = 0;
        var nightpark = 0;
        var api = 0;

        const CarparkAvail = [];
        for (let ictr = 0; ictr < carpark_avail_data.length; ictr++) {
            try {
                matchcount = 0;
                freeparkchk = 0;
                nightparkchk = 0;

                for (let vvtr = 0; vvtr < carpark_details.length; vvtr++) {

                    if (carpark_avail_data?.[ictr]?.["carparkNo"] == carpark_details?.[vvtr]?.["ppCode"] &&
                        carpark_details?.[vvtr]?.["vehCat"] == "Car"
                    ) {

                        if (matchcount >= 1) {
                            // sunPHRate for freeparking
                            if (carpark_details?.[vvtr]?.["sunPHRate"] == "$0.00") {
                                freeparkchk = 1;
                            }
                            // night parking check
                            if (carpark_details?.[vvtr]?.["startTime"] == "10.30 PM") {
                                nightparkchk = 1;

                            }

                        } else {
                            carparkno = carpark_avail_data?.[ictr]?.["carparkNo"];

                            addr = carpark_details?.[vvtr]?.["ppName"]; // address

                            coord = String(carpark_avail_data?.[ictr]?.["geometries"]?.[0]?.["coordinates"]);


                            lotsavail = parseInt(carpark_avail_data?.[ictr]?.["lotsAvailable"]);
                            lotstotal = carpark_details?.[vvtr]?.["parkCapacity"]; // total lots
                            lottype = carpark_avail_data?.[ictr]?.["lotType"];
                            agcy = "URA"; // Agency
                            if (carpark_details?.[vvtr]?.["parkingSystem"] == "C") {
                                parkingsys = "Coupon Parking System"; // parking system
                            } else if (carpark_details?.[vvtr]?.["parkingSystem"] == "B") {
                                parkingsys = "Electronic Parking System"; // parking system
                            } else {
                                parkingsys = "Parking n/a";
                            }
                            shorttermpark = 'No info on short term parking';
                            // sunPHRate for freeparking
                            if (carpark_details?.[vvtr]?.["sunPHRate"] == "$0.00") {
                                freeparkchk = 1;
                            }
                            // night parking check
                            if (carpark_details?.[vvtr]?.["startTime"] == "10.30 PM") {
                                nightparkchk = 1;

                            }
                            matchcount++;

                        }
                    }

                }
                if (freeparkchk == 1) {
                    freepark = "SUN & PH FR 7AM-10.30PM";
                } else {
                    freepark = "NO";
                }

                if (nightparkchk == 1) {
                    nightpark = "YES";
                } else {
                    nightpark = "NO";
                }
                api = "URAGOVAPI";

                CarparkAvail.push({
                    carpark_id: carparkno,
                    address: addr,
                    coordinates: coord,
                    lots_available: lotsavail,
                    total_lots: lotstotal,
                    lot_type: lottype,
                    agency: agcy,
                    parking_system: parkingsys,
                    short_term_parking: shorttermpark,
                    free_parking: freepark,
                    night_parking: nightpark,
                    apitofetch: api,
                });
            }
            catch { continue; }
        }
        return CarparkAvail;
    }
    catch (error) {
        return NaN;
    }
}

async function GetHDBCarparkAvailability() {
    try {

        const response_1 = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability');
        const jsonrep_1 = await response_1.json();
        const formatrepapi_1 = JSON.parse(JSON.stringify(jsonrep_1));
        const carpark_avail_data = formatrepapi_1["items"]?.[0]?.["carpark_data"];

        const response_2 = await fetch('https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=2193');
        const jsonrep_2 = await response_2.json();
        const formatrepapi_2 = JSON.parse(JSON.stringify(jsonrep_2));
        const carpark_details = formatrepapi_2["result"]?.["records"];

        var carparkno = 0;
        var addr = 0;
        var coord = 0;
        var lotsavail = 0;
        var lotstotal = 0;
        var lottype = 0;
        var agcy = 0;
        var parkingsys = 0;
        var shorttermpark = 0;
        var freepark = 0;
        var nightpark = 0;
        var api = 0;

        const CarparkAvail = [];
        for (let ictr = 0; ictr < carpark_avail_data.length; ictr++) {
            try {
                for (let vvtr = 0; vvtr < carpark_details.length; vvtr++) {
                    if (carpark_avail_data?.[ictr]?.["carpark_number"] == carpark_details?.[vvtr]?.["car_park_no"]
                    ) {
                        carparkno = carpark_avail_data?.[ictr]?.["carpark_number"];
                        addr = carpark_details?.[vvtr]?.["address"]; // address
                        coord = String(carpark_details?.[vvtr]?.["x_coord"] + "," + carpark_details?.[vvtr]?.["y_coord"]);
                        lotsavail = parseInt(carpark_avail_data?.[ictr]?.["carpark_info"]?.[0]?.["lots_available"]);
                        lotstotal = parseInt(carpark_avail_data?.[ictr]?.["carpark_info"]?.[0]?.["total_lots"]); // total lots
                        lottype = carpark_avail_data?.[ictr]?.["carpark_info"]?.[0]?.["lot_type"];
                        agcy = "HDB"; // Agency
                        parkingsys = carpark_details?.[vvtr]?.["type_of_parking_system"]; // parking system
                        shorttermpark = carpark_details?.[vvtr]?.["short_term_parking"];
                        freepark = carpark_details?.[vvtr]?.["free_parking"];
                        nightpark = carpark_details?.[vvtr]?.["night_parking"];
                    }

                }

                api = "HDBGOVAPI";

                CarparkAvail.push({
                    carpark_id: carparkno,
                    address: addr,
                    coordinates: coord,
                    lots_available: lotsavail,
                    total_lots: lotstotal,
                    lot_type: lottype,
                    agency: agcy,
                    parking_system: parkingsys,
                    short_term_parking: shorttermpark,
                    free_parking: freepark,
                    night_parking: nightpark,
                    apitofetch: api,
                });
            }
            catch { continue; }
        }
        return CarparkAvail;
    }
    catch (error) {
        return NaN;
    }
}


async function GetLTACarparkAvailability() {
    try {

        const response_1 = await fetch('http://localhost:8080/http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2', {
            'headers': {
                'AccountKey' : 'rDpiPJUZSHa+VKWIqzZLPA=='
            }
        });
        const jsonrep_1 = await response_1.json();
        const formatrepapi_1 = JSON.parse(JSON.stringify(jsonrep_1));
        const carpark_avail_data = formatrepapi_1["value"];

        var carparkno = 0;
        var addr = 0;
        var coord = 0;
        var lotsavail = 0;
        var lotstotal = 0;
        var lottype = 0;
        var agcy = 0;
        var parkingsys = 0;
        var shorttermpark = 0;
        var freepark = 0;
        var nightpark = 0;
        var api = 0;

        const CarparkAvail = [];
        for (let ictr = 0; ictr < carpark_avail_data.length; ictr++) {
            try {

                if (carpark_avail_data?.[ictr]?.["Agency"] == "LTA") {
                    carparkno = carpark_avail_data?.[ictr]?.["CarParkID"];
                    addr = carpark_avail_data?.[ictr]?.["Area"] + " " + carpark_avail_data?.[ictr]?.["Development"];
                    coord = carpark_avail_data?.[ictr]?.["Location"];
                    lotsavail = carpark_avail_data?.[ictr]?.["AvailableLots"];
                    lotstotal = "?";
                    lottype = carpark_avail_data?.[ictr]?.["LotType"];
                    agcy = carpark_avail_data?.[ictr]?.["Agency"];
                    parkingsys = "NoInfoForParkingSystemForLTA";
                    shorttermpark = "NoInfoForShortTermParkingForLTA";
                    freepark = "NoInfoForFreeParkingForLTA";
                    nightpark = "NoInfoForNightParkingForLTA";
                    api = "LTAAPI";

                    var cv = new SVY21();
                    const coordinates = cv.computeSVY21(coord.split(" ")[0], coord.split(" ")[1]);

                    CarparkAvail.push({
                        carpark_id: carparkno,
                        address: addr,
                        coordinates: coordinates["E"] + "," + coordinates["N"],
                        lots_available: lotsavail,
                        total_lots: lotstotal,
                        lot_type: lottype,
                        agency: agcy,
                        parking_system: parkingsys,
                        short_term_parking: shorttermpark,
                        free_parking: freepark,
                        night_parking: nightpark,
                        apitofetch: api,
                    });
                }

            }
            catch { continue; }
        }
        return CarparkAvail;
    }
    catch (error) {
        return NaN;
    }
}

export default async function GetCarparks() {
    const URACarpark = await GetURACarparkAvailability();
    const HDBCarpark = await GetHDBCarparkAvailability();
    const LTACarpark = await GetLTACarparkAvailability();
    return [...URACarpark, ...HDBCarpark, ...LTACarpark];
}