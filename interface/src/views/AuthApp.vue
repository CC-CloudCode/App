<template>

<div class="grey lighten-3">

    <Toolbar @refreshLogout="refreshLogout" :balance="balance"/> 

    <Boletim :cart="cart" @refreshBalanco="refreshBalanco()" @refreshCart="refreshCart()" @removeGame="(name)=>{clearGame(name)}"/>
    
    
    <Chat :newIduser="newconversaUser" @refreshed="refreshed" :isLogged="isLogged"/>  
  
  
    <!--
    <ChatNovo :newIduser="newconversaUser" @refreshed="refreshed"/>
    -->
    
    <!--
    NÃO TIREM DE COMENTÁRIO SFF OU SE QUISEREM FALEM PRIMEIRO PQ ESTRAGA A NOSSA PÁGINA APOSTAS 
    <v-container style="width:75%; padding-top:3.8%"> 
    -->
      <keep-alive> 
        <router-view :balance="balance" @refreshCart="refreshCart()" @refreshBoletim="(obj)=>{addCart(obj)}" @refreshBalance="refreshBalance" @refreshConversas="(idUser)=>{refreshConversasAmigos(idUser)}"/> 
      </keep-alive>
    <!--
    </v-container> 
    -->
</div>
</template>

<script>
import Bets from '@/views/Bets.vue'
import Toolbar from '@/components/Toolbar.vue'
import Chat from '@/components/Chat.vue'
//import ChatNovo from '@/components/ChatNovo.vue' 
import Boletim from '@/components/Boletim.vue'
import axios from 'axios'
const authpath = require("@/config/hosts").hostAuthApi
const dataApi = require("@/config/hosts").hostDataApi



export default {
  components:{
    Bets,
    Toolbar,
    Chat, 
    //ChatNovo,
    Boletim
  },

  created: async function(){
    this.userid = JSON.parse(localStorage.getItem("user")).iduser
    this.token = localStorage.getItem("jwt")
    var response = await axios.get(dataApi + "users/" + this.userid + "/balance" + "/?token=" + this.token)
    this.balance = response.data.balance
    this.isLogged = true
    
  },
  data(){
      return {
      color: "#FF0000",
      balance: 0,
      token:"",
      userid:0,
      newconversaUser: -1,  
      cart: [],
      isLogged : true
    }
  },
  methods:{

    clearGame(name){ 
      for(var i=0; i < this.cart.length; i++) {
        if(this.cart[i].team == name){
          this.cart.splice(i,1);
        }  
      }
    }, 

    refreshCart: function(){ 
      this.cart = []
    }, 

    refreshBalanco: function(){ 
      this.refreshBalance()
      //this.cart = []
    },

    addCart: function(obj){ 
      var index = this.cart.findIndex((x) => x.idfixture == obj.idfixture);
      this.jogo_rep_boletim = false
      
      if (index === -1) {
        this.cart.push(obj);
      } else alert("Jogo já existente no boletim!");
    
    }, 

    logout: function(){
      localStorage.removeItem("jwt")
      localStorage.removeItem("user")
    },
    refreshLogout: function(){
      this.isLogged = false
      this.$emit("refreshLogout")
    },
    refreshBalance: async function(){
      var response = await axios.get(dataApi + "users/" + this.userid + "/balance" + "/?token=" + this.token)
      this.balance = response.data.balance
    },
    refreshConversasAmigos: async function(iduser){
      this.newconversaUser = iduser
    },
    refreshed(){
      this.newconversaUser = -1
    }
  }

}
</script>
