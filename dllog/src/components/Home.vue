<template>
  <div class="home">
    <div class="header">
     
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
