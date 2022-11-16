import Vuex from 'vuex'
import Vue from 'vue'

// 自动导入子应用文件
const appFiles = require.context('@main/projects', true, /\/store$/)
const modules = {}

appFiles.keys().forEach(key => {
    const module = appFiles(key).default
    Object.keys(module).forEach(name => {
        modules[name] = module[name]
    })
})
console.log('storeModules', modules)

Vue.use(Vuex)
export default new Vuex.Store({
    modules
})
