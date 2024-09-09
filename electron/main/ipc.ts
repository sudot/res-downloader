import { ipcMain, dialog, BrowserWindow, app, shell } from 'electron'
import { startServer } from './proxyServer'
import { installCert, checkCertInstalled } from './cert'
import { decodeWxFile, suffix, getCurrentDateTimeFormatted } from './utils'
// @ts-ignore
import { hexMD5 } from '../../src/common/md5'
import { Aria2RPC } from './aria2Rpc'
import fs from 'fs'

let win: BrowserWindow
let previewWin: BrowserWindow
let isStartProxy = false
const aria2RpcClient = new Aria2RPC()

export default function initIPC() {
  ipcMain.handle('invoke_app_is_init', async (event, arg) => {
    // 初始化应用 安装证书相关
    return checkCertInstalled()
  })

  ipcMain.handle('invoke_init_app', (event, arg) => {
    // 开始 初始化应用 安装证书相关
    installCert(false).then((r) => {})
  })

  ipcMain.handle('invoke_start_proxy', (event, arg) => {
    // 启动代理服务
    if (isStartProxy) {
      return
    }
    isStartProxy = true
    return startServer({
      win: win,
      upstreamProxy: arg.upstream_proxy ? arg.upstream_proxy : '',
      setProxyErrorCallback: (err) => {
        console.log('setProxyErrorCallback', err)
      },
    })
  })

  ipcMain.handle('invoke_select_down_dir', async (event, arg) => {
    // 选择下载位置
    const result = dialog.showOpenDialogSync({
      title: '保存',
      properties: ['openDirectory'],
    })
    if (!result?.[0]) {
      return false
    }

    return result?.[0]
  })

  ipcMain.handle('invoke_select_wx_file', async (event, { index, data }) => {
    // 选择下载位置
    const result = dialog.showOpenDialogSync({
      title: '保存',
      properties: ['openFile'],
    })
    if (!result?.[0]) {
      return false
    }
    return decodeWxFile(
      result?.[0],
      data.decode_key,
      result?.[0].replace('.mp4', '_解密.mp4')
    )
  })

  ipcMain.handle(
    'invoke_file_exists',
    async (event, { save_path, url, description }) => {
      let fileName = description
        ? description.replace(/[^a-zA-Z\u4e00-\u9fa5]/g, '')
        : hexMD5(url)
      let res = fs.existsSync(`${save_path}/${fileName}.mp4`)
      return { is_file: res, fileName: `${save_path}/${fileName}.mp4` }
    }
  )

  ipcMain.handle(
    'invoke_down_file',
    async (event, { data, save_path, quality }) => {
      let down_url = data.url
      if (!down_url) {
        return new Promise((resolve, reject) => {
          resolve(false)
        })
      }
      if (quality !== '-1' && data.decode_key && data.file_format) {
        const format = data.file_format.split('#')
        const qualityMap = [
          format[0],
          format[Math.floor(format.length / 2)],
          format[format.length - 1],
        ]
        down_url += '&X-snsvideoflag=' + qualityMap[quality]
      }
      let fileName = data?.description
        ? data.description.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '')
        : hexMD5(down_url)
      fileName =
        fileName + '_' + getCurrentDateTimeFormatted() + suffix(data.type)
      let save_path_file = `${save_path}/${fileName}`
      if (process.platform === 'win32') {
        save_path_file = `${save_path}\\${fileName}`
      }

      let headers = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
      }

      return new Promise((resolve, reject) => {
        if (down_url.includes('douyin')) {
          headers['Referer'] = down_url
        }

        aria2RpcClient
          .addUri([down_url], save_path, fileName, headers)
          .then((response) => {
            let currentGid = response.result // 保存当前下载的 gid
            let progressIntervalId = null
            // // 开始定时查询下载进度
            progressIntervalId = setInterval(() => {
              aria2RpcClient
                .tellStatus(currentGid)
                .then((status) => {
                  if (status.result.status !== 'complete') {
                    const progress = aria2RpcClient.calculateDownloadProgress(
                      status.result.bitfield
                    )
                    win?.webContents.send('on_down_file_schedule', {
                      schedule: `已下载${progress}%`,
                    })
                  } else {
                    clearInterval(progressIntervalId)
                    if (data.decode_key) {
                      win?.webContents.send('on_down_file_schedule', {
                        schedule: `开始解密`,
                      })
                      decodeWxFile(
                        save_path_file,
                        data.decode_key,
                        save_path_file.replace('.mp4', '_wx.mp4')
                      )
                        .then((res) => {
                          fs.unlink(save_path_file, (err) => {})
                          resolve(res)
                        })
                        .catch((error) => {
                          console.log('err:', error)
                          resolve(false)
                        })
                    } else {
                      resolve({
                        fullFileName: save_path_file,
                      })
                    }
                  }
                })
                .catch((error) => {
                  console.error('tellStatus error:', error)
                  clearInterval(progressIntervalId)
                  resolve(false)
                })
            }, 1000)
          })
          .catch((error) => {
            console.log('addUri error:', error)
            resolve(false)
          })
      })
    }
  )

  ipcMain.handle('invoke_resources_preview', async (event, { url }) => {
    if (!url) {
      return
    }

    previewWin
      .loadURL(url)
      .then((r) => {
        return
      })
      .catch((res) => {})
    previewWin.show()
    return
  })

  ipcMain.handle('invoke_open_default_browser', (event, { url }) => {
    shell.openExternal(url).then((r) => {})
  })

  ipcMain.handle('invoke_open_file_dir', (event, { save_path }) => {
    shell.showItemInFolder(save_path)
  })

  ipcMain.handle('invoke_file_del', (event, { url_sign }) => {
    if (url_sign === 'all') {
      global.videoList = {}
      return
    }
    if (url_sign) {
      delete global.videoList[url_sign]
      return
    }
  })

  ipcMain.handle('invoke_window_restart', (event) => {
    app.relaunch()
    app.exit()
  })
}

export function setWin(w, p) {
  win = w
  previewWin = p
}
