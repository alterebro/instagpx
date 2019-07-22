export function filename(file) {

    let _file = file.split( '\\' ).pop();
    let _num = 20;
    return (_file.length > _num)
        ? _file.slice(0, _num > 3 ? _num-3 : _num) + '...'
        : _file;
}

export function preloadFont(font) {
    let _preloadFont = document.createElement('div');
        _preloadFont.setAttribute('style', 'font-family: '+font+'; visibility:hidden; height: 0; width: 0; overflow:hidden;');
        _preloadFont.innerHTML = '.';
    document.body.appendChild(_preloadFont);

    // TODO : Destroy once is loaded
}
