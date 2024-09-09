<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <keep-alive v-if="route.meta.keepAlive">
            <component :is="Component" />
          </keep-alive>
          <component v-else :is="Component" />
        </router-view>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import Sidebar from './Sidebar.vue'
import Footer from './Footer.vue'

const sidebarCollapse = ref(false)
provide('sidebarCollapse', sidebarCollapse)
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-main {
  text-align: center;
}
</style>
