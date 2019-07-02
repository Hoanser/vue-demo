<template>
  <div class="publish-wrap">
    <com-header/>
    <div class="publish">
      <div class="publishbox">
        <h3 class="pupublishbox-title">发表帖子</h3>
        <div class="topicbox"><input type="text" name="etitle" class="topic-title" v-model="title"></div>
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <div class="btngroup"><button @click="publishNew">发表帖子</button></div>
      </div>
    </div>
    <com-foot/>
  </div>
</template>

<script>
// import
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import comHeader from 'src/components/header'
import comFoot from 'src/components/foot'

// mount with global
Vue.use(VueQuillEditor)

export default {
  components: {
    comHeader, comFoot
  },
  data () {
    return {
      /* focusStatus: false, */
      modal: 0,
      label: 0,
      title: '',
      content: '',
      editorOption: {
        placeholder: '输入内容'
      }
    }
  },
  methods: {
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorReady () {},
    publishNew () {
      var content = this.content
      var title = this.title
      var modal = this.modal
      var label = this.label
      if (this.title.trim() === '') {
        alert('主题不能为空')
        this.focusStatus = true
        return
      }
      if (this.content.trim() === '') {
        alert('内容不能为空')
        return
      }
      this.$http.post('/api/user/publish', {
        username: sessionStorage.getItem('username'),
        content: content,
        title: title,
        modal: modal,
        label: label
      }, {}).then((response) => {
        var eid = response.body.data.insertId
        if (response.body.status === 1) {
          /* alert('发布成功') */
          this.$router.push({name: 'Showessay', params: { eid: eid }})
        } else {
          alert('发布失败')
        }
      })
    }
    /* changefocusStatus () {
      this.focusStatus = false
    } */
  },
  /* directives: {
    focus: {
      update: function (el, {value}) {
        el.focus()
      }
    }
  }, */
  // get the current quill instace object.
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    if (!sessionStorage.getItem('username')) {
      this.$router.push('/login')
      return
    }
    if (this.$route.params) {
      this.modal = this.$route.params.modal
      this.label = this.$route.params.label
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
  .publish-wrap{
    margin: 100px auto 0;
  }
  .publish-wrap:after{
    content: "";
    display: block;
    clear: both;
  }
  .ql-container .ql-editor {
    height: 300px;
    min-height: 300px;
    padding-bottom: 1em;
  }
  body{background: #F5F5F5;}
  .publish{
    .publishbox{
      margin: 0 auto;
      width: 1140px;
      padding: 60px 90px;
      border-radius: 5px;
      background: #fff;
      .pupublishbox-title{
        font-weight: normal;
        color: #df001f;
      }
      .topicbox{
        margin: 20px 0;
        .topic-title{
          outline: none;
          width: 638px;
          height: 34px;
          line-height: 34px;
          border-radius: 4px;
          border: 1px solid #e6e6e6;
          text-indent: 2em;
          font-size: 14px;
        }
      }
      .btngroup{
        text-align: center;
        margin-top: 50px;
        button{
          width: 100px;
          height: 40px;
          border-radius: 4px;
          color: #fff;
          background-color: #e60e19;
          border: 1px solid #d94030;
          font-size: 14px;
          text-align: center;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
</style>
