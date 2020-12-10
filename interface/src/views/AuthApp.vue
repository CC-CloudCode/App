<template>

<div class="grey lighten-3">

    <Toolbar @refreshLogout="refreshLogout"/>
    
    <Chat />  
    
    <!--
    NÃO TIREM DE COMENTÁRIO SFF OU SE QUISEREM FALEM PRIMEIRO PQ ESTRAGA A NOSSA PÁGINA APOSTAS 
    <v-container style="width:75%; padding-top:3.8%"> 
    -->
      <keep-alive> 
        <router-view/> 
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


export default {
  components:{
    Bets,
    Toolbar,
    Chat
  },
  created: async function(){
    var aux
    axios.interceptors.response.use((response) => {
        return response
      }, function (error) {
        const originalRequest = error.config;

           if (originalRequest.url === authpath + 'refreshToken')
              return Promise.reject(error);
            


        if (error.response.status === 401 && !originalRequest._retry ) {
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
      color: "#FF0000"
    }
  },
  methods:{
    logout: function(){
      localStorage.removeItem("jwt")
      localStorage.removeItem("user")
    },
    refreshLogout: function(){
      this.$emit("refreshLogout")
    }
  }

}
</script>
