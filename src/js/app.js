
const Data = {
    gpxLoaded : false,
    gpx : {
        duration : { hours : 0, minutes : 0, seconds : 0, ms : 0 },
        distance : { km : 0, mi : 0 },
        pace : { perKm : { minutes : 0, seconds : 0 }, perMi : { minutes : 0, seconds : 0 }},
        speed : { kmh : 0, mih : 0 },
        elevation : { max : 0, min : 0, loss : 0, gain : 0 }
    },

    imageLoaded : false,
    image : {},
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
            // ...
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
        }
    },

    created : function() {}
})
