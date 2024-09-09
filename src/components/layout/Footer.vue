<template>
  <div class="line">
    <a class="item">当前版本: {{ v }}</a>
    <a class="item">站长邮箱: taogarfield@hotmail.com</a>
    <a class="item" @click="jump('https://github.com/sudot/res-downloader')">
      获取更新
    </a>
    <a
      class="item"
      @click="jump('https://github.com/sudot/res-downloader/issues')"
    >
      问题反馈
    </a>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import pkg from '../../../package.json'
const v = pkg.version
const jump = (url: String) => {
  ipcRenderer.invoke('invoke_open_default_browser', {
    url: url,
  })
}
</script>

<style lang="less" scoped>
.line {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  .item {
    padding: 0 5px;
    cursor: pointer;
  }
}
</style>
