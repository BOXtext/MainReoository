<template>
  <div class="dataBrower">
    <div class="menu" >
     <div class="dt">
      <el-row>
        <el-col :span="4">
              <el-date-picker
              v-model="Dates"
              type="date"
              placeholder="选择日期"
             >
            </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="queryData(tableType, 1)">查询</el-button>
        </el-col>
        <el-col :span="16"></el-col>
      </el-row>
          
      </div>
      <el-row>
        <el-col :span="12">
          <div id="chars" ></div>
        </el-col>
        <el-col :span="12">
           <div id="bars"></div>
        </el-col>
      </el-row>
        
       
        <div id="map" v-if="ifMap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
  export default {
    name: 'dataBrower',
    data: function() {
      return {
        pageCount: 1,
        tableData:{
          list:[],
          total:0
        },
        ifMap:false,
        tableType:'',
        IfIP:false,
        IfSM:false,
        IfPage:false,
        IfOS:false,
        IfBro:false,
         Dates:'',
         startDate:'',
        endDate:'',
       pointList:[],
       pointArray:[]

      }
    },
   methods: {
    /**
     * [drawBar 用于画柱状图]
     * @param  {[type]} id      [description]
     * @param  {[type]} Piedata [description]
     * @return {[type]}         [description]
     */
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

  
    /**
     * 换页
     */
    pageChange (val) {
      var that = this;
      that.pageCount = val;
      that.queryData(that.$route.query.tp,that.$route.query.dt,val);
    },


    /**
       * [orign 初始化数据]
       * @return {[type]} [description]
       */
        orign() {
          var that = this;
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          that.Dates =  [start, end];
          that.startDate = that.Dates[0];
          that.endDate = that.Dates[1];
      },
      /**
       * 用于查询数据事件，根据不同的type查询不同的数据
       */
      queryData(type, index){

        var that = this;
        let str = '2016-10-28';
        let reqData= new FormData();
        reqData.append('strdate',str);
         reqData.append('currentPage',1);
        reqData.append('pageNum',20);
        //根据不同的type来请求不同得到数据
        switch (type){
          case 'getSummary':
           that.IfSM = true;
           that.ifMap = false;
            that.$http.post('/sclog/getSummary', reqData).then( ({data}) => {
                let pieData = [
                    {value : data.data.data_list[0].sumPv, name:'PV数'},
                    {value : data.data.data_list[0].sumUv, name :'UV数'},
                    {value : data.data.data_list[0].sumIp, name :'独立IP数'}
                ]
                  let tmp = [];
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
                that.SumList = tmp;
                // console.log(vm.SumList)
                that.drawBar('bars',that.SumList)
                that.drawPie('chars', pieData)
            })
          break;
          case 'getPageview':
           
            that.IfPage = true;
            that.ifMap = false;
            that.$http.post('/sclog/getPageview', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let urlName = data.data.data_list.map((item, index) => item.pageUrl);
              let pageProportion = data.data.data_list.map((item, index) => item.pageProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : pageProportion[i], name: urlName[i]}
              }  
               let tmp = [];
                data.data.data_list.forEach((item, index) => {
                      tmp.push([
                         data.data.data_list[index].pageUrl,
                          data.data.data_list[index].pageVisits
                        ]);
                  });
                that.SumList = tmp;
                // console.log(vm.SumList)
                that.drawBar('bars',that.SumList)
              that.drawPie('chars', pieData)
            })
          break;
          case 'getOs':
            that.IfOS = true;
            that.ifMap = false;
            that.$http.post('/sclog/getAllOs', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let osOs = data.data.data_list.map((item, index) => item.osOs);
              let osProportion = data.data.data_list.map((item, index) => item.osProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : osProportion[i], name: osOs[i]}
              }  
              let tmp = [];
                data.data.data_list.forEach((item, index) => {
                      tmp.push([
                         data.data.data_list[index].osOs,
                          data.data.data_list[index].osVisits
                        ]);
                  });
                that.SumList = tmp;
                // console.log(vm.SumList)
                that.drawBar('bars',that.SumList)
              that.drawPie('chars', pieData)
            })
          break;
          case 'getBrowser':
            that.IfBro = true;
            that.ifMap = false;
            that.$http.post('/sclog/getBrowser', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let broBrowser = data.data.data_list.map((item, index) => item.broBrowser+'版本号：'+item.broVersion);
              let broProportion = data.data.data_list.map((item, index) => item.broProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : broProportion[i], name: broBrowser[i]}
              }  
              let tmp = [];
                data.data.data_list.forEach((item, index) => {
                      tmp.push([
                         data.data.data_list[index].broBrowser,
                          data.data.data_list[index].broVisits
                        ]);
                  });
                that.SumList = tmp;
                // console.log(vm.SumList)
                that.drawBar('bars',that.SumList)
              that.drawPie('chars', pieData)
            })
          break;
          case 'getTraffic':
            that.IfIP = true;
            that.ifMap = true;
            that.$http.post('/sclog/getTraffic', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let traRegion = data.data.data_list.map((item, index) => item.traRegion+'IP地址：'+item.traIp);
              let traProportion = data.data.data_list.map((item, index) => item.traProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : traProportion[i], name: traRegion[i]}
              }  
               let tmp = [];
                data.data.data_list.forEach((item, index) => {
                      tmp.push([
                         data.data.data_list[index].traRegion,
                          data.data.data_list[index].traVisits
                        ]);
                  });
                that.SumList = tmp;
                // console.log(vm.SumList)
                that.drawBar('bars',that.SumList)
              that.drawPie('chars', pieData)
              // for(let i=0;i<len;i++){
              //   if(data.data.data_list[i].traRegion==''){
                  
              //     console.log(i)
              //   }
                // that.searchByStationName(data.data.data_list[i])
              // }
              // console.log(that.pointList)
            })
          break;
        }
        
      },
      //转换坐标
       searchByStationName(place) {
        let that = this;
        let map = new BMap.Map("container");
        let localSearch = new BMap.LocalSearch(map);
    　　localSearch.setSearchCompleteCallback(function (searchResult) {
        let poi = searchResult.getPoi(0);
        that.pointList.push({
          name:'traRegion',
          value:[
          poi.point.lng,
          poi.point.lat,
          place.traVisits
          ]
        })
    　　});
    　　localSearch.search(place.traRegion);
    },
      /**
       * 画地图
       */
      drawMap() {
         this.chart = echarts.init(document.getElementById(id));
          this.chart.setOption({
            tooltip: {},
    visualMap: {
        min: 0,
        max: 1500,
        left: 'left',
        top: 'bottom',
        text: ['High','Low'],
        seriesIndex: [1],
        inRange: {
            color: ['#e0ffff', '#006edd']
        },
        calculable : true
    },
    geo: {
        map: 'china',
        roam: true,
        label: {
            normal: {
                show: true,
                textStyle: {
                    color: 'rgba(0,0,0,0.4)'
                }
            }
        },
        itemStyle: {
            normal:{
                borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis:{
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    series : [
       {
           type: 'scatter',
           coordinateSystem: 'geo',
           data: convertData(data),
           symbolSize: 20,
           symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
           symbolRotate: 35,
           label: {
               normal: {
                   formatter: '{b}',
                   position: 'right',
                   show: false
               },
               emphasis: {
                   show: true
               }
           },
           itemStyle: {
               normal: {
                    color: '#F06C00'
               }
           }
        },
        {
            name: 'categoryA',
            type: 'map',
            geoIndex: 0
            // tooltip: {show: false}, 
        }
    ]
            });
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
                text: '地域分布',
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
    beforeRouteEnter: function (to, from, next) {
        next( vm => {
          vm.tableType = vm.$route.query.tp; 
          vm.queryData(vm.$route.query.tp,1);
          vm.orign();
          // console.log(vm.startDate)
        })
    }
  }
</script>

<style >
.dataBrower #bars {
    margin-left: 20px;
    height: 500px;
    width: 500px;
}
.dataBrower #chars{
   /*margin-left: 20px;*/
    height: 500px;
    width: 500px;
}
.dataBrower .dt{

  text-align: left;
  margin-top: 20px;
  margin-left: 10px;
}
  #chars{
    margin: 0 auto;
    height: 600px;
    width: 600px;
  }
.dataBrower .el-table {
  margin-top: 20px;
  margin-left: 10px;
}
</style>