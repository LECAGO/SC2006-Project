function calcDistanceTwoPoints([x1,y1], [x2,y2]) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx*dx + dy*dy);
    return (distance / 1000).toFixed(2);
}

function GetDistance(coordinates, data) {
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

export default function sortCarpark(coordinates, data) {
    const dist_data = GetDistance(coordinates, data);
    const sorted = dist_data.sort(compareData);
    return sorted;
}