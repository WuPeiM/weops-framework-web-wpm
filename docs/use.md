# 开发示例指引

## 在projects目录下创建您的第一个子应用example

### example目录 （src/projects/example）
```markdown
├── api # 请求
│    ├── modules # api模块管理
│    │    ├── example.ts # 自定义api模块
│    ├── index.ts # 统一引入api模块
├── assets # 静态文件
│    ├── svg # 例如图片文件
├── router # 路由
│    ├── frameRouter.ts # 自定义路由
├── store  # vuex
│    ├── modules # store模块管理
│    |    ├── example.ts # 自定义store模块
│    ├── index.ts # 统一引入store模块
├── views # vue文件
│    ├── index.vue # example的首页
└── main.ts # 入口 加载组件 自定义指令 初始化等
```
### example目录文件内容示例
``` bash
# api/modules/example.ts
import { get, post } from '@/api/axiosconfig/axiosconfig'

const mockUrl = 'http://yapi.canway.top/mock/1273' // 你可以使用yapi进行mock数据

export default {
    getList(params = {}) {
        return get(`${mockUrl}/example/list/`, params)
    },
    modifyList(params = {}) {
        return post(`${mockUrl}/example/list/`, params)
    }
}

# api/index.ts
import example from './modules/example'

const exampleBaseApi = {
    example
}

export default exampleBaseApi

# router/frameRouter.ts
const Example = () => import('@example/views/index.vue')

const routerPrefix = 'example'

export const frameRouter = [
    {
        path: `/${routerPrefix}/index`,
        name: 'Example',
        component: Example,
        meta: {
            title: '子应用首页'
        }
    }
]

export const adminRouteConfig = [
    {
        name: '子应用',
        id: 'ExampleApp',
        children: [
            {
                name: '子应用首页',
                id: 'Example'
            }
        ]
    }
]

export const createAdminRouteConfig = () => adminRouteConfig

# router/modules/example.ts
// initial state
const state = {
    list: []
}

// getters
const getters = {
    //
}

// mutations
const mutations = {
    setList(state, newData) {
        state.list = newData
    }
}

// actions
const actions = {
    updateList({ commit }, newData) {
        commit('setList', newData)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

# router/index.ts
import example from './modules/example'

export default {
    example
}

# views/index.vue
<template>
    <div class="example-wrapper">
       hello world !
    </div>
</template>

# main.ts
// 公共方法
import './controller/func'

```
### 服务启动及打包
``` bash
# 服务启动
npm run dev

# 服务打包
npm run build:micro
```
