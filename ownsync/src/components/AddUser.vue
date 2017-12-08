<template>
  <div>
    <mt-header title="添加成员">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click.native="handleSave">保存</mt-button>
    </mt-header>
    <div class="page-part">
      <mt-field label="名字" placeholder="请输入您的名字" type="text" v-model="userForm.nickname"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="userForm.username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userForm.password"></mt-field>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'

  export default {
    name: 'AddUser',
    data () {
      return {
        userForm: {
          username: '',
          nickname: '',
          password: '123456'
        }
      }
    },
    methods: {
      handleSave () {
        if (!this.userForm.username && !this.userForm.nickname) {
          MessageBox({
            message: '手机号码,名字不能为空!'
          })
        } else {
          let that = this
          this.$store.dispatch('AddUser', this.userForm).then((data) => {
            MessageBox.alert('添加成员成功').then(action => {
              that.$router.back(-1)
            })
          }).catch(() => {
            MessageBox({
              message: '不能添加重复成员(手机号码不能重复)!'
            })
          })
        }
      }
    }
  }
</script>
