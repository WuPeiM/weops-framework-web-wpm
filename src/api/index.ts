// 统一引入api模块
import Server from './module/server'
import User from './module/user'
// import Activation from './module/activation'
import userManageMain from './module/userManage'
import roleManageMain from './module/roleManage'
import monitorCollectMain from './module/monitorCollect'
import remoteConnectMain from './module/remoteConnect'

const api: any = {
    Server,
    User,
    // Activation,
    userManageMain,
    roleManageMain,
    monitorCollectMain,
    remoteConnectMain
}
// @ts-ignore
const appFiles = require.context('@/projects/', true, /\/api\/index\.ts$/)
appFiles.keys().forEach((key) => {
    const appApi = appFiles(key).default
    for (const k in appApi) {
        api[k] = appApi[k]
    }
})

export default api
