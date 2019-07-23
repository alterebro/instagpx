<template>
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
</template>

<script>
export default {
    data() {
        return {
            modalVisible : false
        };
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
        background-size: 18px 18px;
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
            color: #fff;
            display: inline-block;
            padding: 1px 6px;
            border-radius: 3px;
            background-color: $color-primary-light;
        }

        li {
            font-size: 180%;
            font-weight: 700;
            line-height: 180%;
            position: relative;
            padding: 0 0 0 42px;

            @include modal-icon;

            &.twitter:before {
                background-color: #1da1f2;
                background-image: url(../../img/icon-share-twitter.svg);
            }
            &.instagram:before {
                background-color: #c32aa3;
                background-image: url(../../img/icon-share-instagram.svg);
            }

            @media #{$tablet} {
                font-size: 120%;
                padding: 5px 0 5px 42px;
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
                background-image: url(../../img/icon-close.svg);
            }
            &:hover:before {
                background-color: $color-primary-dark;
            }
        }
    }
}
</style>
