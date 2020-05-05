<template>
  <div id="app">
    <pcHeader v-if="!isMobile"></pcHeader>
    <mpHeader v-if="isMobile"></mpHeader>
    
    <router-view/>
    <pcFooter v-if="!isMobile"></pcFooter>
    <mpFooter v-if="isMobile"></mpFooter>
    
 
      
  </div>
</template>

<script>
import pcHeader from './pcView/pcHeader/pcHeader'
import mpHeader from './mpView/mpHeader/mpHeader'
import pcFooter from './pcView/pcFooter/pcFooter'
import mpFooter from './mpView/mpFooter/mpFooter'
export default {
  name: 'App',
  components: {
    pcHeader,
    mpHeader,
    pcFooter,
    mpFooter,
  },
  data(){
    return{
      isMobile:false,
    }
  },
  mounted() {
    let that=this;
    if (this._isMobile()) {
      // alert("手机端");
      console.log('手机端')
      that.isMobile=true;
      try{
        that.$router.replace('/mphome');
      }
      catch(err) {
        console.log(err);
      }
      
    } else {
      // alert("pc端");
      console.log('pc端')
      that.isMobile=false;
      
      try{
        that.$router.replace('/pchome');
      }
      catch(err) {
        console.log(err);
      }
    }
  },
  methods:{
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  }
}
</script>

<style>


</style>
