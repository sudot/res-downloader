<template>
  <div class="about">
    <div>
      1. 本软件免费、代码已开源，不会以任何形式收取费用。&nbsp;
      <el-button @click="jump('https://github.com/sudot/res-downloader')">
        查看源码
      </el-button>
    </div>
    <div>
      2. m3u8复制的链接如何使用? &nbsp;
      <el-button @click="jump('https://m3u8-down.gowas.cn/')">
        在线下载
      </el-button>
      <el-button
        @click="jump('https://www.baidu.com/s?wd=m3u8%E5%9C%A8%E7%BA%BF')"
      >
        在线播放
      </el-button>
    </div>
    <div>
      3. 软件如何获取更新? &nbsp;
      <el-button @click="jump('https://github.com/sudot/res-downloader')">
        获取更新
      </el-button>
    </div>
    <div>
      4. 问题反馈 &nbsp;
      <el-button
        @click="jump('https://github.com/sudot/res-downloader/issues')"
      >
        点击前往
      </el-button>
    </div>
    <div class="more">
      <pre>
使用方法
      1. 打开本软件
      2. 软件首页选择要获取的资源类型（默认选中的视频）
      3. 打开要捕获的源， 如：视频号、网页、小程序等等
      4. 返回软件首页即可看到要下载的资源
常见问题
      1. 无法拦截获取
        手动检测系统代理是否设置正确 本软件代理地址: 127.0.0.1:8899
      2. 关闭软件后无法正常上网
        手动关闭系统代理设置
      3. 视频号抓取流程
        将需要下载的视频发给好友或者文件助手 再打开该视频即可拦截到，
        通常软件界面对应视频会出现标题描述、对应操作会出现解密下载按钮。
        大视频可以复制链接通过其他工具加速下载，然后再通过对应的视频操作项进行"视频解密"
实现原理
      通过代理网络抓包拦截响应，筛选出有用的资源，
      同fiddler、charles等抓包软件、浏览器F12打开控制也能达到目的，
      只不过这些软件需要手动进行筛选，对于小白用户上手还是有点难度，本软件对部分资源做了特殊处理，
      更适合大众用户，所以就有了本项目这样的软件。
      </pre>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ipcRenderer } from 'electron'
const jump = (url: String) => {
  ipcRenderer.invoke('invoke_open_default_browser', {
    url: url,
  })
}
</script>
<style lang="less">
.about {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  font-size: 20px;
  color: #ec8d13;
  .problem {
    padding: 0.3rem;
    white-space: pre-wrap;
  }
  .more {
  }
}
</style>
