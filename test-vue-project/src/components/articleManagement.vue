<template>
  <div id="article">
   <header>
     <p>文章管理</p>
     <div class="aricleRight">
       <Row>
         <Col style="padding-right:10px;position: relative">
         <Icon class="iconSearch"  type="search"></Icon>
         <Select  v-model="model13" filterable remote :remote-method="remoteMethod1" :loading="loading1" placeholder="请输入文章名称搜索..">
           <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
         </Select>
         </Col>
       </Row>
       <i-select :model.sync="model1" style="width:120px;margin-right:10px" placeholder="选择文章状态">
         <i-option v-for="item in cityList" :value="item.value" key="{{$key}}">{{ item.label }}</i-option>
       </i-select>
       <router-link to="/index/newarticle">
       <Button class="newArtical" type="error" size="small">新建文章</Button>
       </router-link>
     </div>
   </header>
   <section>
     <div class="article_section">
       <p class="no_article">
         暂无文章
       </p>
     </div>
   </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        cityList: [
          {
            value: 'gongkai',
            label: '公开'
          },
          {
            value: 'simi',
            label: '私密'
          },

        ],
        model1: '',
//     搜索框
        model13: '',
        loading1: false,
        options1: [],
        list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']

      }
    },
    methods:{
      remoteMethod1 (query) {
        if (query !== '') {
          this.loading1 = true;
          setTimeout(() => {
            this.loading1 = false;
            const list = this.list.map(item => {
              return {
                value: item,
                label: item
              };
            });
            this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options1 = [];
        }
      },
    }
  }
</script>
<style>
#article{

  margin-left: 255px;
  margin-top: -240px;
  margin-right: 220px;
}
#article>header{
  display: flex;
  justify-content: space-between;
}
.aricleRight{
  display: flex;
}
.iconSearch{
   position: absolute;
    top:10px;
   z-index:2;
   margin-left: 5px;
  }
.ivu-select-single .ivu-select-selection{
  padding-left: 10px;
}
.newArtical{
    width: 120px;
  }
  .article_section{
    height: 120px;
    background-color: #fff;
    box-shadow: #dedede 0px 0px 5px;
    margin-top: 10px;
  }
.no_article{
   text-align: center;
   line-height: 120px;
}
</style>
