<template>
    <bk-sideslider
        :width="850"
        :quick-close="true"
        :before-close="handleClose"
        :is-show.sync="visible"
        ext-cls="common-dialog-wrapper">
        <div slot="header">
            {{ title }}
        </div>
        <div slot="content"
            class="common-dialog-wrapper-main">
            <div class="auth-white-list">
                <div class="list-container">
                    <div class="header">
                        <!-- <menu-tab
                            v-if="!onlyChooseUser"
                            :panels="panels"
                            v-model="active"
                            type="capsule"
                            @change="changeMenu">
                        </menu-tab> -->
                        <bk-input
                            clearable
                            style="width: 300px;"
                            :placeholder="'请输入关键字搜索'"
                            :right-icon="'bk-icon icon-search'"
                            v-model="searchValue"
                            @clear="handleSearch"
                            @right-icon-click="handleSearch"
                            @enter="handleSearch">
                        </bk-input>
                    </div>
                    <com-table
                        class="mt20 table-container"
                        ref="userTable"
                        :data="dataList"
                        :pagination="pagination"
                        v-bkloading="{ isLoading: loading, zIndex: 10 }"
                        :columns="roleColumns"
                        @select="handleSelect"
                        @select-all="handleAllSelect"
                        @page-change="handlePageChange"
                        @page-limit-change="handleLimitChange">
                    </com-table>
                </div>
                <div class="selection-container">
                    <p>已选择（共<span>{{allSelected.length}}</span>条）<span class="clear" @click="handleClear">清空</span></p>
                    <ul>
                        <li v-for="item in allSelected" :key="item.id + item.type">
                            {{ item.type === 'role' ? item.name : `${item.chname}(${item.bk_username})` }}
                            <span>{{ item.type === 'role' ? '角色' : '用户' }}</span>
                            <bk-icon type="close" @click="handleRemove(item)" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <template slot="footer">
            <bk-button
                class="mr10"
                :title="'确认'"
                :theme="'primary'"
                :loading="isConfirm"
                @click="handleConfirm()">
                确认
            </bk-button>
            <bk-button
                type="submit"
                :theme="'default'"
                :title="'取消'"
                :disabled="isConfirm"
                @click="handleClose()">
                取消
            </bk-button>
        </template>
    </bk-sideslider>
</template>

<script lang="ts">
    import MenuTab from '@/components/menuTab.vue'
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { Pagination, TableData } from '@/types'
    import ComTable from '@/components/comTable.vue'

    @Component({
        components: {
            MenuTab,
            ComTable
        }
    })
    export default class RoleManage extends Vue {
        // @Prop({
        //     type: Boolean,
        //     default: () => false
        // })
        // isMyCredentials: boolean
        @Prop({
            type: String,
            default: () => '白名单'
        })
        title: string
        // 只进行人员选择
        // @Prop({
        //     type: Boolean,
        //     default: () => false
        // })
        // onlyChooseUser: boolean
        visible: boolean = false
        loading: boolean = false
        isConfirm: boolean = false
        // panels: Array<{
        //     label: string,
        //     name: string
        // }> = [
        //     {
        //         label: '角色',
        //         name: 'role'
        //     },
        //     {
        //         label: '用户',
        //         name: 'user'
        //     }
        // ]
        active: string = 'role'
        pagination: Pagination = {
            current: 1,
            count: 0,
            limit: 20,
            small: true
        }
        // groupColumns: Array<TableData> = [
        //     {
        //         type: 'selection'
        //     },
        //     {
        //         label: '角色名称',
        //         key: 'role_name'
        //     },
        //     {
        //         label: '用户数',
        //         key: 'user_count'
        //     }
        // ]
        // userColumns: Array<TableData> = [
        //     {
        //         type: 'selection',
        //         selectable: (row) => {
        //             if (this.onlyChooseUser && row.bk_username === 'admin') {
        //                 return !row.isChecked
        //             }
        //             return true
        //         }
        //     },
        //     {
        //         label: '中文名',
        //         key: 'chname'
        //     },
        //     {
        //         label: '用户名',
        //         key: 'bk_username'
        //     }
        // ]
        // 角色管理
        roleColumns: Array<TableData> = [
            {
                type: 'selection'
                // selectable: (row) => {
                //     if (!this.onlyChooseUser && row.bk_username === 'admin') {
                //         return !row.isChecked
                //     }
                //     return true
                // }
            },
            {
                label: '角色名称',
                key: 'name'
            },
            {
                label: '角色描述',
                key: 'description'
            }
        ]
        searchValue: string = ''
        rawDataList: any = []
        dataList: any = []
        selectedData:any = {}
        allSelected:any = []
        credentialsDetail: any = {}
        roleDetail: any = {}
        get isGroup() {
            return this.active === 'role'
        }

        async showSlider(list, row?) {
            this.visible = true
            this.searchValue = ''
            // if (this.onlyChooseUser) {
            //     this.roleDetail = row
            // }
            const originList = {
                role: [],
                user: []
            }
            // if (this.isMyCredentials) {
            //     this.credentialsDetail = row
            //     const { result, data } = await this.$api.remoteConnect.getCredDetail({id: row.id})
            //     if (result) {
            //         originList.role = data.role
            //         originList.user = data.user
            //     }
            // }
            // this.selectedData = this.$deepClone(this.isMyCredentials ? originList : (list || originList))
            this.selectedData = this.$deepClone((list || originList))
            this.handleAllSelected()
            // this.changeMenu(this.onlyChooseUser ? 'user' : 'role')
            this.getDataList()
        }

        handleAllSelected() {
            this.allSelected = []
            Object.keys(this.selectedData).forEach(key => {
                this.allSelected = this.allSelected.concat(this.selectedData[key].map(r => ({ ...r, type: key })))
            })
        }

        // changeMenu(active) {
        //     this.active = active
        //     this.pagination.current = 1
        //     this.$refs.userTable?.updateColumns(this.roleColumns)
        //     this.getDataList()
        // }

        async getDataList() {
            const params = {
                page: this.pagination.current,
                page_size: this.pagination.limit,
                search: this.searchValue
            }
            this.loading = true
            try {
                // const res = this.isGroup
                //     ? await this.$api.userManage.searchRoleList(params)
                //     : await this.$api.userManage.searchUserList(params)
                const res = await this.$api.RoleManageMain.getRoleList(params)
                res.data.items = res.data.map(item => ({id: item.id, name: item.name, description: item.description}))
                if (!res.result) {
                    this.rawDataList = []
                    // this.dataList = []
                    this.pagination.count = 0
                    return this.$error(res.message)
                }
                const selectMap = Object.fromEntries((this.selectedData[this.active] || []).map(r => [r.id, r]))
                console.log('selectMap', selectMap)
                const isAdminGroup = this.roleDetail?.role_name === 'admin_group'
                this.rawDataList = (res.data?.items || []).map(item => ({
                    ...item,
                    isChecked: isAdminGroup ? selectMap[item.id] : true
                }))
                console.log('this.rawDataList', this.rawDataList)
                this.pagination.count = res.data.length
                this.$nextTick(() => {
                    this.rawDataList.forEach(item => {
                        if (selectMap[item.id]) {
                            this.$refs.userTable?.toggleRowSelection(item, true)
                        }
                    })
                    const {current, limit} = this.pagination
                    // 搜索的关键字
                    this.dataList = this.rawDataList.filter(item => item.name.includes(this.searchValue))
                    // 分页
                    this.dataList = this.dataList.slice((current - 1) * limit, current * limit)
                    console.log('tis.', this.rawDataList)
                })
            } finally {
                this.loading = false
            }
        }

        handleConfirm() {
            // if (this.isMyCredentials) {
            //     this.imPower()
            // } else if (this.onlyChooseUser) {
            //     this.setUsersByRole()
            // } else {
            //     this.visible = false
            //     this.$emit('confirm', this.selectedData)
            // }
            this.visible = false
            console.log('选中的', this.selectedData)
            this.$emit('confirm', this.selectedData)
        }
        async setUsersByRole() {
            this.isConfirm = true
            try {
                const res = await this.$api.userManage.setUsersByRole({
                    users: this.selectedData.user.map(item => item.id),
                    id: this.roleDetail?.id
                })
                const { result, message } = res
                if (!result) {
                    this.$error(message)
                    return false
                }
                this.$success('设置人员成功')
                this.handleClose()
                this.$emit('confirm')
            } finally {
                this.isConfirm = false
            }
        }
        // imPower() {
        //     this.isConfirm = true
        //     this.$api.remoteConnect.setCredAuthList({
        //         id: this.credentialsDetail.id,
        //         body: {
        //             user_list: this.selectedData.user.map(item => item.bk_username),
        //             role_list: this.selectedData.role.map(item => item.id)
        //         }
        //     }).then(res => {
        //         const { result, message } = res
        //         if (!result) {
        //             this.$error(message)
        //             return false
        //         }
        //         this.$success('授权成功')
        //         this.handleClose()
        //     }).finally(() => {
        //         this.isConfirm = false
        //     })
        // }

        handleClose() {
            this.visible = false
        }

        handleSelect(selection, row) {
            const current = selection.find(select => select.id === row.id)
            if (current) {
                this.selectedData[this.active].push(row)
            } else {
                const index = this.selectedData[this.active].findIndex(r => r.id === row.id)
                this.selectedData[this.active].splice(index, 1)
            }
            this.handleAllSelected()
        }

        handleAllSelect(selection) {
            const isSelected = !!selection.length
            this.dataList.forEach(item => {
                if (isSelected) {
                    const current = this.selectedData[this.active].find(r => r.id === item.id)
                    !current && this.selectedData[this.active].push(item)
                } else {
                    const index = this.selectedData[this.active].findIndex(r => r.id === item.id)
                    this.selectedData[this.active].splice(index, 1)
                }
            })
            this.handleAllSelected()
        }

        handlePageChange(page) {
            this.pagination.current = page
            // this.getDataList()
            const {limit} = this.pagination
            // this.dataList = this.rawDataList.filter(item => item.name.includes(this.searchValue)).slice((page - 1) * limit, page * limit)
            this.dataList = this.dataList.slice((page - 1) * limit, page * limit)
        }

        handleLimitChange(size) {
            this.pagination.current = 1
            this.pagination.limit = size
            // this.dataList = this.rawDataList.filter(item => item.name.includes(this.searchValue)).slice(0, size)
            this.dataList = this.rawDataList.slice(0, size)
            // this.getDataList()
        }

        handleSearch() {
            this.pagination.current = 1
            // this.dataList = this.rawDataList.filter(item => item.name.includes(this.searchValue))
            this.getDataList()
        }

        handleRemove(row) {
            const index = this.allSelected.findIndex(r => r.id === row.id && r.type === row.type)
            if (index || index === 0) {
                this.allSelected.splice(index, 1)
            }
            this.$nextTick(() => {
                this.dataList.forEach(item => {
                    if (item.id === row.id) {
                        this.$refs.userTable?.toggleRowSelection(item, false)
                    }
                })
                // this.rawDataList.forEach(item => {
                //     if (item.id === row.id) {
                //         this.$refs.userTable?.toggleRowSelection(item, false)
                //     }
                // })
            })
            // 移除用户或角色后，更新map数据
            const selectedIndex = this.selectedData[row.type].findIndex(r => r.id === row.id)
            this.selectedData[row.type].splice(selectedIndex, 1)
        }

        handleClear() {
            this.selectedData = {
                role: [],
                user: []
            }
            this.handleAllSelected()
            this.$nextTick(() => {
                this.dataList.forEach(item => {
                    // const isAdmin = this.initChooseAdmin && item?.bk_username === 'admin'
                    this.$refs.userTable?.toggleRowSelection(item, false)
                })
            })
        }
    }
</script>

<style scoped lang="scss">
.auth-white-list {
    height: 100%;
    display: flex;
    .list-container {
        width: 60%;
        .header {
            display: flex;
            align-items: center;
            .menu-type-ul {
                flex: 1;
                //margin-top: 5px;
            }
        }
        .table-container {
            /deep/.bk-table-body-wrapper {
                max-height: calc(100vh - 315px) !important;
                overflow-y: scroll;
            }
        }
    }
    .selection-container {
        border: 1px solid #dcdee5;
        border-bottom: none;
        background-color: #f5f7fa;
        padding: 12px 24px;
        height: 100%;
        flex: 1;
        margin-left: 10px;
        overflow-y: scroll;
        > p {
            justify-content: space-between;
            font-size: 12px;
            margin: 0 0 10px 0;
            color: #63656e;
            span {
                display: inline-block;
                color: $cw-color-primary;
            }
            .clear {
                float: right;
                cursor: pointer;
            }
        }
        ul {
            margin-top: 15px;
            li {
                background: #fff;
                padding: 10px;
                position: relative;
                border-bottom: 1px solid $cw-color-border-0;
                &:last-child {
                    border: none;
                }
                span {
                    float: right;
                    font-size: 12px;
                    color: $cw-color-text-3;
                    padding-right: 10px;
                }
                > i {
                    display: none;
                    position: absolute;
                    right: 5px;
                    top: 12px;
                    font-size: 18px;
                }
                &:hover {
                    cursor: pointer;
                    i {
                        display: inline-block;
                        &:hover {
                            color: $cw-color-primary;
                        }
                    }
                }
            }
        }
    }
}
</style>
