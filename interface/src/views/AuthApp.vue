<template>

<div>

    <Toolbar/>
    <div> LOGADO </div>
    <Chat/>


    <container>
      <keep-alive> 
        <router-view/> 
      </keep-alive>
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
    Chat
  },
  data(){
      return {
      color: "#FF0000"
    }
  }

}
</script>
