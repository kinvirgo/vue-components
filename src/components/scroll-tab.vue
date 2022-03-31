<template>
    <div class="scroll-tab">
        <div class="scroll-tab__wrapper" ref="wrapperRef">
            <div
                class="scroll-tab__wrapper--box"
                ref="boxRef"
                :style="transform">
                <div class="tab-item">1</div>
                <div class="tab-item">2</div>
                <div class="tab-item">3</div>
                <div class="tab-item">4</div>
                <div class="tab-item">5</div>
            </div>
        </div>
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
    import { defineComponent, reactive, toRefs } from 'vue'
    export default defineComponent({
        setup(props, context) {
            const state = reactive({
                wrapperRef: null,
                boxRef: null,
                duration: 250,
                translateX: 0,
                timingFunction: 'ease-in-out',
            })

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
                        : null,
                }
            })

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
                min-width: 100%;
                background-color: red;
                white-space: nowrap;

                .tab-item {
                    display: inline-block;
                    width: 120px;
                    height: 44px;
                    background-color: blue;
                    vertical-align: middle;
                    color: #fff;
                }
            }
        }

        &__control {
            flex-shrink: 0;
        }
    }
</style>
