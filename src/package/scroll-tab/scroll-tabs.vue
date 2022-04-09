<template>
    <section class="vui-tabs">
        <slot></slot>
    </section>
</template>
<script lang="ts">
    import { computed } from '@vue/reactivity'
    import {
        defineComponent,
        provide,
        ref,
        watch,
    } from 'vue'
    export default defineComponent({
        props: {
            active: {
                type: Number,
                default: -1,
            },
        },
        setup(props, context) {
            const currentActive = ref(props.active)

            watch(
                () => props.active,
                val => {
                    console.log('>>>', val)
                    currentActive.value = val
                },
            )

            const select = computed(() => {
                return currentActive.value
            })

            provide('select', select)

            return { currentActive }
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
