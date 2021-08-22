<template>
<div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-item link @click="login()">
            <v-list-item-action>
              <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Play</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        color="indigo"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Play</v-toolbar-title>
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
