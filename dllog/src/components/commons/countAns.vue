<template>
  <div class="countAns">
        <div  class="menu" >
          <el-row class="firstBtnGroup">
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getSummary')">数据概况</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getPageview')">页面访问分析</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getOs')">操作系统</el-button>
            </el-col>
          </el-row>
           <el-row class="firstBtnGroup">
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getBrowser')">浏览器</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getTraffic')">IP流量分析</el-button>
            </el-col>
            <el-col :span="8">
              <!-- <el-button type="primary" @click="addGroup('getSummary')">companyID</el-button> -->
            </el-col>
          </el-row>

      </div>
  </div>
</template>

<script>
  export default {
    name: 'countAns',
    data: function() {
      return {
       

      }
    },
   methods: {
    /**
     * [addGroup 用于添加分组的事件]
     * @params  type是用于区分不同按钮，dt是选中的日期
     */
      addGroup(type) {
          var that = this;
          that.$router.push({
            name: 'dataBrower',
            query:{
              tp: type
            }
          })
      },
      
    
    },
    beforeRouteEnter: function( to,from,next ) {
        next(vm => {
          
        })
        
    }
  }
</script>

<style >
  .countAns {
    width: 100%;
    height: 100%;
  }
  .countAns .menu{
  width: 100%;

}
.firstBtnGroup .el-col {
  margin-left: 20px;
}
.countAns .dt{
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
}
.countAns .firstBtnGroup .el-button--primary{
    color: #fff;
    /*background-color: #4f9035;*/
    /* border-color: #20a0ff; */
    width: 400px;
    height: 200px;
    margin-top: 20px;
    font-size: 30px;
}
.countAns .addGroup{
  text-align: right;

}
.countAns .addGroup .el-button{
  margin-right: 50px;
  margin-top: 20px;
  background: #35c7ba;
}

</style>