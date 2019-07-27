const ext = ['js', 'css'];
const yourAssetProcess = async ({ name, bundler }) => {
  if ( ext.indexOf(name.split('.').pop()) > -1 ) {
    return {
      header: "/*! (c) 2019 Jorge Moreno, moro.es (@alterebro) */",
      footer: ''
    }
  }
};

module.exports = yourAssetProcess;
