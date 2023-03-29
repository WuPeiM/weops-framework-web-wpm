let mainRouter = []
let routeConfig = []
let subsMenuPromission = {}

// 自动导入子应用
// @ts-ignore
const files = require.context('@/projects', true, /frameRouter.ts/)
files.keys().forEach(key => {
    const router = files(key).frameRouter
    const menuList = files(key).adminRouteConfig
    const subsMenu = files(key).subsMenuList
    mainRouter = mainRouter.concat(router)
    routeConfig = routeConfig.concat(menuList).sort((a, b) => a.sortIndex - b.sortIndex)
    subsMenuPromission = { ...subsMenuPromission, ...subsMenu }
    routeConfig.forEach(item => {
        if (item.id === 'Setting') {
            const manageMenu = files(key).manageMenu
            if (manageMenu) {
                item.children = item.children.concat(manageMenu).sort((a, b) => a.sortIndex - b.sortIndex)
            }
        }
    })
})
export const frameRouter = mainRouter

export const menuList = routeConfig

export const subsMenuList = subsMenuPromission
