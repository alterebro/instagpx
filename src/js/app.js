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
        gain : 984.4000000000439,
        dataPoints : [
            {"elevation":"241.0","dist":0},
            {"elevation":"285.0","dist":0.010955941569095809},
            {"elevation":"269.0","dist":0.023606010228153562},
            {"elevation":"242.0","dist":0.04139806192345197},
            {"elevation":"237.0","dist":0.0796382352521186},
            {"elevation":"252.0","dist":0.16147851282891218},
            {"elevation":"248.0","dist":0.18550611504106768},
            {"elevation":"252.0","dist":0.18773190339056972},
            {"elevation":"254.0","dist":0.18895694982419362},
            {"elevation":"251.0","dist":0.21077553071099697},
            {"elevation":"248.0","dist":0.21207581699178862},
            {"elevation":"257.0","dist":0.2121373062496017},
            {"elevation":"257.0","dist":0.212137306249676},
            {"elevation":"246.0","dist":0.212137306249676},
            {"elevation":"249.0","dist":0.212137306249676},
            {"elevation":"251.0","dist":0.21694340798427178},
            {"elevation":"251.0","dist":0.27830696572957175},
            {"elevation":"240.0","dist":0.3440029537795476},
            {"elevation":"234.0","dist":0.40477369650438505},
            {"elevation":"252.0","dist":0.4632201862585745},
            {"elevation":"237.0","dist":0.5308007845427651},
            {"elevation":"232.0","dist":0.5897705658773351},
            {"elevation":"216.0","dist":0.6615445932045214},
            {"elevation":"250.0","dist":0.7258848566993077},
            {"elevation":"251.0","dist":0.7882906708477823},
            {"elevation":"261.0","dist":0.8475780677409286},
            {"elevation":"260.0","dist":0.9105463564240412},
            {"elevation":"250.0","dist":0.9566538010284982},
            {"elevation":"240.0","dist":1.035330738504781},
            {"elevation":"246.0","dist":1.0984068304975485},
            {"elevation":"234.0","dist":1.1555970863812264},
            {"elevation":"241.0","dist":1.215348128267394},
            {"elevation":"244.0","dist":1.2744612963567585},
            {"elevation":"243.0","dist":1.337456655880232},
            {"elevation":"246.0","dist":1.3991536534130722},
            {"elevation":"243.0","dist":1.4620798241235073},
            {"elevation":"238.0","dist":1.5237186551639041},
            {"elevation":"244.0","dist":1.5890842867344632},
            {"elevation":"239.0","dist":1.6451410068029793},
            {"elevation":"245.0","dist":1.6986075231489826},
            {"elevation":"249.0","dist":1.7542569751377508},
            {"elevation":"251.0","dist":1.817904144631321},
            {"elevation":"252.0","dist":1.881763070488581},
            {"elevation":"246.0","dist":1.9454913761904857},
            {"elevation":"250.0","dist":2.0164616961607247},
            {"elevation":"249.0","dist":2.0845969674778755},
            {"elevation":"252.0","dist":2.1488203841349236},
            {"elevation":"253.0","dist":2.2058325649587527},
            {"elevation":"256.0","dist":2.238611983813703},
            {"elevation":"270.0","dist":2.2694655375504555},
            {"elevation":"276.0","dist":2.2882659467758857},
            {"elevation":"271.0","dist":2.3224135912678663},
            {"elevation":"291.0","dist":2.3332908909295216},
            {"elevation":"280.0","dist":2.3577793898059434}
        ]
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


function filename(file) {

    let _file = file.split( '\\' ).pop();
    let _num = 20;
    return (_file.length > _num)
        ? _file.slice(0, _num > 3 ? _num-3 : _num) + '...'
        : _file;
}


// ---------------------------------------------------------------
// ---------------------------------------------------------------

const Config = {
    title : 'InstaGPX',
    description : 'Create beautiful sharing pictures showing your activity stats from any GPX and image file',
    url : 'http://localhost/www/github/instagpx/src/',
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

const Share = [
    { network : "Twitter", url : "https://twitter.com/intent/tweet?text={TEXT}&url={URL}" },
    { network : "FaceBook", url : "https://www.facebook.com/sharer.php?u={URL}" },
    { network : "LinkedIn", url : "https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}&summary={TEXT}&source=moro.es" },
    { network : "E-Mail", url : "mailto:?subject={TITLE}&body={TEXT}:%0A{URL}" },
    { network : "Telegram", url : "https://telegram.me/share/url?url={URL}&amp;text={TEXT} "}
];

const Data = {
    gpxLoaded : false,
    gpxFile : null,
    gpx : {},

    imageLoaded : false,
    imageFile : null,
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
        promote : true,
        graph : true // Elevation graph
    },

    modalVisible : false,
    networks : Share
}


const App = new Vue({

    el: '#app',
    data: Data,
    filters : {
        renderTimestamp : function(value, template) {
            let _timestamp = tinytime(template, { padMonth: true });
            return _timestamp.render( new Date(value) );
        },
        networkClass : function(str) {
            return str.toLowerCase().replace('-', '');
        },
        networkURL : function(url) {
            let _title = encodeURIComponent(Config.title);
            let _desc = encodeURIComponent(Config.description);
            let _url = encodeURIComponent(Config.url);
            return url.replace('{TITLE}', _title).replace('{TEXT}', _desc).replace('{URL}', _url);
        },
        networkTitle : function(str) {
            return `Share it via ${str}!`;
        }
    },
    watch : {
        userDataLoaded : function(current, prev) {
            console.log(current, prev);
            if (current == true) {
                // instaGPX(this.gpx, this.image)
            }
        }
        // ,options : {
        //     handler : function(current, prev) {
        //         console.log(current, prev);
        //         this.regenerateImage();
        //     },
        //     deep : true
        // }

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
            this.gpxFile = filename(e.target.value)

            readGPX(
                e.target.files[0],
                (gpxData) => {
                    Data.gpx = gpxData
                    Data.gpxLoaded = true;
                    this.postGPX();
                    if (this.userDataLoaded) { this.regenerateImage(); }
                }
            );
        },

        loadIMG : function(e) {
            if ( !e.target.files.length ) { return }
            this.imageFile = filename(e.target.value)

            createIMG(
                e.target.files[0],
                (imgData) => {
                    Data.image = imgData;
                    Data.imageLoaded = true;
                    if (this.userDataLoaded) { this.regenerateImage(); }
                }
            )
        },

        showModal : function() {
            console.log('show!')
            this.modalVisible = true;
        },
        hideModal : function() {
            console.log('hide!')
            this.modalVisible = false;
        },

        regenerateImage : function() {
            console.log('regenerating?');
            instaGPX(this.gpx, this.image)
        }
    },

    created : function() {
        dev();
    }
})

Vue.component('intro-slide', {
    data : function() {
        return {
            current: 0,
            images : [
                { url : './img/intro-instagpx-r01.jpg' },
                { url : './img/intro-instagpx-r02.jpg' },
                { url : './img/intro-instagpx-r03.jpg' }
            ]
        }
    },
    methods : {
        introSlideNext : function() {
            let _next = ( this.current + 1 >= this.images.length )
                ? 0 : this.current + 1;
            this.current = _next;
        },
        introSlidePrev : function() {
            let _prev = ( this.current - 1 < 0 )
                ? this.images.length - 1 : this.current - 1
            this.current = _prev;
        }
    },
    props: ['hidden'],
    template: `
        <section role="presentation" :class="{ hidden : hidden }">
            <figure>
                <img v-for="(img, i) in images" :src="img.url" :alt="InstaGPX" :class="{ active : (i == current) }" />
            </figure>
            <footer>
                <nav>
                    <a href="#" class="prev" @click.prevent="introSlidePrev" title="Next Image">&#8592; Prev</a>
                    <a href="#" class="next" @click.prevent="introSlideNext" title="Previous Image">Next &#8594;</a>
                </nav>
            </footer>
        </section>
    `
});
