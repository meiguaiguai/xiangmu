import apiConfig from './api.js'
import getData from './utils.js'

//  使用：
//      import api from './api'
//      Vue.use(api, options)
//      配置：options{
//          successFunction  function    optional    请求成功后执行的回调函数
//          errorFunction    function    optional    请求成功但返回error后执行的回调函数 status：200
//          apiErrorFunction function    optional    请求失败后执行的回调函数 status：4xx,5xx
//      }

function Api(Vue, options) {
    this.options = options
    this.getData = getData
}
Object.keys(apiConfig).forEach((key) => {
    Api.prototype[key] = function(){
        return apiConfig[key].apply(this, arguments);
    }
});

export default {
    install: function (Vue, options) {
        var getData =  new Api(Vue, options)
        Vue.prototype.$api = getData
    }
}