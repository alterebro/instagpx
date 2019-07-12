const Config = {
    width : 1280,
    height: 1280
}

const Data = {
    gpxLoaded : false,
    gpx : {},

    imageLoaded : false,
    image : {},

    options : {
        padding: 80,
        activity : 'ride', // ride || run
        units : 'metric', // metric || imperial
        show : 'speed', // elevation || speed
        wordSpacing : 10,
        title : ''
    }
}

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
        start : new Date(),
        end : new Date()
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


const App = new Vue({

    el: '#app',
    data: Data,
    watch : {
        userDataLoaded : function(current, prev) {
            console.log( 'new : ' +  current, 'prev : ' + prev );
            console.log( this.image );
            console.log( this.gpx );

            // Create the image!
            // instaGPX(this.gpx, this.image);
            instaGPX(this.gpx, this.image)
        }
    },
    computed : {
        userDataLoaded : function() {
            return this.gpxLoaded && this.imageLoaded
        }
    },
    methods : {

        loadGPX : function(e) {
            if ( !e.target.files.length ) { return }
            readGPX(
                e.target.files[0],
                (gpxData) => {
                    Data.gpx = gpxData
                    Data.gpxLoaded = true;
                    console.log( this.gpx.elevation );
                }
            );

            // TODO : Process gpx file and modify options depending on data
            // TODO : Geolocate coords and make title
        },

        loadIMG : function(e) {
            if ( !e.target.files.length ) { return }
            createIMG(
                e.target.files[0],
                (imgData) => {
                    Data.image = imgData;
                    Data.imageLoaded = true;
                    console.log( imgData );
                }
            )
        },

        regenerateImage : function() {
            instaGPX(this.gpx, this.image)
        }
    },

    created : function() {}
})
