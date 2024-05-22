// 获取按钮DOM
let btnDom = document.getElementById("changeColor");

// 从storage中获取存储的color，然后获取到后改变按钮的背景色
chrome.storage.sync.get("color", ({color}) => {
  btnDom.style.backgroundColor = color
})

// 增加按钮的点击监听事件
btnDom.addEventListener("click", async () => {
  // 获取chrome激活的tab页签
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  // 在该页签插入脚本，执行方法
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: setPageBackgroundColor
  })
})

// 从storage中获取颜色，然后改变文档背景色
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({color}) => {
    document.body.style.backgroundColor = color
  })
}