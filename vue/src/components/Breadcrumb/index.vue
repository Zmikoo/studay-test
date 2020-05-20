<template>
  <div class='bread-list'>
    <div class='curr-position'>当前位置：</div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!--
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else>{{ item.meta.title }}</a>
          -->
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  data() {
    return {
      levelList: null,
      from:'',
      to:''
    }
  },
  watch: {
    $route(to,from) {
      this.$store.commit('user/SET_CURROUTE',to.path);
      this.from = from.path;
      this.to = to.path;
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (this.from === '/userInquire/leader' && this.to === '/userInquire/detail') {
        matched.splice(1,0,{meta:{title:'领导信息'},path:'/userInquire/leader'});
        matched[2].meta.title = '领导信息详情';
      } else if (this.from === '/userInquire/staff' && this.to === '/userInquire/detail') {
        matched.splice(1,0,{meta:{title:'员工信息'},path:'/userInquire/staff'});
        matched[2].meta.title = '员工信息详情';
      } else if (this.from === '/station/index' && this.to === '/station/createConnect') {
        matched.splice(0,0,{meta:{title:'员工工位关联'},path:'/station/index'});
            if (sessionStorage.getItem('lastRouter')) {
              let lastRouter = sessionStorage.getItem('lastRouter');
              sessionStorage.removeItem('lastRouter');
              if (lastRouter === 'createConnect') {
                matched[1].meta.title = '创建关联';
              } else {
                matched[1].meta.title = '编辑关联';
              }
            }
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isIndex(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.bread-list{
  display:flex;
}
.curr-position {
  display: inline-block;
  line-height: 50px;
  margin-left: 8px;
}
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  line-height: 50px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
