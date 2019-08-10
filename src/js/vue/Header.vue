<template>
    <header role="banner">
        <h1><a href="./" title="InstaGPX. Add GPX activity stats to your photos">InstaGPX</a></h1>
        <div class="subheader">
            <h2>Add GPX activity stats to your photos</h2>
            <h3>Create beautiful sharing pictures adding activity stats from any GPX file to your photos with InstaGPX</h3>
        </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem 2rem 2rem;

    h1 {
        width: 100%;
        max-width: 240px;
        height: 100px;

        a {
            display: block;
            width: 100%;
            height: 100%;
            background-image: url(../../img/instagpx-full-logo-opt.svg);
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
            text-indent: -1000rem;
            overflow: hidden;
            border: none;
        }
    }

    .subheader {
        max-width: 40rem;
        padding: 1rem 0 1rem 2rem;
        margin: 0 0 0 2rem;
        border-left: dotted $color-fg-medium 1px;
    }

    h2 {
        font-size: 1.6rem;
        font-weight: 700;
    }
    h3 {
        font-size: 1.4rem;
        font-weight: 500;
        color: $color-fg-medium;
    }

    @media #{$tablet} {
        display: block;
        text-align: center;
        max-width: 42rem;
        margin: 0 auto;
        padding: 2rem 1rem 1rem 1rem;

        h1 {
            margin: 0 auto;
        }

        .subheader {
            max-width: 64rem;
            padding: 0;
            margin: 0;
            border-left: none;
        }
    }
}
</style>
