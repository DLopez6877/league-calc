<template>
  <div id="Matches">
    <h1>Round {{ currentRound }}</h1>
    <hr>
    <h3>Byes:</h3>
    <p v-for="(team, i) in byes" :key="i">{{team}}</p>
    <div class="rounds">
        <div class="round" v-for='match in matches' :key='match.id' >
            <h3 v-if="match.status === 'completed'">Completed</h3>
            <h3 v-if="match.status === 'playing'">In Progress</h3>
            <h3>{{ formatTime(match.date) }}</h3>
            <div class="home">
                <h3>Home</h3>
                <span>{{ match.home_squad_name }}</span>
                <p v-if="match.status !== 'scheduled'">{{ match.home_score }}</p>
            </div>
            <h2>VS</h2>
            <div class="away">
                <h3>Away</h3>
                <span>{{ match.away_squad_name }}</span>
                <p v-if="match.status !== 'scheduled'">{{ match.away_score }}</p>
            </div>
            <p>Stadium: {{ match.venue_name }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import mlsTeams from './mls_teams.js'
export default {
  name: 'Matches',
  data () {
    return {
        matches: [],
        byes: []
    }
  },
  props: {
      currentRound: {
          required: true
      },
      rounds: {
          required: true
      }
  },
  methods: {
      formatTime(dateString) {
          var date = new Date(dateString);
          return this.$moment(date).format('ddd, MMMM Do h:mm a');
      },
      translateTeamIds(teams) {
          return teams.map(team => mlsTeams[team].team_full);
      }
  },
  mounted() {
      this.rounds.forEach(round => {
          if (round.id === this.currentRound) {
            this.matches = round.matches;
            console.log(round);
            this.byes = this.translateTeamIds(round.bye_squads);
          }
      });
      this.$_.sortBy(this.matches,'match');
  }
}
</script>

<style lang="scss">
    #Matches {
        .rounds {
            border-top: 1px solid #2c3e50;
            .round {
                margin: 15px;
                padding: 15px;
                border: 1px solid #42b983;
            }
        }
        .home, .away {
            p {
                font-size: 30px;
                color: rebeccapurple;
            }
        }
    }
</style>
