// 主站
const Home = () => import('@main/views/demo/workbench/home')

let mainRouter = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页'
        }
    }
]

// 导航栏
let routeConfig = [
    {
        name: '首页',
        id: 'Home',
        icon: 'iconfont icon-mianxingtubiao-shouye',
        active: true,
        url: '/home'
    }
]

// 自动导入子应用
const files = require.context('@main/projects', true, /frame-router.js/)
console.log('files', files.keys())
files.keys().forEach(key => {
    const router = files(key).frameRouter
    const menuList = files(key).adminRouteConfig
    mainRouter = mainRouter.concat(router)
    routeConfig = routeConfig.concat(menuList)
})

export const frameRouter = mainRouter
export const adminRouteConfig = routeConfig
export const createAdminRouteConfig = () => routeConfig
