/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

import App from '../src/App'
import Home from '../src/Home'
import Play from '../src/Play'
import Score from '../src/Score'
import vuetify from './plugins/vuetify'
import { store } from './store'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/play',
            name: 'play',
            component: Play
        },
        {
            path: '/score',
            name: 'score',
            component: Score
        }
    ]
});

//require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components: { App },
    vuetify,
    store,
    router,
    render: (h) => h(App),
});

export default app;