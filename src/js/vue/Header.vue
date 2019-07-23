<template>
    <header role="banner">
        <h1><img src="./../../img/instagpx.svg" alt="InstaGPX" /></h1>
        <h2>Create beautiful sharing pictures showing your activity stats from any GPX and image file</h2>
        <h3>Upload a .GPX and Image file and select the options you like more!</h3>
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
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1rem 0;

    img {
        display: block;
        margin: 0 auto;
        width: 225px;
    }
    h2 {
        line-height: 1.4;
        color : $color-primary-dark }
    h3 { color : $color-primary-light }

    @media #{$mobile} { padding: 1rem 2rem 0 }
}
</style>
