<template>
    <section role="presentation" :class="{ hidden : hidden }">
        <figure>
            <img v-for="(img, i) in images" :src="imagesPath + img.url" :class="{ active : (i == current) }" alt="InstaGPX" />
        </figure>
        <footer>
            <nav>
                <a href="#" class="prev" @click.prevent="introSlidePrev" title="Next Image"><span>&#8592; Prev</span></a>
                <a href="#" class="next" @click.prevent="introSlideNext" title="Previous Image"><span>Next &#8594;</span></a>
            </nav>
        </footer>
    </section>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            imagesPath : './images/intro/',
            images : [
                { url : 'jpg/instagpx-map-viana-oporto.jpg' },
                { url : 'jpg/instagpx-viana-oporto.jpg' },
                { url : 'jpg/instagpx-map-puigcerda-perpignan.jpg' },
                { url : 'jpg/instagpx-viarhona.jpg' },
                { url : 'jpg/instagpx-map-barcelona.jpg' },
                { url : 'jpg/instagpx-culoz-geneva.jpg' },
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
    padding: 0 1rem 2rem;
    text-align: center;
    position: relative;

    figure {
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        max-width: 48rem;
        background: #fff;
        box-shadow: 0 5px 30px -15px rgba(0, 0, 0, .35);
        flex-wrap: nowrap;
        flex-direction: row;

        img {
            display: block;
            width: 100%;
            height: 100%;
            max-width: 48rem;
            max-height: 48rem;
            border: solid #fff 1rem;

            transition: all .5s ease-in-out;
            order: 1;
            opacity: 0;

            &.active {
                order: 0;
                opacity: 1;
            }
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
                height: 48px;
                width: 48px;
                border: none;
                padding: 1rem;
                display: block;
                overflow: hidden;

                span { display: block }

                &:before {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                    transition: filter .35s;
                    filter: none;
                }

                &.prev:before { background-image: url(../../img/ui/icon-arrow-back.svg); }
                &.next:before { background-image: url(../../img/ui/icon-arrow-forward.svg); }

                &:hover:before { filter: brightness(0) }
            }
        }
    }

    &.hidden { display: none }

    @media #{$tablet} {
        max-width: 48rem;
        footer {
            nav {
                padding: 0 2rem;
                a { background: #fff }
            }
        }
    }
}
</style>
