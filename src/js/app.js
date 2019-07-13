// fake gpx data
const _sampleGPXdata = {

    duration : {
        hours : 4,
        minutes :  22,
        seconds : 5,
        ms : 15725000
    },
    distance : {
        km : 61.840184779572205,
        mi : 38.425697456667564
    },
    pace: {
        perKm : {
            minutes : 4,
            seconds : 14
        },
        perMile : {
            minutes : 6,
            seconds : 49
        }
    },
    speed: {
        kmh : 14.157371396277261,
        mih : 8.796980021876198
    },
    elevation : {
        max : 510.7,
        min : 2.8,
        loss : -985.100000000051,
        gain : 984.4000000000439
    },
    timestamp : {
        start: 1561211353000,
        end: 1561227078000
    },
    coords : {
        start: {
            lat: 41.65770525261192,
            lon: -0.8835305651195751
        },
        end: {
            lat: 41.657082617633016,
            lon: -0.8838709687504532
        }
    }
}

// Dev :
var dev = function() {

    // Preload Font
    function preloadFont(font) {
        let _preloadFont = document.createElement('div');
            _preloadFont.setAttribute('style', 'font-family: '+font+'; visibility:hidden; height: 0; width: 0; overflow:hidden;');
            _preloadFont.innerHTML = '.';
        document.body.appendChild(_preloadFont);
    }
    preloadFont('Montserrat');

    // Fire sample image
    function bogusImage(callback) {
        const img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
            img.onload = function(e) {
                let _canvas = document.createElement('canvas');
                    _canvas.width = this.width;
                    _canvas.height = this.height;
                let _ctx = _canvas.getContext('2d');
                    _ctx.drawImage(img, 0, 0);
                let _ctxData = _ctx.getImageData(0, 0, this.width, this.height);
                    callback(_ctxData);
            }
    }

    // Fire sample gpx data
    window.onload = function() {

        bogusImage((imgData) => {
            Data.gpx = _sampleGPXdata;
            Data.image = imgData;
            instaGPX(_sampleGPXdata, imgData);
        });

    }
}



// ---------------------------------------------------------------
// ---------------------------------------------------------------

const Config = {
    width : 1280,
    height: 1280,
    timestampTemplates : [
        '{Do} {MMMM} {YYYY}',
        '{MMMM} {Do}, {YYYY}',
        '{DD} {MMMM} {YYYY}',
        '{MMMM} {DD}, {YYYY}',
        '{dddd}, {DD} {MMMM} {YYYY} · {h}:{mm}{a}',
        '{dddd}, {MMMM} {DD}, {YYYY} · {h}:{mm}{a}',
        '{dddd}, {DD}.{Mo}.{YYYY} @{H}:{mm}',
        '{DD} {MM} {YYYY} · {h}:{mm}{a}',
        '{DD}.{Mo}.{YYYY} · {H}:{mm}',
        '{Mo}.{DD}.{YYYY} · {H}:{mm}'
    ]
}

const Data = {
    gpxLoaded : false,
    gpx : {},

    imageLoaded : false,
    image : {},

    dateTemplates : Config.timestampTemplates,
    options : { // Image default options
        padding: 80,
        activity : 'ride', // ride || run
        units : 'metric', // metric || imperial
        show : 'speed', // elevation || speed
        wordSpacing : 10,
        title : '',
        timestampPattern : 3,
        promote : true
    }
}


const App = new Vue({

    el: '#app',
    data: Data,
    filters : {
        renderTimestamp : function(value, template) {
            let _timestamp = tinytime(template, { padMonth: true });
            return _timestamp.render( new Date(value) );
        }
    },
    watch : {
        userDataLoaded : function(current, prev) {
            instaGPX(this.gpx, this.image)
        },
        options : {
            handler : function(current, prev) {
                console.log(current, prev);
                this.regenerateImage();
            },
            deep : true
        }

    },
    computed : {
        userDataLoaded : function() {
            return this.gpxLoaded && this.imageLoaded
        }
    },
    methods : {

        postGPX : function() {

            let _latStart = this.gpx.coords.start.lat;
            let _lonStart = this.gpx.coords.start.lon;
            let _latEnd = this.gpx.coords.end.lat;
            let _lonEnd = this.gpx.coords.end.lon;
            this.options.title = (_latStart).toFixed(6) +', '+ (_lonStart).toFixed(6);
            reverseGeocoding(_latStart, _lonStart, (start) => {

                reverseGeocoding(_latEnd, _lonEnd, (end) => {

                    let _output = '';
                        _output = (start.name != end.name)
                            ? start.name + ' - ' + end.name
                            : start.displayName;

                    Data.options.title = _output;
                });
            });

            let _distance = this.gpx.distance.km;
            let _speed = this.gpx.speed.kmh;
            let _act = 'ride';
            if ( _distance <= 12 ) { if (_speed < 14 ) { _act = 'run' } }
            else if ( _distance > 12 && _distance <= 25 ) { if (_speed < 13 ) { _act = 'run' } }
            else if ( _distance > 25 && _distance <= 45 ) { if (_speed < 12 ) { _act = 'run' } }
            else { if (_speed < 8 ) { _act = 'run' } }

            this.options.activity = _act;
            this.options.show = (_act == 'run') ? 'speed' : 'elevation';
        },

        loadGPX : function(e) {
            if ( !e.target.files.length ) { return }
            readGPX(
                e.target.files[0],
                (gpxData) => {
                    Data.gpx = gpxData
                    Data.gpxLoaded = true;
                    this.postGPX();
                }
            );
        },

        loadIMG : function(e) {
            if ( !e.target.files.length ) { return }
            createIMG(
                e.target.files[0],
                (imgData) => {
                    Data.image = imgData;
                    Data.imageLoaded = true;
                }
            )
        },

        regenerateImage : function() {
            instaGPX(this.gpx, this.image)
        }
    },

    created : function() {
        dev();
    }
})
