<template>
    <div id="agent-manage">
        <div class="iframe-wrapper" ref="iframeWraper">
            <wiki-iframe :url="pageUrl" :name="pageName" :link="'userCatalog'"></wiki-iframe>
        </div>
    </div>
</template>

<script lang="ts">
    import {iframeUrls} from '@/common/utils'
    import WikiIframe from '@/components/commonIframe.vue'
    import { Vue, Component } from 'vue-property-decorator'
    @Component({
        name: 'user-catalog',
        components: {
            WikiIframe
        }
    })
    export default class UserCatalog extends Vue {
        pageUrl: string = ''
        iframeHeight = null
        ownCss: boolean = false
        pageName = 'userCatalog'
        mounted() {
            this.pageUrl = iframeUrls.userCatalog
        }
    }
</script>

<style lang="scss" scoped>
#agent-manage {
    height: calc(100vh - 240px) !important;
    margin-top: 0;
    overflow: hidden;

    .iframe-wrapper {
        height: calc(100vh - 133px);
        overflow-x: hidden;
    }

    /deep/ .bk-tab-section {
        display: none !important;
    }

    .select-box {
        position: absolute;
        top: 63px;
        left: calc(100% - 190px);
        height: 32px;
    }

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: rgba(255, 255, 255, .07);
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        width: 6px;
        background: #C4C6CC;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .5);
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background-color: rgba(255, 255, 255, .07);
    }
}
</style>
