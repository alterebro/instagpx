function wrapText(context, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';

    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function instaGPX(gpxData, imgData) {

    // console.log(gpxData, imgData);
    // console.log(imgData.height, gpxData.timestamp);

    const config = {...Config, ...Data.options }

    let _duration = (gpxData.duration.hours > 0)
        ? [ {v: String(gpxData.duration.hours).padStart(2, '0'), u: 'h'}, {v: String(gpxData.duration.minutes).padStart(2, '0'), u: 'm'} ]
        : [ {v: String(gpxData.duration.minutes).padStart(2, '0'), u: 'm'}, {v: String(gpxData.duration.seconds).padStart(2, '0'), u: 's'} ];
    let _pace = gpxData.pace[(config.units == 'metric') ? 'perKm' : 'perMile'];

    let output = {
        distance : ((config.units == 'metric') ? gpxData.distance.km : gpxData.distance.mi).toFixed(2),
        distanceUnit : (config.units == 'metric') ? 'km' : 'mi',
        duration : _duration,
        elevation : Math.round(gpxData.elevation.gain),
        speed : (config.units == 'metric') ? (gpxData.speed.kmh).toFixed(1) : (gpxData.speed.mih).toFixed(1),
        pace : _pace.minutes +'\''+ String(_pace.seconds).padStart(2, '0'),
        optionLabel : ((config.show == 'elevation') ? 'elevation' : (config.activity == 'ride') ? 'speed' : 'pace')
    }

    let _canvas = document.createElement('canvas')
        _canvas.width = config.width;
        _canvas.height = config.height;

    let ctx = _canvas.getContext('2d');

        // Solid Background :
        let bgGrad = ctx.createLinearGradient(0, 0, config.width/2, config.width);
            bgGrad.addColorStop(0, '#797f9f');
            bgGrad.addColorStop(1, '#606990');

            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, config.width, config.height);

        // Attach Image
        if (imgData) { ctx.putImageData(imgData, 0, 0) }

        // Overlaying Shadow BG
        // ctx.globalCompositeOperation = 'overlay';
        ctx.globalCompositeOperation = 'multiply';
        let grdTopSize = config.height/4;
        let grdTop = ctx.createLinearGradient(0, 0, 0, grdTopSize);
            grdTop.addColorStop(0.0, "rgba(0, 0, 0, 0.50)");
            grdTop.addColorStop(1.0, "rgba(0, 0, 0, 0.00)");

            ctx.fillStyle = grdTop;
            ctx.fillRect(0, 0, config.width, grdTopSize);

        let grdBottomSize = config.height/4;
        let grdBottom = ctx.createLinearGradient(0, config.height - grdBottomSize, 0, config.height);
            grdBottom.addColorStop(0.0, "rgba(0, 0, 0, 0.00)");
            grdBottom.addColorStop(1.0, "rgba(0, 0, 0, 0.50)");

            ctx.fillStyle = grdBottom;
            ctx.fillRect(0, config.height - grdBottomSize, config.width, grdBottomSize);

        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 4;

        let _third = Math.round((config.width - (config.padding*4))/3)
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.textBaseline = 'alphabetic';

        const txtSize = {}

        // ----------------
        // Values output
        ctx.font = '800 72px Montserrat';
        ctx.fillText(output.distance, config.padding, config.height - config.padding);
        txtSize.distance = ctx.measureText(output.distance).width;
        txtSize.duration = [];
        output.duration.forEach((el, i) => {
            ctx.fillText(el.v, config.padding*2 + _third + (i*155), config.height - config.padding);
            txtSize.duration.push(ctx.measureText(el.v).width);
        })

        ctx.fillText(output[output.optionLabel], (config.padding*3) + (_third*2), config.height - config.padding);
        txtSize.option = ctx.measureText(output[output.optionLabel]).width;

        // ----------------
        // Def
        ctx.fillStyle = "rgba(255, 255, 255, .5)";
        ctx.font = '800 36px Montserrat';
        ctx.fillText(output.distanceUnit, config.padding + txtSize.distance + config.wordSpacing, config.height - config.padding);
        output.duration.forEach((el, i) => {
            ctx.fillText(el.u, config.padding*2 + _third + (i*155) + txtSize.duration[i] + config.wordSpacing, config.height - config.padding);
        })

        let _optionUnits = (output.optionLabel == 'elevation') ? 'm' : (output.optionLabel == 'speed')
            ? (config.units == 'metric') ? 'km/h' : 'mi/h'
            : (config.units == 'metric') ? '/km' : '/mile';
        ctx.fillText(_optionUnits, (config.padding*3) + (_third*2) + txtSize.option + config.wordSpacing, config.height - config.padding);

        // ----------------
        // Labels
        // ctx.globalCompositeOperation = 'overlay';

        ctx.font = '24px Montserrat';
        let _labelOffsetY = 80;
        ctx.fillText('DISTANCE', config.padding, config.height - config.padding - _labelOffsetY);
        ctx.fillText('ACTIVITY TIME', config.padding*2 + _third, config.height - config.padding - _labelOffsetY);
        ctx.fillText(output.optionLabel.toUpperCase(), (config.padding*3) + (_third*2), config.height - config.padding - _labelOffsetY);

        ctx.textBaseline = 'hanging';

        let _tpl = Config.timestampTemplates[config.timestampPattern];
        let _datetime = null;
        if (!!_tpl) {
            let _timestamp = tinytime(_tpl, { padMonth : true });
                _datetime = _timestamp.render(new Date(gpxData.timestamp.start));
                _datetime = _datetime.toUpperCase()
        }
        let _top = [];
        // ¯\_(ツ)_/¯
        if (config.promote) {
            _top.push(atob("t92YugHcnFGdz5Wa".split('').reverse().join('')).trim().toUpperCase());
        }
        if (!!_datetime) {
            _top.push(config.activity.toUpperCase());
            _top.push(_datetime)
        }
        ctx.fillText(_top.join(' / '), config.padding, config.padding);

        // ----------------
        // Title
        ctx.fillStyle = "#fff";
        ctx.font = '64px Montserrat';
        let _titleOffset = (_top.length) ? 42 : 0;
        wrapText(ctx, (config.title).toUpperCase().trim().replace(/\s\s+/g, ' '), config.padding, config.padding + _titleOffset, config.width - (config.padding*2), 72);

        // ----------------
        // Render
        document.querySelector('#output').innerHTML = '';
        // document.querySelector('#output').appendChild(_canvas);


        _canvas.toBlob(function(blob) {


            let _output = new File([blob], 'instagpx.com.jpg', { type : 'image/jpeg', lastModified: Date.now() });
            let objectURL = URL.createObjectURL(_output);

            let _img = document.createElement('img');
                _img.src = objectURL;
                _img.onload = function() {}
                _img.addEventListener('contextmenu', (e) => { e.preventDefault() }, true);

            document.querySelector('#output').appendChild(_img);
            document.querySelector('#download-img').href = objectURL;
            // window.URL.revokeObjectURL(objectURL);

        }, 'image/jpeg', .65);



        /*
        // Render on an Image tag
        let _dataURL = _canvas.toDataURL('image/jpeg', .5);
        let _img = document.createElement('img');
            _img.src = _dataURL;
            _img.addEventListener('contextmenu', (e) => { e.preventDefault() }, true);

            document.querySelector('#output').appendChild(_img);

        let _lnk = document.querySelector('#download-img');
            _lnk.href = _dataURL;
        */

}
