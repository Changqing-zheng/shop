<template>
  <div id="app">
    <router-view></router-view>
       <van-tabbar v-model="active">
          <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
          <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
          <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
          <van-tabbar-item icon="contact" to="/profile">我的</van-tabbar-item>
      </van-tabbar>

    <!--<ul class="ul1">-->
      <!--<li class="ul1-nav">-->
        <!--<router-link to="/">首页</router-link>-->
        <!--</li>-->
      <!--<li class="ul1-nav">-->
        <!--<router-link to="/category">分类</router-link>-->
        <!--</li>-->
      <!--<li class="ul1-nav">-->
        <!--<router-link to="/cart">购物车</router-link>-->
        <!--</li>-->
      <!--<li class="ul1-nav">-->
        <!--<router-link to="/profile">我的</router-link>-->
        <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
    export default {
        data(){
            return{
                active:0
            }
        }

    }

</script>

<style lang="scss">



</style>
