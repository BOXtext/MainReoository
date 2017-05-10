<template>
  <div class="dgHeader">
    	<el-menu theme="dark" :default-active="activeIndex" class="dgHeader" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1" @click="toLogin">登陆</el-menu-item>
		</el-menu>
  </div>
</template>

<script>
  export default {
    name: 'dgHeader',
    data: function() {
      return {
         activeIndex: '1',
        activeIndex2: '1'
      }
    },
     methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toLogin() {
        this.$router.push({
          name:'login'
        })
      }
    }
  }
</script>

<style>
  .dgHeader .el-menu--horizontal .el-menu-item{
	float: right;
  }
  .dgHeader {
    text-align: center;
  }
</style>