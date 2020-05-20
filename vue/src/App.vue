<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}

var myMixin = {
  created:function(){
    this.hello()
  },
  methods:{
    hello: function(){
      console.log('hello from mixin!')
    }
  }
}
var Component = Vue.extend({
  mixins:[myMixin]
})
var component = new Component()
</script>
