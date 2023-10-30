// 统一引入api模块
import Server from './module/server'
import User from './module/user'
// import Activation from './module/activation'
import UserManageMain from './module/userManage'
import RoleManageMain from './module/roleManage'
import MonitorCollectMain from './module/monitorCollect'
import RemoteConnectMain from './module/remoteConnect'
import RoleManageMainMock from './module/mock/roleManageMock/index'

const api: any = {
    Server,
    User,
    // Activation,
    UserManageMain,
    RoleManageMain,
    MonitorCollectMain,
    RemoteConnectMain,
    RoleManageMainMock
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
