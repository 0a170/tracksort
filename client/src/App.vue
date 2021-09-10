<template>
<div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <v-app-bar
        app
        color="indigo"
        dark
      >
        <v-row justify="space-between">
          <v-col class="col-md-2">
            <v-toolbar-title>Tracksort</v-toolbar-title>
          </v-col>
          <v-col class="col-md-2 text-right">
            <v-btn @click="login()" color="primary">  
              Play
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
  
      <v-main>
        <v-container
          class="fill-height d-flex justify-center"
          fluid
        >
          <router-view></router-view>
        </v-container>
      </v-main>
      <v-footer
        color="indigo"
        app
      >
        <span class="white--text">&copy; 2020</span>
      </v-footer>
    </v-app>
  </v-app>
</div>
</template>

<script>
import axios from 'axios'

export default {
  components: {

  },
  props: {

  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    login() {
      axios.get('http://localhost:4444/login')
        .then(response => {
          console.log(response)
          //localStorage.access_token = 
          // this.$router.push({name: 'play'})
          window.location.href = response.data;
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }
}
</script>
