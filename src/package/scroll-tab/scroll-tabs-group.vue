<template>
    <section class="vui-tabs__container">
        <div class="tabs__container--wraper">
            <slot></slot>
        </div>
    </section>
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
    .vui-tabs {
        &__container {
            width: 100%;
            overflow: hidden;

            &--wraper {
                display: inline-block;
            }
        }
    }
</style>
