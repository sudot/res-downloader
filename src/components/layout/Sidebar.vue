<template>
  <div class="sidebar">
    <el-menu
      class="menu"
      :collapse="sidebarCollapse"
      :default-active="defaultActive"
      router
    >
      <el-menu-item key="0" @click="sidebarCollapse = !sidebarCollapse">
        <img src="../../assets/logo.png" width="32" height="32" />
        <span class="title">{{ appName }}</span>
      </el-menu-item>
      <el-menu-item key="1" index="/index">
        <el-icon><VideoCamera /></el-icon>
        <span>嗅探</span>
      </el-menu-item>
      <el-menu-item key="2" index="/about">
        <el-icon><Share /></el-icon>
        <span>帮助</span>
      </el-menu-item>
      <el-menu-item key="99" index="/setting">
        <el-icon><Setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import localStorageCache from '../../common/localStorage'

const appName = '资源下载器'
const sidebarCollapse = ref(inject('sidebarCollapse'))
const defaultActive = ref('/index')

onMounted(() => {
  let lastRoute = localStorageCache.get('last-route')
  defaultActive.value = lastRoute ? lastRoute : '/index'
})
</script>

<style lang="less" scoped>
.sidebar {
  height: 100vh;
  box-shadow: 0.2rem 0 0.6rem 0 rgba(0, 0, 0, 0.1);
  .title {
    color: #eab728;
  }
}
</style>
