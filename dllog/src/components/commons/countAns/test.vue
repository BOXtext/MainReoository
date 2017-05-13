<template>
  <div class="namespace">
    
  </div>
</template>

<script>
  export default {
    name: 'test',
    data: function() {
      return {
        
      }
    },
    beforeRouteEnter: function (to, from, next) {
        next( vm => {
          vm.$router.push({
            name: 'dataBrower',
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