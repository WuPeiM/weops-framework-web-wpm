<template>
    <bk-sideslider
        :is-show.sync="isShow"
        :quick-close="true"
        title="权限管理"
        :width="850"
    >
        <div slot="content" class="content-box">
            <menu-tab :panels="panels" :active-panel="active" @click="toTabMenu"></menu-tab>
            <div class="main-box" v-bkloading="{ isLoading: loading, zIndex: 10 }">
                <operation-permission
                    v-show="active === 'operationPermission'"
                    :role="role"
                    ref="menuPermission"
                    @getMenuLoading="getMenuLoading"
                    @getLatestMenu="getLatestMenu"
                >
                </operation-permission>
                <app-permission
                    v-show="active === 'appPermission'"
                    :role="role"
                    ref="appPermission"
                    @getAppLoading="getAppLoading"
                    @getLatestApp="getLatestApp"
                >
                </app-permission>
                <instance-permission
                    v-show="active === 'instancePermission'"
                    :role="role"
                    ref="instancePermission">
                </instance-permission>
                <!-- <log-permission
                    v-show="active === 'logPermission'"
                    :role="role"
                    @getAppLoading="getAppLoading"
                    ref="logPermission">
                </log-permission> -->
            </div>
            <div class="footer-box">
                <bk-button v-if="active !== 'instancePermission'" :disabled="disableBtn || loading" :theme="'primary'" :title="'确定'" @click="confirm">
                    确定
                </bk-button>
            </div>
        </div>
    </bk-sideslider>
</template>

<script lang="ts">
    import AppPermission from './appPermission.vue'
    import OperationPermission from './operationPermission.vue'
    import InstancePermission from './instancePermission.vue'
    import menuTab from '@/components/menuTab.vue'
    import { Vue, Component } from 'vue-property-decorator'
    @Component({
        name: 'permission-settings',
        components: {
            AppPermission,
            OperationPermission,
            InstancePermission,
            menuTab
        }
    })
    export default class permissionSettings extends Vue {
        isShow: boolean = false
        panels = [
            { name: 'operationPermission', label: '操作权限' },
            { name: 'instancePermission', label: '实例权限' }
        ]
        active: string = 'operationPermission'
        role: any = {}
        menuLoading: boolean = false
        appLoading: boolean = false
        latestMenu = []
        latestOperate = []
        latestApp = []
        loading: boolean = false
        get disableBtn() {
            return this.active === 'operationPermission' ? this.menuLoading : this.appLoading
        }
        getLatestMenu(data) {
            this.latestMenu = data.checkAuthIds
            this.latestOperate = data.operateAuthIds
        }
        getLatestApp(data) {
            this.latestApp = data
        }
        getMenuLoading(loading) {
            this.menuLoading = loading
        }
        getAppLoading(loading, visible) {
            this.appLoading = loading
            if (visible === 'hide') {
                this.isShow = false
            }
        }
        show(data) {
            this.isShow = true
            this.role = data
            this.active = 'operationPermission'
        }
        toTabMenu(item) {
            this.active = item.name
        }
        confirm() {
            const menuPermission: any = this.$refs.menuPermission
            menuPermission.getLatestMenu()
            const appPermission: any = this.$refs.appPermission
            appPermission.getLatestApp()
            this.loading = true
            this.$api.roleManageMain.setRoleMenu({
                id: this.role.id,
                menu_ids: this.latestMenu || [],
                operate_ids: this.latestOperate || [],
                app_ids: this.latestApp || []
            }).then(res => {
                const { result, message } = res
                if (!result) {
                    this.$error(message)
                    return false
                }
                this.$success('权限设置成功!')
                this.isShow = false
            }).finally(() => {
                this.loading = false
            })
        }
    }
</script>

<style scoped lang="scss">
    .content-box {
        height: calc(100vh - 60px);
        padding: 20px 20px 0 20px;
        background-color: #f5f7fa;
        display: flex;
        flex-direction: column;
        .main-box {
            flex: 1;
            height: 0;
            background-color: #fff;
        }
        .footer-box {
            padding-right: 20px;
            background-color: #fff;
            height: 70px;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
        }
    }
</style>
