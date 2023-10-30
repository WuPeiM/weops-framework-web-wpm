<template>
    <div class="role-manage">
        <page-explanation
            title="角色管理"
            content="您可以进行角色的新建和授权，权限的授权分为操作权限和应用权限，可从菜单操作和应用管理两个方面进行限制" />
        <div class="role-manage-wrapper">
            <div class="operate-box">
                <bk-button
                    v-permission="powerParams"
                    theme="primary"
                    title="新增角色"
                    icon="plus"
                    class="mr10"
                    @click="operateRole('add')">
                    新增角色
                </bk-button>
                <bk-input
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
                    :pagination="pagination"
                    :max-height="maxHeight"
                    @page-change="handlePageChange"
                    @page-limit-change="limitChange"
                >
                    <template slot="built_in" slot-scope="{ row }">
                        {{row.built_in ? '是' : '否'}}
                    </template>
                    <template slot="operation" slot-scope="{ row }">
                        <bk-button
                            v-permission="powerParams"
                            class="mr10"
                            theme="primary"
                            text
                            @click="personnelManage(row)">
                            人员管理
                        </bk-button>
                        <bk-button
                            v-permission="powerParams"
                            class="mr10"
                            theme="primary"
                            text
                            :disabled="row.is_super || row.role_name === 'itsm_admin_group'"
                            @click="setPermission(row)">
                            设置权限
                        </bk-button>
                        <bk-button
                            v-permission="powerParams"
                            class="mr10"
                            theme="primary"
                            text
                            :disabled="row.built_in"
                            @click="operateRole('edit', row)">
                            编辑
                        </bk-button>
                        <bk-button
                            v-permission="powerParams"
                            class="mr10"
                            theme="primary"
                            text
                            :disabled="row.built_in"
                            @click="deleteRole(row)">
                            删除
                        </bk-button>
                    </template>
                </com-table>
            </div>
            <operate-role ref="operateRole" @refreshList="refreshList" />
            <permission-settings ref="permissionSettings" />
            <auth-white-list
                ref="authWhiteList"
                :only-choose-user="true"
                title="人员管理"
                @confirm="getRoleList()" />
        </div>
    </div>
</template>

<script lang="ts">
    import ComTable from '@/components/comTable.vue'
    import OperateRole from './operateRole.vue'
    import PermissionSettings from './permissionSettings.vue'
    import { Vue, Component } from 'vue-property-decorator'
    import AuthWhiteList from '../userMange/components/authWhiteList.vue'
    import PageExplanation from '@/components/pageExplanation.vue'
    @Component({
        name: 'role-manage',
        components: {
            ComTable,
            OperateRole,
            PermissionSettings,
            AuthWhiteList,
            PageExplanation
        }
    })
    export default class RoleManage extends Vue {
        tableLoading: boolean = false
        dataList: Array<any> = []
        columns = [
            {
                label: '角色名称',
                key: 'role_name',
                align: 'left',
                minWidth: '100px'
            },
            {
                label: '角色描述',
                key: 'describe',
                align: 'left',
                minWidth: '300px'
            },
            {
                label: '是否内置',
                key: 'built_in',
                align: 'left',
                minWidth: '100px',
                scopedSlots: 'built_in'
            },
            {
                label: '创建时间',
                key: 'created_at',
                align: 'left',
                minWidth: '120'
            },
            {
                label: '操作',
                key: 'operation',
                align: 'left',
                width: '230px',
                scopedSlots: 'operation'
            }
        ]
        pagination = {
            current: 1,
            count: 1,
            limit: 20
        }
        maxHeight: string|number = ''
        search: string = ''
        get powerParams() {
            return {
                id: this.$route.name,
                type: 'operateAuth'
            }
        }
        created() {
            this.getRoleList()
            const PAGE_OCCUPIED_HEIGHT = 276
            this.maxHeight = window.innerHeight - PAGE_OCCUPIED_HEIGHT
            window.onresize = () => {
                this.maxHeight = window.innerHeight - PAGE_OCCUPIED_HEIGHT
            }
        }
        handlerIconClick() {
            this.pagination.current = 1
            this.getRoleList()
        }
        personnelManage(row) {
            this.$refs.authWhiteList.showSlider({
                user: row.users
            }, row)
        }
        setPermission(row) {
            if (!this.$BtnPermission(this.powerParams)) {
                return false
            }
            const permissionSettings: any = this.$refs.permissionSettings
            permissionSettings.show(row)
        }
        operateRole(type, data) {
            if (!this.$BtnPermission(this.powerParams)) {
                return false
            }
            const operateRole: any = this.$refs.operateRole
            operateRole.show(type, data)
        }
        refreshList() {
            this.getRoleList()
        }
        deleteRole(row) {
            if (!this.$BtnPermission(this.powerParams)) {
                return false
            }
            this.$bkInfo({
                title: '确认要删除该角色？',
                confirmLoading: true,
                confirmFn: async() => {
                    await this.confirmDelete(row)
                }
            })
        }
        async confirmDelete(row) {
            try {
                const res = await this.$api.RoleManageMain.deleteRole({
                    id: row.id
                })
                if (!res.result) {
                    this.$error(res.message)
                } else {
                    this.$success('删除成功!')
                    if (this.pagination.current > 1 && this.dataList.length === 1) {
                        this.pagination.current--
                    }
                    this.getRoleList()
                }
                return true
            } catch (e) {
                return false
            }
        }
        getRoleList() {
            const params = {
                page: this.pagination.current,
                page_size: this.pagination.limit,
                search: this.search
            }
            this.tableLoading = true
            this.$api.RoleManageMainMock.getRoleList(params).then(res => {
                if (!res.result) {
                    return false
                }
                this.dataList = res.data.items
                this.pagination.count = res.data.count
            }).finally(() => {
                this.tableLoading = false
            })
        }
        handlePageChange(val) {
            this.pagination.current = val
            this.getRoleList()
        }
        limitChange(val) {
            this.pagination.current = 1
            this.pagination.limit = val
            this.getRoleList()
        }
    }
</script>

<style lang="scss" scoped>
    .role-manage-wrapper {
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
