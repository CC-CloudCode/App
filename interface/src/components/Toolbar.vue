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
      <v-col
        cols="1" align="center"
      justify="center"
      >

      </v-col>
            <v-col align="center"
      justify="center"
        cols="1"
      >

                  <v-btn icon  style="color:#F5F5F5" @click="goToFeed()">
                        <v-icon style="color:#F5F5F5">mdi-home</v-icon>
            </v-btn>

         
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
                Suas <br> Apostas
            </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="1"
      >
             <v-btn style="color:#F5F5F5" icon text @click="goToRascunhos()">
                Seus <br> Rascunhos
            </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="2"
      >
          <v-btn @click="goToCarregar()"> Carregar Dinheiro </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="2"
      >

         <v-btn @click="goToPersonalScore()"> Personal Score </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="1"
      >
      <v-btn style="color:#F5F5F5" icon text>
               <v-spacer>
            <v-toolbar-title style="color:#F5F5F5" >Luizz</v-toolbar-title>
            <v-toolbar-title style="color:#F5F5F5" >100000$</v-toolbar-title>
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
                    <span  > Meu Perfil </span>
                  </v-list-item>
                  <v-list-item @click="goToFollowRequests">
                    <span  > Pedidos de seguir </span>
                  </v-list-item>
                  <v-list-item @click="goToEditarPerfil">
                    <span > Editar Perfil </span>
                  </v-list-item>
                  <v-list-item style="cursor: pointer;">
                    <span> Carregar Dinheiro </span>
                  </v-list-item>
                  <v-list-item style="cursor: pointer;">
                    <span> Histórico de Apostas </span>
                  </v-list-item>
                  <v-list-item  @click="goToLevantar">
                    <span> Levantar Dinheiro </span>
                  </v-list-item>
                  <v-list-item @click="logout">
                    <span > Terminar Sessão </span>
                  </v-list-item>
                </v-list>
          </div>
  </div>
</template>

<script>

export default {
  data(){
      return {
      color: "#afd29a",
      showOptions : false
    }
  },
  methods:{
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
    goToLevantar : function(){
      this.$router.push({name: 'Withdraw'})
    },
    goToRascunhos : function(){
      //this.$router.push({name: })
    },
    showOptions : function(){

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
   z-index:1000;
   width:100%;
}

.position-list{
	position: fixed;
	right: 0px;

  top:60px; 
  background:white;
   z-index:1000;
}



</style>