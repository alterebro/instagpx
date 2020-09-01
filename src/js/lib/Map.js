import polyline from '@mapbox/polyline';
import urlencode from 'urlencode';

function createMap(points, size, provider, callback) {

    // console.log(size);

    let _output = '';
    switch (provider) {

        /*
        case 'mapquest' : // https://developer.mapquest.com/documentation/static-map-api/v4/
            _output = false; break;
        case 'mapquest-open' : // https://developer.mapquest.com/documentation/open/static-map-api/v4/
            _output = false; break;
        case 'here' : // https://developer.here.com/documentation/map-image/dev_guide/topics/examples.html
            _output = false; break;
        */

        case 'mapbox' :

            // https://docs.mapbox.com/api/maps/#static-images
            // https://blog.mapbox.com/generate-gradient-lines-with-the-static-image-api-368eb28068a3
            // https://blog.mapbox.com/static-api-with-overlays-932ffc5fcf3d
            // https://github.com/pirxpilot/google-polyline

            const mapbox = {

                interval : 0,
                points : [],
                center : [0, 0],
                bounds : [0, 0, 0, 0], // maxlat, maxlng, minlat, minlng
                size : [0, 0], // width (lng), height (lat)
                start : null,
                finish : null,

                options : {
                    steps : 100, // ~ 100
                    endpoint : 'https://api.mapbox.com/styles/v1/',
                    username : 'mapbox',
                    style_id : 'dark-v10',
                    width : (size.width / 2),
                    height : (size.height / 2),
                    overlay : '',
                    location : 'auto',
                    token : 'pk.eyJ1IjoiYWx0ZXJlYnJvIiwiYSI6ImNrZWhrMTR0aTFuZmUyeWx0c2dkemFlencifQ._7m9LHScKO_nv4HCXtsgaQ'
                }
            };

            mapbox.bounds = [ points[0][1], points[0][0], points[0][1], points[0][0] ];
            mapbox.interval = (points.length <= mapbox.options.steps) ? points.length : Math.ceil(points.length / mapbox.options.steps);

            for ( let i = 0; i < points.length; i += mapbox.interval ) {

                mapbox.points.push([points[i][1], points[i][0]]);

                mapbox.center[0] += points[i][1]; // latitude
                mapbox.center[1] += points[i][0]; // longitude

                mapbox.bounds[0] = Math.max(mapbox.bounds[0], points[i][1]);
                mapbox.bounds[1] = Math.max(mapbox.bounds[1], points[i][0]);
                mapbox.bounds[2] = Math.min(mapbox.bounds[2], points[i][1]);
                mapbox.bounds[3] = Math.min(mapbox.bounds[3], points[i][0]);
            }

            mapbox.center[0] = parseFloat((mapbox.center[0] / mapbox.points.length).toFixed(4));
            mapbox.center[1] = parseFloat((mapbox.center[1] / mapbox.points.length).toFixed(4));

            mapbox.size = [
                Math.abs(mapbox.bounds[1] - mapbox.bounds[3]), // width (lng)
                Math.abs(mapbox.bounds[0] - mapbox.bounds[2])  // height (lat)
            ];
            mapbox.start = mapbox.points[0];
            mapbox.finish = mapbox.points[(mapbox.points.length - 1)];

            let _offsetH = Math.max(mapbox.size[0], mapbox.size[1]) / 10;
            let _offsetV = Math.max(mapbox.size[0], mapbox.size[1]) / 3;
            let _bounds = [
                [mapbox.bounds[0] + _offsetV, mapbox.bounds[1] + _offsetH],
                [mapbox.bounds[0], mapbox.bounds[1]],
                [mapbox.bounds[2], mapbox.bounds[3]],
                [mapbox.bounds[2] - _offsetV, mapbox.bounds[3] - _offsetH],
            ];

            mapbox.options.overlay += `path-1+343432-0(${urlencode(polyline.encode(_bounds))})`;
            mapbox.options.overlay += `,path-5+286ecf-1(${urlencode(polyline.encode(mapbox.points))})`;
            mapbox.options.overlay += `,pin-l-marker+387edf(${mapbox.start[1]},${mapbox.start[0]})`;
            mapbox.options.overlay += `,pin-l-marker+387edf(${mapbox.finish[1]},${mapbox.finish[0]})`;

            let _urlMapbox = `${mapbox.options.endpoint}${mapbox.options.username}/${mapbox.options.style_id}/static/${mapbox.options.overlay}/${mapbox.options.location}/${mapbox.options.width}x${mapbox.options.height}@2x`;
                _urlMapbox += `?logo=false&attribution=false&access_token=${mapbox.options.token}`;

            _output = _urlMapbox;
            break;


        case 'yandex': // Yandex Static Maps API : https://tech.yandex.com/maps/staticapi/

            let _intervalYandex = Math.ceil(points.length / 96);
            let _pointsYandex = [points[0]];
            for (let i = 1; i < points.length; i += _intervalYandex) {
                _pointsYandex.push(points[i]);
            }
            _pointsYandex.push(points[points.length-1]);

            let _urlYandex = `https://static-maps.yandex.ru/1.x/?lang=en_US&l=map`;
                _urlYandex += `&size=450,450&scale=1`;
                _urlYandex += `&pt=` + _pointsYandex[0] + ',vkgrm'
                _urlYandex += `~` + _pointsYandex[_pointsYandex.length-1] + ',vkgrm'
                _urlYandex += `&pl=c:286ecfff,w:5,` + _pointsYandex.join(',');

            _output = _urlYandex;
            break;

        default:
            _output = false;
            break;
    }

    _output = _output || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    let _imageMap = new Image();
        _imageMap.src = _output;
        _imageMap.crossOrigin = "Anonymous";
        _imageMap.onload = function() {

            let _w = _imageMap.width;
            let _h = _imageMap.height;

            let _el = document.createElement('canvas');
                _el.width = _w;
                _el.height = _h;
            let _ctx = _el.getContext('2d');
                _ctx.drawImage(_imageMap, 0, 0, _w, _h);

            let _ctxData = _ctx.getImageData(0, 0, _w, _h);
            callback(_ctxData);
        }

    // return _output;
    // return _output || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

}

export default createMap;
