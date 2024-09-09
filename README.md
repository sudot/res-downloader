## res-downloader(资源下载器)

在 [https://github.com/putyy/res-downloader](https://github.com/putyy/res-downloader) 的基础上进行了一些修改：

- 去除 pug 模板引擎，虽然很简洁，但是层级和范围不容易一眼识别
- 优化嗅探资源类型选择布局，解决文字错位、指向不明确
- 优化嗅探表格滚动，解决左侧菜单和表格上方功能按钮一起滚动
- 优化菜单布局，支持收起和展开
- 优化设置，布局优化、保存位置支持选择和输入

====== 以下是原项目说明 ===========

🎯 基于 [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue.git)  
📦 操作简单、可获取不同类型的资源
🖥️ 支持 Win10、Win11、Mac  
🌐 支持视频、音频、图片、m3u8 等网络资源下载  
💪 支持微信视频号、小程序、抖音、快手、小红书、酷狗音乐、qq 音乐等网络资源下载  
👼 支持设置代理以获取特殊网络下的资源

## 软件下载

🆕 [github 下载](https://github.com/putyy/res-downloader/releases)  
🆕 [蓝奏云下载 密码:9vs5](https://wwjv.lanzoum.com/b04wgtfyb)

## 使用方法

> 0. 安装一定要同意安装证书文件，安装一定要同意安装证书文件，安装一定要同意安装证书文件！
> 1. 打开本软件
> 2. 软件首页选择要获取的资源类型（默认选中的视频）
> 3. 打开要捕获的源， 如：视频号、网页、小程序等等
> 4. 返回软件首页即可看到资源列表

## 软件截图

![](public/show.webp)

## 实现原理

通过代理网络抓包拦截响应，筛选出有用的资源，同 fiddler、charles 等抓包软件、浏览器 F12 打开控制也能达到目的，只不过这些软件需要手动进行筛选，对于小白用户上手还是有点难度，所以就有了本项目这样的软件。

## 参考项目

- [WeChatVideoDownloader](https://github.com/lecepin/WeChatVideoDownloader) 原项目是 react 写的，本项目参考原项目用 vue3 重写了一下，核心逻辑没什么变化，主要是增加了一些新的功能，再次感谢！

## 常见问题

下载慢、大视频下载失败

> 推荐使用如下工具加速下载，视频号可以下载完成后再到对应视频操作项选择 “视频解密(视频号)” 按钮
>
> > [Neat Download Manager](https://www.neatdownloadmanager.com/index.php/en/)、[Motrix](https://motrix.app/download)等软件进行下载

Win7 无法使用

> 软件不支持，也无计划支持

打开本软件，无法正常拦截获取

> 检查系统代理是否正确设置 代理地址：127.0.0.1 端口：8899

关闭软件后无法正常上网

> 手动关闭系统代理设置

打开本软件后无法上网

> 手动删除安装标识锁文件，之后再打开软件会进行检查证书是否正确安装
>
> > MAC: /Users/你的用户名称/.res-downloader@sduot/res-downloader-installed.lock
> > Win: C:\Users\Admin\.res-downloader@sduot/res-downloader-installed.lock

其他问题请留言 https://github.com/sduot/res-downloader/issues

## 二次开发

> ps： 打包慢的问题可以参考 https://www.putyy.com/articles/87

```sh
git clone https://github.com/sduot/res-downloader

cd res-downloader

yarn install

yarn run dev

# 打包mac
yarn run build --universal --mac

# 打包win
yarn run build --win
```

## 免责声明

本软件用于学习研究使用，若因使用本软件造成的一切法律责任均与本人无关！
