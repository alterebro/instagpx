function createIMG(file, callback) {

    // TODO : take off filters to different file
    function contrastImage(imgData, contrast){  //input range [-100..100]
        let d = imgData.data;
        contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
        let intercept = 128 * (1 - contrast);
        for(let i=0; i<d.length; i+=4) {
            d[i] = d[i]*contrast + intercept;
            d[i+1] = d[i+1]*contrast + intercept;
            d[i+2] = d[i+2]*contrast + intercept;
        }
        return imgData;
    }

    let width = 1280;
    let height = 1280;

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

                // let ctxData = ctx.getImageData(0, 0, width, height);
                // callback(ctxData);

                el.toBlob(function(blob) {
                    let _output = new File([blob], name, { type, lastModified: Date.now() });
                    callback(_output);
                });



                  // document.getElementById('output').innerHTML = '';
                  // document.getElementById('output').appendChild(el);

                  // window.setTimeout(
                  //     function() {
                  //         let ctxData = ctx.getImageData(0, 0, width, height);
                  //         console.log(ctxData);
                  //         console.log(ctx.toDataUrl)
                  //         // let _output = contrastImage(ctxData, 30);
                  //         //
                  //         // ctx.putImageData(_output,0,0);
                  //
                  //     }, 2000
                  // );

                    // el.toBlob(function(blob) {
                    //     return new File([blob], name, { type, lastModified: Date.now() });
                    // });


                }
        }
}
