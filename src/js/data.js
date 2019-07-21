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
}

export { Config, Data };
