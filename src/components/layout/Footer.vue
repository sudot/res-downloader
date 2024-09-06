<script setup lang="ts">
import { ipcRenderer } from "electron";
import pkg from "../../../package.json";
const v = pkg.version;
const jump = (url: String) => {
  ipcRenderer.invoke("invoke_open_default_browser", {
    url: url,
  });
};
</script>
<template lang="pug">
div.line
  a.item 当前版本: {{v}}
  a.item 站长邮箱: gowas.work@gmail.com
  a.item(@click="jump('https://github.com/putyy/res-downloader')") 获取更新
  a.item(@click="jump('https://github.com/putyy/res-downloader/issues')") 问题反馈
</template>

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
