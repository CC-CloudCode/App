<template>

<div class="grey lighten-3">

    <Toolbar @refreshLogout="refreshLogout" :balance="balance"/>
    
    <Chat :newIduser="newconversaUser" @refreshed="refreshed"/>  
    
    <!--
    NÃO TIREM DE COMENTÁRIO SFF OU SE QUISEREM FALEM PRIMEIRO PQ ESTRAGA A NOSSA PÁGINA APOSTAS 
    <v-container style="width:75%; padding-top:3.8%"> 
    -->
      <keep-alive> 
        <router-view :balance="balance" @refreshBalance="refreshBalance" @refreshConversas="(idUser)=>{refreshConversasAmigos(idUser)}"/> 
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
import axios from 'axios'
const authpath = require("@/config/hosts").hostAuthApi
const dataApi = require("@/config/hosts").hostDataApi



export default {
  components:{
    Bets,
    Toolbar,
    Chat
  },
  created: async function(){
    this.userid = JSON.parse(localStorage.getItem("user")).iduser
    var response = await axios.get(dataApi + "users/" + this.userid + "/balance")
    this.balance = response.data.balance
    var aux
    axios.interceptors.response.use((response) => {
        return response
      }, function (error) {
        const originalRequest = error.config;

           if (originalRequest.url === authpath + 'refreshToken')
              return Promise.reject(error);
            


        if (error.response.status === 401 && !originalRequest._retry ) {
            console.log("DEU 401!!")
            originalRequest._retry = true;
            aux = true
              var user = JSON.parse(localStorage.getItem("user"))
            return axios.post(authpath + 'refreshToken',user,{withCredentials: true})
                .then(res => {
                  localStorage.setItem("jwt", res.data.token);
                  self.viewKey ++;
        
                  
                  var newUrl = originalRequest.url.split("?")[0]

                  newUrl = newUrl + "?token="+ res.data.token
                  originalRequest.url = newUrl
                  
                  return (axios(originalRequest))

                })
                .catch(error =>{
                        localStorage.removeItem("jwt");
                        alert("A sua Sessão expirou.") 
                        //self.refreshLogout()
                        window.location.href = './';

                })
        }
        return Promise.reject(error);
      });
  },
  data(){
      return {
      color: "#FF0000",
      balance: 0,
      userid:0,
      newconversaUser: -1,
    }
  },
  methods:{
    logout: function(){
      localStorage.removeItem("jwt")
      localStorage.removeItem("user")
    },
    refreshLogout: function(){
      this.$emit("refreshLogout")
    },
    refreshBalance: async function(){
      var response = await axios.get(dataApi + "users/" + this.userid + "/balance")
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
