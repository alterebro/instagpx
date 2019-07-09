function createIMG(file) {

    let width = 480;
    let height = 480;
    let scale = false

    let name = file.name;
    let type = file.type;

    let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {

            const img = new Image();
    			img.src = e.target.result;
    			img.onload = function() {

                    let _widthSrc = img.width;
                    let _heightSrc = img.height;
                    let _aspectRatioSrc = (_widthSrc / _heightSrc); // >1 landscape, <1 portrait, 1 square

                    let w = _widthSrc;
                    let h = _heightSrc;
                    let x = 0;
                    let y = 0;

                    if ( _aspectRatioSrc > 1 ) {
                        w = _heightSrc;
                        h = _heightSrc;
                        x = Math.round((_widthSrc-_heightSrc)/2);
                    } else if ( _aspectRatioSrc < 1 ) {
                        w = _widthSrc;
                        h = _widthSrc;
                        y = Math.round((_heightSrc-_widthSrc)/2);
                    }

                    console.log(
                        'source: ', _widthSrc, _heightSrc,
                        'target: ', w, h,
                        'aspectratio source: ', _aspectRatioSrc
                    );

                    const el = document.createElement('canvas');
                        el.width = width;
                        el.height = height;
    				const ctx = el.getContext('2d');
    				      ctx.drawImage(img,
                              x, y, w, h,
                              0, 0, width, height
                          );

                    console.log(el);
                    document.getElementById('output').innerHTML = '';
                    document.getElementById('output').appendChild(el);

                }
        }
}


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
            // TODO : Validate file input
            readGPX(
                e.target.files[0],
                (gpxData) => { Data.gpx = gpxData }
            );
        },

        loadIMG : function(e) {
            createIMG(e.target.files[0])
        }


    },

    created : function() {}

})
