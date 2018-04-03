
<template>
  <div id="Error404">
     <h1>404</h1>
     <h2>{{ msg }}</h2>
     <span>page not found</span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Error404',
  data () {
    return {
      msg: '--->',
      articles: []
    }
  }
}
</script>

<style lang="scss">
    #Error404 {
      color: blue;
    }
</style>
