const ext = ['js', 'css'];
const globalElectronImportAssetProcess = async ({ name, bundler }) => {
  if ( ext.indexOf(name.split('.').pop()) > -1 ) {
    return {
      header: "/*! (c) 2019 Jorge Moreno, moro.es (@alterebro) - GNU GPLv3.0 */"
    }
  }
};

module.exports = globalElectronImportAssetProcess;
