<template>
    <div class="user-manage">
        <div class="operate-box">
            <div>
                <bk-button
                    :disabled="tableLoading"
                    theme="primary"
                    title="新增用户"
                    icon="plus"
                    class="mr10"
                    v-permission="{
                        id: $route.name,
                        type: 'SysUser_create'
                    }"
                    @click="operateUser('add')">
                    新增用户
                </bk-button>
            </div>
            <bk-input
                :disabled="tableLoading"
                clearable
                style="width: 300px;"
                placeholder="请输入搜索关键字"
                :right-icon="'bk-icon icon-search'"
                v-model="search"
                @right-icon-click="handlerIconClick"
                @enter="handlerIconClick"
                @clear="handlerIconClick"
            >
            </bk-input>
        </div>
        <div class="table-box">
            <com-table
                v-bkloading="{ isLoading: tableLoading, zIndex: 10 }"
                ref="comTable"
                :data="dataList"
                :columns="columns"
                :max-height="maxHeight"
                :pagination="pagination"
                @page-change="handlePageChange"
                @page-limit-change="limitChange"
                @filter-change="sourceFilterMethod"
            >
                <template slot="roles" slot-scope="{ row }">
                    <bk-select
                        searchable
                        multiple
                        display-tag
                        :clearable="false"
                        :disabled="row.bk_username === 'admin'"
                        v-model="row.roles"
                        :search-with-pinyin="true"
                        @toggle="setUserRole(row)"
                        @tab-remove="changeRole(row)"
                        @clear="changeRole(row)"
                    >
                        <bk-option v-for="option in roleList"
                            :key="option.id"
                            :id="option.id"
                            :name="option.name">
                        </bk-option>
                    </bk-select>
                </template>
                <template slot="operation" slot-scope="{ row }">
                    <bk-button
                        class="mr10"
                        theme="primary"
                        text
                        v-permission="{
                            id: $route.name,
                            type: 'SysUser_edit'
                        }"
                        @click="operateUser('edit', row)">
                        编辑
                    </bk-button>
                    <bk-button
                        class="mr10"
                        theme="primary"
                        text
                        v-permission="{
                            id: $route.name,
                            type: 'SysUser_delete'
                        }"
                        @click="deleteUser(row)">
                        删除
                    </bk-button>
                    <bk-button
                        class="mr10"
                        theme="primary"
                        text
                        v-permission="{
                            id: $route.name,
                            type: 'SysUser_edit'
                        }"
                        @click="resetPassword(row)">
                        重置密码
                    </bk-button>
                </template>
            </com-table>
        </div>
        <reset-password ref="resetPassword"></reset-password>
        <operate-user ref="operateUser" @refreshList="refreshList"></operate-user>
    </div>
</template>

<script lang="ts">
    import comTable from '@/components/comTable.vue'
    import resetPassword from './resetPassword.vue'
    import operateUser from './operateUser.vue'
    import { Vue, Component } from 'vue-property-decorator'
    @Component({
    name: 'user-manage',
    components: {
        comTable,
        resetPassword,
        operateUser
    }
})
    export default class UserManage extends Vue {
    tableLoading: boolean = false
    dataList: Array<any> = []
    columns = [
        {
            label: '用户名',
            key: 'username',
            align: 'left',
            minWidth: '150px'
        },
        {
            label: '中文名',
            key: 'lastName',
            align: 'left',
            minWidth: '100px'
        },
        {
            label: '邮箱',
            key: 'email',
            align: 'left',
            minWidth: '150px'
        },
        {
            label: '用户角色',
            key: 'roles',
            align: 'left',
            minWidth: '220px',
            scopedSlots: 'roles',
            filters: [],
            filterRemote: true,
            filterMultiple: true
        },
        {
            label: '操作',
            key: 'operation',
            align: 'left',
            width: '180px',
            fixed: 'right',
            scopedSlots: 'operation'
        }
    ]
    pagination = {
        current: 1,
        count: 1,
        limit: 20
    }
    roleList: Array<any> = []
    maxHeight: string | number = ''
    search: string = ''
    roles: Array<any> = []
    created() {
        this.getUserList()
        this.getRoleList()
        const PAGE_OCCUPIED_HEIGHT = 328
        this.maxHeight = window.innerHeight - PAGE_OCCUPIED_HEIGHT
        window.onresize = () => {
            this.maxHeight = window.innerHeight - PAGE_OCCUPIED_HEIGHT
        }
    }
    getOrganizationOrSuperior(row, { listKey, fieldKey }) {
        return row[listKey].map(item => item[fieldKey]).join(';') || '--'
    }
    sourceFilterMethod(val) {
       this.roles = Object.values(val).flat()
       this.handlerIconClick()
    }
    // 删除用户角色
    changeRole(data) {
        setTimeout(() => {
            // this.confirmSetRole(data)
            const deleteRolesId = []
            const arr1 = data.roleV1
            const arr2 = data.roles
            for (let i = 0; i < arr1.length; i++) {
                if (!arr2.includes(arr1[i])) {
                    deleteRolesId.push(arr1[i])
                }
            }
            const deletePromises = deleteRolesId.map(id => {
                return this.$api.RoleManageMain.deleteUserRole({id: id, userId: data.id})
            })
            this.tableLoading = true
            Promise.all(deletePromises).then(res => {
                if (res.every(item => item.result)) {
                    this.getUserList()
                }
            }).finally(() => {
                this.tableLoading = false
            })
        }, 0)
    }

    refreshList() {
        this.getUserList()
    }
    handlerIconClick() {
        this.pagination.current = 1
        this.getUserList()
    }
    operateUser(type, data) {
        if (!this.$BtnPermission({
            id: this.$route.name,
            type: type === 'edit' ? 'SysUser_edit' : 'SysUser_create'
        })) {
            return false
        }
        const operateUser: any = this.$refs.operateUser
        operateUser.show(type, data)
    }
    resetPassword(row) {
        if (!this.$BtnPermission({
            id: this.$route.name,
            type: 'SysRole_edit'
        })) {
            return false
        }
        const resetPassword: any = this.$refs.resetPassword
        resetPassword.show(row)
    }
    deleteUser(row) {
        if (!this.$BtnPermission({
            id: this.$route.name,
            type: 'SysUser_delete'
        })) {
            return false
        }
        this.$bkInfo({
            title: '确认要删除该用户？',
            confirmLoading: true,
            confirmFn: async() => {
                await this.confirmDelete(row)
            }
        })
    }
    async confirmDelete(row) {
        try {
            const res = await this.$api.UserManageMain.deleteUser({
                id: row.id,
                bk_user_id: row.bk_user_id
            })
            if (!res.result) {
                return this.$error(res.message)
            }
            this.$success('删除成功')
            if (this.pagination.current > 1 && this.dataList.length === 1) {
                this.pagination.current--
            }
            this.getUserList()
            // this.$store.dispatch('getAllUserList')
        } catch (e) {
            return false
        }
    }
    setUserRole(data) {
        const flag = data.roles.sort().toString() === data.roleV1.sort().toString()
        if (data.roles.length !== data.roleV1.length || (data.roles.length === data.roleV1.length && !flag)) {
            this.confirmSetRole(data)
        }
    }
    confirmSetRole(data) {
        // 要添加的角色
        const addRolesId = this.compareArrays(data.roles, data.roleV1)
        // 要删除的角色
        const deleteRolesId = this.compareArrays(data.roleV1, data.roles)
        const addPromises = addRolesId.map(id => {
            return this.$api.UserManageMain.setUserRoles({id: id, userId: data.id})
        })
        const deletePromise = deleteRolesId.map(id => {
            return this.$api.RoleManageMain.deleteUserRole({id: id, userId: data.id})
        })
        this.tableLoading = true
        Promise.all([...addPromises, ...deletePromise]).then(res => {
            if (res.every(item => item.result)) {
                this.$success('设置成功！')
                this.getUserList()
            }
        }).finally(() => {
            this.tableLoading = false
        })
    }
    getUserList() {
        const params = {
            roles: this.roles,
            page: this.pagination.current,
            per_page: this.pagination.limit,
            search: this.search
        }
        this.tableLoading = true
        this.$api.UserManageMain.getUserList(params).then(res => {
            if (!res.result) {
                return false
            }
            this.dataList = res.data.users
            this.dataList.forEach(item => {
                // 设置roles
                const roles = item.roles.map(item => item.id)
                this.$set(item, 'roles', roles)
                this.$set(item, 'roleV1', roles)
            })
            this.pagination.count = res.data.count
        }).finally(() => {
            this.tableLoading = false
        })
    }
    getRoleList() {
        this.$api.RoleManageMain.getRoleList().then(res => {
            if (!res.result) {
                return false
            }
            this.roleList = res.data.map(item => {
                return {
                    id: item.id,
                    name: item.name
                }
            })
            const target = this.columns.find(item => item.key === 'roles')
            if (target) {
                target.filters = this.roleList.map(item => {
                    return {
                        text: item.name,
                        value: item.id
                    }
                })
            }
        })
    }
    handlePageChange(val) {
        this.pagination.current = val
        this.getUserList()
    }
    limitChange(val) {
        this.pagination.current = 1
        this.pagination.limit = val
        this.getUserList()
    }
    // 传入两个数组，返回第一个数组比第二个数组多的项
    compareArrays(arrayA, arrayB) {
        const valuesOnlyInA = arrayA.filter(item => !arrayB.includes(item))
        return valuesOnlyInA
    }
}
</script>

<style lang="scss" scoped>
.user-manage {
    height: 100%;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .operate-box {
        display: flex;
        justify-content: space-between;
    }

    .table-box {
        margin-top: 20px;
        flex: 1;
    }
}
</style>
