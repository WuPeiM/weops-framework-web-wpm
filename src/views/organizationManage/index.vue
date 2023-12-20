<template>
    <div class="sys-organization">
        <page-explanation
            title="组织管理"
            content="您可以创建组织，用于管理一组用户，或者进行角色授权，您可以创建、修改和删除组织，并管理其下级单位。" />
        <div class="organization-manage">
            <div class="operate-box">
                <div>
                    <bk-button
                        theme="primary"
                        title="新增组织"
                        class="mr10"
                        @click="operateOrganization('add')">
                        新增组织
                    </bk-button>
                    <bk-button
                        theme="default"
                        title="批量删除"
                        class="mr10">
                        批量删除
                    </bk-button>
                </div>
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
            <div class="tree-box">
                <bk-big-tree
                    enable-title-tip
                    ref="tree"
                    :selectable="true"
                    :show-checkbox="true"
                    :data="nodeData">
                    <div slot-scope="{ node,data }">
                        <div class="node-box">
                            <span @click="look(data, node)">{{ data.name }}---{{ data.level }}</span>
                            <div class="operate-node">
                                <bk-button size="small" :text="true" title="primary" @click.stop="operateOrganization('addSub')">
                                    添加子组
                                </bk-button>
                                <bk-button size="small" :text="true" title="primary" @click.stop="personnelManage(node)">
                                    人员管理
                                </bk-button>
                                <bk-button size="small" :text="true" title="primary" @click.stop="roleManage(node)">
                                    角色管理
                                </bk-button>
                                <bk-button size="small" :text="true" title="primary" @click.stop="operateOrganization('edit', node)">
                                    编辑
                                </bk-button>
                                <bk-button size="small" :text="true" title="primary" @click.stop="deleteNode(node)">
                                    删除
                                </bk-button>
                            </div>
                        </div>
                    </div>
                </bk-big-tree>
            </div>
        </div>
        <operate-organization ref="operateOrganization" @refreshList="refreshList" />
        <auth-white-list
            ref="authWhiteList"
            :only-choose-user="true"
            title="人员管理"
            @confirm="getRoleList()" />
        <!-- <auth-white-list
            ref="roleManageList"
            title="角色管理"
            @confirm="getRoleList()" /> -->
        <role-manage
            ref="roleManage"
            title="角色管理" />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import PageExplanation from '@/components/pageExplanation.vue'
    import operateOrganization from './operateOrganization.vue'
    import AuthWhiteList from '../userMange/components/authWhiteList.vue'
    import RoleManage from './roleManage.vue'
    @Component({
        name: 'organization-manage',
        components: {
            PageExplanation,
            operateOrganization,
            AuthWhiteList,
            RoleManage
        }
    })
    export default class OrganizationManage extends Vue {
        search: string = ''
        nodeData: any[] = this.getNodes(null, 20, 3)
        get user() {
            return this.$store.state.permission.user
        }
        look(data, node) {
            console.log('data', data, 'node', node)
        }
        // 新建/编辑组织
        operateOrganization(type: string, data?: any) {
            console.log('type')
            const operateOrganization: any = this.$refs.operateOrganization
            operateOrganization.show(type, data)
        }
        // 搜索
        handlerIconClick() {
            console.log('搜搜', this.search)
        }
        getNodes(parent, childCount, deep) {
            const nodes = []
            for (let i = 0; i < childCount; i++) {
                const node = {
                    id: parent ? `${parent.id}-${i}` : `${i}`,
                    level: parent ? parent.level + 1 : 0,
                    name: parent ? `${parent.name}-${i}` : `组织-${i}`,
                    children: null
                }
                if (node.level < deep) {
                    node.children = this.getNodes(node, 3, deep)
                }
                nodes.push(node)
            }
            return nodes
        }
        // 删除节点
        deleteNode(node) {
            console.log('删除节点', node)
            this.$bkInfo({
                title: '确认要删除该组织？',
                confirmLoading: true,
                confirmFn: async() => {
                    await this.confirmDelete(node)
                }
            })
        }
        confirmDelete(node) {
            this.nodeData = this.nodeData.filter(item => item.id !== node.id)
        }
        // 刷新
        refreshList() {
            console.log('刷新')
        }
        getRoleList() {
            console.log('getRoleList')
        }
        async personnelManage(row) {
            // if (!this.$BtnPermission({
            //     id: this.$route.name,
            //     type: 'SysRole_users_manage'
            // })) {
            //     return false
            // }
            // const res = await this.$api.RoleManageMain.getRoleAllUser({id: row.id})
            // res.data = res.data.map(item => ({
            //     id: item.id,
            //     bk_username: item.username,
            //     chname: item.lastName
            // }))
            this.$refs.authWhiteList.showSlider({
                user: []
            }, row)
        }

        roleManage(node) {
            this.$refs.roleManage.showSlider({
                role: []
            }, node)
        }
    }
</script>

<style lang="scss" scoped>
.organization-manage {
    height: 100%;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .operate-box {
        display: flex;
        justify-content: space-between;
    }
    .tree-box {
        margin-top: 20px;
        flex: 1;
        .node-box {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
