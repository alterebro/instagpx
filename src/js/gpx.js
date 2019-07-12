function readGPX(file, callback) {

    function pointsDistance(p1, p2) {

        function _degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        }

        const EARTH_RADIUS_KM = 6371.009;
        let _p1 = { lat : _degreesToRadians(p1.lat), lon : _degreesToRadians(p1.lon) }
        let _p2 = { lat : _degreesToRadians(p2.lat), lon : _degreesToRadians(p2.lon) }

        let latDiff = _p1.lat - _p2.lat;
        let lonDiff = _p1.lon - _p2.lon;

        let a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2)
            + Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2)
            * Math.cos(_p1.lat) * Math.cos(_p2.lat);

        let radAngDist = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distanceKm = EARTH_RADIUS_KM * radAngDist;
        return distanceKm;
    }

    function gpxToJSON(trkpts) {

        let trackpoints = [];
        for( let trkpt = 0; trkpt < trkpts.length; trkpt++ ){

            let point = trkpts[ trkpt ];
            let lon = parseFloat( point.getAttribute('lon') );
            let lat = parseFloat( point.getAttribute('lat') );
            let elevation = point.getElementsByTagName('ele')[0].textContent;
            let time = point.getElementsByTagName('time')[0].textContent;

            trackpoints.push({ lon, lat, elevation, time });
        }
        return trackpoints;
    }

    function averageElevation(trkpts) {
        let elevation = 0;
        let devideBy = 0;

        for (let trkpt = 0; trkpt < trkpts.length; trkpt++ ){
            let point = trkpts[trkpt];
            if ( point.querySelector('ele') ) {
                elevation += parseFloat( point.querySelector( 'ele' ).textContent );
                devideBy++;
            }
        }
        return elevation / devideBy;
    }

    function msToTime(ms) {

        let seconds = parseInt( ( ms / 1000 ) % 60, 10 );
        let minutes = parseInt( ( ms / ( 1000 * 60 ) ) % 60, 10 );
        let hours = parseInt( ( ms / ( 1000 * 60 * 60 ) ) % 24, 10 );
        let days = parseInt( ms / ( 1000 * 60 * 60 * 24 ), 10 );
        let hoursDays = parseInt( days * 24, 10 );
            hours += hoursDays;

        return { hours, minutes, seconds, ms }
        // return {
        //     hours : String(hours).padStart(2, '0'),
        //     minutes : String(minutes).padStart(2, '0'),
        //     seconds : String(seconds).padStart(2, '0'),
        //     ms : ms
        // }
    }

    function GPX(gpxData) {
        let _xmlDoc = new DOMParser().parseFromString(gpxData, 'application/xml');
        let _trkpts = [];
            try { _trkpts = _xmlDoc.querySelectorAll( 'trkpt' ) }
            catch(e) { _trkpts = _xmlDoc.documentElement.getElementsByTagName( 'trkpt' ) }

        const trackpoints = gpxToJSON(_trkpts);

        const start = new Date( trackpoints[0].time );
        const end = new Date( trackpoints[trackpoints.length - 1].time );
        const timestamp = { start, end }

        const startPoint = trackpoints[0];
        const endPoint = trackpoints[trackpoints.length-1];
        const coords = {
            start : {
                lat : startPoint.lat,
                lon : startPoint.lon
            },
            end : {
                lat : endPoint.lat,
                lon : endPoint.lon
            }
        }
        console.log(coords);

        const duration = msToTime( Math.abs(end.getTime() - start.getTime()) );
        const distance = (function() {

            let _distance = 0;
            for( let i = 0; i < trackpoints.length - 1; i++ ){
                _distance += pointsDistance( trackpoints[i], trackpoints[i+1] );
            }
            return {
                km : _distance,
                mi : _distance * 0.621371
            };

        }());

        const pace = (function() {

            let _msKm = duration.ms / distance.km;
            let _msMi = duration.ms / distance.mi;

            return {
                'perKm' : {
                    'minutes' : new Date( _msKm ).getUTCMinutes(),
                    'seconds' : new Date( _msKm ).getUTCSeconds()
                },
                'perMile' : {
                    'minutes' : new Date( _msMi ).getUTCMinutes(),
                    'seconds' : new Date( _msMi ).getUTCSeconds()
                }
            }

            // return {
            //     'perKm' : {
            //         'minutes' : String(new Date( _msKm ).getUTCMinutes()).padStart(2, '0'),
            //         'seconds' : String(new Date( _msKm ).getUTCSeconds()).padStart(2, '0')
            //     },
            //     'perMile' : {
            //         'minutes' : String(new Date( _msMi ).getUTCMinutes()).padStart(2, '0'),
            //         'seconds' : String(new Date( _msMi ).getUTCSeconds()).padStart(2, '0')
            //     }
            // }

        }());

        const speed = {
            'kmh' : (distance.km * 3600000) / duration.ms,
            'mih' : (distance.mi * 3600000) / duration.ms
        }

        const elevation = (function() {

            let eleForMinMax = [];
            // let richElevation = [];
            let gain = 0;
            let loss = 0;
            let startTime = new Date(trackpoints[0].time).getTime();
            // let dist = 0;

            for( let i = 0; i < trackpoints.length - 1; i++ ){
                let diff = trackpoints[i+1].elevation - trackpoints[i].elevation;
                let time = new Date( trackpoints[i+1].time ).getTime();
                let timeDiff = Math.abs( time - startTime );

                    // dist += pointsDistance(trackpoints[i], trackpoints[i+1]);

                if ( diff < 0 ) { loss += diff }
                if ( diff > 0 ) { gain += diff }

                eleForMinMax.push( trackpoints[i].elevation );
                // richElevation.push( {
                //     elevation: trackpoints[i].elevation,
                //     time: msToTime(timeDiff).ms,
                //     dist: dist }
                // );
            }

            return {
                // elevation: richElevation,
                max: Math.max.apply( null, eleForMinMax ),
                min: Math.min.apply( null, eleForMinMax ),
                loss: loss,
                gain: gain,
                // average : averageElevation(_trkpts)
            }

        }());

        return { duration, distance, pace, speed, elevation, timestamp, coords };
    }

    let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function(e) {

            callback( GPX(this.result) );
        }
}
