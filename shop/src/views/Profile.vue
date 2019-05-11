<template>
  <div>
    <van-tabs>
      <van-tab title="登录">
        <van-cell-group>
          <van-field label="用户名" require v-model="loginUsername" placeholder="请输入用户名" />
          <van-field label="密码" type="password" required v-model="loginPassword" placeholder="请输入用户名" />
        </van-cell-group>
        <van-button type="primary" size="large" @click="loginUser">登录</van-button>
      </van-tab>
      <van-tab title="注册">
        <van-cell-group>
          <van-field label="用户名" required v-model="registUsername" placeholder="请输入用户名" />
          <van-field label="密码" required type="password" v-model="registPassword" placeholder="请输入用户名" />
        </van-cell-group>
        <van-button type="primary" size="large" @click="registUser">注册</van-button>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import axios from "axios";
  import url from "./../service.config.js";
  import {mapActions} from "vuex";

  export default {
    data(){
        return {
            loginUsername: "",
            loginPassword: "",
            registUsername: "",
            registPassword: ""
        }
    },
    methods: {
        ...mapActions(["loginAction"]),
        registUser(){
            if(this.registUsername == ""){
                this.$toast.fail("账号不能为空")
            }else if(this.registPassword == ""){
                this.$toast.fail("密码不能为空")
            }else{
                axios({
                    url: url.registUser,
                    method: 'post',
                    data:{
                        userName: this.registUsername,
                        passWord: this.registPassword
                    }
                }).then(res => {
                    if(res.data.code == 200){
                        this.$toast.success("注册成功")
                        this.registUsername = ""
                        this.registPassword = ""
                    }else{
                        this.$toast.fail("注册失败1")
                    }
                }).catch(err => {
                    this.$toast.fail("注册失败11")
                    console.log(err)
                })
            }
        },
        loginUser(){
            axios({
                url: url.loginUser,
                method: "post",
                data: {
                    userName: this.loginUsername,
                    passWord: this.loginPassword
                }
            }).then(res => {
                if(res.data.code == 200){
                    //保存登录状态
                    this.loginAction(res.data.userName);
                    this.$router.push("/")
                    this.$toast.success("登录成功")
                }else if(res.data.code == 201){
                    this.$toast.fail("密码错误")
                }else{
                    this.$toast.fail("登录失败")
                }
            }).catch(err => {
                console.log(err)
                this.$toast.fail("登录失败")
            })
        }
    }

}
</script>

<style lang="scss">

</style>