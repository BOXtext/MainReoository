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

      <div v-if="IfSM">
        <h2>数据概况</h2>
      <el-table  
        :data="tableData.list"
        border 
        style="width: 100%">
         <el-table-column
          type="index" label="ID"
          width="70">
        </el-table-column>

        <el-table-column
          prop="sumVisits"
          label="总访问量" 
          width="180">
        </el-table-column>
          
        <el-table-column
          prop="sumPv"
          label="PV数"
          width="180">
        </el-table-column>

        <el-table-column
          prop="sumUv"
          label="UV数" 
          width="180">
        </el-table-column>

        <el-table-column
          prop="sumIp" 
          label="独立IP数">
        </el-table-column>
      </el-table>
      </div>

      <div v-if="IfIP">
        <h2>IP流量分析</h2>
          <!-- IP流量分析 -->
      <el-table  
        :data="tableData.list"
        border 
        style="width: 100%">
         <el-table-column
          type="index" label="ID"
          width="70">
        </el-table-column>

        <el-table-column
          prop="traIp"
          label="IP地址" 
          width="180">
        </el-table-column>
          
        <el-table-column
          prop="traRegion"
          label="国家/地区"
          width="180">
        </el-table-column>

        <el-table-column
          prop="traVisits"
          label="访问次数" 
          width="180">
        </el-table-column>

        <el-table-column
          prop="traIp" 
          label="访问占比%">
        </el-table-column>
      </el-table>
      </div>

      <div v-if="IfPage">
        <h2>页面访问分析</h2>
          <!-- IP流量分析 -->
      <el-table  
        :data="tableData.list"
        border 
        style="width: 100%">
         <el-table-column
          type="index" label="ID"
          width="70">
        </el-table-column>

        <el-table-column
          prop="pageUrl"
          label="URL" 
          width="180">
        </el-table-column>
          
        <el-table-column
          prop="pageVisits"
          label="访问次数"
          width="180">
        </el-table-column>

        <el-table-column
          prop="pageProportion"
          label="访问占比" 
          width="180">
        </el-table-column>

        <el-table-column
          label="占比条">
        </el-table-column>
      </el-table>
      </div>

        <div v-if="IfOS">
        <h2>操作系统</h2>
      <el-table  
        :data="tableData.list"
        border 
        style="width: 100%">
         <el-table-column
          type="index" label="ID"
          width="70">
        </el-table-column>

        <el-table-column
          prop="osOs"
          label="操作系统" 
          width="180">
        </el-table-column>
          
        <el-table-column
          prop="osProportion"
          label="访问用户占比%"
          width="180">
        </el-table-column>

        <el-table-column
          prop="pageProportion"
          label="访问占比" 
          width="180">
        </el-table-column>

        <el-table-column
          label="占比条">
        </el-table-column>
      </el-table>
      </div>

      <div v-if="IfBro">
        <h2>浏览器</h2>
      <el-table  
        :data="tableData.list"
        border 
        style="width: 100%">
         <el-table-column
          type="index" label="ID"
          width="70">
        </el-table-column>

        <el-table-column
          prop="broBrowser"
          label="浏览器" 
          width="180">
        </el-table-column>
          
        <el-table-column
          prop="broVersion"
          label="版本号%"
          width="180">
        </el-table-column>

        <el-table-column
          prop="broVisits"
          label="浏览器访问次数" 
          width="180">
        </el-table-column>
          
        <el-table-column
          prop="broProportion"
          label="访问占比%" 
          width="180">
        </el-table-column>

        <el-table-column
          label="占比条">
        </el-table-column>
      </el-table>
      </div>
      <el-pagination :current-page="parseInt(pageCount)" 
            @current-change="pageChange"   :total="parseInt(tableData.total)" 
           layout="total, prev, pager, next, jumper" >
        </el-pagination>     
    </div>
  </div>
</template>

<script>
// import date from 'utils/date';
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
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },


      }
    },
   methods: {
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
        let url = 'http://localhost:7777/sclog';
        let str = '2016-10-28';
       
        let reqData= new FormData();
        reqData.append('strdate',str);
        //根据不同的type来请求不同得到数据
        switch (type){
          case 'getSummary':
           that.IfSM = true;
            that.$http.post('/sclog/getSummary',reqData).then( ({data}) => {
                this.tableData.list = data.data.data_list;
            })
          break;
          case 'getPageview':
         
            that.IfPage = true;
            that.$http.post('sclog/getPageview', reqData).then( ({data}) => {
                 this.tableData.list = data.data.data_list;
            })
          break;
          case 'getOs':
          
            that.IfOS = true;
            that.$http.post('sclog/getOs', reqData).then( ({data}) => {
                 this.tableData.list = data.data.data_list;
            })
          break;
          case 'getBrowser':
           
            that.IfBro = true;
            that.$http.post('/scloggetBrowser', reqData).then( ({data}) => {
                this.tableData.list = data.data.data_list;
            })
          break;
          case 'getTraffic':
           
            that.IfIP = true;
            that.$http.post('sclog/getTraffic', reqData).then( ({data}) => {
                 this.tableData.list = data.data.data_list;
            })
          break;
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