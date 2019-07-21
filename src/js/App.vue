<template>
    <div class="container">

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

        <IntroSlide :hidden="userDataLoaded"></IntroSlide>

        <main role="main" :class="{ visible : userDataLoaded }">
            <figure role="figure">
                <div id="output"></div>
            </figure>

            <aside role="complementary">
                <p>
                    <a href="#" download="instagpx.com.jpg" id="download-img" class="button" v-on:click="showModal">
                        <img src="./../img/icon-download.svg" alt="Download Image" />
                        <span>Download Image</span>
                    </a>
                </p>

                <form role="form" v-on:submit.prevent>

                    <h3>Options</h3>

                    <p class="form-input-container">
                        <label for="activity-title">Title</label>
                        <input type="text" placeholder="Write your activity title here" name="activity-title" id="activity-title" maxlength="140" v-model="options.title" />
                    </p>
                    <p class="form-input-container" v-if="gpx.timestamp">
                        <label for="activity-date">Date Format</label>
                        <select v-model="options.timestampPattern" name="activity-date" id="activity-date">
                            <option v-for="(pattern, index) in dateTemplates" v-bind:value="index">
                                {{ gpx.timestamp.start | renderTimestamp(pattern) }}
                            </option>
                            <option value="false">No Date!</option>
                        </select>
                    </p>

                    <h4>Activity Type</h4>
                    <p class="form-radio-container">
                        <span class="form-selector form-radio">
                            <input type="radio" name="activity-type" id="activity-type-run" v-model="options.activity" value="run" />
                            <label for="activity-type-run">Run</label>
                        </span>

                        <span class="form-selector form-radio">
                            <input type="radio" name="activity-type" id="activity-type-ride" v-model="options.activity" value="ride" />
                            <label for="activity-type-ride">Ride</label>
                        </span>
                    </p>

                    <h4>Units System</h4>
                    <p class="form-radio-container">
                        <span class="form-selector form-radio">
                            <input type="radio" name="activity-unit" id="activity-unit-metric" v-model="options.units" value="metric" />
                            <label for="activity-unit-metric">Kilometers</label>
                        </span>

                        <span class="form-selector form-radio">
                            <input type="radio" name="activity-unit" id="activity-unit-imperial" v-model="options.units" value="imperial" />
                            <label for="activity-unit-imperial">Miles</label>
                        </span>
                    </p>

                    <h4>View Options</h4>
                    <p class="form-radio-container">
                        <span class="form-selector form-radio">
                            <input type="radio" name="activity-show" id="activity-show-elevation" v-model="options.show" value="elevation" />
                            <label for="activity-show-elevation">Elevation</label>
                        </span>

                        <span class="form-selector form-radio">
                            <input type="radio" name="activity-show" id="activity-show-speed" v-model="options.show" value="speed" />
                            <label for="activity-show-speed">
                                <span v-if="options.activity == 'ride'">Speed</span>
                                <span v-else>Pace</span>
                            </label>
                        </span>
                    </p>

                    <p class="form-selector form-checkbox">
                        <input type="checkbox" name="activity-graph" id="activity-graph" v-model="options.graph" />
                        <label for="activity-graph">Show elevation graph</label>
                    </p>

                    <p class="form-selector form-checkbox">
                        <input type="checkbox" name="activity-promote" id="activity-promote" v-model="options.promote" />
                        <label for="activity-promote">Show instagpx.com label</label>
                    </p>

                    <p class="form-submit-container">
                        <button type="submit" name="activity-regenerate" v-on:click="regenerateImage">
                            <img src="./../img/icon-refresh.svg" alt="Refresh Image" />
                            <span>Regenerate Image</span>
                        </button>
                    </p>

                </form>
            </aside>
        </main>

        <section class="modal-thanks" v-bind:class="{ visible: modalVisible }">
            <div>
                <p>
                    Thanks for using InstaGPX! Your picture is now being downloaded :)
                    <br />Share it using the hashtag <mark>#instagpx</mark> in order to get it featured!
                </p>
                <p><em>Now, you can</em>:</p>
                <ul>
                    <li class="twitter"><a href="https://twitter.com/alterebro" target="_blank" rel="noopener noreferrer" title="Follow me on Twitter!">Follow me on Twitter</a></li>
                    <li class="instagram"><a href="https://www.instagram.com/alterebro/" target="_blank" rel="noopener noreferrer" title="Follow me on Instagram!">and/or on Instagram</a></li>
                </ul>
            </div>
            <footer><a href="#app" v-on:click.prevent="hideModal" class="close"><span>Close</span></a></footer>
        </section>

        <footer role="contentinfo">
            <ShareList></ShareList>
            <p>A project by: <a href="https://moro.es" target="_blank" rel="noopener noreferrer" title="Author website: www.moro.es">Jorge Moreno</a>. <strong><a href="https://twitter.com/alterebro" target="_blank" rel="noopener noreferrer" title="Follow @alterebro on Twitter!">@alterebro</a></strong></p>
        </footer>


    </div>
</template>

<script>
import tinytime from 'tinytime';
import readGPX from './gpx.js';
import createIMG from './img.js';
import reverseGeocoding from './geocode.js';
import instaGPX from './instagpx.js';
import IntroSlide from './IntroSlide.vue';
import ShareList from './ShareList.vue';

function filename(file) {

    let _file = file.split( '\\' ).pop();
    let _num = 20;
    return (_file.length > _num)
        ? _file.slice(0, _num > 3 ? _num-3 : _num) + '...'
        : _file;
}

import { Config, Data } from './data.js';

export default {
    data() {
        return Data;
    },
    name: "App",
    components : {
        IntroSlide,
        ShareList
    },
    filters : {
        renderTimestamp(value, template) {
            let _timestamp = tinytime(template, { padMonth: true });
            return _timestamp.render( new Date(value) );
        }
    },
    computed : {
        userDataLoaded : function() {
            return this.gpxLoaded && this.imageLoaded
        }
    },
    methods : {

        postGPX() {

            let _latStart = this.gpx.coords.start.lat;
            let _lonStart = this.gpx.coords.start.lon;
            let _latEnd = this.gpx.coords.end.lat;
            let _lonEnd = this.gpx.coords.end.lon;
            this.options.title = (_latStart).toFixed(6) +', '+ (_lonStart).toFixed(6);
            reverseGeocoding(_latStart, _lonStart, (start) => {

                reverseGeocoding(_latEnd, _lonEnd, (end) => {

                    let _output = '';
                        _output = (start.name != end.name)
                            ? start.name + ' - ' + end.name
                            : start.displayName;

                    Data.options.title = _output;
                });
            });

            let _distance = this.gpx.distance.km;
            let _speed = this.gpx.speed.kmh;
            let _act = 'ride';
            if ( _distance <= 12 ) { if (_speed < 14 ) { _act = 'run' } }
            else if ( _distance > 12 && _distance <= 25 ) { if (_speed < 13 ) { _act = 'run' } }
            else if ( _distance > 25 && _distance <= 45 ) { if (_speed < 12 ) { _act = 'run' } }
            else { if (_speed < 8 ) { _act = 'run' } }

            this.options.activity = _act;
            this.options.show = (_act == 'run') ? 'speed' : 'elevation';
        },

        loadGPX(e) {

            if ( !e.target.files.length ) { return }
            this.gpxFile = filename(e.target.value);

            readGPX(
                e.target.files[0],
                (gpxData) => {
                    Data.gpx = gpxData;
                    Data.gpxLoaded = true;
                    this.postGPX();
                    if (this.userDataLoaded) { this.regenerateImage(); }
                }
            );
        },

        loadIMG(e) {

            if ( !e.target.files.length ) { return }
            this.imageFile = filename(e.target.value);

            createIMG(
                e.target.files[0],
                (imgData) => {
                    Data.image = imgData;
                    Data.imageLoaded = true;
                    if (this.userDataLoaded) { this.regenerateImage(); }
                }
            );
        },

        showModal() { this.modalVisible = true },
        hideModal() { this.modalVisible = false },

        regenerateImage() { instaGPX(this.gpx, this.image) }
    }
};
</script>

<style scoped>
.container {}
</style>
