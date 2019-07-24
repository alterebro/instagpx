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
import { Config } from './../config.js';
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

<style lang="scss" scoped>
@import "./../../scss/_variables.scss";

nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 1rem;

    h4 { display: none }
    ul {
        display: flex;
    }
    li {

        a {
            display: block;
            background: $color-primary-light;
            color: #fff;
            padding: 3px 10px 3px 26px;
            margin: 0 3px;
            border-radius: 3px;
            border: none;
            position: relative;
            transition: all .25s ease-in-out;

            &:hover {
                background: $color-primary-dark;
                box-shadow: 0 5px 1px -2px rgba(0, 0, 0, .15);
            }

            &:before {
                content: '';
                display: block;
                width: 12px;
                height: 12px;
                position: absolute;
                top: 50%;
                left: 8px;
                transform: translateY(-50%);
                background-size: auto;
                background-repeat: no-repeat;
                background-position: center center;
                opacity: .5;
                transition: opacity .25s ease-in-out;

            }
            &:hover:before {
                opacity: 1;
            }
        }

        &.twitter a:before { background-image: url(../../img/social-share/icon-share-twitter.svg); }
        &.facebook a:before { background-image: url(../../img/social-share/icon-share-facebook.svg); }
        &.linkedin a:before { background-image: url(../../img/social-share/icon-share-linkedin.svg); }
        &.email a:before { background-image: url(../../img/social-share/icon-share-email.svg); }
        &.telegram a:before { background-image: url(../../img/social-share/icon-share-telegram.svg); }

        @media #{$tablet} {
            a {
                text-indent: -1000em;
                padding: 0;
                height: 32px;
                width: 32px;
                border-radius: 100%;
                background: $color-primary-dark;

                &:before {
                    width: 12px;
                    height: 12px;
                    left: 10px;
                }
            }
        }
    }
}
</style>
