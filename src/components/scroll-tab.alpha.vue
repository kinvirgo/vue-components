<template>
    <section class="tab">
        <section class="tab__container">
            <div class="tab__container--wraper">
                <div
                    class="tab-item"
                    title="首页-测试菜单订单号12383467673">
                    <div class="tab-item__status">●</div>
                    <div class="tab-item__name">
                        首页-测试菜单订单号12383467673
                    </div>
                    <div class="tab-item__close">✕</div>
                </div>
                <div class="tab-item active">
                    <div class="tab-item__status">●</div>
                    <div class="tab-item__name">首页</div>
                    <div class="tab-item__close">✕</div>
                </div>
                <div
                    class="tab-item"
                    title="首页-测试菜单订单">
                    <div class="tab-item__status">●</div>
                    <div class="tab-item__name">
                        首页-测试菜单订单号
                    </div>
                    <div class="tab-item__close">✕</div>
                </div>
            </div>
        </section>
        <section class="tab__control">
            <div class="tab__control--btn btn-left">◀</div>
            <div class="tab__control--btn btn-right">▶</div>
            <div class="tab__control--btn btn-set">⚙</div>
        </section>
        <section class="tab__tips"></section>
    </section>
</template>
<script lang="ts">
    interface TabColumn {
        name: string
        [key: string]: any
    }

    import { defineComponent, PropType } from 'vue'
    export default defineComponent({
        props: {
            /* tab列表 */
            columns: {
                type: Array as PropType<TabColumn[]>,
                default: () => [],
            },
            /* 选中的值 */
            modelValue: {
                type: Number,
                default: 0,
            },
        },

        setup(props, context) {
            return {}
        },
    })
</script>
<style lang="scss">
    .tab {
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

        &__container {
            width: 100%;
            overflow: hidden;

            &--wraper {
                display: inline-block;

                .tab-item {
                    height: var(--tab-height);
                    display: inline-flex;
                    align-items: center;

                    min-width: var(--tab-min-width);
                    max-width: var(--tab-max-width);
                    padding: 0 12px;
                    border-right: 1px solid #cccccc;

                    &:last-child {
                        border: 0;
                    }

                    &__status {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 10px;
                        height: 10px;
                        font-size: 16px;
                        color: var(--tab-status-color);
                        margin-top: -2px;
                    }
                    &__name {
                        flex: 1;
                        font-size: 14px;
                        color: var(--tab-name-color);
                        padding: 0 6px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    &__close {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 20px;
                        height: 20px;
                        font-size: 12px;
                        font-weight: bold;
                        color: var(--tab-close-color);

                        &:hover {
                            cursor: pointer;
                            --tab-close-color: #d32121;
                        }
                    }

                    &:hover,
                    &.active {
                        background: #f5f5f5;
                    }
                }
            }
        }

        &__control {
            flex-shrink: 0;
            display: flex;
            padding: 0 4px;

            &--btn {
                display: flex;
                justify-content: center;
                align-items: center;

                width: var(--tab-height);
                height: var(--tab-height);
                font-size: 14px;
                color: #6e6e6e;
                cursor: pointer;
                opacity: 1;

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
    }
</style>
