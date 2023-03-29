// 运维工具
const HelloWorld = () => import('@helloWorld/views/index.vue')

const routerPrefix = 'test'
export const frameRouter = [
    {
        path: `/${routerPrefix}/index`,
        name: 'HelloWorld',
        component: HelloWorld,
        meta: {
            title: '测试'
        }
    }
]

// 导航栏
export const adminRouteConfig = [
    {
        name: '测试',
        id: 'HelloWorld',
        sortIndex: 3,
        auth: [
            {
                key: 'checkAuth',
                value: false,
                label: '查看',
                type: 'check'
            },
            {
                key: 'operateAuth',
                value: false,
                label: '操作',
                type: 'operate'
            }
        ]
    }
]

export const manageMenu = [
    {
        name: '自动化管理',
        id: 'AutoManage',
        icon: 'cw-icon weops-tool-kit',
        sortIndex: 2
    }
]

export const createAdminRouteConfig = () => adminRouteConfig
