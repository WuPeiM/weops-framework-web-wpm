<template>
    <div class="title">
        {{ text }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    @Component({
        name: 'hello-world'
    })
    export default class HelloWorld extends Vue {
        text: string = 'HelloWorld'
    }
</script>

<style lang="scss">
.title {
    font-size: 18px;
}
</style>
