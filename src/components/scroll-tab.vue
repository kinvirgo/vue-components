<template>
    <div class="scroll-tab">
        <div class="scroll-tab__box">
            <ul class="tab">
                <li class="tab-item"></li>
                <li class="tab-item"></li>
                <li class="tab-item"></li>
            </ul>
        </div>
        <div class="scroll-tab__control">
            <button class="control-left">◀</button>
            <button class="control-right">▶</button>
            <button class="control-set">⚙</button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup(props, context) {
        return {}
    },
})
</script>
<style lang="scss"></style>
