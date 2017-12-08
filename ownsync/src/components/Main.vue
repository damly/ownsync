<template>
  <div>
    <mt-header title="成员列表">
      <mt-button v-if="type" icon="more" slot="right" @click.native="handleMore"></mt-button>
    </mt-header>
    <mt-cell v-for="user in users" :title="user.nickname" :key="user.id" is-link :to="{ name: 'Medias' }"></mt-cell>
    <mt-button slot="right" @click.native="handleLogout">退出</mt-button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        type: this.$store.getters.type,
        users: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      handleMore () {
        this.$router.push({path: '/add'})
      },
      handleLogout () {
        let that = this
        this.$store.dispatch('FedLogOut').then(() => {
          that.$router.push({path: '/'})
          location.reload()
        }).catch(() => {
        })
      },
      getData () {
        let that = this
        this.$store.dispatch('ListUsers').then((res) => {
          that.users = res.data
        }).catch(() => {
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
