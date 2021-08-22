<template>
  <div class="d-flex justify-space-between">
    <div v-for="(score, index) in scores" :key="index">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="score.percent"
        :color=colors[index]
      >
            {{ score.correct }} / {{ score.total }}
      </v-progress-circular>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    colors: ['primary', 'red', 'purple', 'green', 'yellow']
  }),
  computed: {
    scores() {
      return this.$store.state.scores
    }
  }
}
</script>