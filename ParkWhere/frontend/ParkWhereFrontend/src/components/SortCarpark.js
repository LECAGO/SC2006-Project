function calcDistanceTwoPoints([x1,y1], [x2,y2]) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx*dx + dy*dy);
    return (distance / 1000).toFixed(2);
}

function GetDistance(coordinates, data) {
    for(var i = 0; i < data.length; i++) {
        var carpark_coordinates = data[i]["coordinates"].split(",");
        if(carpark_coordinates.length!==2 || carpark_coordinates[0]===NaN) data[i]["distance"] = NaN;
        else {
            carpark_coordinates[0] = parseFloat(carpark_coordinates[0]);
            carpark_coordinates[1] = parseFloat(carpark_coordinates[1]);
            data[i]["distance"] = calcDistanceTwoPoints(coordinates, carpark_coordinates)
        }
    }
    return data;
}

function compareData(first, second) {
    if (first.lots_available < 10) return 1;
    if (second.lots_available < 10) return -1;
    if(first.favorite && !second.favorite) return -1;
    if(!first.favorite && second.favorite) return 1;
    return first.distance - second.distance;
}

export default function sortCarpark(coordinates, data, favorite, blacklist) {
    // remove from data if carpark is in blacklist
    data = data.filter((carpark) => {
        return !blacklist.includes(carpark.carpark_number);
    });

    // calculate distance between coordinates and carpark
    const dist_data = GetDistance(coordinates, data);

    // add favorite attribute to each carpark
    for(var i = 0; i < dist_data.length; i++) {
        dist_data[i]["favorite"] = favorite.includes(dist_data[i].carpark_id);
    }

    const sorted = dist_data.sort(compareData);
    return sorted;
}