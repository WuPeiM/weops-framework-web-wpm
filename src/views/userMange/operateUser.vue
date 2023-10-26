<template>
    <bk-dialog
        v-model="visible"
        :position="{ top: 100 }"
        theme="primary"
        width="600"
        :mask-close="false"
        header-position="left"
        :title="type === 'add' ? '新增用户' : '编辑用户'"
        @after-leave="closeDialog"
    >
        <div class="content-box" v-bkloading="{ isLoading: loading, zIndex: 10 }">
            <bk-form :label-width="75" :model="formData" :rules="rules" ref="validateForm">
                <bk-form-item label="用户名" :required="true" :property="'username'" error-display-type="normal">
                    <bk-input :disabled="type === 'edit'" v-model="formData.username" placeholder="请输入用户名"></bk-input>
                </bk-form-item>
                <bk-form-item label="中文名" :required="true" :property="'display_name'" error-display-type="normal">
                    <bk-input v-model="formData.display_name" placeholder="请输入中文名"></bk-input>
                </bk-form-item>
                <bk-form-item label="邮箱" :required="true" :property="'email'" error-display-type="normal">
                    <bk-input v-model="formData.email" placeholder="请输入邮箱"></bk-input>
                </bk-form-item>
                <bk-form-item label="手机号" :required="true" :property="'telephone'" error-display-type="normal">
                    <bk-input v-model="formData.telephone" placeholder="请输入手机号"></bk-input>
                </bk-form-item>
                <bk-form-item label="上级" error-display-type="normal">
                    <bk-select
                        v-model="formData.leader"
                        multiple
                        searchable>
                        <bk-option v-for="option in leaderList"
                            :key="option.bk_user_id"
                            :id="option.bk_user_id"
                            :name="option.chname"
                            :disabled="option.disabled">
                        </bk-option>
                    </bk-select>
                </bk-form-item>
            </bk-form>
        </div>
        <template slot="footer">
            <bk-button :disabled="loading" :theme="'primary'" :title="'确认'" class="mr10" @click="confirm">
                确认
            </bk-button>
            <bk-button :theme="'default'" type="submit" :title="'取消'" @click="close">
                取消
            </bk-button>
        </template>
    </bk-dialog>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'

    @Component({
        name: 'operate-user'
    })
    export default class OperateUser extends Vue {
        visible: boolean = false
        loading: boolean = false
        userInfo: any = {}
        type: string = ''
        formData = {
            username: '',
            display_name: '',
            email: '',
            telephone: '',
            leader: []
        }
        rules = {
            username: [
                {
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }
            ],
            display_name: [
                {
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }
            ],
            email: [
                {
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                },
                {
                    regex: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                    message: '请输入正确的邮箱地址',
                    trigger: 'blur'
                }
            ],
            telephone: [
                {
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                },
                {
                    regex: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '请输入正确的手机格式',
                    trigger: 'blur'
                }
            ]
        }
        leaderList: Array<any> = []

        getUserList() {
            this.loading = true
            this.$api.Server.getBkUsers({ page_size: -1 }).then(res => {
                if (!res.result) {
                    return this.$error(res.message)
                }
                res.data.items.forEach(item => {
                    if (this.userInfo.bk_user_id === item.bk_user_id) {
                        item.disabled = true
                    }
                })
                this.leaderList = res.data.items
            }).finally(() => {
                this.loading = false
            })
       }
        show(type, data) {
            this.visible = true
            this.type = type
            if (this.type === 'edit') {
                this.userInfo = data
                this.formData.username = data.bk_username
                this.formData.display_name = data.chname
                this.formData.email = data.email
                this.formData.telephone = data.phone
                this.formData.leader = data.leaders.map(item => item.bk_user_id)
            }
            this.getUserList()
        }
        close() {
            this.visible = false
        }
        confirm() {
            const validateForm: any = this.$refs.validateForm
            validateForm.validate().then(validator => {
                let url = 'createUser'
                let params = {
                    ...this.formData
                }
                if (this.type !== 'add') {
                    url = 'editUser'
                    params = {
                        id: this.userInfo.id,
                        bk_user_id: this.userInfo.bk_user_id,
                        display_name: this.formData.display_name,
                        email: this.formData.email,
                        telephone: this.formData.telephone,
                        leader: this.formData.leader
                    }
                }
                this.loading = true
                this.$api.UserManageMain[url](params).then(res => {
                    if (!res.result) {
                        this.$error(res.message)
                        return false
                    }
                    this.$success(`${this.type === 'add' ? '新增' : '编辑'}用户成功!`)
                    this.$emit('refreshList')
                    this.$store.dispatch('getAllUserList')
                    this.close()
                }).finally(() => {
                    this.loading = false
                })
            })
        }
        closeDialog() {
            Object.assign(this.$data, this.$options.data.call(this))
            const validateForm: any = this.$refs.validateForm
            validateForm.clearError()
        }
    }
</script>
