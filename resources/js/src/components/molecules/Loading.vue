<template>
    <div class="loading-app-container">
        <SyncOutlined :style="{ fontSize: '38px', color: '#5254cf' }" spin />
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { SyncOutlined } from "@ant-design/icons-vue";

export default defineComponent({
    components: {
        SyncOutlined,
    },
});
</script>

<style lang="less" scoped>
.loading-app-container {
    height: 100%;
    width: 100%;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background: #f8f8ff;
}
</style>
