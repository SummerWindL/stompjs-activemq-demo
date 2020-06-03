import Stomp from 'stompjs'
import { MQ_SERVICE, MQ_USERNAME, MQ_PASSWORD } from '../../config/linkparam.js'

const QUEUE = 'queue';
const TOPIC = 'topic';
class MqStomp{

  constructor(mqType, mqName){
    this.handlerMap = new Object();
    if (mqType == QUEUE){
      this.topic = '/queue/'+mqName;
    }else if(mqType == TOPIC){
      this.topic = '/topic/'+mqName;
    }
    this.client =  new Stomp.client(MQ_SERVICE);
    this.connect();

  }
  addcallback(msgno, callback) {
    if (callback == undefined || callback == null){
      //console.log()
      return;
    }
    this.handlerMap[msgno] = callback;
  }

  connect () {
    var headers = {
      'login': MQ_USERNAME,
      'passcode': MQ_PASSWORD
    }
    var _this = this;
    this.client.connect(headers,
                  (frame)=>{//success
                     _this.client.subscribe(_this.topic,
                      (frame)=>{ //success
                            var mqcmd = JSON.parse(frame.body);

                            var msgno = mqcmd.cmdNo;
                            var msg = mqcmd.cmdMsg;
                        console.log('22222222222222222222222222222222  ', msgno);
                            var handler = _this.handlerMap[msgno];
                            if (handler == undefined || handler == null){
                              console.log('3333333333333333  ', handler);
                              return;
                            }
                            handler(msgno, msg);
                      },
                      (frame)=>{//failed

                      });
                  },
                  (frame)=>{//failed
                    console.log('Failed: ' + frame)
                  });


  }

}


class MqClient{

  constructor(mqType, mqName){
    this.mqclient = new MqStomp(mqType, mqName);

  }
  addcallback(msgno, callback) {
    this.mqclient.addcallback(msgno, callback)
  }

}
export default {
  QUEUE,
  TOPIC,
  MqClient
}
