<template>
    <section role="presentation">
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
    name: 'IntroSlide',
    data() {
        return {
            current: 0,
            images : [
                { url : './img/intro/instagpx-01.jpg' },
                { url : './img/intro/instagpx-02.jpg' },
                { url : './img/intro/instagpx-03.jpg' },
                { url : './img/intro/instagpx-04.jpg' }
            ]
        };
    },
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

<style scoped>

</style>
