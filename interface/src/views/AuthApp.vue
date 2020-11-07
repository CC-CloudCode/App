<template>

<div>

    <Toolbar/>
    <div> LOGADO </div>
    <Chat/>

    <container>
      <router-view/>
    </container>
</div>
</template>

<script>
import Country from '@/views/Country.vue'
import Toolbar from '@/components/Toolbar.vue'
import Chat from '@/components/Chat.vue'

export default {
  components:{
    Country,
    Toolbar,
    Chat
  },
  data(){
      return {
      color: "#FF0000"
    }
  }

}
</script>
