// 通过后台文件更改背景颜色
let color = "#3aa757"

chrome.runtime.onInstalled.addListener(() => {
  // 使用storage API 设置一个值，这将允许多个扩展组件访问该值并更新它。【storage必须在权限清单permissions中注册】
  chrome.storage.sync.set({ color })

  // 表明监听程序在插件安装时，就通过控制台弹出。【安装后可点击service worker查看】
  console.log("插件安装时，后台逻辑-监听程序");
})