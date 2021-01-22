<template>
  <v-app id="app" :key="viewKey">
    
    <div v-if="loggedIn">
    <Auth  @refreshLogout="refreshLogout" />
    </div>
    <div v-else>
      <div v-if="!mode">
      <Login  @refreshLogout="refreshLogout" @registar="registar" />
      </div>
      <div v-else>
      <Registar @login="login"/>
      </div>
    </div>
  </v-app>
</template>

<script>

import Auth from '@/views/AuthApp.vue'
import Login from '@/views/Login.vue'
import Registar from '@/views/Registar.vue'
import axios from 'axios'




export default {
    components: {
    Auth,
    Login,
    Registar,
  },
     data() {

        return {
          color :"#eee",
          viewKey: 0,
          loggedIn : false,
          mode : false
        }
    },
    created: function(){
      this.refreshLogout();
      var unauthorized =false;
      var self = this
      axios.interceptors.response.use((response) => {
        return response
      }, function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry ) {
          if(localStorage.getItem("jwt")){
            localStorage.removeItem("jwt")
            localStorage.removeItem("user")
            console.log("DEU 401 !!! ")
            alert("A sua sessão expirou!")
            self.refreshLogout()
          }
            
              
             
        }
        return Promise.reject(error);
      });

    },
    methods: {
          isLogged: function(){
            var token = localStorage.getItem("jwt")
            if (token == null) return false
            else return true
            

          },
          refreshLogout: function(){
            this.loggedIn = this.isLogged()
            this.viewKey++;
          },
          registar: function(){
            this.mode = true
          },
          login: function(){
            this.mode = false
          }
    }
}
</script>