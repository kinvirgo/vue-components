<template>
    <div class="tab__control--btn btn-left">◀</div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        setup(props, context) {
            return {}
        },
    })
</script>
<style lang="scss">
    .tab__control {
        &--btn {
            flex-shrink: 0;
            width: var(--tab-height);
            height: var(--tab-height);

            display: flex;
            justify-content: center;
            align-items: center;

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
        }
    }
</style>
