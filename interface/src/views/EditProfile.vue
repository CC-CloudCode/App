<template>
    <v-container grid-list-md>      
      <v-card      
        class="mx-auto"
        color="#D3D3D3"
        dark
        width="700"
        height="500"
      >

        <v-card-title class="justify-center">
          <v-icon
            large         
          >

          </v-icon>
          <span class="title font-weight-bold black--text">Editar Perfil</span>
        </v-card-title>

        <!--IMAGEM-->
        <v-card-actions>
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt=""
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Luizz</v-list-item-title>
          </v-list-item-content>
        </v-card-actions>

        <!--Conteúdo-->
        <v-row align-content="space-between" justify="space-around">
          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Nome: </span>
          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Data Nascimento: </span>  

        </v-row>

        <v-row align-content="space-between" justify="space-around">
          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Informação cartão crédito: </span>
          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Privacidade da Conta: </span>         
        </v-row>

        <!--Buttons-->
    
        <v-bottom-navigation
          absolute>

          <v-row          
            align="center"
            justify="space-around">        

            <v-btn 
              text
              elevation="6"
            >
            Guardar
            </v-btn>

            <v-btn  
              text
              elevation="6"
            >
            Cancelar
            </v-btn>

          </v-row> 
        </v-bottom-navigation>     

        <!--
        <v-card-actions>
          <v-btn
          text
          >
            Guardar
          </v-btn>

          <v-btn 
            text
          >
            Cancelar
          </v-btn>
        </v-card-actions>
        -->

      </v-card>    
    </v-container>
</template>

<script>
//import de componentes se necessário

export default {
    components:{

  },
    data(){
      return {
       
      }
    },   
  }
</script>

