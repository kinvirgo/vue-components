<template>
    <div class="tab-wrapper">
        <scroll-tab :columns="tabs" v-model="selectIndex" />
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
                tabs: Array(100)
                    .fill(0)
                    .map((item, index) => ({
                        name: index + 1,
                    })),
                /* 选择中 */
                selectIndex: 0,
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
