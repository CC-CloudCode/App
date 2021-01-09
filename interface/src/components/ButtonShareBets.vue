<template>
    <v-dialog
      v-model="dialog"
      width="600px"
    >
    
    <template v-slot:activator="{ on, attrs }">   
     <v-btn  text small v-on="on" v-bind="attrs" :disabled="disabled"> 
       <v-icon left>
          mdi-reply
        </v-icon>   
        Partilhar aposta
      </v-btn>   
    </template> 

    <v-card>
        <v-card-title>
          <span class="headline">Partilhar Aposta</span>
        </v-card-title>
        <v-card-text>
            <h2> Apostas: </h2> 
            
            <div v-for="(item, i) in cart" :key="i" > 
                <h4>{{item.team}} com odd {{item.odd}}</h4>
            </div> 
            
            <v-switch
              class="pt-5 ma-0"
              v-model="switch1"
              color="#afd29a"
              label="Aposta pública?" 
            ></v-switch> 

            <v-combobox 
              class="pa-0 ma-0"
              v-model="selectedGroups"
              :items="myGroups"
              label="Onde pretende partilhar a sua aposta?" 
              color="#afd29a"
              multiple
            ></v-combobox> 

            <v-textarea color="#afd29a" outlined label="Texto a acompanhar o post"  v-model="textArea"> 
            </v-textarea>
            
          <v-card-actions>
                <v-spacer></v-spacer>
                
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      depressed
                      color="white"
                      @click="dialog = false; createPost()"
                      v-on="on"
                    >
                      <v-icon color="#afd29a" large>mdi-check</v-icon>
                    </v-btn>
                  </template>
                  <span>Continuar</span>
                </v-tooltip> 

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      depressed
                      color="white"
                      @click="dialog = false"
                      v-on="on"
                    >
                      <v-icon color="red" large>mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>Fechar</span>
                </v-tooltip>
              
            </v-card-actions>
         
          </v-card-text>
    
    </v-card> 

    </v-dialog>

</template>

<script>
import axios from "axios"; 
const h = require("@/config/hosts").hostDataApi

export default {
    
     props: ["cart","disabled"],
     
     data() {
        return { 
            dialog: false, 
            switch1: false,  
            selectedGroups: [], 
            myGroups: [], 
            token:"",
            user:{}, 
            textArea: ""

        }    
     }, 
    
    created: async function(){ 
        console.log("entrei aquiiiiiiiiiiii")
        this.token = localStorage.getItem("jwt")
        this.user = JSON.parse(localStorage.getItem("user"))
        var response = await axios.get(h + "users/" + this.user.iduser + "/groups?token=" + this.token)
        console.log(response)
       
        var i = 0; 
        this.myGroups.push("Feed")

        for(i;i<response.data.length;i++){ 
            this.myGroups.push(response.data[i].name)
        }

    }, 
    
    methods: { 
      
      async createPost(){ 

        this.token = localStorage.getItem("jwt")
        this.user = JSON.parse(localStorage.getItem("user"))
        var iduser =  this.user.iduser 
        
        var postNosGrupos = [] 

        for (var i=0;i<this.selectedGroups.length;i++){   
          var postToCreate = {}
          // text
          postToCreate.text = this.textArea 
          // true or false to 0 or 1 -> betpublic
          postToCreate.public = this.switch1 ? 1 : 0  
          // iduser 
          postToCreate.iduser = iduser 
          // betpublic - NULL? 
          postToCreate.betpublic = null
          // idbet - NULL? 
          postToCreate.idbet = null
          
          // idgroup
          if (this.selectedGroups[i] == "Feed"){ 
            postToCreate.idgroup = null
          } else { 
            var grupo = await axios.get(h + "groups/find/" + this.selectedGroups[i])
            postToCreate.idgroup = grupo.data[0].idgroup
          }

          postNosGrupos.push(postToCreate)
        }

        // array de posts por grupooooooo 
        console.log("araaaaaaaaaaaaaaay")
        console.log(postNosGrupos)
        


      }
    
    }


}
</script> 

<style>
.v-application .primary--text {
    color: #afd29a !important;
    caret-color: #afd29a !important;
}
</style>