<template>
  <div class="d-flex justify-center">

    <div v-if="this.albumTracks !== '' && this.albumTracks !== 'undefined'">
      <v-card
        max-width="600"
        class="mx-auto"
      >
        <v-toolbar
          color="light-blue"
          dark
        >
          <v-spacer></v-spacer>
          <v-toolbar-title>{{ this.albumName }}</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list
          subheader
          two-line
        >
          <draggable v-model="albumTracks" @start="drag=true" @end="drag=false" @change="startTimer()" :disabled="this.$store.state.dragDisabled">
            <v-list-item 
              v-for="track in albumTracks"
              :key="track.track_number"
            >
              <v-list-item-avatar>
                <v-icon
                  class="grey lighten-1"
                  dark
                >
                  mdi-folder
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="track.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </draggable>
        </v-list>
      </v-card>
    </div>
    <v-btn
      color="primary"
      @click="getNextAlbum"
    >
      Next Album
    </v-btn>
  </div>
  
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import EventBus from '../eventBus';
export default {
  components: {
    draggable
  },
  data: function () {
    return {
      albumName: '',
      albumTracks: '',
      currentAlbum: '',
      multiLine: true,
      expiredSnackbar: false,
      expiredText: '',
      order: [],
    }
  },
  methods: {
    async getAlbum() {
      if (this.$store.state.albumCount >= 5) {
        this.$router.push({name: 'score'})
      } else {
        let offset = this.$store.state.offset;
        await axios.get('http://localhost:4444/getAlbum', { params: { accessToken: localStorage.getItem('accessToken'), offset: offset}})
          .then(response => {
            let res = JSON.parse(response.data.albums)

            this.albumName = res.items[0].album.name
            this.albumTracks = this.shuffleTracks(res.items[0].album.tracks.items)
            this.$store.commit('updateAlbumCount')
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    getNextAlbum() {
      this.updateScore()
      this.triggerResetTimer()
      this.$store.commit('updateOffset')
      this.getAlbum()
    },
    shuffleTracks(arr) {
      for (var i = 0; i < arr.length; i++) {
          let x = Math.floor(Math.random() * arr.length);
          let y = Math.floor(Math.random() * arr.length);
          if (x === y) { //for dont change arr[index] with self !!!
              continue;
          }
          let temp0 = arr[x];
          arr[x] = arr[y];
          arr[y] = temp0;
      }
      return arr 
    },
    updateScore () {
      let score = 0
      let percent = 0
      for (let i = 0; i < this.albumTracks.length; i++) {
        if (this.albumTracks[i].track_number == i+1) {
          score += 1
        }
      }
      
      percent = (score/this.albumTracks.length) * 100
      score = { correct: score, total: this.albumTracks.length, percent: percent }
      this.$store.dispatch('addScore', score)
    },
    startTimer () {
      EventBus.$emit('startTheTimerNow')
    },
    triggerResetTimer() {
      EventBus.$emit('resetTheTimerNow')
    }
  },
  mounted() {
    this.getAlbum()
  }
}
</script>