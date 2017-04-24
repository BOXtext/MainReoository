<template>
  <div id="app">
  <dg-header></dg-header>
    <el-row>
      <el-col :span="3">
         <dg-side></dg-side>
      </el-col>
      <el-col :span="21">
        
          <router-view></router-view>
        
      </el-col>
    </el-row>
    
  </div>
</template>

<script>

import dgSide from './components/commons/dgSide'
import dgHeader from './components/commons/dgHeader'

export default {
  name: 'app',
  data(){
    return {
      
     
    }
  },
  components:{
    dgSide,
    dgHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
  width: 100%;
  height: 100%;
}
#app .dgSide {

  height: 100%;
}

</style>
