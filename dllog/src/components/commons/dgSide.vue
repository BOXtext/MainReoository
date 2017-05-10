<template>
  <div class="dgSide">
       <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>首页</template>
          
            <el-menu-item-group>
              <template slot="title">数据统计</template>
              <el-menu-item index="1-1" @click="toCount">查看列表</el-menu-item>
              
            </el-menu-item-group>
              <el-menu-item-group>
              <template slot="title">饼图分析</template>
              <el-menu-item index="1-1" @click="toAns">查看饼图</el-menu-item>
            </el-menu-item-group>
            
            </el-submenu>

            <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-menu"></i>导航三</el-menu-item>
          </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'dgSide',
    data: function() {
      return {
        
      }
    },
   methods: {
   /**
    * 统计按钮
    */
    toCount () {
      this.$router.push({
        name:'countAns'
      })
    }, 
    toAns() {
      this.$router.push({
        name:'tableAns'
      })
    },
    
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style >
  .dgSide {
    width: 100%;
    height: 100%;
  }
</style>