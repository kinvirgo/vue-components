<template>
    <div class="tab-wrapper">
        <scroll-tab />
    </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
import ScrollTab from "@/components/scroll-tab.vue"
export default defineComponent({
    components: {
        ScrollTab
    },
    setup(props, context) {
        return {}
    }
});
</script>
<style lang='scss'>

.tab-wrapper{
    width: 80%;
    margin: 0 auto;
}
</style>
