<template>
    <div class="container" v-cloak>

        {{ message }} - {{ userDataLoaded }}

        <header role="banner">
            <h1><img src="./../img/instagpx.svg" alt="InstaGPX" /></h1>
            <h2>Create beautiful sharing pictures showing your activity stats from any GPX and image file</h2>
            <h3>Upload a .GPX and Image file and select the options you like more!</h3>
        </header>

        <section role="form">
            <div>
                <p>
                    <input type="file" accept=".gpx" @change="loadGPX" id="user-file-gpx" />
                    <label for="user-file-gpx">
                        <img src="./../img/icon-location.svg" alt=".GPX File" />
                        <span>Select your <strong>.GPX</strong> file</span>
                    </label>
                </p>
                <p v-if="gpxFile" class="file-ok">{{ gpxFile }}</p>
            </div>
            <div>
                <p>
                    <input type="file" accept="image/*" @change="loadIMG" id="user-file-image" />
                    <label for="user-file-image">
                        <img src="./../img/icon-photo.svg" alt="Image File" />
                        <span>Select your <strong>Image</strong> file</span>
                    </label>
                </p>
                <p v-if="imageFile" class="file-ok">{{ imageFile }}</p>
            </div>
        </section>


    </div>
</template>

<script>

function filename(file) {

    let _file = file.split( '\\' ).pop();
    let _num = 20;
    return (_file.length > _num)
        ? _file.slice(0, _num > 3 ? _num-3 : _num) + '...'
        : _file;
}

const Data = {
    message : 'hello world',

    gpxLoaded : false,
    gpxFile : null,
    gpx : {},

    imageLoaded : false,
    imageFile : null,
    image : {},
}

export default {
    name: "App",
    data() {
        return Data;
    },

    computed : {
        userDataLoaded : function() {
            return this.gpxLoaded && this.imageLoaded
        }
    },

    methods : {
        loadGPX : function(e) {

            if ( !e.target.files.length ) { return }
            this.gpxFile = filename(e.target.value);
            console.log(this.gpxFile);

            Data.gpxLoaded = true;
        },

        loadIMG : function(e) {

            if ( !e.target.files.length ) { return }
            this.imageFile = filename(e.target.value);
            console.log(this.imageFile);

            Data.imageLoaded = true;
        }
    }
};
</script>

<style scoped>
.container {
}
</style>
