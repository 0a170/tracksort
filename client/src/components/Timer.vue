<template>
  <v-snackbar
    v-model="counterFlag"
    :timeout="-1"
    top
    left
  >

    <template v-slot:action="{ attrs }">
      <v-btn
        color="red"
        text
        top
        left
        v-bind="attrs"
      >
        <div v-if="secondsLeft > 0" class="text-left">
          {{ formattedTime }}
        </div>
        <div v-else>
          Time's Up!
        </div>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import EventBus from '../eventBus';
export default {
  data: () => ({
    secondsLeft: 59,
    counterFlag: false,
    timerObj: ''
  }),
  computed: {
    formattedTime() {
      if (this.secondsLeft < 10) {
        return '00:0' + this.secondsLeft
      } else {
        return '00:' + this.secondsLeft
      }
    }
  },
  methods: {
    countDown() {
      if (this.secondsLeft > 0) {
        this.secondsLeft -= 1
        this.setTimer()
      } else {
        this.$store.dispatch('setdragDisabled', true)
        window.clearTimeout()
      }
    },
    setTimer() {
        this.timerObj = window.setTimeout(this.countDown, 1000)
    },
    startTimer () {
      if (this.counterFlag != true) {
        this.counterFlag = true
        this.setTimer()
      }
    },
    resetTimer() {
      window.clearTimeout(this.timerObj)
      this.$store.dispatch('setdragDisabled', false)
      this.counterFlag = false
      this.secondsLeft = 59
    }
  },
  mounted () {
    var ref = this
    EventBus.$on('startTheTimerNow', function () {
      ref.startTimer()
    })
    EventBus.$on('resetTheTimerNow', function () {
      ref.resetTimer()
    })
  }
}
</script>