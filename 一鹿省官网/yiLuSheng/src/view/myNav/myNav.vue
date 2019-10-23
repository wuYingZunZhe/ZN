<template>
  <div>
     
    <mu-appbar style="width: 100%;" color="#fff">
        
        <mu-button icon slot="left">
           
            <img src="../../../static/imgs/nav/logoy.png" alt="">
        </mu-button>
        一鹿省

        
        <div slot="right" class='hidden-md-and-down'>
            <router-link to='home'>首页</router-link>
            <router-link to='join'>入住加盟</router-link>
            <router-link to='idea'>社会责任</router-link>
            <router-link to='down'>下载APP</router-link>
            
        </div>

        


        <mu-menu slot="right" class='hidden-lg-and-up'>
            <mu-button flat >
                
                <div class="rule-title">
                    <div class="menu-icon"></div>
                   
                </div>
            </mu-button>
            <mu-list slot="content">
            <mu-list-item >
                <mu-list-item-content>
                <mu-list-item-title >
                    <router-link to='home' >首页</router-link>
                </mu-list-item-title>
                </mu-list-item-content>
            </mu-list-item>
            <mu-list-item  @click.native="nav_click('join')">
                <mu-list-item-content>
                <mu-list-item-title>
                    <router-link to='join'>入住加盟</router-link>
                </mu-list-item-title>
                </mu-list-item-content>
            </mu-list-item>
            <mu-list-item >
                <mu-list-item-content>
                <mu-list-item-title>
                    <router-link to='idea' >社会责任</router-link>
                </mu-list-item-title>
                </mu-list-item-content>
            </mu-list-item>
            <mu-list-item>
                <mu-list-item-content>
                <mu-list-item-title>
                    <router-link to='down'>下载APP</router-link>
                </mu-list-item-title>
                </mu-list-item-content>
            </mu-list-item>
            </mu-list>
        </mu-menu>
    </mu-appbar>

    
  </div>
</template>

<script>

export default {
  name: 'myNav',
  data () {
    return {
      
    }
  },
  methods:{
      nav_click:function(my_nav){
          console.log('123')
          console.log(my_nav);
          //this.$router.push({path:my_nav})
      }
  }
}
</script>


<style scoped>
 a{
     color:black;
     margin-right: 50px;
 }
 .hidden-md-and-down > a{
     color: #575757;
 }
 a:hover{
     /*background: #ddd;*/
     /*color:#FF274F;*/
     color:#FF1768;
 }

 /** */
 .rule-title {
        font-weight: bold;
        margin: 30px auto;
        font-size: 32px;
    }

.rule-title .menu-icon {
        display: inline-block;
        width: 50px;
        height: 2px;
        border-top: 2px solid #000;
        border-bottom: 2px solid #000;
       
        padding: 5px 0;
        margin: 0 10px 10px;
        background-clip: content-box; 
        
        }    
</style>
