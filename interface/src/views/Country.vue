<template>
  
<div>
    
<div v-for="(item,index) in countries" v-bind:key="item.idcountry + index">
    <p>{{item.name}}</p>
</div>

</div>
</template>



<script>
import axios from "axios"
const betspath = require("@/config/hosts").hostBetsApi
import VueJwtDecode from "vue-jwt-decode";

  export default {
    data(){
      return {
        countries : []
      }
    },
    mounted: function() {
    axios
      .get(betspath + 'countries')
      .then(dados => {
        this.countries = dados.data;
      })
      .catch(err => {
        this.error = err.message;
      });
  }, 
  }
</script>