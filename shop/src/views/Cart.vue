<template>
  <div>

    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="container">
      <van-card
              :price="item.price"
              :desc="item.company"
              :title="item.name"
              :thumb="item.img"
              v-for="(item, index) in cardList"
              :key="index">
        <div slot="footer">
          <van-button size="mini" @click='delCard(item._id, index)'>删除</van-button>
        </div>
      </van-card>
    </div>
    <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
        class="submit">
    </van-submit-bar>
  </div>
</template>

<script>
  import axios from "axios";
  import url from "./../service.config.js";
  import {mapState} from "vuex";

  export default {
    data(){
        return {
            cardList: []
        }
    },
    created(){
        if(this.userInfo.userName === "未登录"){
          this.$toast.fail("请先登录")
          this.$router.push('/profile')
        }else{
            axios({
                url: url.getCart,
                method: "get",
                params: {
                    userId: this.userInfo._id
                }
            }).then(res => {
                for(let item of res.data){
                    this.cardList.push(item.productId)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {
        ...mapState(['userInfo']),
        totalPrice(){
            return this.cardList.reduce((sum, elem)=>{
                sum += elem.price;
                return sum;
            }, 0) * 10 * 10;
        }
    },
    methods: {
        onSubmit(){
            this.$toast.success("进入付款界面")
        },
        delCard(id, index){
          this.cardList.splice(index, 1)
        }
    }


}
</script>

<style lang="scss">
  .submit {
    margin-bottom: 1rem;
  }
  .container{
    margin-bottom: 1rem;
  }
</style>