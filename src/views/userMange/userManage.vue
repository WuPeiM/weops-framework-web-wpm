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
                            :name="option.role_name">
                        </bk-option>
                    </bk-select>
                </template>
                <template slot="operation" slot-scope="{ row }">
                    <bk-button
                        class="mr10"
                        theme="primary"
                        text
                        @click="operateUser('edit', row)">
                        编辑
                    </bk-button>
                    <bk-button
                        class="mr10"
                        theme="primary"
                        text
                        @click="deleteUser(row)">
                        删除
                    </bk-button>
                    <bk-button
                        class="mr10"
                        theme="primary"
                        text
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
            key: 'bk_username',
            align: 'left',
            minWidth: '150px'
        },
        {
            label: '中文名',
            key: 'chname',
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
    changeRole(data) {
        setTimeout(() => {
            this.confirmSetRole(data)
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
        const operateUser: any = this.$refs.operateUser
        operateUser.show(type, data)
    }
    resetPassword(row) {
        const resetPassword: any = this.$refs.resetPassword
        resetPassword.show(row)
    }
    deleteUser(row) {
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
            this.$store.dispatch('getAllUserList')
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
        this.tableLoading = true
        this.$api.UserManageMain.setUserRoles({
            id: data.id,
            roles: data.roles
        }).then(res => {
            if (!res.result) {
                this.$error(res.message)
                this.$set(data, 'roles', data.roleV1)
                return false
            }
            this.$success('设置成功！')
            this.$set(data, 'roleV1', data.roles)
        }).finally(() => {
            this.tableLoading = false
        })
    }
    getUserList() {
        const params = {
            roles: this.roles,
            page: this.pagination.current,
            page_size: this.pagination.limit,
            search: this.search
        }
        this.tableLoading = true
        this.$api.UserManageMain.getUserList(params).then(res => {
            if (!res.result) {
                return false
            }
            this.dataList = res.data.items
            this.dataList.forEach(item => {
                this.$set(item, 'roleV1', item.roles)
            })
            this.pagination.count = res.data.count
        }).finally(() => {
            this.tableLoading = false
        })
    }
    getRoleList() {
        this.$api.RoleManageMain.getAllRoleList().then(res => {
            if (!res.result) {
                return false
            }
            this.roleList = res.data
            const target = this.columns.find(item => item.key === 'roles')
            if (target) {
                target.filters = res.data.map(item => {
                    return {
                        text: item.role_name,
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
