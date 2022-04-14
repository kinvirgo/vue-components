<template>
    <section :class="['vui-tabs', mode]">
        <section
            class="vui-tabs__container"
            ref="containerRef">
            <template v-for="(item, index) in columns">
                <div
                    :class="[
                        'tab__item',
                        { active: selectIndex === index },
                    ]"
                    :id="indexToId(index)"
                    :title="item.name"
                    @click="doSelectTab(index)">
                    <div class="tab__item--status">●</div>
                    <div class="tab__item--name">
                        {{ item.name }}
                    </div>
                    <div class="tab__item--close">✕</div>
                </div>
            </template>
        </section>
        <section class="vui-tabs__btn btn-left">◀</section>
        <section class="vui-tabs__btn btn-right">▶</section>
        <section class="vui-tabs__btn btn-set">⚙</section>
    </section>
</template>
<script lang="ts">
    interface TabColumn {
        name: string
        [key: string]: any
    }

    /*
on-change
on-close
*/

    import {
        defineComponent,
        onMounted,
        PropType,
        reactive,
        toRefs,
        watch,
    } from 'vue'
    export default defineComponent({
        emits: ['update:select-index'],
        props: {
            /* tab列表 */
            columns: {
                type: Array as PropType<TabColumn[]>,
                default: () => [],
            },
            /* 选中的值 */
            selectIndex: {
                type: Number,
                default: 0,
            },
            /* 模式(暂不支持) */
            mode: {
                type: String as PropType<
                    'horizontal' | 'vertical'
                >,
                default: 'horizontal',
            },
        },

        setup(props, context) {
            const state = reactive<{
                containerRef: HTMLElement | null
            }>({
                containerRef: null,
            })

            // watch()

            onMounted(() => {
                init()
            })

            function init() {
                let { columns, selectIndex } = props
                // columns[selectIndex] &&
            }

            /**
             * 手动切换
             * @param selectIndex
             */
            function doSelectTab(selectIndex: number) {
                setSelectTab(selectIndex)
            }
            /**
             * 设置选中项
             * @param selectIndex
             */
            function setSelectTab(selectIndex: number) {
                scrollIntoView(selectIndex)
                // 更新选中项
                context.emit(
                    'update:select-index',
                    selectIndex,
                )
            }
            /**
             * 滚动可是区域
             * @param selectIndex
             */
            function scrollIntoView(selectIndex: number) {
                let { containerRef } = state,
                    { columns } = props,
                    { width: tabsWidth } =
                        containerRef!.getBoundingClientRect(),
                    { left: boxLeft } =
                        indexToNode(
                            0,
                        )!.getBoundingClientRect(),
                    { right: boxRight } = indexToNode(
                        columns.length - 1,
                    )!.getBoundingClientRect(),
                    boxWidth = boxRight - boxLeft,
                    { width: itemWidth, left: itemLeft } =
                        indexToNode(
                            selectIndex,
                        )!.getBoundingClientRect(),
                    itemRelativeLeft = itemLeft - boxLeft,
                    left = 0

                // 滑动条件
                if (boxWidth > tabsWidth) {
                    left =
                        itemRelativeLeft -
                        (tabsWidth - itemWidth) / 2
                }
                // 更新滑动
                containerRef?.scroll({
                    left,
                    behavior: 'smooth',
                })
            }

            /**
             * 索引获取dom节点
             * @param tabIndex
             */
            function indexToNode(tabIndex: number) {
                return document.getElementById(
                    indexToId(tabIndex),
                )
            }
            /**
             * 索引转换成id
             * @param index
             */
            function indexToId(index: number) {
                return `t_${index}`
            }

            return {
                ...toRefs(state),

                indexToId,
                doSelectTab,
            }
        },
    })
</script>
<style lang="scss">
    .vui-tabs {
        --tab-b-color: #fff;
        --tab-min-width: 160px;
        --tab-max-width: 200px;
        --tab-height: 40px;
        --tab-status-color: #6e6e6e;
        --tab-name-color: #666666;
        --tab-close-color: #6e6e6e;

        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--tab-b-color);

        /* 测试 */
        box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);

        &.vertical {
            flex-direction: column;

            .vui-tabs__container {
                flex-direction: column;
            }
        }

        /* tab容器 */
        &__container {
            flex: 1;
            display: flex;
            overflow: hidden;

            .tab__item {
                height: 40px;
                display: inline-flex;
                align-items: center;
                min-width: 160px;
                max-width: 200px;
                padding: 0 12px;
                border-right: 1px solid #cccccc;

                &:last-child {
                    border: 0;
                }

                &--status {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 10px;
                    height: 10px;
                    font-size: 16px;
                    color: #6e6e6e;
                    margin-top: -2px;
                    cursor: default;
                }

                &--name {
                    flex: 1;
                    font-size: 14px;
                    color: #666666;
                    padding: 0 6px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: default;
                }

                &--close {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                    font-weight: bold;
                    color: #6e6e6e;

                    &:hover {
                        cursor: pointer;
                        color: #d32121;
                    }
                }

                &:hover,
                &.active {
                    background: #f5f5f5;
                }
            }
        }

        /* 操作按钮 */
        &__btn {
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            width: var(--tab-height);
            height: var(--tab-height);
            font-size: 14px;
            color: #6e6e6e;
            opacity: 1;
            user-select: none;
            cursor: pointer;

            &:hover {
                background: #f5f5f5;
                color: #333333;
            }

            &:active {
                color: #6e6e6e;
            }

            &.btn-set {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
</style>
