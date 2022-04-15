<template>
    <div class="base color__1"></div>
    <div class="base color__2"></div>
    <div class="base color__3"></div>
    <div class="base color__4"></div>
    <div class="base color__5">
        <svg viewBox="0 0 100 100">
            <path
                d="M 0,50 a 50,50 0 1,1 0,1 z"
                id="circle" />
            <text>
                <textPath xlink:href="#circle">
                    skdjfhhkhdfhusdhfhkdhh
                </textPath>
            </text>
        </svg>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        setup(props, context) {
            return {}
        },
    })
</script>
<style lang="scss">
    .base {
        width: 400px;
        height: 400px;
        margin: 50px auto;
    }

    .color {
        &__1 {
            background: linear-gradient(
                -45deg,
                #fb3 25%,
                #58a 0,
                #58a 50%,
                #fb3 0,
                #fb3 75%,
                #58a 0
            );
            background-size: 30px 30px;
        }

        &__2 {
            // background: linear-gradient(30deg,
            //         #fb3 25%,
            //         #58a 0,
            //         #58a 50%,
            //         #fb3 0,
            //         #fb3 75%,
            //         #58a 0);
            background: repeating-linear-gradient(
                -60deg,
                #fb3,
                #fb3 15px,
                #58a 0,
                #58a 30px
            );
        }

        &__3 {
            background: repeating-linear-gradient(
                -60deg,
                #fb3 0 15px,
                #58a 0 30px
            );
            border-radius: 15px;
            // corner-shape: bevel;
        }

        &__4 {
            background: conic-gradient(#fb3 40%, #58a 0);
            border-radius: 50%;
            text-decoration: dashed;
        }
    }
</style>
