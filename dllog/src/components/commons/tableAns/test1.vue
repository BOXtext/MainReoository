<template>
  <div class="namespace">
    
  </div>
</template>

<script>
  export default {
    name: 'test1',
    data: function() {
      return {
        
      }
    },
    beforeRouteEnter: function (to, from, next) {
        next( vm => {
          vm.$router.push({
            name: 'chart',
            query:{
              tp: vm.$route.query.tp
            }
          })
        })
    }
  }
</script>

<style>
  .namespace {

  }
</style>