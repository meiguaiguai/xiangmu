<template>
  <div id="newArticle">
     <header><span>文章管理</span>／新建文章</header>
    <section>
      <div class="article_section new_article_section">
         <div class="designSketch">
           <img class="like_phone" src="../assets/images/phone.png" alt="">
           <div class="phone_title">
             <p><img src="../assets/images/jianjiao.png" alt="" style="vertical-align: middle">返回 </p>
             <p> {{article_name}} </p>
             <p><img style="width: 24px;height: 5px" src="../assets/images/dian.png" alt=""> </p>
           </div>
           <div class="add_article_content">
             <img src="../assets/images/add.png" alt="">
             <img class="arrow" src="../assets/images/jiantou.png" alt="">

           </div>

         </div>
        <!--右边文章编辑-->
        <div class="edit_article">
              <div class="edit_article_top">
                <p>文章基本设置</p>
                <div class="buttonGroup">
                  <Button type="error">保存</Button>
                  <Button type="ghost">预览</Button>
                  <Button type="ghost">取消</Button>
                </div>
              </div>
          <div class="edit_article_content">
            <ul>
              <li><span class="spanTitle">文章名称:</span><input type="text" placeholder="请输入文章名称" v-model="article_name"></li>
              <li>
                <span class="spanTitle">谁可以见:</span>
                <span @click="public">
                  <img src="../assets/images/right.png" alt="" v-show="publicimg">
                  <img src="../assets/images/noright.png" v-show="!publicimg"  alt="">公开
                </span>
                <span class="secret_span" @click="secret">
                  <img v-show="secretimg" src="../assets/images/noright.png" alt="">
                  <img src="../assets/images/right.png" v-show="!secretimg"  alt="">私密
                </span>
              </li>
              <li><span class="spanTitle">标签(最多5个):</span><span class="sameborder"><input type="text" ><button @click="addLabel">添加</button></span>
                <ul class="labelList" v-show="show_label">
                  <li v-for="(item,index) in arr" :id="index" >{{item}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data(){
    return{
      check:true,
      article_name:'',   //文章名称
      publicimg:true, //公开checkbox
      secretimg:true,//不公开勾选 不选择
      arr:['5.1活动','10.1活动','11.11活动','12.12活动'],
      show_label:false
    }
  },
  methods:{
    public(){
      this.publicimg = !this.publicimg;
      if(this.publicimg){
        this.secretimg=true;
      }
    },
    secret(){
      this.secretimg = !this.secretimg;
      if(this.secretimg==false){
        this.publicimg=false
      }
    },
    addLabel(){
      this.show_label=!this.show_label
    },




  }


}
</script>
<style>
  #newArticle{
    margin-left: 255px;
    margin-top: -250px;
    margin-right: 220px;
  }
  #newArticle>header>span{
    color: #DD3113;
    margin-bottom: 23px;
  }
  .new_article_section{
    height: 610px;
    display: flex;
    background-color: #fff;
    box-shadow: #dedede 0px 0px 5px;
  }
  /*手机内容左边*/
  .designSketch{
    border-right: 1px solid #DEDEDE;
    position: relative;
  }
  .like_phone{
    margin: 20px 30px;
  }
  .phone_title{
    display: flex;
    justify-content: space-between;
    width: 268px;
    position: absolute;
    top: 80px;
    left: 30px;
    color: white;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .add_article_content{
    position: absolute;
    position: absolute;
    top: 110px;
    left: 42px;
  }
  .arrow{
   margin-left: 18%;
    margin-top: -30px;
  }
  /*右边内容*/
  .edit_article{
    width: 100%;
  }
  .edit_article_top,.edit_article_content{
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .edit_article_top{
    width: 100%;
    display: flex;
    height: 66px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #DEDEDE;
  }
  .edit_article_content>ul>li{
    margin-top: 30px;
  }
  .edit_article_content>ul>li:nth-child(2) input{
    margin-right: 10px;
  }
  .edit_article_content .spanTitle{
    margin-right: 10px;
  }
  .sameborder>input,.sameborder>button{
    border: none;
    border: 1px solid #DD3113;
    height: 36px;
  }
  .sameborder>input{
  border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .sameborder>button{
    width: 50px;
    background-color: #FFF0E6;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .secret_span{
    margin-left: 30px;
  }
  .check_style{
    background-color: #DD3113;
    color: white;
  }
  .labelList{
    width: 162px;
    text-align: center;
    box-shadow: #dedede 0 0 10px;
    margin-left: 100px;
  }
  .labelList > li{
    height: 34px;
    line-height: 34px;
  }
</style>


