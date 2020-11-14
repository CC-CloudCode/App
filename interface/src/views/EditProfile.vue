<template>
    <v-container grid-list-md>      
      <v-card      
        class="mx-auto"
        color="#D3D3D3"
        dark
        width="700"
        height="700"
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
          <v-list-item-avatar color="grey darken-3" style="display: inline-block; cursor: pointer;" size="90">
            <v-img
              class="elevation-6"
              :src= user.profileImg
            ></v-img>
            
            <v-btn @click="changeAvatar()">
                
            </v-btn>
            
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.username}}</v-list-item-title>
          </v-list-item-content>
        </v-card-actions>

        <!--Conteúdo-->
        <v-row align-content="space-between" justify="space-around">
          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Nome: {{user.name}} </span>
          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Data Nascimento:{{user.birthdate}} </span>  

        </v-row>

        <v-row align-content="space-between" justify="space-around">
          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px"> Informação cartão crédito: </span>

          <span class="subheading mr-2 font-weight-bold black--text" style="padding-top:11px">      
     
            <v-treeview
              activatable
              :items="items"
            >
            </v-treeview>

          </span>   

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
        //user_credentials: {
        //avatar: 'https://unsplash.it/100/100',
        user:{
            iduser : 1,
            username : "Luizz",
            birthdate : "1997-01-01",
            email : "loles@loles.com",
            name : "Luis",
            followers : 100,
            following : 20,
            score : 99,
            profileImg : 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            betsWin : 1000,
            MeanOdd : 2.00,
            copies : 0
        //}
        },
        items: [
        {
          id: 1,
          name: 'Privacidade da Conta :',
          children: [
            { id: 2, name: 'Nome: Luis' },
            { id: 3, name: 'Nome de Utilizador: Luizz' },
            { id: 4, name: 'Contacto: loles@loles.com' },
            { id: 5, name: 'Confirmação de Identidade: ' },
          ],
        }, 
        ]
      }    
  },

   methods: {
    changeAvatar() {
      const input = document.createElement('input');
      let self = this;
      input.setAttribute("type", "file");
      input.addEventListener('change', function(e) {
        // uploading code from this fiddle: http://jsfiddle.net/vacidesign/ja0tyj0f/
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            // image is loaded callback
            self.user.profileImg = e.target.result;
            // here you can post the data to your backend...
          };
          reader.readAsDataURL(this.files[0]);
        }
      })
      input.click(); // opening dialog

      return false; // avoiding navigation
    }
  }
  /*
   methods:{
            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    console.log(this.previewImage);
                };
            }
        }
  */
}

</script>

<style>
   .uploading-image{
     display:flex;
   }
 </style>
