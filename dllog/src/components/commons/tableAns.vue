<template>
  <div class="tableAns">
        <div class="menu" >
         
          <el-row class="BtnGroup">
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getSummary')"><div class="txt">数据概况</div></el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getPageview')"><div class="txt">页面访问分析</div></el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getOs')"><div class="txt">操作系统</div></el-button>
            </el-col>
          </el-row>
           <el-row class="BtnGroup">
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getBrowser')"><div class="txt">浏览器</div></el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="addGroup('getTraffic')"><div class="txt">IP流量分析</div></el-button>
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
    name: 'tableAns',
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
            name: 'chart',
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
  .tableAns {
    width: 100%;
    height: 100%;
  }
  .tableAns .menu{
  width: 100%;

}
.tableAns .dt{
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
}
.BtnGroup  .txt {
  text-align: center;
  height: 180px;
  line-height: 180px;
}
.BtnGroup  .txt:hover {
/*-webkit-animation: Text duration 2s delay iteration-count direction fill-mode;
-o-animation: Text duration 2s delay iteration-count direction fill-mode;*/
animation: Text 1.5s;
-webkit-animation: Text 1.5s;
transition-timing-function: linear;
}
@keyframes Text {
  0% {
    
     
  }
  50% {
   
    transform: rotateY(50deg) scale(1.5);
  }
  100%{
    
  }
}
.tableAns .BtnGroup .el-button--primary{
    color: #fff;
    /*background-color: #4f9035;*/
    /* border-color: #20a0ff; */
    width: 400px;
    height: 200px;
    margin-top: 20px;
    font-size: 30px;
}
.tableAns .addGroup{
  text-align: right;

}
.tableAns .addGroup .el-button{
  margin-right: 50px;
  margin-top: 20px;
  background: #35c7ba;
}

</style>