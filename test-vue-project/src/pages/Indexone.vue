<template>
<div id="index">
    <header>
      <img src="../assets/images/logo1.png" alt="">
       <div class="userSetting">
         <div @click="setShow">
         <span>123456789101</span><img src="../assets/images/down.png" alt="">
         </div>
         <ul class="user_set" v-show="show_set">
           <li>
             <img src="../assets/images/set.png" alt="">
             <router-link to="/index/userset">
             <span class="a_style1">用户信息设置</span>
             </router-link>

           </li>
           <li>
             <img src="../assets/images/out.png" alt=""><span>退出登录</span>
           </li>
         </ul>
       </div>
    </header>
   <div class="indexContainer">
     <ul>
       <li>
         <img src="../assets/images/neirong.png" alt=""><span>内容</span>

         <router-link to="/index/article"><p class="a_style">文章管理</p></router-link>
         <router-link to="/home"><p class="a_style">模板管理</p></router-link>

       </li>
       <li>
         <img src="../assets/images/fuwu.png" alt=""><span>服务</span>
         <router-link to="/index/article"><p class="a_style">优客表单基础版</p></router-link>
         <router-link to="/home"><p class="a_style">数据仓库</p></router-link>
       </li>
       <li>
         <img src="../assets/images/guanwang.png" alt=""><span>官网</span>
         <router-link to="/index/article"><p class="a_style">页面管理</p></router-link>
         <router-link to="/home"><p class="a_style">官网站点管理</p></router-link>
       </li>
     </ul>
   </div>
  <Wxbinding v-show="wx_bind">
    <p class="prompt_title" slot="slotTitle">温馨提示</p>
    <p class="prompt_p" slot="slotContent">
      官网需要配置在一个微信公众号或小程序上，
      你还未绑定公众号或小程序
    </p>
    <button type="error" slot="bind" class="binding">去绑定</button>
    <button slot="cancel"  class="binding cancel">取消</button>
  </Wxbinding>
  <router-view></router-view>
</div>
</template>
<script>
  import Wxbinding from '../components/wxbinding.vue'
export default {
  data(){
    return{
      show_set:false,
      wx_bind:false,//微信绑定弹窗
      modify_phone:false,//修改手机号弹窗
    }
  },
  components:{
    Wxbinding
  },
  methods:{
    setShow(){
      this.show_set = !this.show_set
    }
  }
}
</script>
<style>
  #index{
    width: 100%;
    height: 100%;
    background-color: #F7F7F7;

  }
  #index > header{
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 50px;
    box-sizing: border-box;
  }
  #index > header > img{
    width: 169px;
    height: 30px;
  }
  #index>.indexContainer{
    width: 90%;
    margin:0 auto;
    margin-top: 40px;
    display: flex;
  }

  #index>.indexContainer > ul>li>img{
    vertical-align: middle;
  }
  #index>.indexContainer > ul>li >span{
    color: #95989A;
    font-size: 12px;
    margin-left: 10px;
  }
  .userSetting{
    position: relative;
  }
  .user_set{
    position: absolute;
    background-color: #fff;
    width: 150px;
    height: 90px;
    top: 27px;
    left:-12px;
    box-shadow: #dedede 0px 0px 10px;
  }
  .user_set>li{
    margin: 15px;
    font-size: 13px;
  }
  .user_set>li>img{
    vertical-align: middle;
  }
  /*router-link*/
  .a_style{
    color:#333333;
    margin-left: 26px;
    margin-top: 10px;
  }
  .a_style1{
    color:#333333;
  }

#promt_phoneing >.prompt{
  width: 440px;
  height: 254px;
}
</style>
