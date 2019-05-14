<template>
  <div>
    <van-nav-bar title="商品分类"></van-nav-bar>
    <div>
      <van-row>
        <van-col span="6" class="nav">
          <ul>
            <li
              v-for="(item, index) in typeList"
              :key="index"
              :class="{active: active == index}"
              @click="selectType(item.typeId, index)">
              {{item.typeName}}
            </li>
          </ul>
        </van-col>
        <van-col span="18" class="container">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list class="content" @load="onLoad" :finish="finished" v-model="loading">
              <div
                      class="content-item"
                      v-for="(item, index) in productList"
                      :key="index"
                      @click="toDetail(item._id)">
                <img :src="item.img" alt>
                <p class="content-item-name">{{item.name}}</p>
                <p>￥{{item.price}}</p>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";

export default {
  data(){
      return {
          typeList: [],
          active: 0,
          start: 0,
          limit: 10,
          typeId: 1,
          productList: [],
          finished: false,
          loading: false,
          isLoading: false
      }
  },
  created(){
      axios({
        url: url.getType
      }).then(res => {
        this.typeList = res.data;
        this.selectType(this.typeId, this.active);
      }).catch(err => {
          console.log(err)
      })
  },
  methods: {
    selectType(typeId, index){
        this.active = index;
        this.typeId = typeId;
        this.productList = [];
        this.finished = false;
        this.getProduct();
    },
    getProduct(){
        axios({
            url: url.getProduct,
            method: "get",
            params: {
                typeId: this.typeId,
                start: this.productList.length,
                limit: this.limit
            }
        }).then(res => {
            if(res.data.length != 0){
                this.productList = this.productList.concat(res.data);
                this.loading = false;
            }else{
                this.finished = true;
            }
        }).catch(err => {
            console.log(err)
        })
    },
    onLoad(){
        setTimeout(() => {
            this.getProduct();
        }, 2000)
    },
    onRefresh(){
        setTimeout(() => {
            this.productList = [];
            this.getProduct();
            this.isLoading = false;
        }, 2000);
    },
    toDetail(id){
        this.$router.push({
            name: "detail",
            params: {
                id: id
            }
        })
    }

  }
}
</script>

<style lang="scss">
  .nav{
    background: #eee;
    li{
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      border-bottom: 1px solid #fff;
      padding: 3px;
    }

  }
  .active{
    background: #fff;
  }
  .container {
    position: fixed;
    top: 46px;
    bottom: 1rem;
    right: 0;
    overflow-y: scroll;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    &-item {
      width: 40%;
      padding: 0 10px;
      text-align: center;
      img {
        width: 2rem;
        height: 2rem;
      }
      &-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>