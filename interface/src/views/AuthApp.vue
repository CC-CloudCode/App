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
import Bets from '@/views/Bets.vue'
import Toolbar from '@/components/Toolbar.vue'
import Chat from '@/components/Chat.vue'

export default {
  components:{
    Bets,
    Toolbar,
    Chat,
  },
  data(){
      return {
      color: "#FF0000"
    }
  }

}
</script>
