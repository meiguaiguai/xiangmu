# test-vue-project

> A Vue.js project
[zy-vue-boilerplate](http://115.29.188.190/git/%E8%91%9B%E5%9C%A3%E6%98%8E/vue-boilerplate)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目包含：

- [vue-webpack-boilerplate](https://github.com/vuejs-templates/webpack)的所有内容
  - 官方推荐的基于 webpack 的 Vue 模板。

- [iview](https://iviewui.com/)
  - 一套基于 Vue.js 的高质量 UI 组件库。

- [vuex](https://vuex.vuejs.org/)
  - 一个专为 Vue.js 应用程序开发的 **状态管理模式**。

- [websanova/vue-auth](https://github.com/websanova/vue-auth)
  - 一个基于 Vue.js 实现用户认证的库。
  - 在本项目模板中配合 JWT 认证使用。

- [vue-axios](https://github.com/imcvampire/vue-axios)
  - 将 axios 和 Vue.js 进行集成。
  - 在本项目模板中用于[websanova/vue-auth](https://github.com/websanova/vue-auth)的配置

- [axios](https://github.com/axios/axios)
 - 一个基于Promise 用于浏览器和 node.js 的 HTTP 客户端

- [less](http://less.bootcss.com/)
 - 一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。

- 几个在项目中的常用组件
  - api.js: 将api配置在同一文件中。 [查看文档](http://115.29.188.190/git/%E8%91%9B%E5%9C%A3%E6%98%8E/vue-webpack-boilerplate/src/master/docs/API.md)
  - ZyLogin.vue: 登录、注册、修改密码模块。 [查看文档](http://115.29.188.190/git/%E8%91%9B%E5%9C%A3%E6%98%8E/vue-webpack-boilerplate/src/master/docs/LOGIN.md)
  - ZyModal.vue: 需要用户确认的弹窗提示。 [查看文档](http://115.29.188.190/git/%E8%91%9B%E5%9C%A3%E6%98%8E/vue-webpack-boilerplate/src/master/docs/MODAL.md)
  - ZyTable.vue: 基于 iview-Table 、带有分页、筛选、排序功能的表格。 [查看文档](http://115.29.188.190/git/%E8%91%9B%E5%9C%A3%E6%98%8E/vue-webpack-boilerplate/src/master/docs/TABLE.md)
