<template>
    <section role="presentation" :class="{ hidden : hidden }">
        <figure>
            <img v-for="(img, i) in images" :src="img.url" :class="{ active : (i == current) }" alt="InstaGPX" />
        </figure>
        <footer>
            <nav>
                <a href="#" class="prev" @click.prevent="introSlidePrev" title="Next Image">&#8592; Prev</a>
                <a href="#" class="next" @click.prevent="introSlideNext" title="Previous Image">Next &#8594;</a>
            </nav>
        </footer>
    </section>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            images : [
                { url : './images/intro/instagpx-01.jpg' },
                { url : './images/intro/instagpx-02.jpg' },
                { url : './images/intro/instagpx-03.jpg' },
                { url : './images/intro/instagpx-04.jpg' }
            ]
        };
    },
    name: 'IntroSlide',
    props: ['hidden'],
    methods : {
        introSlideNext : function() {
            let _next = ( this.current + 1 >= this.images.length )
                ? 0 : this.current + 1;
            this.current = _next;
        },
        introSlidePrev : function() {
            let _prev = ( this.current - 1 < 0 )
                ? this.images.length - 1 : this.current - 1
            this.current = _prev;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./../../scss/_variables.scss";

section[role="presentation"] {
    width: 100%;
    max-width: 62rem;
    margin: 2rem auto;
    padding: 0 1rem;
    text-align: center;
    position: relative;

    figure {
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        max-width: 48rem;
        background: #fff;
        box-shadow: 0 5px 30px -15px rgba(0, 0, 0, .35);

        img {
            display: block;
            width: 100%;
            max-width: 48rem;
            border: solid #fff 1rem;
            display: none;

            &.active { display: block }
        }
    }

    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;

        nav {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: space-between;
            max-width: 60rem;
            margin: 0 auto;

            a {
                text-indent: -1000em;
                height: 32px;
                width: 32px;
                border-radius: 100%;
                background: $color-primary-light;
                position: relative;
                border: none;

                &:before {
                    content: '';
                    display: block;
                    width: 14px;
                    height: 14px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    margin-top: 1px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                }

                &.prev:before { background-image: url(../../img/ui/icon-arrow-back.svg); }
                &.next:before { background-image: url(../../img/ui/icon-arrow-forward.svg); }

                &:hover {
                    background: $color-primary-dark;
                    box-shadow: 0 5px 1px -2px rgba(0, 0, 0, .15)
                }
            }
        }
    }

    &.hidden { display: none }

    @media #{$tablet} {
        max-width: 48rem;
        footer {
            nav { padding: 0 3rem; }
        }
    }
}
</style>
