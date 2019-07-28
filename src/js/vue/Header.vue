<template>
    <header role="banner">
        <h1><a href="./" title="InstaGPX. Add GPX activity stats to your photos">InstaGPX</a></h1>
        <h2>Add GPX activity stats to your photos</h2>
        <h3>Create beautiful sharing pictures adding activity stats from any GPX file to your photos with InstaGPX</h3>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss" scoped>
@import "./../../scss/_variables.scss";

header[role="banner"] {
    text-align: center;
    font-size: 90%;
    max-width: 38rem;
    margin: 0 auto;
    padding: 2rem 1rem 0;

    h1 {
        margin: 0 auto 2rem;
        width: 100%;
        max-width: 300px;
        height: 100px;

        a {
            display: block;
            width: 100%;
            height: 100%;
            background-image: url(../../img/instagpx-full-logo-opt.svg);
            background-repeat: no-repeat;
            background-size: contain;
            background-position: bottom;
            text-indent: -1000rem;
            overflow: hidden;
            border: none;
        }
    }
    h2 {
        line-height: 1.4;
        font-size: 1.6rem;
        font-weight: 700;
        color: darken($color-primary-dark, 10%);
    }
    h3 {
        font-size: 1.4rem;
        font-weight: 500;
        color: $color-primary-light;
    }

    @media #{$mobile} { padding: 1rem 2rem 0 }
}
</style>
