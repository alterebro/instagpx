
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
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

/*

Font :
Oswald
Roboto
Roboto Condensed

*/

// from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
// https://codepen.io/nishiohirokazu/pen/jjNyye
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');
// var maxWidth = 400;
// var lineHeight = 24;
// var x = (canvas.width - maxWidth) / 2;
// var y = 60;
// var text = 'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.';
//
// context.font = '15pt Calibri';
// context.fillStyle = '#333';
// wrapText(context, text, x, y, maxWidth, lineHeight);


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
        if (imgData) {
            ctx.putImageData(imgData, 0, 0);
        }

        ctx.globalCompositeOperation = 'overlay';

        var grdTop = ctx.createLinearGradient(0, 0, 0, 300);
            grdTop.addColorStop(0.0, "rgba(0, 0, 0, .5)");
            grdTop.addColorStop(0.5, "rgba(0, 0, 0, .5)");
            grdTop.addColorStop(1.0, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grdTop;
        ctx.fillRect(0, 0, config.width, 300);


        var grdBottom = ctx.createLinearGradient(0, config.height - 300, 0, config.height);
            grdBottom.addColorStop(0.0, "rgba(0, 0, 0, 0)");
            grdBottom.addColorStop(0.5, "rgba(0, 0, 0, .5)");
            grdBottom.addColorStop(1.0, "rgba(0, 0, 0, .5)");

        ctx.fillStyle = grdBottom;
        ctx.fillRect(0, config.height - 300, config.width, 300);


        ctx.globalCompositeOperation = 'source-over';


        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 4;

        // ctx.fillStyle = '#fafbfc';
        // ctx.fillRect(10, 10, config.width - 20, config.height - 20);

        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.textBaseline = 'alphabetic';

        let _third = Math.round((config.width - (config.padding*4))/3)
        ctx.font = '500 64px Roboto Condensed';
        ctx.fillText('01h23m34s', config.padding, config.height - config.padding);
        ctx.fillText('16.78km/h', config.padding*2 + _third, config.height - config.padding);
        ctx.fillText('12.34km', (config.padding*3) + (_third*2), config.height - config.padding);

        ctx.font = '400 22px Montserrat';
        ctx.fillText('ACTIVITY TIME', config.padding, config.height - config.padding - 80);
        ctx.fillText('SPEED', config.padding*2 + _third, config.height - config.padding - 80);
        ctx.fillText('DISTANCE', (config.padding*3) + (_third*2), config.height - config.padding - 80);

        // ctx.font="italic small-caps bold 12px arial";
        ctx.font = '300 24px Montserrat';
        ctx.textBaseline = 'hanging';
        ctx.fillText('21/03/2019 @ 13:34', config.padding, config.padding);

        ctx.font = '400 64px Roboto Condensed';
        // wrapText(ctx, 'Lorem ipsum dolor sit amet. Zaragoza, Delicias - Barcelona, Sants', config.padding - 5, config.padding + 50, config.width - (config.padding*2), 76);
        wrapText(ctx, 'LOREM IPSUM DOLOR SIT AMET. ZARAGOZA, DELICIAS - BARCELONA, SANTS', config.padding - 5, config.padding + 50, config.width - (config.padding*2), 72);


        document.querySelector('#output').innerHTML = '';
        document.querySelector('#output').appendChild(_canvas);

}

window.onload = function() {

    // instaGPX(false, false)

}
