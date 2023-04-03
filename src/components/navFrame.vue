<template>
    <bk-navigation
        :header-title="nav.id"
        :side-title="nav.title"
        :hover-width="190"
        :default-open="defaultOpen"
        navigation-type="top-bottom"
        :need-menu="needLeftNav"
        :head-height="headerHight"
        @toggle="handleToggle">
        <template slot="side-icon">
            <div class="monitor-logo" @click="goHome">
                <img :src="'data:image/png;base64,' + nav.logo" height="40" width="40" :alt="'logo图片'">
                <div class="credit-tip" v-if="user.expired_day <= user.notify_day">
                    <bk-popconfirm
                        :content="`WeOps许可将于${user.expired_day > 0 ? user.expired_day + '天后' : '今天'}到期，为保障正常运行，请联系您的专属客户经理及时续期。`"
                        width="280"
                        ext-cls="pop-custom">
                        <bk-button size="small" theme="danger" @click.stop="linkToCredit">
                            即将到期
                        </bk-button>
                    </bk-popconfirm>
                </div>
            </div>
        </template>
        <template slot="header">
            <div class="monitor-navigation-header">
                <ul class="top-nav">
                    <li
                        v-for="item in menuList"
                        :key="item.id"
                        :class="['top-nav-item', activeTopNav === item.id && 'active-top-nav']"
                        @click="changeTopNav(item)">
                        {{item.name}}
                    </li>
                </ul>
                <div class="other-info">
                    <bk-popover theme="light navigation-message" :arrow="false" offset="-20, 10" placement="bottom-start"
                        :tippy-options="{ 'hideOnClick': false }" ref="userPopover">
                        <div class="header-user is-left">
                            <span class="show-name hide-text" v-bk-overflow-tips>{{ user.chname }}</span>
                            <i class="bk-icon icon-down-shape"></i>
                        </div>
                        <template slot="content">
                            <ul class="monitor-navigation-admin" ref="userList" @mouseleave="hidePopover">
                                <li class="nav-item" @click="bindWeChat" v-if="!bindStatus">
                                    绑定微信
                                </li>
                                <li v-else class="nav-item" @click="unbindWeChat">
                                    解绑微信
                                </li>
                                <li class="nav-item" @click="checkPersonalInfo">
                                    个人信息
                                </li>
                                <li class="nav-item" @click="outLogin">
                                    退出登录
                                </li>
                            </ul>
                        </template>
                    </bk-popover>
                    <span class="version">v{{ version }}</span>
                    <bk-badge
                        v-if="ticketIconVisible"
                        style="width: 25px;height: 25px;"
                        class="mr20"
                        theme="success"
                        :val="ticketCount"
                        :max="99">
                        <img class="ticket" src="@/assets/svg/ticket.svg" alt="ticket" @click="goTicket" />
                    </bk-badge>
                </div>
            </div>
        </template>
        <template slot="menu">
            <bk-navigation-menu
                ref="menu"
                :default-active="defaultActive"
                :toggle-active="nav.toggle"
                style="cursor: default;"
                :key="refreshNavKey"
                item-hover-color="#3A84FF"
                @select="handleSelect">
                <bk-navigation-menu-item
                    v-for="item in leftNavList"
                    :key="item.name"
                    :has-child="item.children && !!item.children.length"
                    :url="item.url"
                    :id="item.id"
                    @click="handleNavItemClick(item)">
                    <span><i :class="[item.icon, 'icon-class']"></i>{{ item.name }}</span>
                    <div slot="child">
                        <bk-navigation-menu-item
                            v-for="child in item.children"
                            :key="child.name"
                            :id="child.id"
                            :url="child.url"
                            style="cursor: pointer;"
                            @click="handleNavItemClick(child)">
                            <span>{{ child.name }}</span>
                        </bk-navigation-menu-item>
                    </div>
                </bk-navigation-menu-item>
            </bk-navigation-menu>
        </template>
        <Container :key="renderKey" :nav-toggle="nav.toggle" :user="user" :is-read="isRead"></Container>
        <bk-dialog
            v-model="isShow"
            theme="primary"
            :mask-close="false"
            :show-footer="false"
            style="text-align: center;">
            <img :src="qrode" alt="这是一个二维码" width="200" height="200">
        </bk-dialog>
        <personal-info ref="personalInfo"></personal-info>
    </bk-navigation>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    import Container from './container.vue'
    import personalInfo from './personalInfo.vue'
    import { mapState } from 'vuex'
    @Component({
        components: {
            Container,
            personalInfo
        },
        computed: {
            ...mapState({
                permission: item => item.permission
            })
        }
    })
    export default class NavFrame extends Vue {
        @Prop({type: Boolean, default: () => true}) isRead :boolean
        defaultOpen: boolean = false
        renderKey: number = 0
        clickFlag: boolean = false
        activeTopNav: string = ''
        bindStatus: boolean = false
        leftNavList: Array<any> = []
        isShow: boolean = false
        qrode: string = ''
        timeoutId: any = ''
        title: string = this.$route.meta.title
        nav = {
            list: [],
            name: '',
            id: 'HomeFirst',
            toggle: false,
            submenuActive: false,
            title: 'WeOps',
            // 图片base64格式
            logo: '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'
        }
        defaultActive: string = ''
        refreshNavKey: string = 'leftNavkey'
        ticketIconVisible = false
        get user() {
            const user = this.permission.user
            if (user.is_super) {
                this.ticketIconVisible = true
            } else {
                this.ticketIconVisible = user.menus?.includes('Ticket') && user.applications.includes('itsm')
            }
            return user
        }
        get version() {
            const _version = this.user.version
            if (_version && _version.includes('00')) {
                return _version.replace(/00/, '-rc')
            }
            if (_version && _version.includes('99')) {
                return _version.replace(/.99/, '-ga')
            }
            return _version
        }
        get menuList() {
            return this.permission.menuList
        }
        get ticketCount() {
            return this.permission.ticketCount
        }
        get needLeftNav() {
            const target = this.menuList.find(item => item.id === this.activeTopNav)
            return !!(target && target.children)
        }
        get headerHight() {
            return this.$route.name === 'RemoteConnect' ? '0' : '52'
        }
        @Watch('$route', {
            immediate: true,
            deep: true
        })
        on$routeChanged(val) {
            if (this.clickFlag) {
                this.clickFlag = false
                this.renderKey++
            }
            this.menuList.forEach(item => {
                if (item.id === val.name || (item.sonMenuIds || []).includes(val.name)) {
                    this.activeTopNav = item.id
                    if ((item.sonMenuIds || []).includes(val.name)) {
                        this.leftNavList = item.children
                    }
                } else {
                    if (!val.meta.parentIds) {
                        return false
                    }
                    const morePage = item.sonMenuIds.map(tex => val.meta.parentIds.find(nev => nev === tex))
                    if (!morePage.every(tex => !tex)) {
                        this.activeTopNav = item.id
                        this.leftNavList = item.children
                    }
                }
            })
            this.defaultActive = this.getDefaultActive()
        }
        @Watch('leftNavList', {
            immediate: true,
            deep: true
        })
        onLeftNavListChanged(val) {
            if (this.activeTopNav === 'Setting' && !this.user.is_super) {
                val.forEach(nev => {
                    (nev.children || []).forEach((item, index) => {
                        if (['ServiceDeskManage', 'AutoProcess', 'SysRole', 'SysUser', 'NoticeWays'].includes(item.id)) {
                            nev.children.splice(index, 1)
                        }
                    })
                })
            }
        }
        created() {
            if (document.body.clientWidth > 1440) {
                this.defaultOpen = true
            }
        }
        mounted() {
            this.$bus.$on('updateLogo', () => {
                this.getLogo()
            })
            this.$bus.$on('refreshNav', from => {
                this.defaultActive = this.getDefaultActive()
                this.refreshNavKey = Vue.prototype.$random(5)
                const topNav = this.menuList.find(item => item.sonMenuIds.includes(from.name) || item.sonMenuIds.includes(from.meta.activeMenu))
                if (topNav) {
                    this.activeTopNav = topNav.id
                    this.leftNavList = topNav.children
                }
            })
            this.getLogo()
            this.title = this.$route.meta.title
            this.getBindStatus()
        }
        beforeDestroy() {
            this.$bus.$off('updateLogo')
        }
        checkPersonalInfo() {
            const personalInfo: any = this.$refs.personalInfo
            personalInfo.show()
        }
        goTicket() {
            this.$router.push({
                name: 'Ticket'
            })
        }
        getDefaultActive() {
            if (this.$route.meta.hasOwnProperty('parentIds')) {
                if (this.$route.meta.activeMenu) {
                    return this.$route.meta.activeMenu
                } else {
                    const activeMenuId = sessionStorage.getItem('activeMenuId')
                    if (activeMenuId) {
                        return JSON.parse(activeMenuId)
                    }
                }
            }
            return this.$route.name
        }
        hidePopover() {
            const userPopover:any = this.$refs['userPopover']
            userPopover.hideHandler()
        }
        async unbindWeChat() {
            const url = `${window.location.origin}/console/user_center/weixin/unbind_wx_user_info/`
            await this.$http.get(url).then(response => {
                const res = response?.data
                if (res.result) {
                    this.bindStatus = false
                    this.$api.Server.syncUsers()
                }
            })
        }
        outLogin() {
            sessionStorage.clear()
            window.location.href = `${window.location.origin}/accounts/logout/`
        }
        async getBindStatus() {
            const url = `${window.location.origin}/console/user_center/weixin/get_bind_status/`
            await this.$http.get(url).then(response => {
                const res = response?.data
                this.bindStatus = res.result
            })
        }
        async bindWeChat() {
            let url = ''
            if (window['CONSOLE_BIND_WX_TYPE'] === 'qywx') {
                url = `${window.location.origin}/console/user_center/weixin/qy/get_login_url/`
            } else {
                url = `${window.location.origin}/console/user_center/weixin/mp/get_qrcode`
            }
            await this.$http.get(url).then(response => {
                const res = response?.data
                if (res.result) {
                    if (window['CONSOLE_BIND_WX_TYPE'] === 'qywx') {
                        window.open(res.url)
                    } else {
                        this.isShow = true
                        this.qrode = res.url
                        this.getNowStatus()
                    }
                } else {
                    this.$error('获取二维码接口异常，请联系管理员')
                }
            })
        }
        getNowStatus() {
            const url = `${window.location.origin}/console/user_center/weixin/get_bind_status/`
            this.$http.get(url).then(response => {
                const res = response?.data
                if (res.result) {
                    this.bindStatus = true
                    this.isShow = false
                    clearTimeout(this.timeoutId)
                    this.$api.Server.syncUsers()
                } else {
                    this.timeoutId = setTimeout(() => {
                        this.getNowStatus()
                    }, 1000)
                }
            })
        }
        handleSelect(id, item) {
            this.nav.id = id
        }
        getLogo() {
            this.$api.Server.getLogo().then(res => {
                if (res.result) {
                    this.nav.logo = res.data.value
                }
            })
        }
        changeTopNav(item) {
            this.activeTopNav = item.id
            if (!item.children) {
                this.$router.push({
                    name: this.activeTopNav
                })
                return false
            }
            this.leftNavList = item.children
            this.$router.push({
                name: this.leftNavList[0].children ? this.leftNavList[0].children[0].id : this.leftNavList[0].id
            })
        }
        goHome() {
            this.$router.push('/')
            this.nav.name = this.$route.meta.title
        }
        handleToggle(v) {
            this.nav.toggle = v
        }
        handleNavItemClick(item) {
            this.clickFlag = true
            if (this.$route.name !== item.id) {
                this.nav.name = item.name
                sessionStorage.setItem('activeMenuId', JSON.stringify(item.id))
                this.$router.push({
                    name: item.id,
                    params: item.params || {}
                })
            }
        }
        linkToCredit() {
            if (!this.user.is_super) {
                return
            }
            this.$router.push({
                name: 'CreditManage'
            })
        }
    }
</script>

<style lang="scss">
    .bk-navigation {
        width: 100% !important;
    }
    .monitor-logo {
        display: flex;
        align-items: center;
        .credit-tip {
            position: absolute;
            top: 5px;
            left: 150px;
        }
    }
    .bk-navigation-wrapper .navigation-container {
        width: 100% !important;
        max-width: 100% !important;
    }
    .icon-class {
        font-size: 16px;
        min-width: 38px;
        text-align: left;
        display: inline-block;
    }
    .monitor-navigation-header {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-nav {
            display: flex;
            height: 100%;
            .top-nav-item {
                list-style: none;
                margin-right: 65px;
                display: flex;
                align-items: center;
                color: #96a2b9;
                font-size: 14px;
                white-space: nowrap;
                &:hover {
                    cursor: pointer;
                    color: #d3d9e4;
                }
            }
            .active-top-nav {
                color: #fff;
            }
        }
        .other-info {
            display: flex;
            height: 100%;
            align-items: center;
            flex: 1;
            flex-direction: row-reverse;
            .show-name {
                display: inline-block;
                max-width: 100px;
            }
            .ticket {
                width: 25px;
                height: 25px;
                cursor: pointer;
            }
            .cw-icon-gongdan-xian {
                font-size: 30px;
                color: #fff;
                cursor: pointer;
            }
            .bk-badge-wrapper .bk-badge.bk-success {
                border: none;
            }
            .version {
                font-size: 12px;
                margin-right: 20px;
            }
        }
    }
    .monitor-navigation-header {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 100%;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 14px;
        //justify-content: flex-end;
    }

    .monitor-navigation-header .header-title {
        color: #63656E;
        font-size: 16px;
        display: flex;
        flex: 1;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-left: -6px;
        .header-title-tip {
            color: #979BA5;
            font-size: 12px;
            margin-left: 8px;
            margin-top: 1px;
        }
    }

    .monitor-navigation-header .header-mind {
        font-size: 14px;
        position: relative;
        height: 32px;
        line-height: 32px;
        min-width: 140px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #63656e;

        .iconfont {
            font-size: 14px;
            margin: 0 4px;
        }
    }

    .monitor-navigation-header .header-mind.is-left {
        color: #63656E;
    }

    .monitor-navigation-header .header-mind.is-left:hover {
        color: #3A84FF;
    }

    .monitor-navigation-header .header-mind-mark {
        position: absolute;
        right: 8px;
        top: 8px;
        height: 7px;
        width: 7px;
        border: 1px solid #27334C;
        background-color: #EA3636;
        border-radius: 100%;
    }

    .monitor-navigation-header .header-mind-mark.is-left {
        border-color: #F0F1F5;
    }

    .monitor-navigation-header .header-mind:hover {
        cursor: pointer;
        color: #D3D9E4;
    }

    .monitor-navigation-header .header-help {
        font-size: 14px;
        position: relative;
        height: 32px;
        min-width: 140px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #63656e;
        line-height: 32px;

        .iconfont {
            font-size: 16px;
            margin: 0 4px;
        }
    }

    .monitor-navigation-header .header-help.is-left {
        color: #63656E;
    }

    .monitor-navigation-header .header-help.is-left:hover {
        color: #3A84FF;
    }

    .monitor-navigation-header .header-help:hover {
        cursor: pointer;
        color: #D3D9E4;
    }

    .monitor-navigation-header .header-user {
        height: 100%;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #96A2B9;
        margin-left: 8px;
    }

    .monitor-navigation-header .header-user .bk-icon {
        margin-left: 5px;
        font-size: 12px;
    }

    .monitor-navigation-header .header-user.is-left {
        color: #63656E;
    }

    .monitor-navigation-header .header-user.is-left:hover {
        color: #3A84FF;
    }

    .monitor-navigation-header .header-user:hover {
        cursor: pointer;
        color: #D3D9E4;
    }

    .monitor-navigation-admin {
        width: 100px;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        border-radius: 4px;
        background: #FFFFFF;
        border: 1px solid #E2E2E2;
        -webkit-box-shadow: 0 3px 4px 0 rgba(64, 112, 203, 0.06);
        box-shadow: 0 3px 4px 0 rgba(64, 112, 203, 0.06);
        padding: 6px 0;
        margin: 0;
        color: #63656E;
    }

    .monitor-navigation-admin .nav-item {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 32px;
        flex: 0 0 32px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 20px;
        list-style: none;
    }

    .monitor-navigation-admin .nav-item:hover {
        color: #3A84FF;
        cursor: pointer;
        background-color: #F0F1F5;
    }

    .tippy-popper .tippy-tooltip.navigation-message-theme {
        padding: 0;
        border-radius: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .bk-icon {
        &.icon-arrows-left {
            font-size: 30px;
            margin-right: 10px;
            color: #3A84FF;
            cursor: pointer;
        }
    }
    .navigation-sbmenu,
    .navigation-menu-item {
        .cw-icon {
            text-align: left !important;
        }
    }
</style>
