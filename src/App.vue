<template>
  <div id="App">
    <nav-component></nav-component>
    <calculator :players="players" :last-completed-round="lastCompletedRound"></calculator>
    <matches :rounds="rounds" :current-round="currentRound"></matches>
    <news></news>
  </div>
</template>

<script>
import axios from 'axios'
import firebaseConfig from './api-keys'
import Firebase from 'firebase'

import mlsTeams from './mls_teams.js'

import Calculator from './Calc.vue'
import NavComponent from './Nav.vue'
import Matches from './Matches.vue'
import News from './News.vue'

const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
let members = db.ref('members');
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

export default {
  name: 'App',
  components: {
    Calculator,
    NavComponent,
    Matches,
    News
  },
  data () {
    return {
      msg: 'FANTASY LEAGUE',     
      players: [],
      rounds: [],
      currentRound: '',
      lastCompletedRound: ''
    }
  },
  firebase: {
    members: members
  },
  mounted() {
    const vm = this;
    //GET PLAYERS THEN CONCAT FULL NAME AND TRANSLATE TEAM ID'S
    axios.get(corsAnywhere + 'https://fgp-data-us.s3.amazonaws.com/json/mls_mls/players.json?_=1521353744779').then(res => {
      res.data.forEach( function (player) {
        player.full_name = player.first_name + ' ' + player.last_name;
        player.team = mlsTeams[player.squad_id];
      });
      this.players = res.data;
    }).catch(err => console.log('err', err));

    //GET ROUNDS
    axios.get(corsAnywhere + 'https://fgp-data-us.s3.amazonaws.com/json/mls_mls/rounds.json?_=1521515434360').then(res => {
        this.rounds = res.data;
        res.data.forEach( function (round) {
          if (round.status === "complete") {
            vm.lastCompletedRound = round.id;
            vm.currentRound = parseInt(round.id) + 1;
          }
        });
    }).catch(err => console.log('err', err));

    //GET LEAGUE MEMBERS
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
