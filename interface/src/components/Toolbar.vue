<template>
    <div class="position-toolbar">
    <v-toolbar 
    :color="color" >
        
       <v-row align="center"
      justify="center">
      <v-col
        cols="1"
      >

            <v-btn fab text small @click="goToFeed()" style="padding-left:5px">
                <v-img :src="require('@/assets/logo.png')" height="50px" width="80px">
                </v-img>
            </v-btn>
      </v-col>
      
        <v-col align="center"
      justify="center"
        cols="1"
      />

        <v-col align="center"
      justify="center"
        cols="3"
      >

      <v-text-field
                  style="padding-top: 15px;"
                  v-model="filter"
                  prepend-icon="mdi-magnify"
                  color="#009263"
                  label="Pesquisar por utilizadores.."
                  @change="findUser"
                  single-line
      ></v-text-field>
      </v-col>
      

      <v-col
        cols="1" align="center"
      justify="center"
      >
          <v-btn style="color:#F5F5F5" icon text @click="goToJogos()">
                Jogos
            </v-btn>
           
      </v-col>
            <v-col align="center"
      justify="center"
        cols="1"
      >
             <v-btn style="color:#F5F5F5" icon text @click="goToApostas()">
                 <br> Apostas
            </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="1"
      >
             <v-btn style="color:#F5F5F5" icon text @click="goToRascunhos()">
                 <br> Rascunhos
            </v-btn>
      </v-col>
      
      <v-spacer> </v-spacer>   
            <v-col align="center"
      justify="center"
        cols="1"
      >
      
      <v-btn style="color:#F5F5F5" icon text>
               <v-spacer>
            <v-toolbar-title style="color:#F5F5F5" >{{username}}</v-toolbar-title>
            <v-toolbar-title style="color:#F5F5F5" >{{balance.toFixed(2)}}€</v-toolbar-title>
            </v-spacer>
            </v-btn>
                     
      </v-col>
  
            <v-col align="center"
      justify="center"
        cols="1"
      >
          <div>
           <v-btn icon  style="color:#F5F5F5" @click="showOptions = !showOptions">
                <v-icon style="color:#F5F5F5">mdi-account</v-icon>
            </v-btn>
          </div>
          
      </v-col>
    </v-row>
    
    </v-toolbar>
    <div v-if="showOptions" class="position-list">
                <v-list class="elevation-5 justify-center">
                  <v-list-item @click="goToMeuPerfil">
                    <v-list-item-icon>
                     <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <span  > Meu Perfil </span> 
                  </v-list-item>
                  <v-list-item @click="goToFollowRequests">
                    <v-list-item-icon>
                     <v-icon>mdi-account-multiple-plus</v-icon>
                    </v-list-item-icon>
                    <span  > Pedidos de seguir </span>
                  </v-list-item>
                  <v-list-item @click="goToEditarPerfil">
                    <v-list-item-icon>
                     <v-icon>mdi-account-details</v-icon>
                    </v-list-item-icon>
                    <span > Editar Perfil </span>
                  </v-list-item>
                  <v-list-item @click="goToHistorico">
                    <v-list-item-icon>
                     <v-icon>mdi-history</v-icon>
                    </v-list-item-icon>
                    <span> Histórico de Apostas </span>
                  </v-list-item>
                  <v-list-item @click="goToCarregar">
                    <v-list-item-icon>
                     <v-icon>mdi-currency-usd</v-icon>
                    </v-list-item-icon>
                    <span> Carregar Dinheiro </span>
                  </v-list-item>
                  <v-list-item  @click="goToLevantar">
                    <v-list-item-icon>
                     <v-icon>mdi-currency-usd</v-icon>
                    </v-list-item-icon>
                    <span> Levantar Dinheiro </span>
                  </v-list-item>
                  <v-list-item @click="logout">
                    <v-list-item-icon>
                     <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <span > Terminar Sessão </span>
                  </v-list-item>
                </v-list>
          </div>
  </div>
</template>

<script>

export default {
  props:["balance"],
  data(){
      return {
      color: "#afd29a",
      showOptions : false,
      username: "",
      filter:""
    }
  },
  created: async function(){
    this.username = JSON.parse(localStorage.getItem("user")).username

  },
  methods:{
    findUser: function(){
      if(this.filter != ""){
        this.$router.push({name: "Find User", params:{username:this.filter}})
                    .catch(erro => {})
        
      }
    },
    goToJogos : function(){
      this.$router.push({ name: 'Bets'})
    },
    goToMeuPerfil : function(){
      this.$router.push({ name: 'Meu Perfil'})
    },
    goToFollowRequests : function(){
      this.$router.push({name: "Pedidos de Seguir"})
    },
    goToEditarPerfil : function(){
      this.$router.push({ name: 'Editar Perfil'})
    },
    goToPersonalScore : function(){
      //this.$router.push({name: })
    },
    goToApostas : function(){
      this.$router.push({ name: 'Suas Apostas'})
    },
    goToFeed : function(){
      this.$router.push({ name: 'Feed'})
    },
    goToCarregar : function(){
      this.$router.push({name: 'Deposit'})
    },
    goToHistorico : function(){
      this.$router.push({name: 'Seu Histórico'})
    },
    goToLevantar : function(){
      this.$router.push({name: 'Withdraw'})
    },
    goToRascunhos : function(){
      this.$router.push({name: 'Seus Rascunhos'})
    },
    logout: function(){
      localStorage.removeItem("jwt")
      localStorage.removeItem("user")
      this.$emit("refreshLogout")
    }

  }

}
</script>


<style >



.position-toolbar{
	position: fixed;
   z-index:1001;
   width:100%;
}

.position-list{
	position: fixed;
	right: 0px;

  top:60px; 
  background:white;
  z-index:1001;
}



</style>