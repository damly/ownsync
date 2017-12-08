<template>
  <div>
    <mt-header title="">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click.native="handleSave">保存</mt-button>
    </mt-header>
    <div class="page-part">
      <mt-field label="名字" placeholder="请输入您的名字" type="text" v-model="user.nickname"></mt-field>
      <mt-field label="类型" placeholder="请输入密码" type="number" v-model="user.type"></mt-field>
    </div>
    <mt-button size="large" type="danger" class="logout" @click.native="handleLogout">退出</mt-button>
  </div>

</template>

<script>
  export default {
    name: 'Settings',
    data () {
      return {
        user: {
          nickname: this.$store.getters.nickname,
          type: this.$store.getters.type
        }
      }
    },
    methods: {
      handleLogout () {
        let that = this
        this.$store.dispatch('FedLogOut').then(() => {
          that.$router.push({path: '/'})
          location.reload()
        }).catch(() => {
        })
      },
      handleSave () {
        let that = this
        this.$store.dispatch('UserUpdate', this.user).then(() => {
          that.$router.push({path: '/'})
          location.reload()
        }).catch(() => {
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logout {
    margin-top: 120px;
  }
</style>
