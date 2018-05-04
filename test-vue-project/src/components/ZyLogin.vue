<template>
  <div class="login-page">
    <div class="content login-content" v-if='showStatus === "login"'>
      <div class="container" v-if='showStatus === "login"'>
        <div class="input-container">
          <Input required v-model="submitLogin.username" placeholder="请输入常用手机号" class='username' :maxlength="11"></Input>
        </div>
        <div class="input-container">
          <Input v-model="submitLogin.password" placeholder="请输入密码" type="password" @on-enter="doLogin"></Input>
        </div>
        <a class="text-fogot-pwd" href="javascript:;" @click='goReset'>忘记密码</a>
        <div style="clear:both;"></div>
        <Button href="javascript:;" :loading='doing' class="login-submit-btn" @click='doLogin'>登录</Button>
        <p class="tips">还没有账号?</p>
        <a href="javascript:;" @click='goRegister'>立即注册</a>
      </div>
    </div>
    <div class="content" v-if='showStatus === "register"'>
      <div class="container" v-if='showStatus === "register"'>
        <div class="input-container">
          <Input v-model="submitRegister.phone_number" placeholder="请输入常用手机号" class='username' :maxlength="11"></Input>
        </div>
        <div class="input-container">
          <Input v-model="submitRegister.password" placeholder="请输入密码" type="password"></Input>
        </div>
        <div class="input-container">
          <Input v-model="submitRegister.invite_code" placeholder="请输入邀请码" type="password"></Input>
        </div>
        <div class="input-container">
          <Input v-model="registerImgCode" placeholder="请输入图形验证码" @on-enter="enterToLogin" style="width:162px;"></Input>
          <img class="check-code" :src="imgSrc" @click='getNewCheckImg'>
        </div>
        <div class="input-container">
          <Input v-model="submitRegister.phone_number_code" placeholder="请输入验证码" @on-enter="doRegister"></Input>
          <a href="javascript:;" class="getSMS" v-show="!gotSMS" @click='getRegisterSMS("register")'>获取验证码</a>
          <a href="javascript:;" class="getSMS" v-show="gotSMS">s</a>
        </div>
        <a href="javascript:;" class="login-submit-btn" @click='doRegister'>立即注册</a>
        <p class="tips">已有账号?</p>
        <a href="javascript:;" class="tips" @click='goLogin'>直接登录</a>
      </div>
    </div>
    <div class="content reset-content" v-if='showStatus === "reset"'>
      <div class="container">
        <div class="input-container">
          <Input v-model="submitReset.phone_number" placeholder="请输入常用手机号" class='username' :maxlength="11"></Input>
        </div>
        <div class="input-container">
          <Input v-model="submitReset.password" placeholder="请输入新密码" type="password"></Input>
        </div>
        <div class="input-container">
          <Input v-model="resetImgCode" placeholder="请输入图形验证码" @on-enter="enterToLogin" style="width:162px;"></Input>
          <img class="check-code" :src="imgSrc" @click='getNewCheckImg'>
        </div>
        <div class="input-container">
          <Input v-model="submitReset.phone_number_code" placeholder="请输入验证码" @on-enter="doRegister"></Input>
          <a href="javascript:;" class="getSMS" v-show="!gotSMS" @click='getRegisterSMS("reset")'>获取验证码</a>
          <a href="javascript:;" class="getSMS" v-show="gotSMS">s</a>
        </div>
        <a href="javascript:;" class="login-submit-btn" @click='resetPassword'>确定</a>
        <a href="javascript:;" class="tips" @click='goLogin'>登录</a>
      </div>
    </div>
    <ZyModal :zIndex="'1002'" :show='isShowZymodal' :type='zymodalType' @on-close='isShowZymodal = false' :content="zymodalContent" />
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
      }
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
        this.$auth.login({
          data: this.submitLogin,
          redirect: {
            name: "index"
          },
          fetchUser: true,
          success(res) {
            this.doing = false;
          },
          error(res) {
            this.doing = false;
            this.showZymodal("error", this.getErrorMessage(res));
            this.getVerificationImg();
          }
        });
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
            $this.count = 60;
            $this.gotSMS = true;
            $this.timer = setInterval(() => {
              if ($this.count > 1) {
                $this.count--;
              } else {
                clearInterval($this.timer);
                $this.gotSMS = false;
              }
            }, 1000);
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
        this.validCheck("imgCode", this.registerImgCode) ||
        this.validCheck("inviteCode", this.submitRegister.invite_code) ||
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
            this.doLogin();
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
        if (res.status.toString().indexOf("50") > -1) {
          errorMessage = "服务器异常，请重试或联系客服";
        }
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
    },
    goRegister() {
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
          case "imgCode":
            this.showZymodal("error", "请输入图形验证码");
            break;
          case "phoneCode":
            this.showZymodal("error", "请输入短信验证码");
            break;
          case "inviteCode":
            this.showZymodal("error", "请输入邀请码");
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
    }
  },
  components: {
    ZyModal
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
