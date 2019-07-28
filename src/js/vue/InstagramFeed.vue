<template>
    <div class="instagram-feed">
        <ul>
            <li v-for="item in feedItems">
                <img :src="item.thumb" :alt="item.alt" />
                <br> <a :href="item.link" target="_blank" rel="noreferrer noopener">{{ item.timestamp | formatDate }}</a>
                <br> {{ item.caption | truncate }}
            </li>
        </ul>
    </div>
</template>
<script>
import tinytime from 'tinytime';

export default {
    data() {
        return {
            feedItems : []
        }
    },
    name : 'InstagramFeed',
    filters : {
        formatDate(value) {
            let _timestamp = tinytime("{YYYY}/{Mo}/{DD} {H}:{mm}", { padMonth: true });
            return _timestamp.render( new Date(value*1000) );
        },
        truncate(str, length=220, end="...") {
            return (str.length > length)
                ? str.substring(0, length - end.length) + end
                : str
        }
    },
    methods : {
        xhr(url, success, error) {
            let _xhr = new XMLHttpRequest();
                _xhr.open('GET', url, true);
                _xhr.onreadystatechange = function() {
                    if (_xhr.readyState === 4 && _xhr.status == "200") {
                        success(_xhr.responseText);
                    } else {
                        if (typeof(error) === 'function') error();
                    }
                }
            _xhr.send();
        },
        xhrSuccess(data) {
            let _output = [];
            let _data = data.split("window._sharedData = ")[1].split("<\/script>")[0];
                _data = _data.trim();
                _data = JSON.parse(_data.substr(0, _data.length - 1));
                _data = _data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
                _data.forEach(el => {
                    _output.push({
                        image : el.node.display_url,
                        link : `https://www.instagram.com/p/${el.node.shortcode}/`,
                        timestamp : el.node.taken_at_timestamp,
                        thumb : el.node.thumbnail_resources[el.node.thumbnail_resources.length-1].src,
                        caption : el.node.edge_media_to_caption.edges[0].node.text,
                        alt : el.node.accessibility_caption
                    });
                })

                this.feedItems = _output.slice(0,8);
                // TODO : Cache output on localstorage
                _data = null;
        },
        xhrError() {}
    },
    created() {
        this.xhr('https://www.instagram.com/alterebro/', this.xhrSuccess, this.xhrError);
    }
}
</script>

<style lang="scss" scoped>
.instagram-feed {
    background-color: #fff;
    padding: 1rem 2rem;
    max-width: 860px;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 5px 30px -15px rgba(0, 0, 0, .2);

    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            flex : 1 1 25%;
            margin: 1rem 0;
            padding: 1rem;
            img {
                display: block;
                max-width: 100%;
                border-radius: 3px;
            }
        }
    }
}
</style>
