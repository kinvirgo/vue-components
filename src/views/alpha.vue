<template>
    <div class="tab-wrapper">
        <scroll-tabs v-model="selectIndex">
            <scroll-tabs-group>
                <scroll-tab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :index="index"
                    >菜单-{{ tab.name }}</scroll-tab
                >
            </scroll-tabs-group>
            <scroll-control-left />
            <scroll-control-right />
            <scroll-control-set />
        </scroll-tabs>
    </div>
</template>
<script lang="ts">
    import ScrollTabs from '@/package/scroll-tab/scroll-tabs.vue'
    import ScrollTabsGroup from '@/package/scroll-tab/scroll-tabs-group.vue'
    import ScrollTab from '@/package/scroll-tab/scroll-tab.vue'
    import ScrollControlLeft from '@/package/scroll-tab/scroll-control-left.vue'
    import ScrollControlRight from '@/package/scroll-tab/scroll-control-right.vue'
    import ScrollControlSet from '@/package/scroll-tab/scroll-control-set.vue'

    import { defineComponent, reactive, toRefs } from 'vue'
    export default defineComponent({
        components: {
            ScrollTabs,
            ScrollTabsGroup,
            ScrollTab,
            ScrollControlLeft,
            ScrollControlRight,
            ScrollControlSet,
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

        &__action {
            padding: 10px;
            text-align: center;
        }
    }
</style>
