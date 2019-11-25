/** @format */

const prompt = require('@system.prompt')
const router = require('@system.router')

/**
 * @desc 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function(ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function() {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function(errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

function route2aboutPage() {
  router.push({
    uri: '/pages/about'
  })
}

export default {
  createShortcut,
  showMenu() {
    const itemFuncMapping = [createShortcut, call3thPartyShare, route2aboutPage, null]
    prompt.showContextMenu({
      itemList: ['保存桌面', '分享', '关于', '取消'],
      success: ret => {
        if (itemFuncMapping[ret.index]) {
          itemFuncMapping[ret.index]()
        } else {
          // do nothing (取消)
        }
      }
    })
  },

  showToast(message = '', duration = 0) {
    if (!message) return
    prompt.showToast({
      message: message,
      duration
    })
  },

  route2theUrl(url, params) {
    router.push({
      uri: url,
      params: params
    })
  }
}
