<template>
  <div class="tableAns">
        <div class="" >
         
          <el-row class="BtnGroup">
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getSummary')"><div class="txt">数据概况</div></el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getPageview')"><div class="txt">页面访问分析</div></el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getOs')"><div class="txt">操作系统</div></el-button>
            </el-col>
              <el-col :span="4">
              <el-button type="primary" @click="addGroup('getBrowser')"><div class="txt">浏览器</div></el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getTraffic')"><div class="txt">IP流量分析</div></el-button>
            </el-col>
            <el-col :span="4">
              <!-- <el-button type="primary" @click="addGroup('getSummary')">companyID</el-button> -->
            </el-col>
          </el-row>
        <div>
           <el-row style="margin-top:20px;">
              <el-col :span="12">
              <div id="Sum" class="groupsStyle"></div>
              </el-col>
              <el-col :span="12" >
              <div id="Page" class="groupsStyle"></div>
              </el-col>
            </el-row>
          <el-row style="margin-top:20px;">
              <el-col :span="12">
              <div id="OS" class="groupsStyle"></div>
              </el-col>
              <el-col :span="12">
              <div id="Brow" class="groupsStyle"></div>
              </el-col>
            </el-row>
          
          
          <div id="IP" class="groupsStyle"></div>
        </div>
      </div>
  </div>
</template>

<script>
import echarts from 'echarts';
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
          var vm = this;
          vm.$router.push({
            name: 'chart',
            query:{
              tp: type
            }
          })
      },
      /*
      * 画圆盘的函数
      */
       drawPie (id,Piedata) {
        if(Piedata[0] == null){
          this.$message({
            message: '暂无数据',
            type: 'warning'
          })
        }else {
             this.chart = echarts.init(document.getElementById(id));
            this.chart.setOption({
            title: {
                text: '今日访问饼图',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
               }
            },
            toolbox:{
              //y:'bottom'
               show: true,
              feature:{
                magicType: {show: true, type: ['stack', 'tiled']},
                saveAsImage:{
                  type:'png',
                  title:'生成图片'
                }
              }
              
            },
           tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            series : [
              {
                    name:'地域',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:Piedata.sort(function (a, b) { return a.value - b.value}),
                    
                    label: {
                        normal: {
                            textStyle: {
                                color: '#2c343c'
                            }
                        }
                    },
                   labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#2c343c'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                              color: '',
                              shadowBlur: 200,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                  },
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                        return Math.random() * 200;
                  }
              }
          ]
            });
        }
           
     }
    
    },
    beforeRouteEnter: function( to,from,next ) {
        next(vm => {




          let str = '2016-10-28';
          let reqData= new FormData();
          reqData.append('strdate',str);
          reqData.append('currentPage',1);
          reqData.append('pageNum',20);
           vm.$http.post('/sclog/getSummary', reqData).then( ({data}) => {
                let pieData = [
                    {value : data.data.data_list[0].sumPv, name:'PV数'},
                    {value : data.data.data_list[0].sumUv, name :'UV数'},
                    {value : data.data.data_list[0].sumIp, name :'独立IP数'}
                ]
                vm.drawPie('Sum', pieData)
            })
           vm.$http.post('/sclog/getPageview', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let urlName = data.data.data_list.map((item, index) => item.pageUrl);
              let pageProportion = data.data.data_list.map((item, index) => item.pageProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : pageProportion[i], name: urlName[i]}
              }  
              vm.drawPie('Page', pieData)
            })
           vm.$http.post('/sclog/getOs', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let osOs = data.data.data_list.map((item, index) => item.osOs);
              let osProportion = data.data.data_list.map((item, index) => item.osProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : osProportion[i], name: osOs[i]}
              }  
              vm.drawPie('OS', pieData)
            })
           vm.$http.post('/sclog/getBrowser', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let broBrowser = data.data.data_list.map((item, index) => item.broBrowser+'版本号：'+item.broVersion);
              let broProportion = data.data.data_list.map((item, index) => item.broProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : broProportion[i], name: broBrowser[i]}
              }  
              vm.drawPie('Brow', pieData)
            })
           vm.$http.post('/sclog/getTraffic', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let traRegion = data.data.data_list.map((item, index) => item.traRegion+'IP地址：'+item.traIp);
              let traProportion = data.data.data_list.map((item, index) => item.traProportion);
              let pieData = [];
              // for(let i=0; i < len; i++) {
              //   pieData[i] = {value : traProportion[i], name: traRegion[i]}
              // }  
              // vm.drawPie('chars', pieData)
              for(let i=0;i<len;i++){
                if(data.data.data_list[i].traRegion==''){
                  
                  console.log(i)
                }
                // vm.searchByStationName(data.data.data_list[i])
              }
              // console.log(vm.pointList) IP
            })
        })
        
    }
  }
</script>

<style >
.tableAns .el-col {
  margin-left: 20px;
}
.groupsStyle{
   height: 500px;
    width: 500px;
}
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
}
.tableAns .BtnGroup .el-button--primary{
    color: #fff;
    /*background-color: #4f9035;*/
    /* border-color: #20a0ff; */
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