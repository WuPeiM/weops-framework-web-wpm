<template>
    <div id="main-container">
        <bk-exception v-if="!isRead" class="exception-wrap-item" type="403">
            <span>抱歉，您暂无该功能的权限</span>
            <div class="text-subtitle">你没有该功能的权限，请联系您的专属客户经理进行申请</div>
        </bk-exception>
        <bread-crumb v-if="isRead"></bread-crumb>
        <keep-alive :include="menuList" v-if="isRead">
            <router-view v-bind="$attrs" :user="user"></router-view>
        </keep-alive>
    </div>
</template>

<script lang="ts">
    import BreadCrumb from '@/components/base/breadCrumb'
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({
        components: {
            BreadCrumb
        }
    })
    export default class MainContainer extends Vue {
        @Prop({ type: Object, default: () => ({}) }) user: any
        @Prop({ type: Boolean, default: () => true }) isRead: boolean

        get routerKey() {
            return this.$route.params.renderKey
        }

        get menuList() {
            return this.$store.getters.cacheRouter
        }
    }
</script>

<style lang="scss" scoped>
#main-container {
    max-height: calc(100vh - 72px);
    height: calc(100vh - 72px);
    padding-bottom: 20px;
    box-sizing: border-box;
}
.exception-wrap-item {
    margin: 10px;
    height: 420px;
    padding-top: 22px;
    .text-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3A84FF;
        font-size: 14px;
        margin-top: 12px;
    }
    .text-subtitle {
        color: #979BA5;
        font-size: 14px;
        text-align: center;
        margin-top: 14px;
    }
}
</style>
