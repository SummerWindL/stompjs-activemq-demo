<template>
  <div id="app">

  </div>
</template>

<script>
import sock from './components/sock'
import sock1 from './components/sock1'

export default {
  name: 'App',
  components: {
    //sock,
    //sock1
  },
  methods: {
    mycallback(msgno, msg){

      console.log('dddddddddd:', msg);
    }
  },
  created () {
    this.$MqClient.addcallback('cmd_10001', this.mycallback);
  }

}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
