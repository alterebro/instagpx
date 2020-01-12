const Config = {
    title : 'InstaGPX · Add GPX activity stats to your photos',
    description : 'Create beautiful sharing pictures adding activity stats from a GPX file to your photos with InstaGPX',
    url : 'https://instagpx.com',
    width : 1280,
    height: 1280,
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
        timestampPattern : 0,
        promote : true,
        graph : true // Elevation graph
    },

    modalVisible : false,
}

export { Config, Data };
