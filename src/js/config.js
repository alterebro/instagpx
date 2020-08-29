const Config = {
    title : 'InstaGPX · Add GPX activity stats to your photos',
    description : 'Create beautiful sharing pictures adding activity stats from a GPX file to your photos with InstaGPX',
    url : 'https://instagpx.com',
    width : 1280, // TODO : Deprecate in favour of Data.outputWidth
    height: 1280, // TODO : Deprecate in favour of Data.outputHeight
    timestampTemplates : [
        '{dddd}, {DD}.{Mo}.{YYYY} @{H}:{mm}',
        '{dddd}, {DD} {MMMM} {YYYY} · {h}:{mm}{a}',
        '{dddd}, {MMMM} {DD}, {YYYY} · {h}:{mm}{a}',
        '{DD}.{Mo}.{YYYY} · {H}:{mm}',
        '{Mo}.{DD}.{YYYY} · {H}:{mm}',
        '{Do} {MMMM} {YYYY}',
        '{DD} {MMMM} {YYYY}',
        '{DD} {MM} {YYYY} · {h}:{mm}{a}',
        '{MMMM} {Do}, {YYYY}',
        '{MMMM} {DD}, {YYYY}'
    ],
    imageModes : {
        '1:1' : { width : 1280, height : 1280, name : 'Square 1:1' },
        '2:3' : { width : 1280, height : 1920, name : 'Portrait (2:3)' },
        '3:4' : { width : 1080, height : 1440, name : 'Portrait (3:4)' },
        '4:5' : { width : 1280, height : 1600, name : 'Portrait (4:5)' },
        '5:7' : { width : 1080, height : 1512, name : 'Portrait (5:7)' },
        '9:16' : { width : 1080, height : 1920, name : 'Portrait Very Narrow 9:16' }
    }
}

const Data = {
    gpxLoaded : false,
    gpxFile : null,
    gpx : {},

    imageLoaded : false,
    imageFile : null,
    image : {},

    outputRatioModes : Config.imageModes,
    dateTemplates : Config.timestampTemplates,
    options : { // Image default options
        mode : '1:1',
        padding: 80,
        activity : 'ride', // ride || run
        units : 'metric', // metric || imperial
        show : 'speed', // elevation || speed
        wordSpacing : 10,
        title : '',
        timestampPattern : 0,
        promote : true,
        graph : true // Elevation graph
    },

    modalVisible : false,

    // Computed :
    // - userDataLoaded
    // - outputWidth
    // - outputHeight
}

export { Config, Data };
