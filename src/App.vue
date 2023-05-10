<template>
    <div id="app" style="min-width: 1280px;overflow-y: hidden;" v-bkloading="{ isLoading: userInfoLoading, zIndex: 9999, extCls: 'full-load' }">
        <nav-frame :is-read="isRead"></nav-frame>
        <app-auth ref="appAuth"></app-auth>
    </div>
</template>

<script>
    import appAuth from '@/components/appAuth'
    import bus from './common/bus/index'
    import navFrame from '@/components/navFrame'
    import { subsMenuList } from '@/router/frameRouter'
    export default {
        name: 'app',
        components: {
            appAuth,
            navFrame
        },
        data() {
            return {
                timer: null,
                isRead: true,
                userInfoLoading: false
            }
        },
        computed: {
            user: function() {
                return this.$store.getters.getUser
            }
        },
        watch: {
            $route: {
                handler(val) {
                    // this.user?.applications
                    // const testArr = ['health_advisor', 'monitor_mgmt', 'operational_tools', 'repository', 'big_screen', 'senior_resource', 'resource', 'itsm', 'patch_mgmt', 'auto_process']
                    const defaultMenu = ['Home', 'SysRole', 'SysUser', 'NoticeWays', 'SelfCureProcess', 'CreditManage', 'SysLog', 'SysSetting']
                    this.isRead = (this.user?.applications || ['Home']).some(item => {
                        const menus = (subsMenuList[item] || []).concat(defaultMenu)
                        return menus.includes(val.name) || (val?.meta?.parentIds || []).filter(r => menus.includes(r)).length || menus.includes(val?.meta?.relatedMenu)
                    })
                }
            }
        },
        mounted() {
            window.onbeforeunload = () => {
                if (sessionStorage.getItem('show-login-modal')) sessionStorage.removeItem('show-login-modal')
            }
            this.$bus.$on('setAppLoading', res => {
                this.userInfoLoading = res
            })
            // this.$store.commit('changeLogo', new Date().getTime())
            // this.$store.dispatch('GenerateNavLists1')
            bus.$on('show-login-modal', (params) => {
                this.$refs.appAuth.showLoginModal(params)
            })
            bus.$on('close-login-modal', () => {
                this.$refs.appAuth.hideLoginModal()
                window.location.reload() // 当前页面刷新
            })
        },
        methods: {
            checkRoute(role) {
                if (this.$route.path === '/') {
                    if (role === null) {
                        this.$router.push('/workManage')
                        this.$bkMessage({
                            message: '该用户无权限,请联系管理员',
                            theme: 'error',
                            offsetY: 80
                        })
                    } else if (role === 'user') {
                        this.$router.push('/ticketList')
                    } else {
                    // this.$router.push('/home')
                    }
                }
            }
        }
    }
</script>
<style lang="scss">

.bk-card .bk-card-head-left {
    padding-left: 30px !important;
}

.bk-card-head {
    padding: 0 20px !important;
}

.bk-form-item.operator-form-item {
    position: absolute;
}

.btn-flex-wrapper {
    .bk-form-content {
        display: flex;
        margin-left: 154px;
        .bk-button + .bk-button {
            margin-left: 8px;
        }
    }
}
html, body {
    height: 100%;
    width: 100%;
    font-size: 14px;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, .07);
}

::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    width: 6px;
    background: #CED5DB;
    -webkit-box-shadow: inset 0 0 6px #C4C6CC;
}

::-webkit-scrollbar-thumb:window-inactive {
    background-color: #CED5DB;
}
.full-load {
    z-index: 9999;
}
</style>
