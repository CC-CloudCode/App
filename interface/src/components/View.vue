<template>
  <v-content>
    <div >
        <h1> OLAAA </h1>
        <router-view />
      
    </div>
  </v-content>
</template>

<script>
export default {
  metaInfo () {
    return {
      
    }
  },
  methods:{

  }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
