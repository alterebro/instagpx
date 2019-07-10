function reverseGeocoding(lat, lon) {

    let API_URL = 'https://nominatim.openstreetmap.org/reverse';
    let requestURL = `${API_URL}?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    let request = new XMLHttpRequest();
        request.open('GET', requestURL, true);

        request.onload = function() {

            if (request.status == 200){

                var data = JSON.parse(request.responseText);
                console.log(data.results[0].formatted);

            } else if (request.status <= 500){

                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log(data.status.message);

            } else { console.log("server error") }
        };
        request.onerror = function() { console.log("unable to connect to server") };
        request.send();
}
