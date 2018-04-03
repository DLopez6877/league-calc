
<template>
  <div id="News">
     <h1>NEWS</h1>
     <div v-for="article in articles" :key="article.id" class="article">
        <a :href="article.url">
          <img :src="article.image" alt="news article">
          <div class="title">{{ article.title }}</div>
        </a>
     </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'News',
  data () {
    return {
      msg: '--->',
      articles: []
    }
  },
  mounted() {
    const vm = this;
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    //GET NEWS ARTICLES
    axios.get(corsAnywhere + 'https://fgp-data-us.s3.amazonaws.com/json/mls_mls/news.json?_=1522463143556').then(res => {
      this.articles = res.data;
    }).catch(err => console.log('err', err));
  }
}
</script>

<style lang="scss">
    #News {
      .article {
        position: relative;
        margin-bottom: 20px;
        img {
          max-width: 100%;
        }
        .title {
          position: absolute;
          padding: 0 10px;
          width: calc(100% - 20px);
          font-size: 4vw;
          z-index: 1;
          bottom: 5px;
          left: 0;
          text-align: left;
          background-color: rgba(30, 30, 30, .8);
          transition: color .3s;
          &:hover {
            color: skyblue;
          }
        }
      }
    }
</style>
