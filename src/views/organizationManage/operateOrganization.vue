<template>
    <bk-dialog
        v-model="visible"
        :position="{ top: 150 }"
        theme="primary"
        width="600"
        :mask-close="false"
        header-position="left"
        :title="title"
        @after-leave="closeDialog"
    >
        <div class="content-box" v-bkloading="{ isLoading: loading, zIndex: 10 }">
            <bk-form :label-width="90" :model="formData" :rules="rules" ref="organizationValidateForm">
                <bk-form-item label="名称" :required="true" :property="'organization_name'">
                    <bk-input v-model="formData.organization_name" placeholder="请输入组织名称"></bk-input>
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
    @Component
    export default class OperateOrganization extends Vue {
        visible: boolean = false
        loading: boolean = false
        roleInfo: any = ''
        type: string = ''
        formData = {
            organization_name: '',
            id: ''
        }
        rules = {
            organization_name: [
                {
                    required: true,
                    message: '必填项',
                    trigger: 'blur'
                }
            ]
        }
        get title() {
            if (this.type === 'add') {
                return '新增组织'
            } else if (this.type === 'edit') {
                return '编辑组织'
            } else if (this.type === 'addSub') {
                return '添加子组'
            }
        }
        show(type, data) {
            this.visible = true
            this.type = type
            // this.formData.organization_name = ''
            console.log('有data', data)
            if (['edit', 'copy'].includes(this.type)) {
                this.roleInfo = data
                this.formData.organization_name = data.name
                if (this.type === 'edit') {
                    this.formData.id = data.id
                }
            }
        }
        close() {
            this.visible = false
        }
        confirm() {
            const organizationValidateForm: any = this.$refs.organizationValidateForm
            organizationValidateForm.validate().then(validator => {
                let url = ''
                let params: any = {}
                if (['add'].includes(this.type)) {
                    url = 'createOrganization'
                    params.organization_name = this.formData.organization_name
                } else {
                    url = 'editOrganization'
                    params = {
                        id: this.formData.id
                    }
                }
                // this.loading = true
                // this.$api.RoleManageMain[url](params).then(res => {
                //     if (!res.result) {
                //         this.$error(res.message)
                //         return false
                //     }
                //     this.$success(`${this.title}成功!`)
                //     this.$emit('refreshList')
                //     this.close()
                // }).finally(() => {
                //     this.loading = false
                // })
                this.close()
                console.log('发送接口', url, this.type)
            })
        }
        closeDialog() {
            Object.assign(this.$data, this.$options.data.call(this))
            console.log('likaiq')
            const organizationValidateForm: any = this.$refs.organizationValidateForm
            organizationValidateForm.clearError()
        }
    }
</script>
