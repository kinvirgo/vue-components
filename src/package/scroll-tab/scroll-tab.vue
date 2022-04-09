<template>
    <div :class="['vui-tab', { active: isActive }]">
        <div class="tab__status">●</div>
        <div class="tab__name">
            <slot></slot>
        </div>
        <div class="tab__close">✕</div>
    </div>
</template>
<script lang="ts">
    import {
        defineComponent,
        inject,
        computed,
        ComputedGetter,
        ComputedRef,
    } from 'vue'
    import { TABS_KEY } from './share'
    export default defineComponent({
        props: {
            index: {
                type: Number,
                default: null,
            },
        },
        setup(props, context) {
            const select =
                inject<ComputedRef<number>>(TABS_KEY)

            const isActive = computed(() => {
                return select?.value == props.index
            })

            return {
                isActive,
            }
        },
    })
</script>
<style lang="scss">
    .vui-tab {
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

        .tab__status {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10px;
            height: 10px;
            font-size: 16px;
            color: #6e6e6e;
            margin-top: -2px;
        }

        .tab__name {
            flex: 1;
            font-size: 14px;
            color: #666666;
            padding: 0 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .tab__close {
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
</style>
