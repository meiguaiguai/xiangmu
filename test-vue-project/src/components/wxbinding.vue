<template>
  <div class="wxbinding">
    <div class="prompt">
      <slot name="slotTitle"></slot>
      <slot name="slotContent"></slot>
      <slot name="slotPassword"></slot>
      <div class="wx_button">
        <slot name="bind"></slot>
        <slot name="cancel"></slot>
      </div>
    </div>
    <slot name="binderror_phone"></slot>
    <slot name="binderror_password"></slot>

  </div>
</template>
<script>
export default {
  data(){
    return{
      bindpassword_error:false
    }
  }
}
</script>
<style>
  /*微信绑定*/
  .wxbinding{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.45);
  }
  .prompt{
    width: 440px;
    height: 222px;
    background-color: #fff;
    margin: 15% auto;
  }
  .prompt_title{
    padding: 15px 20px;
    border-bottom: 1px solid #dedede;
  }
  .prompt_p{
    width: 320px;
    text-align: center;
    margin: 28px auto;
  }
  .wx_button{
    text-align: center;
    margin-top: 30px;
  }
  .prompt_phone{
    margin-left: 70px;

  }
  .prompt_phone> input{
    width: 220px;
    height: 36px;
    border-radius: 5px;
    border: 1px solid #E2E5E4;
    padding-left: 10px;
  }
  .prompt_phone_addtop{
    margin-top: 28px;
    margin-bottom: 30px;
  }
  .binding{
    width: 90px;
    height: 32px;
    background-color: #DD3113;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-right: 20px;
  }
  .cancel{
    background-color: #fff;
    color: #333;
    border: 1px solid #dedede;
  }
.binderror_password{
  position: absolute;
  background-color: #FFF0E6;
  color: #FF6100;
  padding: 5px 10px;
  width: 174px;
  height: 28px;
  border-radius: 5px;
  right: 550px;
  top:430px;

}
  .binderror_phone{
top: 370px;
  }

</style>
