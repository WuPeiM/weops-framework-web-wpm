<template>
    <div>
        <bk-sideslider
            :width="600"
            :is-show.sync="isShow"
            :quick-close="true">
            <div slot="header">个人信息</div>
            <div slot="content" class="content-box">
                <bk-form :label-width="80" :model="formData" ref="validateForm">
                    <bk-form-item label="用户名" :required="true" :property="'username'" error-display-type="normal">
                        <bk-input :disabled="true" v-model="formData.username" placeholder="请输入用户名"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="中文名" :property="'display_name'" error-display-type="normal">
                        <bk-input v-model="formData.display_name" placeholder="请输入中文名"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="邮箱" :property="'email'" error-display-type="normal">
                        <bk-input v-model="formData.email" placeholder="请输入邮箱"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="手机号" :property="'telephone'" error-display-type="normal">
                        <bk-input v-model="formData.telephone" placeholder="请输入手机号"></bk-input>
                    </bk-form-item>
                    <bk-form-item :label-width="20">
                        <bk-button :text="true" title="primary" style="margin-right: 20px;">
                            修改信息
                        </bk-button>
                        <bk-button :text="true" title="primary">
                            重置密码
                        </bk-button>
                    </bk-form-item>

                    <bk-form-item label="密码" :required="true" :property="'password'" error-display-type="normal">
                        <bk-input v-model="formData.password" placeholder="请输入密码"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="确认密码" :required="true" :property="'confirmPassword'" error-display-type="normal">
                        <bk-input v-model="formData.confirmPassword" placeholder="请输入密码"></bk-input>
                    </bk-form-item>
                </bk-form>
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
        formData = {
            username: '',
            display_name: '',
            email: '',
            telephone: '',
            password: '',
            confirmPassword: ''
        }

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
            this.$api.UserManageMain.getUserList(params).then(res => {
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
