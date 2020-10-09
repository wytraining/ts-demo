<template>
    <div class="editor">
        <Button @click="submit">提交</Button>
        <div class="main">
            <quill-editor style="height: 500px" ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {quillEditor} from 'vue-quill-editor';

    @Component({
        components: {
            quillEditor
        }
    })
    export default class Template extends Vue {

        toolbarOptions = [
            ['bold', 'italic', 'underline'],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],
            ['image'],                                // remove formatting button
        ];

        content: string = "this is a demo";
        editorOption: any = {

            modules: {
                toolbar: '#toolbar'
            },

            /*modules: {
                toolbar:{
                    container: toolbarOptions,  // 工具栏
                    handlers: {
                        'image': function (value) {     // 对图片进行改造，默认是通过base64 ,现通过iview 去传。
                            if (value) {
                                document.querySelector('#iviewUp input').click()
                            } else {
                                this.quill.format('image', false);
                            }
                        }
                    }
                },
            },
            imageResize: {}, //自定义拉伸
            placeholder: '请输入文章内容',*/

        }

        submit() {
            console.log(this.content);
        }

    }
</script>

<style lang="scss" scoped>
    .editor {
        padding: 100px;
    }
</style>
