<template>
 <div id="YMeditor">
   <div class="ctr_editor">
     <h1>
       编辑图文
     </h1>
     <button>保存</button>
     <quill-editor :options="editorOption"
                   ref="QuillEditor"
                   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                   @change="onEditorChange($event)"
                   @ready="onEditorReady($event)">
     </quill-editor>
   </div>
   <!--<quill-editor :options="editorOption"-->
                 <!--ref="QuillEditor"-->
                 <!--@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"-->
                 <!--@change="onEditorChange($event)"-->
                 <!--@ready="onEditorReady($event)">-->
   <!--</quill-editor>-->
 </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    computed: {
      editor() {
        return this.$refs.QuillEditor.quill
      },
      components: {
        quillEditor
      },
      methods: {
        onEditorChange({editor, html, text}) {
          this.content = html;
          console.log(html)
        },
        onEditorFocus() {

        },
        onEditorReady() {

        },
        onEditorBlur() {

        },
      }
    }
  }
</script>
<style>
.ctr_editor{
  border:1px solid #DEDEDE;
  width: 50%;
  margin: 0 auto;
}
.ctr_editor > button{

}
</style>
