<template>
    <div class="tab-wrapper">
        <!-- <scroll-tab
            :columns="tabs"
            v-model:select-index="selectIndex" /> -->
        <scroll-tab-alpha
            v-model:columns="tabs"
            v-model:select-index="selectIndex" />
    </div>
    <div class="tab-wrapper__action">
        <button @click="doAdd">添加</button>
        <button @click="doSub">删除</button>
    </div>
</template>
<script lang="ts">
    import { defineComponent, reactive, toRefs } from 'vue'
    import ScrollTab from '@/components/scroll-tab.vue'
    import ScrollTabAlpha from '@/components/scroll-tab.alpha.vue'
    export default defineComponent({
        components: {
            ScrollTab,
            ScrollTabAlpha,
        },
        setup(props, context) {
            const state = reactive({
                tabs: Array(100)
                    .fill(0)
                    .map((item, index) => ({
                        name: 'tab-' + index,
                    })),
                /* 选择中 */
                selectIndex: 0,
            })

            function doAdd() {
                state.tabs.push({
                    name: state.tabs.length + 1,
                })
            }

            function doSub() {
                state.tabs.shift()
            }

            return {
                /* state */
                ...toRefs(state),

                /* event */
                doAdd,
                doSub,
            }
        },
    })
</script>
<style lang="scss">
    .tab-wrapper {
        width: 80%;
        margin: 50vh auto 0;

        background: #f5f5f5;

        &__action {
            padding: 10px;
            text-align: center;
        }
    }
</style>
