<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎使用拜腾虚拟装配后台管理系统</div>
    <div class='dashboard-time'>{{ currTime }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      currTime: this.formatTime(new Date())
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    formatTime(date){
      let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
      let minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
      let second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + hour + ':' + minute + ':' + second;
    } 
  },
  mounted() { 
    this.timer = setInterval(()=>{
      this.currTime = this.formatTime(new Date());
    },1000)  
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position:fixed;
    top:350px;
    width:100%;
    text-align:center;
  }
  &-text {
    margin: 40px 0px;
    font-size: 50px;
    line-height: 46px;
  }
  &-time {
    font-size: 25px;
  }
}
</style>
