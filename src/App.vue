<template>
  <div id="App">
    <h1>{{ msg }}</h1>
    <label for="round">Round: </label>
    <input id="round" v-model="round" type="number">
    <hr>
    <label for="availablePlayers">Select player:</label>
    <input id="availablePlayers" class="form-control" type="text" placeholder="Type to search...">
    <hr>
    <typeahead v-model="model" target="#availablePlayers" :data="availablePlayers" item-key="last_name"/>
    <div v-show="model.first_name">
      <h2 v-show="!round">Oops.. select a round </h2>
      <div v-show="model.first_name && round">
        <h2>You selected {{model.first_name}} {{model.last_name}}</h2>
        <p>Score for round {{round}}:</p>
        <p v-show="!model.stats.scores[round]">No Points :(</p>
        <p v-show="model.stats.scores[round]">{{model.stats.scores[round]}} points</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Typeahead} from 'uiv'

export default {
  name: 'App',
  components: {Typeahead},  
  data () {
    return {
      model: {stats: {scores: ''}},
      msg: 'FANTASY POINTS CALCULATOR',
      availablePlayers: [],
      scores: '',
      round: ''
    }
  },
  mounted() {   
    axios.get('https://fgp-data-us.s3.amazonaws.com/json/mls_mls/players.json?_=1521353744779').then(res => {
        this.availablePlayers = res.data;
      }).catch(err => console.log('err', err));
  }
}
</script>

<style>
#App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
