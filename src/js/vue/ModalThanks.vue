<template>
    <section class="modal-thanks" v-bind:class="{ visible: modalVisible }">
        <div>
            <p>
                <span>Thanks for using InstaGPX.</span>
                <span>Your picture is now being downloaded :)</span>
                <br />
                <span><strong>Share it using the hashtag <mark>#instagpx</mark></strong></span>
                <span><strong>in order to get it featured!</strong></span>
            </p>
            <p>Now, you can:</p>
            <ul>
                <li class="twitter"><a href="https://twitter.com/alterebro" target="_blank" rel="noopener noreferrer" title="Follow me on Twitter!">Follow me on Twitter</a></li>
                <li class="instagram"><a href="https://www.instagram.com/alterebro/" target="_blank" rel="noopener noreferrer" title="Follow me on Instagram!">and/or on Instagram</a></li>
            </ul>
        </div>
        <footer><a href="#app" v-on:click.prevent="hideModal" class="close"><span>Close</span></a></footer>
    </section>
</template>

<script>
import { Data } from '../config.js';

export default {
    data() {
        return Data;
    },
    name: 'ModalThanks',
    methods : {
        showModal() { this.modalVisible = true },
        hideModal() { this.modalVisible = false },
    }
};
</script>

<style lang="scss" scoped>
@import "./../../scss/_variables.scss";

@mixin modal-icon {
    &:before {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        background-color: $color-primary-light;
        background-size: 20px;
        background-position: center center;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}

.modal-thanks {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    z-index: 1;
    padding: 3rem;

    opacity: 0;
    pointer-events: none;
    transition: .35s opacity ease-in-out;

    &.visible {
        opacity: 1;
        pointer-events: auto;
    }

    @media #{$mobile} {
        padding: 1.5rem;
    }

    > div {
        background: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 5px 30px -15px rgba(0, 0, 0, .2);
        border-radius: 5px;

        p {
            margin: 0 auto 1rem;
            padding: 0 2rem;
            text-align: center;
        }

        mark {
            display: inline-block;
            padding: 1px 6px 2px;
            border-radius: 3px;
            color: $color-primary-light;
            background-color: lighten($color-fg-medium, 40%);
        }

        li {
            font-size: 140%;
            font-weight: 700;
            line-height: 200%;
            position: relative;
            padding: 2px 0 2px 40px;

            @include modal-icon;

            &.twitter:before {
                background-size: 14px auto;
                background-color: #1da1f2;
                background-image: url(../../img/social-share/icon-share-twitter.svg);
            }
            &.instagram:before {
                background-size: 14px auto;
                background-color: #c32aa3;
                background-image: url(../../img/social-share/icon-share-instagram.svg);
            }
        }

        @media #{$mobile} {
            p span { display: block }
            p br { display: none }
            li {
                font-size: 120%;
                padding: 5px 0 5px 40px;
            }
        }

    }

    > footer {
        position: absolute;
        top: 6rem;
        right: 6rem;

        a {
            span { display: none; }
            display: block;
            height: 32px;
            width: 32px;
            border: none;

            @include modal-icon;

            &:before {
                transition: background .35s ease-in-out;
                background-image: url(../../img/ui/icon-close.svg);
            }
            &:hover:before {
                background-color: $color-primary-dark;
            }
        }

        @media #{$mobile} {
            top: 4rem;
            right: 4rem;
        }
    }
}
</style>
