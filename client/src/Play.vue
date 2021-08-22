<template>
  <div>
    <timer></timer>
    <album></album>
  </div>
</template>

<script>
import axios from 'axios'
import album from './components/Album.vue'
import timer from './components/Timer.vue'

export default {
  components: {
    album,
    timer
  },
  mounted() {
    this.checkAccessToken()
    this.checkRefreshToken()
    this.validateCreds()
  },
  methods: {
    validateCreds() {
      // Check if the access token needs to be refreshed
      let tokenExpiresAt = localStorage.getItem('tokenExpiresAt')
      if (tokenExpiresAt === undefined || tokenExpiresAt < Date.now()) {
        this.getNewCreds()
      }
    },
    checkAccessToken() {
      if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === 'undefined') {
        // If the access token is in the url, set it
        if (this.$route.query.access_token) {
          this.$store.dispatch('setAccessToken', this.$route.query.access_token)
        } else {
          // Else access token is not lost, return to main page to log back in
          this.$router.push({name: 'home'})
        }
      }
    },
    checkRefreshToken() {
      if (localStorage.getItem("refreshToken") === null || localStorage.getItem("refreshToken") === 'undefined') {
        // If the refresh token is in the url, set it
        if (this.$route.query.refresh_token) {
          this.$store.dispatch('setRefreshToken', this.$route.query.refresh_token)
        } else {
          // Else refresh token is lost, return to main page to log back in
          this.$router.push({name: 'home'})
        }
      }
    },
    getNewCreds() {
      axios.get('http://localhost:4444/refresh_token', { params: { refresh_token: localStorage.getItem('refreshToken') }})
        .then(res => {
          this.$store.dispatch('setAccessToken', res.data.access_token)
          this.$store.dispatch('setRefreshToken', res.data.refresh_token)
          let tokenExpiresAt = new Date()
          tokenExpiresAt.setHours(tokenExpiresAt.getHours()+1)
          this.$store.dispatch('setExpirationTime', tokenExpiresAt.getTime())
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }
}
</script>

 