<template>
  <div id="myNav">
    <div class="bigNav" v-if="isShow">
      <img src="../../../static/imgs/nav/logoy.png" alt />
      <span>丰乐优选</span>
      <div slot="right" class="hidden-md-and-down">
        <router-link to="pchome" class="{true:'active':''}">首页</router-link>
        <router-link to="pcjoin">入住加盟</router-link>
        <router-link to="pcidea">社会责任</router-link>
        <!-- <router-link to="down">下载APP</router-link> -->
      </div>
    </div>

    <!-- 移动端样式 -->
    <mu-appbar style="width: 100%;" color="#fff" v-else>
      <div class="smallNav">
        <img src="../../../static/imgs/nav/logoy.png" alt />
        <span>丰乐优选</span>
      </div>
      <mu-menu slot="right" class="hidden-lg-and-up">
        <mu-button flat>
          <div class="rule-title">
            <div class="menu-icon"></div>
          </div>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>
                <router-link to="pchome">首页</router-link>
              </mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item @click.native="nav_click('join')">
            <mu-list-item-content>
              <mu-list-item-title>
                <router-link to="pcjoin">加入</router-link>
              </mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>
                <router-link to="pcidea">社会责任</router-link>
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
  name: "myNav",
  data() {
    return {
      isShow: true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.getScroll);
    this.getWidth();
  },
  destroyed() {
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    nav_click: function(my_nav) {
      console.log("123");
      console.log(my_nav);
      this.$router.push({ path: my_nav });
    },
    getWidth() {
      let width = document.body.clientWidth;
      console.log(width);
      if (width > 900) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    //监听滚动
    getScroll(e) {
      this.indexNumTop = $("#myNav").offset().top;
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop >= 100
      ) {
        $("#myNav >.bigNav > span").css("color", "#eab737");
        $("#myNav").css("background-color", "#fff");
        $("#myNav >.bigNav > div:nth-child(3) router-link").css("color", "#eab737");
      } else {
          $("#myNav >.bigNav > span").css("color", "#fff");
        $("#myNav").css("background-color", "transparent");
        // $("#myNav >.bigNav > div:nth-child(3)").css("color", "#eab737");
      }
    }
  }
};
</script>


<style scoped>
#myNav {
  width: 100vw;
  position: fixed;
  margin-top: 0;
  z-index: 999;
}
a {
  color: black;
  margin-right: 50px;
}
.hidden-md-and-down > a {
  color: #eab737;
  font-size: 24px;
}
a:hover {
  /*background: #ddd;*/
  /*color:#FF274F;*/
  color: #eab737;
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
/* 电脑端样式 */
.bigNav {
  width: 100%;
  height: 80px;
  line-height: 80px;
  position: relative;
}
.bigNav > img:nth-child(1) {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 2%;
  position: absolute;
}
.bigNav > span:nth-child(2) {
  position: absolute;
  margin-left: 10%;
  font-size: 32px;
  font-weight: 600;
  color: #eab737;
}
.bigNav > div:nth-child(3) {
  width: 80%;
  position: absolute;
  margin-left: 20%;
  text-align: right;
  font-size: 16px;
  font-weight: 300;
  
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
</style>
