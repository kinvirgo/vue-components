<template>
    <div class="tab-wrapper">
        <scroll-tab />
    </div>
</template>
<script lang="ts">
    import { defineComponent, reactive, toRefs } from 'vue'
    import ScrollTab from '@/components/scroll-tab.vue'
    export default defineComponent({
        components: {
            ScrollTab,
        },
        setup(props, context) {
            const state = reactive({
                columns: [
                    { name: '1' },
                    { name: '2' },
                    { name: '3' },
                    { name: '4' },
                    { name: '5' },
                    { name: '6' },
                    { name: '7' },
                ],
            })

            return {
                ...toRefs(state),
            }
        },
    })
</script>
<style lang="scss">
    .tab-wrapper {
        width: 80%;
        margin: 50vh auto 0;

        background: #f5f5f5;
    }
</style>
