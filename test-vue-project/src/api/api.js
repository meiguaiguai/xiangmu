// 用法:
//      async () {
//          let something = await this.$api.getSomething(params,headers);
//      }
//      params       optional    ajax请求的参数 GET请求放在query string、其他请求放在request body
//      headers      optional    ajax请求的headers
export default {
  //登录相关api
  pwdRevise(params, headers) {
    return this.getData({
      url: '/auth/innerUpdatePassword',
      method: 'POST'
    }, params, headers)
  },
  getConversationId(params, headers) {
    return this.getData({
      url: '/auth/getConversationId',
      method: 'GET'
    }, params, headers)
  },
  sendPhoneCode(params, headers, id, type) {
    let url = ''
    if (type === "register") {
      url = '/auth/sendPhoneCode/' + id
    } else {
      url = '/auth/sendFindPhoneCode/' + id
    }
    return this.getData({
      url,
      method: 'POST'
    }, params, headers)
  },
}