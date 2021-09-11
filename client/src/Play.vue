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
    this.checkTokens()
    // this.checkRefreshToken()
    // this.validateCreds()
  },
  methods: {
    // validateCreds() {
    //   // Check if the access token needs to be refreshed
    //   let tokenExpiresAt = localStorage.getItem('tokenExpiresAt')
    //   if (tokenExpiresAt === undefined || tokenExpiresAt < Date.now()) {
    //     this.getNewCreds()
    //   }
    // },
    checkTokens() {
      // 1. Check if access token has expired, if so refresh and get/use new tokens, otherwise #2
      // 2. check if access token is in localstorage and use that otherwise #3
      // 3. Check if access token is in vuex state, copy to local storage and then use that
      
      let tokenExpiresAt = localStorage.getItem('tokenExpiresAt')
      let accessToken = localStorage.getItem('accessToken')
      // let refreshToken = localStorage.getItem('refreshToken')
      //console.log([parseInt(tokenExpiresAt), Date.now()])
      if (!tokenExpiresAt || (parseInt(tokenExpiresAt) < Date.now()) || !accessToken) {
        // if (!refreshToken && this.$route.query.refresh_token) {
        //   localStorage.setItem('refreshToken', this.$route.query.refresh_token)
        // } else {
        //   // Else refresh token is lost, return to main page to log back in
        //   this.$router.push({name: 'home'})
        // }
        this.getNewCreds()
        return
      }

      
      // if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === 'undefined') {
      //   // If the access token is in the url, set it
      //   if (this.$route.query.access_token) {
      //     this.$store.dispatch('setAccessToken', this.$route.query.access_token)
      //   } else {
      //     // Else access token is not lost, return to main page to log back in
      //     this.$router.push({name: 'home'})
      //   }
      // }
    },
    // checkRefreshToken() {
    //   if (localStorage.getItem("refreshToken") === null || localStorage.getItem("refreshToken") === 'undefined') {
    //     // If the refresh token is in the url, set it
    //     if (this.$route.query.refresh_token) {
    //       this.$store.dispatch('setRefreshToken', this.$route.query.refresh_token)
    //     } else {
    //       // Else refresh token is lost, return to main page to log back in
    //       this.$router.push({name: 'home'})
    //     }
    //   }
    // },
    getNewCreds() {
      axios.get('http://localhost:4444/refresh_token', { params: { refresh_token: localStorage.getItem('refreshToken') }})
        .then(res => {
          // Store access_token and refresh_token
          localStorage.setItem('accessToken', res.data.access_token)
          // this.$store.dispatch('setAccessToken', res.data.access_token)
          // this.$store.dispatch('setRefreshToken', res.data.refresh_token)
          let tokenExpiresAt = new Date()
          // tokenExpiresAt.setHours(tokenExpiresAt.getHours()+1)
          tokenExpiresAt = new Date(new Date(tokenExpiresAt).setHours(tokenExpiresAt.getHours() + 1))
          localStorage.setItem('tokenExpiresAt', tokenExpiresAt.getTime())  
          // this.$store.dispatch('setExpirationTime', tokenExpiresAt.getTime())
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }
}
</script>