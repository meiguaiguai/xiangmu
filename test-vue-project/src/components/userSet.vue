<template>
   <div id="userSet">
     <p class="user_title">用户信息设置</p>
     <div class="userSet">
         <div class="setContent">
           <p>账户手机号：<span>1234567</span> <span class="mark" @click="changePhone">修改绑定手机号</span></p>
           <p class="mark_p">温馨提示：该手机号用于登录及登录密码的找回、修改，请谨慎修改</p>
           <p style="text-indent: 12px">登录密码：<span>1233333</span> <span class="mark" @click="changePassword">修改密码</span></p>
           <p class="mark_p">该密码用户账号登录</p>
         </div>
     </div>
     <Wxbinding id="promt_phoneing" v-show="change_phone_show">
       <p class="prompt_title" slot="slotTitle">修改绑定手机</p>
       <div class="prompt_phone prompt_phone_addtop" slot="slotContent">
         <span>当前手机:</span><span>123456789</span>
       </div>
       <div class="prompt_phone prompt_input_addtop" slot="slotPassword">
         <span>登录密码：</span><input type="text" placeholder="请输入账号登录密码">
       </div>
       <button type="error" slot="bind" class="binding" @click="confirm_phone">确定</button>
       <button slot="cancel"  class="binding cancel" @click="cancel_changephone">取消</button>
       <p slot="binderror_password" class="binderror_password">密码错误</p>

     </Wxbinding>
  <!--绑定新手机号-->
     <Wxbinding id="promt_newphoneing" v-show="change_newphone_show">
       <p class="prompt_title" slot="slotTitle">修改绑定手机</p>
       <div class="prompt_phone prompt_phone_addtop" slot="slotContent">
         <span>新手机:</span><input type="text" style="margin-left: 10px" placeholder="请输入新手机号码">
       </div>
       <div class="prompt_phone prompt_input_addtop" slot="slotPassword">
         <span>验证码：</span><input type="text" placeholder="请输入验证码">
         <span class="bind_get_code">获取验证码</span>
       </div>
       <button type="error" slot="bind" class="binding">确定</button>
       <button slot="cancel"  class="binding cancel" @click="cancel_changnewephone">取消</button>
       <p slot="binderror_phone" class="binderror_password binderror_phone">手机输入错误</p>
       <p slot="binderror_password" class="binderror_password">验证码错误</p>
     </Wxbinding>

     <!--修改密码-->
     <Wxbinding class="promt_passwording" v-show="change_password_show">
       <p class="prompt_title" slot="slotTitle">修改密码</p>
       <div class="prompt_phone prompt_phone_addtop" slot="slotContent">
         <span>当前手机:</span><span>123456789</span>
       </div>
       <div class="prompt_phone prompt_input_addtop" slot="slotPassword">
         <span style="margin-left: 15px">验证码：</span><input type="text" placeholder="请输入验证码">
         <span class="bind_get_code">获取验证码</span>
       </div>
       <button type="error" slot="bind" class="binding" @click="confirm_password">确定</button>
       <button slot="cancel"  class="binding cancel" @click="cancel_changepassword">取消</button>
       <p slot="binderror_password" class="binderror_password">验证码错误</p>

     </Wxbinding>
     <!--修改新密码-->
     <Wxbinding class="promt_passwording" v-show="change_newpassword_show">
       <p class="prompt_title" slot="slotTitle">修改密码</p>
       <div class="prompt_phone prompt_phone_addtop" slot="slotContent">
         <span style="margin-left: 25px">新密码:</span><input type="text" style="margin-left: 10px" placeholder="请输入新手机号码">
       </div>
       <div class="prompt_phone prompt_input_addtop" slot="slotPassword">
         <span>确认新密码：</span><input type="text" placeholder="请再次输入密码">

       </div>
       <button type="error" slot="bind" class="binding" @click="success_password">确定</button>
       <button slot="cancel"  class="binding cancel" @click="cancel_changnewepassword">取消</button>
       <p slot="binderror_password" class="binderror_password">两次输入密码不一致</p>
     </Wxbinding>
     <!--修改密码成功-->
     <div class="wxbinding" v-show="password_success">
         <div class="password_success">
           <img src="../assets/images/success.png" alt="">
           <span>修改密码成功</span>
         </div>
     </div>
   </div>
</template>
<script>
  import Wxbinding from '../components/wxbinding.vue'
export default {
    data(){
      return{
        change_phone_show:false,
        change_newphone_show:false,//手机号修改
        change_password_show:false,//密码修改
        change_newpassword_show:false,
        password_success:false//密码修改成功
      }

    },
    components:{
      Wxbinding
},
  methods:{
      //修改手机号
    changePhone(){
      this.change_phone_show=true
    },
    cancel_changephone(){
      this.change_phone_show=false
    },
    cancel_changnewephone(){
      this.change_newphone_show=false
    },
    confirm_phone(){
        this.change_newphone_show=true;
        this.change_phone_show=false;
    },
    //修改密码
    changePassword(){
       this.change_password_show=true
    },
    cancel_changepassword(){
      this.change_password_show=false
    },
    cancel_changnewepassword(){
      this.change_newpassword_show=false
    },
    confirm_password(){
      this.change_newpassword_show=true
      this.change_password_show=false
    },
    //修改密码成功
    success_password(){

    }
  }
}
</script>
<style>
#userSet{
  margin-left: 255px;
  margin-top: -253px;
  margin-right: 220px;
}
.userSet{
  height: 610px;
  background-color: #fff;
  box-shadow: #dedede 0 0 10px;
  padding-top: 1px;
}
  .user_title{
    margin-bottom:28px;
    font-size: 18px;
  }
  .setContent{
    margin-top: 83px;
    margin-left: 83px;
    font-size: 13px;
    color: #2B2C2F;
  }
  .setContent>p{
     margin-bottom: 20px;
  }
  .mark{
    color: #DD3113;
    margin-left: 22px;
  }
  .mark_p{
    margin-left:80px;
    color: #999;
  }
#promt_newphoneing >.prompt{
  width: 440px;
  height: 254px;
}
.promt_passwording > .prompt{
  width: 440px;
  height: 254px;
}
.bind_get_code{
  color: #DD3113;
  margin-left: -80px;
}
.password_success{
    width: 320px;
    height: 90px;
    background-color: #fff;
    margin: 15% auto;
  text-align: center;
  line-height: 90px;
  }
.password_success > img{
  vertical-align: middle;
}

</style>
