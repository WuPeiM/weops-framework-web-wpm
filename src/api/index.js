import test from './modules/test'

const api = {
    install(Vue) {
        // 注册主站的接口，用法this.$api.test.{接口名}
        Vue.prototype.$api = {
            test
        }

        // 注册子应用的接口
        const appFiles = require.context('@main/projects/', true, /\/api$/)

        appFiles.keys().forEach(key => {
            const appApi = appFiles(key).default
            Vue.use(appApi)
        })
    }
}

export default api
