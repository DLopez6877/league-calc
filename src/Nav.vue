<template>
  <div id="NavComponent">
      <a href="">Fantasy Points Calculator</a>
      <a href="">My Team</a>
      <a href="">League Members Teams</a>
      <a href="">Matches</a>
      <a href="">News</a>
  </div>
</template>

<script>

export default {
  name: 'NavComponent',
  data () {
    return {
      msg: '--->',
    }
  }
}
</script>

<style lang="scss">
    #NavComponent {
        a {
            margin-left: 20px;
        }
    }
</style>
