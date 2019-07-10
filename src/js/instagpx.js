function instaGPX(gpxData, imgData) {

    // console.log(gpxData, imgData);
    // console.log(imgData.height)

    let config = {
        width: 1280,
        height: 1280,
        padding: 80
    }

    let _canvas = document.createElement('canvas')
        _canvas.width = 1280;
        _canvas.height = 1280;
        _canvas.id = 'instaGPX';

    let ctx = _canvas.getContext('2d');
        // _ctx.putImageData(imgData, 0, 0);

        ctx.fillStyle = '#fafbfc';
        ctx.fillRect(10, 10, config.width - 20, config.height - 20);

        ctx.fillStyle = 'black';
        ctx.textBaseline = 'alphabetic';

        let _third = Math.round((config.width - (config.padding*4))/3)
        ctx.font = '300 64px sans-serif';
        ctx.fillText('01h23m34s', config.padding, config.height - config.padding);
        ctx.fillText('16.78km/h', config.padding*2 + _third, config.height - config.padding);
        ctx.fillText('12.34km', (config.padding*3) + (_third*2), config.height - config.padding);

        ctx.font = '400 22px sans-serif';
        ctx.fillText('ACTIVITY TIME', config.padding, config.height - config.padding - 80);
        ctx.fillText('SPEED', config.padding*2 + _third, config.height - config.padding - 80);
        ctx.fillText('DISTANCE', (config.padding*3) + (_third*2), config.height - config.padding - 80);

        // console.log(ctx);

        document.querySelector('#output').innerHTML = '';
        document.querySelector('#output').appendChild(_canvas);

}

window.onload = function() {

    instaGPX(false, false)

}
