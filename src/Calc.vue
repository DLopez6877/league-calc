<template>
    <div id="Calculator">
        <h1>{{ msg }}</h1>
        <label for="players">Select a player:</label>
        <input id="players" class="form-control" type="text" placeholder="Type to search...">
        <hr>
        <p class="roundIndicator">Last completed round was round {{lastCompletedRound}}</p>
        <label for="round" >Round: </label>
        <input id="round" v-model="round" type="number" min="1">
        <hr>
        <typeahead v-model.lazy="model" target="#players" :data="players" item-key="full_name"/>
        <div v-show="model.first_name">
            <h2 v-show="!round">Oops.. select a round </h2>
            <div v-show="model.first_name && round">
                <h2>You selected {{model.full_name}}</h2>
                <h3>Score for round {{round}}: </h3>
                <h1 class="score" v-show="model.stats.scores[round]">{{model.stats.scores[round]}} points</h1>
                <h1 class="score" v-show="!model.stats.scores[round]">No Points :(</h1>
                <h2>{{ model.team.team_full }}</h2>
                <p>Average Points: {{ model.stats.avg_points }}</p>
                <p>Total Points: {{ model.stats.total_points }}</p>
                <p>Season Rank: {{ model.stats.season_rank }}</p>
                <h4 v-if="model.status === 'injured'"> 🚑 Injured</h4>
            </div>
        </div>
    </div>
</template>

<script>
import {Typeahead} from 'uiv'

export default {
  name: 'Calculator',
  components: {
      Typeahead
    },  
  data () {
    return {
      model: {stats: {scores: ''}, team: {team_full: '', team_short: ''}},
      msg: 'FANTASY POINTS CALCULATOR',
      round: ''
    }
  },
  props: {
      players: {
          type: Array,
          required: true
      },
      lastCompletedRound: {
          required: true
      }
  }
}
</script>

<style lang="scss">
    #Calculator {
        .roundIndicator {
            margin: 5px 0;
            color: slategray;
            font-style: italic;
            font-size: 14px;
        }
        hr {
            margin-top: 12px;
        }
        .score {
            font-size: 30px;
            color: skyblue;
        }
    }
</style>
