<template>
    <div>
        <bk-sideslider
            :width="1000"
            :is-show.sync="isShow"
            :quick-close="true">
            <div slot="header">个人信息</div>
            <div slot="content" class="content-box">
                <div class="info-box">
                    <wiki-iframe
                        :url="url"
                        name="personInfo"
                        :link="userInfo.local ? 'personInfo' : 'personInfoV1'" />
                </div>
            </div>
        </bk-sideslider>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import WikiIframe from '@/components/commonIframe.vue'

    @Component({
        components: {
            WikiIframe
        }
    })
    export default class PersonalInfo extends Vue {
        isShow:boolean = false
        url:string = window.ESB + '/accounts/profile/'
        userInfo:string = ''

        get user() {
            return this.$store.state.permission.user
        }

        show() {
            this.isShow = true
            this.getUser()
        }

        getUser() {
            const params = {
                page: 1,
                page_size: 10,
                search: this.user.username
            }
            this.$api.userManageMain.getUserList(params).then(res => {
                if (!res.result) {
                    return false
                }
                this.userInfo = res.data.items[0]
            })
        }
    }
</script>

<style lang="scss" scoped>
.content-box {
    height: calc(100vh - 60px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    .info-box {
        flex: 1;
        height: 0;
        overflow: auto;
    }
}
</style>
