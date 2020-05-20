<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
        <div class="avatar-wrapper">
          <div class='avatar-name'>
            <img src='../../icons/admin.png' class="user-avatar">
            <span>{{name}}</span>
            <!--<el-button class='avatar-set' size="mini" @click='avatarSet'>账号设置</el-button>-->
          </div>
          <el-button size="mini" @click='avatarSet'>账号设置</el-button>
          <el-button size="mini" @click='logout'>退出登录</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    avatarSet() {
      this.$router.push({name:'AvatarSet'});
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=/index`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 30px;
    &:focus {
      outline: none;
    }

    .avatar-name {
      display:inline-block;
      position:relative;
    }
    // .avatar-name:hover .avatar-set {
    //   display:inline-block;
    // }
    // .avatar-set {
    //   display:none;
    //   position: absolute;
    //   bottom: -10px;
    //   right:-10px;
    //   z-index:100;
    // }
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
      .user-avatar {
        cursor: pointer;
        width: 25px;
        height: 25px;
        vertical-align: middle;
      }
    }
  }
}
</style>
