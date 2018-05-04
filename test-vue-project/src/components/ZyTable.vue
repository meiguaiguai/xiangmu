<template>
  <div class="qTable">
    <div class="fr option-block" v-if="querys">
      <div class="option-btn-container" v-for="(item,i) in querys" :key="item.placeholder">
        <Date-picker v-if="item.type === 'datePicker'" :placeholder="item.placeholder" type="daterange" placement="bottom-end" @on-open-change='getDatePickerIndex(i)' @on-change='changeDate' style="width: 200px">
        </Date-picker>
        <Select @on-change='setQueryChanged' clearable v-if="item.type === 'select'" :placeholder="item.placeholder" v-model="queryModels[i]" style="width:120px;">
            <Option 
            v-for="option in item.selectList" :value="option.value" :key="option.value"></Option>
          </Select>
        <Input @on-change='setQueryChanged' @on-enter="queryData" v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="queryModels[i]" style="width: 120px;" />
      </div>
      <div class="query-btn option-btn-container">
        <Button :loading="loading" type="primary" icon="ios-search" @click="queryData">
            <span v-if="!loading">查询</span>
            <span v-else>查询</span>
          </Button>
      </div>
    </div>
    <div class="clearfix"></div>
    <Table :loading='loading' @on-sort-change='onSortChange' :columns="data.columns" :data="data.data"></Table>
    <div class="bottom-option-block" v-if="perPage&&totalDataNum>12">
      <Page :current='pageIndex' :page-size='perPage' :total="totalDataNum" show-elevator @on-change='changePage'></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: "qTable",
    props: {
      // 必须 控制表格的表头和列 接口同iview的Table
      columns: {
        type: Array,
        required: true
      },
      // 必须 表格数据来源的接口url
      dataApi: {
        type: String,
        required: true
      },
      // 分页的每页条数
      perPage: {
        type: Number,
        default: 12
      },
      // querys: [
      //   {
      //     placeHolder: "用户手机号",
      //     type: "input",
      //     paramNames: "phoneNumber"
      //   },
      //   {
      //     placeHolder: "任务类型",
      //     type: "select",
      //     paramNames: "variety",
      //     selectList: [
      //       {
      //         value: "AppOrder",
      //         label: "手机APP关注订单"
      //       },
      //       {
      //         value: "PcOrder",
      //         label: "PC端关注订单"
      //       },
      //       {
      //         value: "AppPopOrder",
      //         label: "手机人气流量订单"
      //       },
      //       {
      //         value: "PcPopOrder",
      //         label: "PC端人气流量订单"
      //       }
      //     ]
      //   },
        // {
        //   placeholder: "选择日期范围筛选",
        //   type: "datePicker",
        //   paramNames: ["beginTime", "endTime"]
        // }
      // ]
      querys: {
        type: Array
      },
      // 表格初次渲染时 在mounted中执行的自定义函数
      initFunction: {
        type: Function,
        default: () => {}
      },
      //判断表格的data位置
      dataPosition: {
        type: String,
        default: "data"
      }
    },
    data() {
      return {
        totalDataNum: 0,
        pageIndex: 1,
        loading: false,
        data: {
          columns: [],
          data: []
        },
        apiConfig: {
          params: {}
        },
        queryModels: [],
        queryParams: [],
        datePickerIndex: -1,
        isChanged: false
      };
    },
    methods: {
      changePage(pageIndex) {
        this.pageIndex = pageIndex;
        this.getTableDataByHttp();
      },
      changeDate(date) {
        console.info("date", date);
        this.queryModels[this.datePickerIndex] = date;
      },
      getDatePickerIndex(i) {
        this.datePickerIndex = i;
      },
      queryData() {
        this.queryParams = this.queryModels.concat();
        this.$Message.success("查询数据成功");
        this.getTableDataByHttp();
      },
      onSortChange() {
        this.$emit("on-sort-change", arguments);
      },
      setQueryChanged() {
        this.isChanged = true;
      },
      async getTableDataByHttp(params) {
        this.loading = true;
        this.apiConfig.url = this.dataApi;
        this.apiConfig.methods = "GET";
        if (this.querys && this.querys.length > 0) {
          for (let i = 0; i < this.querys.length; i++) {
            let query = this.querys[i];
            let paramsName = query.paramNames;
            let model = this.queryParams[i];
            if (query.type === "datePicker") {
              if (model && model[0] && model[1]) {
                this.apiConfig.params[paramsName[0]] = model[0];
                this.apiConfig.params[paramsName[1]] = model[1];
              } else {
                delete this.apiConfig.params[paramsName[0]];
                delete this.apiConfig.params[paramsName[1]];
              }
            } else {
              if (model) {
                this.apiConfig.params[paramsName] = model;
              } else {
                delete this.apiConfig.params[paramsName];
              }
            }
          }
        }
        if (params && typeof params === "object") {
          this.pageIndex = 1;
          for (let key in params) {
            if (typeof params[key] === "undefined" && params[key] === null) {
              delete this.apiConfig.params[key];
            } else {
              this.apiConfig.params[key] = params[key];
            }
          }
        }
        if (this.isChanged) {
          this.pageIndex = 1;
        }
        if (this.perPage) {
          this.apiConfig.params["pageIndex"] = this.pageIndex;
        }
        // console.info("table api config", this.apiConfig);
        let res = await this.$http(this.apiConfig);
        this.loading = false;
        this.data.data = this.dataPosition ?
          res.data[this.dataPosition] :
          res.data;
        this.totalDataNum = res.data.count;
        this.isChanged = false;
        // console.info("表格数据", this.data.data);
      }
    },
    mounted() {
      this.data.columns = this.columns ? this.columns : this.data.columns;
      this.initFunction();
      this.getTableDataByHttp();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .qTable {
    height: 100%;
    max-height: 100%;
    position: relative;
    .fr {
      float: right;
    }
    .fl {
      float: left;
    }
    .clearfix {
      clear: both;
    }
    .ivu-btn-primary {
      font-size: 14px;
      padding: 5px 15px;
      border: none;
    }
    .option-btn-container {
      margin-left: 10px;
      display: inline-block;
    }
    .query-btn {
      margin-right: 30px;
      .ivu-btn-primary {
        width: 80px;
        transition: all 0.3s;
      }
      .ivu-btn-primary:hover {
        opacity: 0.8;
      }
    }
    .additional-btns {
      margin-bottom: 11px;
      button {
        transition: all 0.3s;
      }
      button:hover {
        opacity: 0.8;
      }
    }
    .option-block {
      margin-bottom: 10px;
    }
    .ivu-table th {
      background: #e7f9f6;
    }
    .ivu-table td {
      height: 39px;
    }
    .ivu-table-body {
      // max-height: 566px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .bottom-option-block {
      float: right;
      position: absolute;
      right: 26px;
      bottom: 8px;
    }
  }
</style>
