async function Geocode(search) {
    try {
        const searchURI = encodeURIComponent('singapore ' + search.toLowerCase());
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=33260cf482d7445a851a69dfcdb2d44f&q=${searchURI}`);
        const jsonrep = await response.json();
        var formatrepapi = JSON.parse(JSON.stringify(jsonrep));
        if (response.status === 200) return formatrepapi["results"];
        else return -1;
    } catch (error) {
        return -1
    };
}

export default async function ParseSearch() {
    if(inputSearch.length === 0) {
        return NaN, NaN, 'Search keyword is required';
    }
    else {
        const data = await Geocode(inputSearch);
        if(data===-1) {
            return NaN, NaN, 'API call failed';
        }
        else if (data.length===0){
            return NaN, NaN, 'Invalid location, try another keyword search');
        }
        else {
            const lat = data[0]['geometry']['lat'];
            const lon = data[0]['geometry']['lng'];
            const label = data[0]['formatted'];
            
            var cv = new SVY21();
            var result = cv.computeSVY21(lat, lon);

            const coor = result['E'] + ',' + result['N'];
            
            return coor, label, NaN 
        }
    }
}