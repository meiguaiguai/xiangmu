<template>
  <div id="ym_login">
      <div class="ym_login_box">
        <!--登录left，图片logo-->
          <div class="ym_login_left">
            <img src="../assets/images/logo.png" alt="">
          </div>
        <!--登录right，登录验证-->
          <div class="ym_login_right">
            <div v-show="show_logintitle">
            <p class="password_p" @click="changeStyle" :class="{'changeColor':password_login}">密码登录</p><p class="phone_p" @click="changeStyle1" :class="{'changeColor':change_style}">手机验证码登录</p>
            <img src="../assets/images/icon2.png" alt="" :class="{'tu1':change_style}"><img :class="{'tu2':change_style}" src="../assets/images/icon3.png" alt="">
            </div>
            <div class="content login-content" v-if='showStatus === "login"'>
              <div class="container" v-if='showStatus === "login"'>
                <div class="input-container hide_password">
                  <Input required v-model="submitLogin.username" placeholder="请输入帐户绑定手机号" class='username' :maxlength="11" @on-blur="checkphone"></Input>
                  <p v-show="phone_error" class="phone_error">手机号输入错误</p>
                </div>
                <!--密码登录-->
                <div class="input-container hide_password"  v-show="password_login">
                  <Input v-model="submitLogin.password" placeholder="请输入密码" :type="type_password"   @on-enter="doLogin" @on-blur="checkpassWord(submitLogin.password)"></Input>
                  <p v-show="password_error" class="phone_error">密码输入错误</p>
                  <img @click="hidePassword" class="hide_password1" src="../assets/images/hide.png" alt="">
                </div>
                <!--验证码登录-->
                <div class="input-container hide_password" v-show="change_style">
                  <Input v-model="submitRegister.phone_number_code" placeholder="请输入验证码" @on-enter="doRegister"></Input>
                  <p v-show="verification_error" class="phone_error">验证码输入错误</p>
                  <a href="javascript:;" class="getSMS" v-show="!gotSMS" @click='getRegisterSMS("register")'>获取验证码</a>
                  <a href="javascript:;" class="getSMS" v-show="gotSMS">s</a>
                </div>
                <!--<a class="text-fogot-pwd" href="javascript:;" @click='goReset'>忘记密码</a>-->
                <div class="remember">
                <input type="checkbox" :checked="check" @click="clickCheck">记住我
                </div>
                <div style="clear:both;"></div>
                <Button href="javascript:;" :loading='doing' class="login-submit-btn" @click='doLogin'>立即登录</Button>
                <a class="text-register" href="javascript:;" @click='goRegister'>还没有账号?立即注册 <img src="../assets/images/icon1.png" alt=""></a>
              </div>
            </div>

            <!--注册状态-->
            <div class="content" v-if='showStatus === "register"'>
              <div class="container content-container" v-if='showStatus === "register"'>
                 <p class="register_title">账号注册</p>
                <div class="input-container hide_password">
                  <Input v-model="submitRegister.phone_number" placeholder="请输入手机号进行注册" class='username' :maxlength="11" @on-blur="checkRegphone"></Input>
                  <p v-show="regphone_error" class="phone_error">手机号输入错误</p>
                </div>
                <div class="input-container hide_password">
                  <Input v-model="submitRegister.password" placeholder="请输入8~16位英文大小写字母或数字" :type="type_password" @on-blur="checkpassWord(submitRegister.password)"></Input>
                  <p v-show="password_error" class="phone_error">密码输入错误</p>
                  <img @click="hidePassword" class="hide_password1" src="../assets/images/hide.png" alt="">
                </div>
                <div class="input-container hide_password">
                  <Input v-model="submitRegister.phone_number_code" placeholder="请输入验证码" @on-enter="doRegister"></Input>
                  <a href="javascript:;" class="getSMS" v-show="!gotSMS" @click='getRegisterSMS("register")'>获取验证码</a>
                  <a href="javascript:;" class="getSMS" v-show="gotSMS">{{count}}s</a>
                </div>
                <input style="margin-top: 10px" type="checkbox" :checked="checkAgree" @click="agree"> <span style="margin-top: 10px">已阅读并同意《XXX协议》</span>
                <Button href="javascript:;" class="login-submit-btn submit_btn" @click='doRegister'>注册</Button>
                <p v-show="register_error" class="reg_error">系统发生错误，注册失败</p>
                <a href="javascript:;" class="tips text-register" @click='goLogin'>已有账号？立即登录<img src="../assets/images/icon1.png" alt=""></a>
              </div>
            </div>
            <div class="content reset-content" v-if='showStatus === "reset"'>
              <div class="container">
                <div class="input-container">
                  <Input v-model="submitReset.phone_number" placeholder="请输入常用手机号" class='username' :maxlength="11"></Input>
                </div>
                <div class="input-container">
                  <Input v-model="submitReset.password" placeholder="请输入新密码" :type="mytype"></Input>

                </div>

                <div class="input-container hide_password">
                  <Input v-model="submitReset.phone_number_code" placeholder="请输入验证码" @on-enter="doRegister"></Input>
                  <a href="javascript:;" class="getSMS" v-show="!gotSMS" @click='getRegisterSMS("reset")'>获取验证码</a>
                  <a href="javascript:;" class="getSMS" v-show="gotSMS">{{count}}s</a>
                </div>
                <a href="javascript:;" class="login-submit-btn" @click='resetPassword'>确定</a>
                <a href="javascript:;" class="tips" @click='goLogin'>登录</a>
              </div>
            </div>
            <ZyModal :zIndex="'1002'" :show='isShowZymodal' :type='zymodalType' @on-close='isShowZymodal = false' :content="zymodalContent" />
          </div>
       <!--整个login结束 -->
        <!--注册成功弹窗-->
        <div class="successReg" v-show="regsiter_success">
            <div>
              <img src="../assets/images/success.png" alt="">
              <span>账号注册成功</span>
            </div>
        </div>
      </div>

  </div>
</template>
<script>
  import ZyModal from "./ZyModal.vue";
  export default {
    data() {
      return {
        isShowZymodal: false,
        zymodalType: "",
        zymodalContent: "",
        showStatus: "login", //login:登录,register:注册,reset:重置密码
        rememberMe: false,
        ct: "",
        gotSMS: false,
        count: 60,
        doing: false,
        // imgSrc: 'http://192.168.1.5:9000/web/verification/img',
        imgSrc: "#",
        conversationId: 0,
        submitLogin: {
          username: "",
          password: "",
          type: 1
        },
        registerImgCode: "",
        resetImgCode: "",
        submitRegister: {
          phone_number: "",
          password: "",
          invite_code: "",
          phone_number_code: ""
        },
        submitReset: {
          phone_number: "",
          password: "",
          phone_number_code: ""
        },
        show_logintitle:true,
        change_style:false,
        password_login:true,//登录方式
        phone_error:false,
        regphone_error:false,//注册手机号
        password_error:false,//密码error
        verification_error:false,//验证error
        register_error:false,//注册验证error
        typePassword:true,
        type_password:'',
        check:false,//checkbox选中状态
        checkAgree:false,//是否同意协议
        count:299,
        regsiter_success:false



      };

    },
    created() {
      this.$Message.config({
        top: 50,
        duration: 3
      });
    },

    methods: {
      showZymodal(type, content) {
        this.isShowZymodal = true;
        this.zymodalType = type;
        this.zymodalContent = content;
      },
      enterToLogin() {
        if (this.submitLogin.imgCode.length == 5) {
          this.doLogin();
        }
      },
      //点击切换登录样式
      changeStyle(){
        this.change_style=false;
        this.password_login=true;
      },
      changeStyle1(){
       this.change_style=true;
        this.password_login=false;
      },
      //验证登录名输入是否输入正确
      checkphone(){
        if(this.submitLogin.username.length<11){
            this.phone_error=true;
        }else{
          this.phone_error=false;
        }
      },
//      验证注册名输入是否正确
      checkRegphone(){
        if(this.submitRegister.phone_number.length<11){
          this.regphone_error=true;
        }else{
          this.regphone_error=false;
        }
      },
      //密码格式检查
      checkpassWord(passwordcheck){
        const reg = /^[0-9a-zA-Z]{8,16}$/
      if(passwordcheck.length==0 || !reg.test(passwordcheck)){
          if(passwordcheck==this.submitLogin.password){
            this.password_error=true
          }

       }else{
         this.password_error=false
       }
  },

      //密码是否明文显示
      hidePassword(){
        this.typePassword=!this.typePassword;
          if(this.typePassword){
            this.type_password='password'
          }else{
            this.type_password=' '
          }
      },
      //验证checkbox的选中状态
      clickCheck(){
        this.check=!this.check;
        console.log(this.check);
      },
      //是否同意协议状态
      agree(){
         this.checkAgree=!this.checkAgree
      },
      //登录
      doLogin() {
        if (this.doing) {
          this.$Message.info("登录中，请耐心等待");
        } else {
          if (
            this.validCheck("phoneNumber", this.submitLogin.username) ||
            this.validCheck("password", this.submitLogin.password)
          ) {
            return false;
          }
          this.doing = true;
          //登录验证
          this.$auth.login({
            data: this.submitLogin,
            redirect: '',
            fetchUser: true,
            success(res) {
              this.doing = false;
              if(this.check == true) {
                if(window.localStorage) {
                  localStorage.setItem('username',JSON.stringify(this.submitLogin.username))
                }
              }
              if (res.data.status == 'NG') {
                if(res.data.errorCode == 310) {
                  this.password_error=true;

                }else if(res.data.errorCode == 304){
                  this.verification_error=true;
                }
                this.getImg()
              }
              // 用户登录后，根据username是否为空，判断需要调整到的页面
              if (res.data.data.username == null) {  //跳转到个人中心页面
                this.$router.push({
                  path: '/user'
                })
              } else {                               // 不为空，跳转到控制中心页面
                this.$router.push({
                  path: '/index'
                })
              }
              console.log('登录后 = ' + JSON.stringify(res))
            },
            error(res) {
              this.doing = false;
              this.showZymodal("error", this.getErrorMessage(res));
              this.getVerificationImg();
              this.register_error=true;
            }
          });
        }
        //记住密码部分
        //保存的账号
        var name = this.submitLogin.username;
        //保存的密码
        var password = this.submitLogin.password;
        if(this.checked=true){
          //传入账号名，密码，和保存天数3个参数
          this.setCookie(name,pass,7);
        }

      },
      //获取注册短信验证码
      getRegisterSMS(type) {
        this.submitRegister.mobile = this.submitRegister.username;
        if (type === "register") {
          this.requestSMS({
            image_code: this.registerImgCode,
            phone_number: this.submitRegister.phone_number,
            invite_code: this.submitRegister.invite_code
          });
        } else {
          this.requestSMS({
            image_code: this.resetImgCode,
            phone_number: this.submitReset.phone_number
          });
        }
      },
      //请求短信验证码接口
      requestSMS(args) {
        if (
          this.validCheck("phoneNumber", args.phone_number) ||
          this.validCheck("imgCode", args.image_code)
        ) {
          return false;
        }
        this.$api
          .sendPhoneCode(args, null, this.conversationId)
          .then(res => {
            this.$Message.success("获取短信验证码成功");
            let $this = this;
            if (!$this.gotSMS) {
              $this.count = 299;
              $this.gotSMS = true;
              $this.timer = setInterval(() => {
                if ($this.count > 1) {
                  $this.count--;
                } else {
                  clearInterval($this.timer);
                  $this.gotSMS = false;
                }
              }, 5000);
            }
          })
          .catch(res => {
            this.showZymodal("error", this.getErrorMessage(res));
          });
      },
      //注册
      doRegister() {
        if (
          this.validCheck("phoneNumber", this.submitRegister.phone_number) ||
          this.validCheck("password", this.submitRegister.password) ||
          this.validCheck("phoneCode", this.submitRegister.phone_number_code)
        ) {
          return false;
        }
        let redirect = this.$auth.redirect();
        this.submitRegister.conversation_id = this.conversationId;
        this.$auth.register({
          method: "PUT",
          data: this.submitRegister,
          rememberMe: false,
          autoLogin: false,
          redirect: {
            name: redirect ? redirect.from.name : "home"
          },
          fetchUser: true,
          success(response) {
            if (response.data.errorMessage) {
              this.showZymodal("error", response.data.errorMessage);
            } else {
              this.submitLogin.username = this.submitRegister.phone_number;
              this.submitLogin.password = this.submitRegister.password;
              this.regsiter_success=true;

              setInterval(() => {
                this.regsiter_success = false;

                this.show_logintitle=false;
                this.showStatus = "login";
                this.doLogin();
              },2000)
            }

          },
          error(res) {
            this.showZymodal("error", this.getErrorMessage(res));
          }
        });
      },
      //重置密码
      resetPassword() {
        if (
          this.validCheck("phoneNumber", this.submitReset.phone_number) ||
          this.validCheck("password", this.submitReset.password) ||
          this.validCheck("imgCode", this.resetImgCode) ||
          this.validCheck("phoneCode", this.submitReset.phone_number_code)
        ) {
          return false;
        }
        this.submitReset.conversation_id = this.conversationId;
        this.$api
          .findBackPassword(this.submitReset)
          .then(res => {
            this.showZymodal("success", "密码重置成功！");
            this.showStatus = "login";
          })
          .catch(res => {
            this.showZymodal("error", this.getErrorMessage(res));
          });
      },
      getNewCheckImg() {
        this.getVerificationImg();
      },
      getErrorMessage(res) {
        let errorMessage =
          res && res.response && res.response.data
            ? res.response.data
            : "服务器异常，请重试或联系客服";
        if (res && res.status) {
          this.register_error=true;
          if (res.status.toString().indexOf("50") > -1) {
            errorMessage = "服务器异常，请重试或联系客服";
          }
        }else{
          this.register_error=false;
        }
        return errorMessage;
      },
      onLogout() {
        this.$auth.logout({
          success(res) {
            this.$router.push("index");
          }
        });
      },
      goLogin() {
        this.showStatus = "login";
        this.show_logintitle=true;
        this.this.change_style=false
      },
      goRegister() {
        this.show_logintitle=false;
        this.showStatus = "register";
        this.getVerificationImg();
      },
      goReset() {
        this.showStatus = "reset";
        this.getVerificationImg();
      },
      getVerificationImg() {
        this.$api.getConversationId().then(res => {
          this.conversationId = res;
          this.imgSrc =
            this.$http.defaults.baseURL +
            "/auth/verificationPicture/" +
            this.conversationId;
        });
      },
      validCheck(type, data) {
        if (!data && data !== 0) {
          switch (type) {
            case "phoneNumber":
              this.showZymodal("error", "请输入常用手机号");
              break;
            case "password":
              this.showZymodal("error", "请输入密码");
              break;
            case "phoneCode":
              this.showZymodal("error", "请输入短信验证码");
              break;
            default:
              break;
          }
          return true;
        }
        switch (type) {
          case "phoneNumber":
            if (data.length < 11) {
              this.showZymodal("error", "手机号格式不正确");
              return true;
            }
            break;
          case "password":
            break;
          case "imgCode":
            break;
          case "phoneCode":
            break;
          default:
            break;
        }
        return false;
      },
      //设置cookie
      setCookie(c_name,c_pwd,exdays) {
        var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
        window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
      },
     //读取cookie
      getCookie:function () {
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='userName'){
              this.ruleForm.userName=arr2[1];//保存到保存数据的地方
            }else if(arr2[0]=='userPwd'){
              this.ruleForm.password=arr2[1];
            }
          }
        }
    },
      //清除cookie
      clearCookie:function () {
        this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
      }
    },
    components: {
      ZyModal
    },
    mounted() {
      this.getCookie();
    }

  };
</script>
<style>
#ym_login{
  background-color: #FCF8F5;
  width: 100%;
  height: 100%;
  padding-top: 1px;
  box-sizing: border-box;
}
.ym_login_box{
  width: 642px;
  height: 370px;
  background-color: #fff;
  border: 1px solid #DEDEDE;
  box-shadow: #666 0px 0px 10px;
  margin:200px auto;
  padding: 54px 25px;
  box-sizing: border-box;
  display: flex;
}
  .ym_login_left{
    padding-right: 14px;
    box-sizing: border-box;
    border-right: 1px solid #DEDEDE;
  }
.ym_login_left > img{
  margin-top: 50px;
}
 /*登录框右侧登录 */
.password_p{
  width: 180px;
  text-align: center;
}
.phone_p{
  text-align: center;
  width: 180px;
}
.ym_login_right{
  margin-left: 25px;
}
.ym_login_right input{
  border: none !important;
  border-bottom: 1px solid #DEDEDE !important;
}
  .password_p,.phone_p{
    display: inline-block;
  }
  .login-submit-btn{
    display: block !important;
    width: 300px;
    height: 40px;
    background-color: #DD3113;
    color: #fff;
    margin: 20px auto;

  }
.login-submit-btn:hover{
  background-color: #DD3113;
  border:none;
  color: #fff;
}
.text-register{
    color:#DD3113;
    vertical-align: middle;
   display: block;
  width: 360px;
  text-align: center;
}
.text-register > img{
  vertical-align: middle;
}
  .remember{
    margin-top:10px;
  }
  .hide_password{
    position: relative;
  }
.hide_password1{
  position: absolute;
  top:5px;
  right: 20px;
}
  .register_title{
    text-align: center;
    margin-top: -25px;
    font-size: 16px;
  }
/*注册页面*/
.input-container{
  margin-top: 30px;
}
.getSMS{
  color: #DD3113;
  position: absolute;
  top:5px;
  right: 20px;
}
.phone_error{
  width: 174px;
  height: 28px;
  line-height: 28px;
  color: #FF6100;
  position: absolute;
  top:5px;
  left: 420px;
  background-color: #FFF0E6;
}
 /*点击title切换样式 */
  .tu1{
    margin-left: 180px;
  }
  .tu2{
    margin-left: -360px;
  }
 .changeColor{
   color: #DD3113;
 }
.content-container{
  position: relative;
}
.reg_error{
  width: 174px;
  height: 28px;
  line-height: 28px;
  color: #FF6100;
  position: absolute;
  top:240px;
  left: 420px;
  background-color: #FFF0E6;
}
.successReg{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.45);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.successReg>div{
  background-color: #fff;
  opacity: 1;
  width: 320px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;

}
.successReg>div>img{
  vertical-align: middle;
}
.submit_btn{
    margin-top: 10px;
  }
</style>

