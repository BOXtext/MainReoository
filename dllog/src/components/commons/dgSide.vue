<template>
  <div class="dgSide">
       <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>表格数据概况</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="addGroup('getSummary')">数据概况</el-menu-item>
                 <el-menu-item index="1-1" @click="addGroup('getPageview')">页面访问分析</el-menu-item>
                 <el-menu-item index="1-1" @click="addGroup('getOs')">操作系统</el-menu-item>
                 <el-menu-item index="1-1" @click="addGroup('getBrowser')">浏览器</el-menu-item>
                 <el-menu-item index="1-1" @click="addGroup('getTraffic')">IP流量分析</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-message"></i>图形数据概况</template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="chartGroup('getSummary')">数据概况</el-menu-item>
                 <el-menu-item index="2-1" @click="chartGroup('getPageview')">页面访问分析</el-menu-item>
                 <el-menu-item index="2-1" @click="chartGroup('getOs')">操作系统</el-menu-item>
                 <el-menu-item index="2-1" @click="chartGroup('getBrowser')">浏览器</el-menu-item>
                 <el-menu-item index="2-1" @click="chartGroup('getTraffic')">IP流量分析</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
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
     addGroup(type) {
          var that = this;
          that.$router.push({
            name: 'dataBrower',
            query:{
              tp: type
            }
          })
      },
      chartGroup(type) {
        var vm = this;
          vm.$router.push({
            name: 'chart',
            query:{
              tp: type
            }
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