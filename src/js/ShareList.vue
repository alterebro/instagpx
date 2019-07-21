<template>
    <nav>
        <h4>Share! :</h4>
        <ul>
            <li v-for="network in networks" :class="network.network | networkClass">
                <a :href="network.url | networkURL" :title="network.network | networkTitle" target="_blank" rel="noopener noreferrer">{{ network.network }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { Config } from './data.js';
export default {
    data() {
        return {
            networks : [
                { network : "Twitter", url : "https://twitter.com/intent/tweet?text={TEXT}&url={URL}" },
                { network : "FaceBook", url : "https://www.facebook.com/sharer.php?u={URL}" },
                { network : "LinkedIn", url : "https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}&summary={TEXT}&source=moro.es" },
                { network : "E-Mail", url : "mailto:?subject={TITLE}&body={TEXT}:%0A{URL}" },
                { network : "Telegram", url : "https://telegram.me/share/url?url={URL}&amp;text={TEXT} "}
            ]
        };
    },
    name: 'ShareList',
    filters : {
        networkClass(str) {
            return str.toLowerCase().replace('-', '');
        },
        networkURL(url) {
            let _title = encodeURIComponent(Config.title);
            let _desc = encodeURIComponent(Config.description);
            let _url = encodeURIComponent(Config.url);
            return url.replace('{TITLE}', _title).replace('{TEXT}', _desc).replace('{URL}', _url);
        },
        networkTitle(str) {
            return `Share it via ${str}!`;
        }
    }
};
</script>

<style scoped></style>
