function reverseGeocoding(lat, lon, callback) {

    let API_URL = 'https://nominatim.openstreetmap.org/reverse';
    let requestURL = `${API_URL}?format=jsonv2&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`;

    let request = new XMLHttpRequest();
        request.open('GET', requestURL, true);

        request.onreadystatechange = function () {
            if(request.readyState === 4 && request.status === 200) {

                console.log(request.responseText);
                let data = JSON.parse(request.responseText);
                let _output = []
                    if (!!data.address.suburb) { _output.push(data.address.suburb) }
                    if (!!data.address.city_district) { _output.push(data.address.city_district) }
                    if (!!data.address.city) { _output.push(data.address.city) }

                callback(_output.join(', '))

            }
        };

        /*
        request.onload = function() {

            if (request.status == 200){

                let data = JSON.parse(request.responseText);
                let _output = []
                    if (!!data.address.suburb) { _output.push(data.address.suburb) }
                    if (!!data.address.city_district) { _output.push(data.address.city_district) }
                    if (!!data.address.city) { _output.push(data.address.city) }

                callback(_output.join(', '))

                // return _output.join(', ');
                // console.log(data.address.suburb, data.address.city_district, data.address.city);
                // console.log(data.results[0].formatted);

            } else {
                return false;
            }
            // } else if (request.status <= 500){
            //
            //     console.log("unable to geocode! Response code: " + request.status);
            //     var data = JSON.parse(request.responseText);
            //     console.log(data.status.message);
            //
            // } else { console.log("server error") }
        };
        */
        request.onerror = function() {
            return false;
            // console.log("unable to connect to server")
        };
        request.send();
}
