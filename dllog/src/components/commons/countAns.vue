<template>
  <div class="countAns">
   
    
        <div  class="menu" >
          <el-row class="firstBtnGroup">
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getSummary')">数据概况</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getPageview')">页面访问分析</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getOs')">操作系统</el-button>
            </el-col>
              <el-col :span="4">
              <el-button type="primary" @click="addGroup('getBrowser')">浏览器</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('getTraffic')">IP流量分析</el-button>
            </el-col>
            <el-col :span="4">
              <!-- <el-button type="primary" @click="addGroup('getSummary')">companyID</el-button> -->
            </el-col>
          </el-row>
 <el-row style="margin-top:20px;">
      <el-col :span="12">
      <div id="bars"></div>
      </el-col>
      <el-col :span="12">
      <div id="chars"></div>
      </el-col>
    </el-row>
          
          
      </div>
  </div>
</template>

<script>
import echarts from 'echarts';
  export default {
    name: 'countAns',
    data: function() {
      return {
        SumList:[]

      }
    },
   methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
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
       drawBar (id,Piedata) {
        console.log(Piedata)
        if(Piedata.length == 0){
          this.$message({
            message: '暂无数据',
            type: 'warning'
          })
        }else {
             this.chart = echarts.init(document.getElementById(id));
            this.chart.setOption({
            title: {
                text: '今日访问量柱状图',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
               }
            },
          
            xAxis: {
            data: Piedata.map(function (item) {
                return item[0];
            })
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
           tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}"
            },
            visualMap: {
            top: 20,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 5000,
                color: '#096'
            }, {
                gt: 5000,
                lte: 30000,
                color: '#ffde33'
            }, {
                gt: 30000,
                lte: 50000,
                color: '#ff9933'
            }, {
                gt: 50000,
                lte: 70000,
                color: '#cc0033'
            }, {
                gt: 70000,
                lte: 100000,
                color: '#660099'
            }, {
                gt: 100000,
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#ffff00 '
            }
        },
            series : 
              {
                    name:'今日访问量',
                    type:'bar',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:Piedata.map(function (item) {
                          return item[1];
                      }),
                              
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 5000
                        }, {
                            yAxis: 30000
                        }, {
                            yAxis: 50000
                        }, {
                            yAxis: 70000
                        }, {
                            yAxis: 100000
                        }]
                    }
              }
          
            });
        }
           
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
           vm.$http.post('/sclog/getSummary',reqData).then( ({data}) => {
                let tmp = [];
                let pieData = [
                    {value : data.data.data_list[0].sumPv, name:'PV数'},
                    {value : data.data.data_list[0].sumUv, name :'UV数'},
                    {value : data.data.data_list[0].sumIp, name :'独立IP数'}
                ]
               
                data.data.data_list.forEach((item, index) => {
                      tmp.push([
                         '独立IP数',
                          item.sumIp
                        ]);
                      tmp.push([
                         '总访问量',
                          item.sumVisits
                        ]);
                      tmp.push([
                         'PV数',
                          item.sumPv
                        ]);
                      tmp.push([
                         'UV数',
                          item.sumUv
                        ]);
                  });
                vm.SumList = tmp;
                // console.log(vm.SumList)
                vm.drawBar('bars',vm.SumList)
                 vm.drawPie('chars', pieData)
            })
          
        })
        
    }
  }
</script>

<style >
#bars {
    margin-left: 20px;
    height: 500px;
    width: 500px;
}
#chars{
   /*margin-left: 20px;*/
    height: 500px;
    width: 500px;
}
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