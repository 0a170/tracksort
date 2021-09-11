<template>
  <v-container>
  <!-- <div class="d-flex justify-space-between"> -->
    <!-- <div v-for="(score, index) in scores" :key="index"> -->
    <v-row>
      <v-col v-for="(score, index) in scores" :key="index">
        <v-parallax
          :src=images[index]
        >
          <v-container class="text-center">
            <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="score.percent"
              :color=colors[index]
            >

              <strong>{{ score.correct }} / {{ score.total }}</strong>
            </v-progress-circular>
          </v-container>
        </v-parallax>
      </v-col>
    </v-row>
    <!-- </div> -->
  <!-- </div> -->
  </v-container>
</template>

<script>

export default {
  data: () => ({
    colors: ['primary', 'red', 'purple', 'green', 'yellow']
  }),
  computed: {
    scores() {
      return this.$store.state.scores
    },
    images() {
      return this.$store.state.albumImages
    }
  }
}
</script>