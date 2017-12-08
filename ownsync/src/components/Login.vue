<template>
  <div class="login">
    <img src="../assets/logo.png">
    <div class="page-part">
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="loginForm.username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="loginForm.password"></mt-field>
    </div>
    <mt-button size="large" type="primary" class="ok" @click.native="handleLogin">登录</mt-button>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      handleLogin () {
        let that = this
        this.$store.dispatch('Login', this.loginForm).then(() => {
          that.$router.push({path: '/'})
        }).catch(() => {
          MessageBox.alert('手机号或者密码错误!').then(action => {
            that.$store.dispatch('FedLogOut').then(() => {
              location.reload()
            })
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    text-align: center;
  }
  .ok {
    margin-top: 30px;
  }
</style>
