// 统一引入api模块
import Server from './module/server'
import User from './module/user'

const api: any = {
    Server,
    User
}
// @ts-ignore
const appFiles = require.context('@/projects/', true, /\/api\/index\.ts$/)
appFiles.keys().forEach(key => {
    const appApi = appFiles(key).default
    for (const k in appApi) {
        api[k] = appApi[k]
    }
})

export default api
