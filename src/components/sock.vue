<template>
  <div>
      socketQueue is loading...
  </div>
</template>

<script>
import Stomp from 'stompjs'
import { MQ_SERVICE, MQ_USERNAME, MQ_PASSWORD } from '../../config/linkparam.js'
export default {
  name: 'entry',
  data () {
    return {
      client: Stomp.client(MQ_SERVICE)
    }
  },
  created () {
    this.connect()
  },
  methods: {
    onConnected: function (frame) {
      console.log('Connected: ' + frame)
      var queue = '/queue/ikinloop_queue1'

      this.client.subscribe(queue, this.responseCallback, this.onFailed)
    },
    onFailed: function (frame) {
      console.log('Failed: ' + frame)
    },
    responseCallback: function (frame) {
      console.log('responseCallback msg=>' + frame.body)
      console.log('------')
    },
    connect: function () {
      var headers = {
        'login': MQ_USERNAME,
        'passcode': MQ_PASSWORD
      }
      this.client.connect(headers, this.onConnected, this.onFailed)
    }
  }
}
</script>
