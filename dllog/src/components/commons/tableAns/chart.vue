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
        <div id="chars" style="height:500px;width:500px;"></div>
      </div>
        <div style="width:730px;margin:auto;">   
        要查询的地址：<input id="text_" type="text" value="宁波天一广场" style="margin-right:100px;"/>
        查询结果(经纬度)：<input id="result_" type="text" />
        <input type="button" value="查询" @click="searchByStationName"/>
        <div id="container" 
            style="position: absolute;
                margin-top:30px; 
                width: 730px; 
                height: 590px; 
                top: 50; 
                border: 1px solid gray;
                overflow:hidden;">
        </div>
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
        tableType:'',
        IfIP:false,
        IfSM:false,
        IfPage:false,
        IfOS:false,
        IfBro:false,
         Dates:'',
         startDate:'',
        endDate:'',
       


      }
    },
   methods: {

 searchByStationName() {
    var map = new BMap.Map("container");
    var localSearch = new BMap.LocalSearch(map);
    localSearch.enableAutoViewport(); //允许自动调节窗体大小
    
　　var keyword = document.getElementById("text_").value;
　　localSearch.setSearchCompleteCallback(function (searchResult) {
　　var poi = searchResult.getPoi(0);
    console.log(poi)
　　　　document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat; //获取经度和纬度，将结果显示在文本框中
　　　　map.centerAndZoom(poi.point, 13);
　　});
　　localSearch.search(keyword);
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
        console.log(that.Dates);
        let str = '2016-10-28';
        let reqData= new FormData();
        reqData.append('strdate',str);
        //根据不同的type来请求不同得到数据
        switch (type){
          case 'getSummary':
           that.IfSM = true;
            that.$http.post('/sclog/getAllSummary', reqData).then( ({data}) => {
                let pieData = [
                    {value : data.data.data_list[0].sumPv, name:'PV数'},
                    {value : data.data.data_list[0].sumUv, name :'UV数'},
                    {value : data.data.data_list[0].sumIp, name :'独立IP数'}
                ]
                that.drawPie('chars', pieData)
            })
          break;
          case 'getPageview':
           
            that.IfPage = true;
            that.$http.post('/sclog/getAllPageview', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let urlName = data.data.data_list.map((item, index) => item.pageUrl);
              let pageProportion = data.data.data_list.map((item, index) => item.pageProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : pageProportion[i], name: urlName[i]}
              }  
              that.drawPie('chars', pieData)
            })
          break;
          case 'getOs':
           console.log('getOs')
            that.IfOS = true;
            that.$http.post('/sclog/getAllOs', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let osOs = data.data.data_list.map((item, index) => item.osOs);
              let osProportion = data.data.data_list.map((item, index) => item.osProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : osProportion[i], name: osOs[i]}
              }  
              that.drawPie('chars', pieData)
            })
          break;
          case 'getBrowser':
           console.log('getBrowser')
            that.IfBro = true;
            that.$http.post('/sclog/getAllBrowser', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let broBrowser = data.data.data_list.map((item, index) => item.broBrowser+'版本号：'+item.broVersion);
              let broProportion = data.data.data_list.map((item, index) => item.broProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : broProportion[i], name: broBrowser[i]}
              }  
              that.drawPie('chars', pieData)
            })
          break;
          case 'getTraffic':
           console.log('getTraffic')
            that.IfIP = true;
            that.$http.post('/sclog/getAllTraffic', reqData).then( ({data}) => {
              let len = data.data.data_list.length;
              let traRegion = data.data.data_list.map((item, index) => item.traRegion+'IP地址：'+item.traIp);
              let traProportion = data.data.data_list.map((item, index) => item.traProportion);
              let pieData = [];
              for(let i=0; i < len; i++) {
                pieData[i] = {value : traProportion[i], name: traRegion[i]}
              }  
              that.drawPie('chars', pieData)
            })
          break;
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
                text: '地域分布',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
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
.dataBrower .dt{

  text-align: left;
  margin-top: 20px;
  margin-left: 10px;
}

.dataBrower .el-table {
  margin-top: 20px;
  margin-left: 10px;
}
</style>