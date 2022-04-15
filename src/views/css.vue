<template>
    <div class="color"></div>
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
    .color {
        width: 400px;
        height: 400px;
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

        margin: 0 auto;
    }
</style>
