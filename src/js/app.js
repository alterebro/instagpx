
const Config = {
    width : 1280,
    height: 1280
}

const Data = {
    gpxLoaded : false,
    gpx : {},

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
            // instaGPX(this.gpx, this.image);
            instaGPX(false, false)
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
