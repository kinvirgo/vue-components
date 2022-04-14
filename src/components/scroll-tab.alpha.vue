<template>
    <section :class="['vui-tabs', mode]">
        <section
            class="vui-tabs__container"
            ref="containerRef"
            @mousewheel="onMouseWheel">
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
        <section
            class="vui-tabs__btn btn-left"
            @click="doPrev()"
            title="上一屏">
            ◀
        </section>
        <section
            class="vui-tabs__btn btn-right"
            @click="doNext()"
            title="下一屏">
            ▶
        </section>
        <section
            class="vui-tabs__btn btn-location"
            @click="doLocation()"
            title="当前">
            <svg
                t="1649938229283"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1488"
                width="16"
                height="16">
                <path
                    d="M512 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z"
                    p-id="1489"
                    fill="#6e6e6e"></path>
                <path
                    d="M960 480h-33.632C910.752 276.16 747.84 113.248 544 97.632V64a32 32 0 1 0-64 0v33.632C276.16 113.248 113.248 276.16 97.632 480H64a32 32 0 0 0 0 64h33.632C113.248 747.84 276.16 910.752 480 926.368V960a32 32 0 1 0 64 0v-33.632C747.84 910.752 910.752 747.84 926.368 544H960a32 32 0 1 0 0-64zM544 862.368V800a32 32 0 1 0-64 0v62.368C311.424 847.104 176.896 712.576 161.632 544H224a32 32 0 1 0 0-64H161.632C176.896 311.424 311.424 176.896 480 161.632V224a32 32 0 0 0 64 0V161.632c168.576 15.296 303.104 149.792 318.368 318.368H800a32 32 0 1 0 0 64h62.368c-15.264 168.576-149.792 303.104-318.368 318.368z"
                    p-id="1490"
                    fill="#6e6e6e"
                    stroke="#6e6e6e"
                    stroke-width="20"></path>
            </svg>
        </section>
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
            /* 滚动变量 */
            wheelVector: {
                type: Number,
                default: 400,
            },
        },

        setup(props, context) {
            const state = reactive<{
                containerRef: HTMLElement | null
            }>({
                containerRef: null,
            })
            /**
             * 监听选择项
             */
            watch(
                () => props.selectIndex,
                val => {
                    checkSelectIndex() &&
                        scrollIntoView(val)
                },
            )

            onMounted(() => {
                init()
            })

            function init() {
                let { columns, selectIndex } = props
                columns[selectIndex] &&
                    setSelectIndex(selectIndex)
            }

            /**
             * 手动切换
             * @param selectIndex
             */
            function doSelectTab(selectIndex: number) {
                setSelectIndex(selectIndex)
            }

            /**
             * 设置选中项
             * @param selectIndex
             */
            function setSelectIndex(selectIndex: number) {
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

                setScrollLeft(left)
            }

            /**
             * 更新滑动
             * @param left
             */
            function setScrollLeft(left: number) {
                let { containerRef } = state
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

            /**
             * 上一页
             */
            function doPrev(vector?: number) {
                let { containerRef } = state,
                    left = containerRef!.scrollLeft
                vector =
                    vector ||
                    containerRef!.getBoundingClientRect()
                        .width
                setScrollLeft(left - vector)
            }

            /**
             * 下一页
             */
            function doNext(vector?: number) {
                let { containerRef } = state,
                    left = containerRef!.scrollLeft
                vector =
                    vector ||
                    containerRef!.getBoundingClientRect()
                        .width
                setScrollLeft(left + vector)
            }

            /**
             * 定位当前
             */
            function doLocation() {
                let { selectIndex } = props
                checkSelectIndex() &&
                    scrollIntoView(selectIndex)
            }

            /**
             * 校验selectIndex是否正确
             */
            function checkSelectIndex() {
                let { selectIndex, columns } = props
                return selectIndex < columns.length
            }

            function onMouseWheel({ deltaY }: WheelEvent) {
                let { wheelVector } = props
                deltaY > 0
                    ? doNext(wheelVector)
                    : doPrev(wheelVector)
            }

            return {
                ...toRefs(state),

                indexToId,
                doSelectTab,
                doPrev,
                doNext,
                doLocation,
                onMouseWheel,
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

                &:hover {
                    background: #f5f5f5;
                }
                &.active {
                    background: #5ddcfc;
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
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>
