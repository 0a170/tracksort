import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    accessToken: '',
    refreshToken: '',
    tokenExpiresAt: '',
    offset: 0,
    scores: [],
    albumImages: [],
    albumCount: 0,
    dragDisabled: false,
  },
  setters: {
    //
  },
  getters: {
    getAccessToken (state) {
      return state.accessToken
    },
    getExpirationDate(state) {
      return state.tokenExpiresAt
    },
    getAlbumImages (state) {
      return state.albumImages
    }
  },
  mutations: {
    storeAccessToken (state, accessToken) {
      state.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    storeRefreshToken (state, refreshToken) {
      state.refreshToken = refreshToken
      localStorage.setItem('refreshToken', refreshToken)
    },
    storeExpirationTime (state, timestamp) {
      // let d = new Date()
      // d.setHours( d.getHours() + 1 )
      // state.tokenExpiresAt = d.getTime()
      state.tokenExpiresAt = timestamp
      localStorage.setItem('tokenExpiresAt', timestamp)
      // localStorage.setItem('tokenExpiresAt', d.getTime())
    },
    storeAlbumImage (state, albumImage) {
      state.albumImages.push(albumImage)
    },
    deleteToken (state) {
      state.accessToken = ''
      localStorage.removeItem('accessToken')
    },
    deleteExpirationTime (state) {
      state.tokenExpiresAt = '',
      localStorage.removeItem('tokenExpiresAt')
    },
    deleteRefreshToken (state) {
      state.refreshToken = ''
      localStorage.removeItem('refreshToken')
    },
    updateAlbumCount (state) {
      state.albumCount = state.albumCount + 1
    },
    updateOffset (state) {
      state.offset = state.offset + 1
    },
    addAlbumScore (state, score) {
      state.scores.push(score)
    },
    changedragDisabled (state, dragDisabled) {
      state.dragDisabled = dragDisabled
    }
  },
  actions: {
    login (store, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/login', { username: payload.username, password: payload.password })
        .then(response => {
          store.commit('storeAccessToken', response.data.access_token)
          store.commit('storeRefreshToken', response.data.refresh_token)
          resolve(response)
        },
        error => {
          reject(error)
        }) 
      })
    },
    logout (store) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.accessToken
      return new Promise((resolve, reject) => {
        if (store.state.accessToken) {
          axios.post('/api/logout')
          .then(response => {
            store.commit('deleteToken')
            resolve(response)
          },
          error => {
            reject(error);
          })
        }
      })
    },
    setAccessToken(store, payload) {
      store.commit('storeAccessToken', payload)
    }, 
    setRefreshToken(store, payload) {
      store.commit('storeRefreshToken', payload)
    },
    setExpirationTime(store, payload) {
      store.commit('storeExpirationTime', payload)
    },
    addScore(store, payload) {
      store.commit('addAlbumScore', payload)
    },
    setdragDisabled(store, payload) {
      store.commit('changedragDisabled', payload)
    }
  }  
})