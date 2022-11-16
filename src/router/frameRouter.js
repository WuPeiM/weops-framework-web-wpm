// 主站
const HomeFirst = () => import('@main/views/ui_demo/workbench/home_first')
const HomeSecond = () => import('@main/views/ui_demo/workbench/home_second')
const HomeThird = () => import('@main/views/ui_demo/workbench/home_third')

let mainRouter = [
    {
        path: '/',
        name: 'HomeFirst',
        component: HomeFirst,
        meta: {
            title: '首页1'
        }
    },
    {
        path: '/home',
        name: 'HomeFirst',
        component: HomeFirst,
        meta: {
            title: '首页1'
        }
    },
    {
        path: '/homeSecond',
        name: 'HomeSecond',
        component: HomeSecond,
        meta: {
            title: '首页2'
        }
    },
    {
        path: '/homeThird',
        name: 'HomeThird',
        component: HomeThird,
        meta: {
            title: '首页3'
        }
    }
]

// 导航栏
let routeConfig = [
    {
        name: '工作台',
        icon: 'iconfont icon-mianxingtubiao-shezhi',
        id: 'workbench',
        children: [
            {
                name: '首页1',
                id: 'HomeFirst',
                icon: 'iconfont icon-mianxingtubiao-shezhi',
                active: true,
                url: '/home'
            },
            {
                name: '首页2',
                id: 'HomeSecond',
                icon: 'iconfont icon-mianxingtubiao-riqi',
                url: '/homeSecond'
            },
            {
                name: '首页3',
                id: 'HomeThird',
                icon: 'iconfont icon-mianxingtubiao-danju',
                url: '/homeThird'
            }
        ]
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
