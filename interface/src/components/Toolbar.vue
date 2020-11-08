<template>
    <v-toolbar 
    :color="color">
        
       <v-row align="center"
      justify="center">
      <v-col
        cols="1"
      >

            <v-btn icon  style="color:#F5F5F5">
                <v-icon style="color:#F5F5F5">mdi-home</v-icon>
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

                  <v-btn icon  style="color:#F5F5F5">
                        <v-icon style="color:#F5F5F5">mdi-home</v-icon>
            </v-btn>

         
      </v-col>
      <v-col
        cols="1" align="center"
      justify="center"
      >
          <v-btn style="color:#F5F5F5" icon text>
                Jogos
            </v-btn>
           
      </v-col>
            <v-col align="center"
      justify="center"
        cols="1"
      >
             <v-btn style="color:#F5F5F5" icon text>
                Suas <br> Apostas
            </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="1"
      >
             <v-btn style="color:#F5F5F5" icon text>
                Seus <br> Rascunhos
            </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="2"
      >
          <v-btn > Carregar Dinheiro </v-btn>
      </v-col>
            <v-col align="center"
      justify="center"
        cols="2"
      >

         <v-btn > Personal Score </v-btn>
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

           <v-btn icon  style="color:#F5F5F5">
                <v-icon style="color:#F5F5F5">mdi-account</v-icon>
            </v-btn>

      </v-col>
    </v-row>


    </v-toolbar>
</template>

<script>

export default {
  data(){
      return {
      color: "#FF0000"
    }
  }

}
</script>
