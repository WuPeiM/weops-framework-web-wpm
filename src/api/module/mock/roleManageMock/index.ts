// 角色管理模块
import { get } from '@/api/axiosconfig/axiosconfig'
import Mock from 'mockjs'
import responseData from './responseData.ts'
export default {
    /**
     * 获取角色列表数据
     *
     * @param {Object} params 请求参数
     */
    getRoleList(params = {}) {
        Mock.mock(/api\/system\/mgmt\/role_manage\/get_roles/, 'get', responseData.getRoleListData(params))
        return get('/system/mgmt/role_manage/get_roles/', params)
    }
}
