<template>
  <el-form label-width="auto" style="max-width: 400px">
    <el-form-item label="保存位置">
      <el-input
        v-model="saveDir"
        placeholder="输入文件夹地址或点击右侧按钮选择"
      >
        <template #append>
          <el-button icon="FolderOpened" @click="selectSaveDir" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="视频号画质">
      <el-select v-model="quality" placeholder="请选择">
        <el-option
          v-for="item in qualityOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="特殊代理">
      <el-input
        v-model="upstream_proxy"
        placeholder="例如: http://127.0.0.1:7890 修改此项需重启本软件，如不清楚用途请勿设置。"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSetting">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ipcRenderer } from 'electron'
import localStorageCache from '../common/localStorage'
import { ElMessage } from 'element-plus'

const saveDir = ref('')
const upstream_proxy = ref('')
const upstream_proxy_old = ref('')
const quality = ref('-1')
const qualityOptions = ref([
  {
    value: '-1',
    label: '默认(推荐)',
  },
  {
    value: '0',
    label: '高画质',
  },
  {
    value: '1',
    label: '中画质',
  },
  {
    value: '2',
    label: '低画质',
  },
])

onMounted(() => {
  saveDir.value = localStorageCache.get('save_dir')
    ? localStorageCache.get('save_dir')
    : ''
  quality.value = localStorageCache.get('quality')
    ? localStorageCache.get('quality')
    : '-1'
  upstream_proxy.value = localStorageCache.get('upstream_proxy')
    ? localStorageCache.get('upstream_proxy')
    : ''
  upstream_proxy_old.value = upstream_proxy.value
})

const selectSaveDir = () => {
  ipcRenderer.invoke('invoke_select_down_dir').then((save_path) => {
    if (save_path !== false) {
      saveDir.value = save_path
    }
  })
}

const onSetting = () => {
  localStorageCache.set('save_dir', saveDir.value, -1)
  localStorageCache.set('upstream_proxy', upstream_proxy.value, -1)
  localStorageCache.set('quality', quality.value, -1)
  if (upstream_proxy_old.value != upstream_proxy.value) {
    ipcRenderer.invoke('invoke_window_restart')
  }
  ElMessage({
    message: '保存成功',
    type: 'success',
  })
}
</script>
