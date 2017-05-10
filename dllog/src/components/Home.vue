<template>
  <div class="home">
    <div class="retrieval  criteria header">
      <h1>Nginx日志管理系统</h1>
       <el-carousel  v-show="IfPic" style="margin:20px;" :interval="4000" type="card" height="">
            <el-carousel-item v-for="item in picList">
              <img :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel>
    </div>
  </div>
</template>

<script>
import pic1 from 'assets/pic1.jpg'
import pic2 from 'assets/pic2.jpg'
import pic3 from  'assets/pic3.jpg'
export default {
  name: 'home',
  data () {
    return {
      IfPic:true,
       picList:[
        { imgUrl: pic1 },
        { imgUrl: pic2 },
        { imgUrl: pic3 }
        ]
    }
  },
   methods: {
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
