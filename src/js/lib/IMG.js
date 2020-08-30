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

    let name = file.name;
    let type = file.type;

    // let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function(e) {
    //
    //         let width = 1280;
    //         let height = 1280;
    //
    //         const img = new Image();
	// 		img.src = e.target.result;
	// 		img.onload = function() {
    //
    //             let _widthSrc = img.width;
    //             let _heightSrc = img.height;
    //             let _aspectRatioSrc = (_widthSrc / _heightSrc); // >1 landscape, <1 portrait, 1 square
    //
    //             let w = _widthSrc;
    //             let h = _heightSrc;
    //             let x = 0;
    //             let y = 0;
    //
    //             if ( _aspectRatioSrc > 1 ) {
    //                 w = _heightSrc;
    //                 h = _heightSrc;
    //                 x = Math.round((_widthSrc-_heightSrc)/2);
    //             } else if ( _aspectRatioSrc < 1 ) {
    //                 w = _widthSrc;
    //                 h = _widthSrc;
    //                 y = Math.round((_heightSrc-_widthSrc)/2);
    //             }
    //
    //             const el = document.createElement('canvas');
    //                   el.width = width;
    //                   el.height = height;
	// 			const ctx = el.getContext('2d');
	// 			      ctx.drawImage(img,
    //                       x, y, w, h,
    //                       0, 0, width, height
    //                   );
    //             let ctxData = ctx.getImageData(0, 0, width, height);
    //             callback(ctxData);
    //         }
    //     }


    let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {

            const img = new Image();
			img.src = e.target.result;
			img.onload = function() {

                let w = img.width;
                let h = img.height;

                const el = document.createElement('canvas');
                      el.width = w;
                      el.height = h;
				const ctx = el.getContext('2d');
				      ctx.drawImage(img, 0, 0, w, h);
                let ctxData = ctx.getImageData(0, 0, w, h);
                callback(ctxData);
            }
        }


}

export default createIMG;
