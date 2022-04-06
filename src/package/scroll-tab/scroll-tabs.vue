<template>
    <section class="vui-tabs">
        <slot></slot>
    </section>
</template>
<script lang="ts">
    import { defineComponent, provide, computed } from 'vue'
    import { TABS_KEY } from './share'
    export default defineComponent({
        props: {
            modelvalue: {
                type: Number,
                default: 0,
            },
        },
        setup(props, context) {
            // 通过computed传递子组件
            provide(
                TABS_KEY,
                computed(() => {
                    return props.modelvalue
                }),
            )

            return {}
        },
    })
</script>
<style lang="scss">
    .vui-tabs {
        --tab-height: 40px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;

        /* 测试 */
        box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);
        height: 40px;
    }
</style>
