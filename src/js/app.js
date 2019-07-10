
const Data = {
    gpx : {
        duration : { hours : 0, minutes : 0, seconds : 0, ms : 0 },
        distance : { km : 0, mi : 0 },
        pace : { perKm : { minutes : 0, seconds : 0 }, perMi : { minutes : 0, seconds : 0 }},
        speed : { kmh : 0, mih : 0 },
        elevation : { max : 0, min : 0, loss : 0, gain : 0 }
    },
    image : {}
}
const App = new Vue({

    el: '#app',
    data: Data,
    methods : {

        loadGPX : function(e) {
            if ( !e.target.files.length ) { return }
            readGPX(
                e.target.files[0],
                (gpxData) => { Data.gpx = gpxData }
            );
        },

        loadIMG : function(e) {
            if ( !e.target.files.length ) { return }
            createIMG(e.target.files[0])
        }

    },

    created : function() {}

})
