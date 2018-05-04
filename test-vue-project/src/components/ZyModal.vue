<template>
	<div class="notice-wrapper" :style="'z-index:'+zIndex+';'">
		<transition name="fade">
			<div class="mask notice-container" v-if="show" :style="'z-index:'+zIndex+';'">
				<div class="notice-content">
					<img v-if="type === 'warn'" class="content-img" src="../assets/pop/warn.png"/>
					<img v-if="type === 'error'" class="content-img" src="../assets/pop/error.png"/>
					<img v-if="type === 'success'" class="content-img" src="../assets/pop/correct.png"/>
					<p v-html="content" style="text-aligh:center"></p>
          <div v-if="type === 'warn'" class="btn-container">
            <Button style="margin-right: 20px" @click="closePop">取消</Button>
            <Button type="primary" @click="confirm">确定</Button>
          </div>
          <div v-else class="btn-container" style="">
            <Button shape="circle" type="primary" @click="closePop">我知道了</Button>
          </div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
export default {
  name: "defaultModal",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    zIndex: {
      type: String,
      default:'1000'
    }
  },
  data: function() {
    return {};
  },
  methods: {
    closePop() {
      this.$emit("on-close");
    },
    confirm() {
      this.$emit("on-confirm");
    }
  }
};
</script>
<style lang='less' scoped>
.notice-wrapper {
  position: fixed;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }
}
.notice-container {
  display: flex;
  .btn-container{
    margin-top: 26px;
    text-align: center;
  }
  .notice-content {
    position: fixed;
    top: 200px;
    max-width: 240px;
    min-width: 200px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 14px 28px;
    background: white;
    line-height: 18px;
    .content-img {
      width: 90px;
      height: 90px;
      margin: 0 auto;
      display: block;
    }
    a {
      display: block;
      width: 120px;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      color: white;
      background: #28b493;
    }
    p {
      padding: 20px 0;
      text-align: center;
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>