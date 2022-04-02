<template>
    <section class="vui-tabs">
        <slot></slot>
    </section>
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
    .vui-tabs {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;

        /* 测试 */
        box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);
        height: 40px;
    }
</style>
<!--
<vui-tabs>
    <vui-tabs-group>
        <vui-tab></vui-tab>
        <vui-tab></vui-tab>
        <vui-tab></vui-tab>
    </vui-tabs-group>
    <vui-contol-group>
        <vui-control-left></vui-control-left>
        <vui-control-right></vui-control-right>
        <vui-control-set></vui-control-set>
    </vui-contol-group>
</vui-tabs>
 -->
