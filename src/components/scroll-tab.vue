<template>
    <div class="scroll-tab">
        <!-- tabs -->
        <div class="scroll-tab__wrapper" ref="wrapperRef">
            <div
                class="scroll-tab__wrapper--box"
                ref="boxRef"
                :style="transform">
                <template
                    v-for="(item, index) in columns"
                    :key="index">
                    <div
                        :class="[
                            'tab-item',
                            { on: selectIndex === index },
                        ]"
                        :id="selectIndexToTabId(index)"
                        @click="doChange(index, item)">
                        tab {{ item.name }}
                    </div>
                </template>
            </div>
        </div>
        <!-- control -->
        <div class="scroll-tab__control">
            <button
                class="scroll-tab__control--left"
                @click="doLeft">
                ◀
            </button>
            <button
                class="scroll-tab__control--right"
                @click="doRight">
                ▶
            </button>
            <button
                class="scroll-tab__control--set"
                @click="doSet">
                ⚙
            </button>
        </div>
    </div>
</template>
<script lang="ts">
    import { computed } from '@vue/reactivity'
    import {
        defineComponent,
        onMounted,
        PropType,
        reactive,
        toRefs,
    } from 'vue'

    interface TabColumn {
        name: string
        [key: string]: any
    }

    type TabAlign = 'center' | 'left'

    export default defineComponent({
        props: {
            /* tab列表 */
            columns: {
                type: Array as PropType<Array<TabColumn>>,
                default: () => [],
            },
            /* 选择 */
            selectIndex: {
                type: Number,
                default: 0,
            },
            /* 对齐方式 */
            align: {
                type: String as PropType<TabAlign>,
                default: 'center',
            },
        },
        setup(props, context) {
            const state = reactive({
                wrapperRef: null,
                boxRef: null,
                duration: 250,
                translateX: 0,
                timingFunction: 'ease-in-out',
            })

            // computed
            const transform = computed(() => {
                let {
                    duration,
                    translateX,
                    timingFunction,
                } = state

                return {
                    'transform': `translate3d(${translateX}px, 0, 0)`,
                    '-webkit-transform': `translate3d(${translateX}px, 0, 0)`,
                    'transition': duration
                        ? `transform ${duration}ms ${timingFunction}`
                        : '',
                }
            })

            onMounted(() => {
                init()
            })

            function init() {
                let { columns, selectIndex } = props
                columns[selectIndex] &&
                    setSelectTab(selectIndex)
            }

            function setSelectTab(selectIndex: number) {
                let { align } = props
                /* 更新滚动对齐 */
                scrollIntoView(selectIndex, align)
                /* 更新 */
            }

            function scrollIntoView(
                selectIndex: number,
                align: TabAlign,
            ) {
                let { wrapperRef, boxRef } = state,
                    { width: tabWidth } = (
                        wrapperRef as unknown as HTMLElement
                    ).getBoundingClientRect(),
                    { width: boxWidth, left: boxLeft } = (
                        boxRef as unknown as HTMLElement
                    ).getBoundingClientRect(),
                    { width: itemWidth, left: itemLeft } =
                        document
                            .getElementById(
                                selectIndexToTabId(
                                    selectIndex,
                                ),
                            )!
                            .getBoundingClientRect(),
                    itemRelativeLeft = itemLeft - boxLeft,
                    left = 0
                /* 滑动条件 */
                if (boxWidth > tabWidth) {
                    left =
                        align === 'center'
                            ? itemRelativeLeft -
                              (tabWidth - itemWidth) / 2
                            : itemRelativeLeft
                }
                /* 更新滚动 */
                ;(
                    wrapperRef as unknown as HTMLElement
                ).scroll({
                    left,
                    behavior: 'smooth',
                })
            }

            function doChange(
                index: number,
                item?: TabColumn,
            ) {
                setSelectTab(index)
            }

            function selectIndexToTabId(
                selectIndex: number,
            ) {
                return `t_i_${selectIndex}`
            }

            function doLeft() {}
            function doRight() {}
            function doSet() {}

            return {
                // state
                ...toRefs(state),
                transform,

                // event
                doLeft,
                doRight,
                doSet,
                doChange,
                selectIndexToTabId,
            }
        },
    })
</script>
<style lang="scss">
    .scroll-tab {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__wrapper {
            flex: 1;
            overflow: hidden;

            &--box {
                display: inline-block;
                min-width: 100%;
                background-color: red;
                white-space: nowrap;

                .tab-item {
                    display: inline-block;
                    width: 120px;
                    height: 44px;
                    background-color: #1212cf;
                    vertical-align: middle;
                    color: #fff;

                    text-align: center;
                    line-height: 44px;
                    opacity: 0.9;
                    position: relative;
                    z-index: 1;
                    transition: all 0.25s ease-in-out;

                    &:hover,
                    &.on {
                        opacity: 1;
                        cursor: pointer;
                        box-shadow: 0 0 10px
                            rgba(255, 255, 255, 0.9);
                        z-index: 2;
                    }
                }
            }
        }

        &__control {
            flex-shrink: 0;
        }
    }
</style>
