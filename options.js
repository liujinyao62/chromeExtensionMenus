let page = document.getElementById("buttonDiv")
let selectedClassName = "current"

const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"]

// 操作按钮
function handleBtnClick(event) {
  // 从先前选择的颜色中删除样式
  let current = event.target.parentElement.querySelector(`.${selectedClassName}`)

  if (current && current != event.target) {
    current.classList.remove(selectedClassName)
  }

  // 将按钮标记为选中
  let color = event.target.dataset.color
  event.target.classList.add(selectedClassName)
  chrome.storage.sync.set({ color })
}

// 一种颜色形成一种按钮
function constructOptions(btnsColors) {
  chrome.storage.sync.get("color", async (data) => {
    let currentColor = data.color
    
    // 按提供的颜色，形成对应的按钮
    for (let btnsColor of btnsColors) {
      let button = document.createElement("button")
      button.dataset.color = btnsColor
      button.style.backgroundColor = btnsColor

      // 标记当前选的颜色
      if (btnsColor ===  currentColor) {
        button.classList.add(selectedClassName)
      }

      // 每个按钮的监听事件
      button.addEventListener("click", handleBtnClick)
      page.appendChild(button)
    }
  })
}

// 初始化
constructOptions(presetButtonColors);