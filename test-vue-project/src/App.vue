<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body, #app, .home-page, .login-page{
  height: 100%;
  font-family: "微软雅黑",Arail,Tahoma,Hiragino Sans GB,Microsoft yahei,serif;
  font-size: 14px;
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
</style>