<template>
  <div class="mpHeader">
      
    <!-- 移动端样式 -->
    <mu-appbar style="width: 100%;" color="#fff">
      <div class="smallNav">
        <img src="../../../static/imgs/nav/logoy.png" alt />
        <span>丰乐优选</span>
      </div>
      <mu-menu slot="right" class="hidden-lg-and-up">
        <mu-button flat>
          <div class="rule-title">
            <div class="menu-icon"/>
          </div>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>
                <router-link to="mphome">首页</router-link>
              </mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>
                <router-link to="mpprovider">供应商入驻</router-link>
              </mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>
                <router-link to="mpshop">店铺入驻</router-link>
              </mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <!-- <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>
                <router-link to="down">下载APP</router-link>
              </mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item> -->
        </mu-list>
      </mu-menu>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  name: 'pcHeader',
  data () {
    return {
      
    }
  }
}
</script>


<style scoped>
.mpHeader{
  width:100%;
  position:fixed;
  top:0;
  z-index: 999;
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
.active {
  color: #eab737;
}

/* 手机端样式 */
.smallNav {
  width: 80%;
  height: 80px;
  line-height: 80px;
  position: relative;
}
.smallNav > img:nth-child(1) {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 20px;
  margin-left: 2%;
  position: absolute;
}
.smallNav > span:nth-child(2) {
  width: 80%;
  position: absolute;
  margin-left: 20%;
  text-align: right;
  font-size: 28px;
  font-weight: 600;
  color: #eab737;
  float: right;
}
a{
  color:#eab737;
}

</style>
