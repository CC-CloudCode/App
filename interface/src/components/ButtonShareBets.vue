<template>
    <v-dialog
      v-model="dialog"
      width="600px" 
      persistent
    >
    
    <template v-slot:activator="{ on, attrs }">   

    <v-btn  text :disabled="disabled" small @click="makebet" v-on="on" v-bind="attrs"> 
     <v-icon left>
        mdi-pencil
      </v-icon>   
      Apostar
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
                      @click="dialog = false; createPost();"
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
                      @click="dialog = false; this.textFieldQuantia=''; this.cart = []; this.gains = ''"
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
const b = require("@/config/hosts").hostBetsApi

export default {
    
     props: ["cart","disabled","textFieldQuantia"],
     
     data() {
        return { 
            dialog: false, 
            switch1: false,  
            selectedGroups: [], 
            myGroups: [], 
            token:"",
            user:{}, 
            textArea: "", 
            noValueMoney: false,  
            notOpenFixture: false, 
            actualCartFixture: null, 
            betid: null,
            gains: "", 

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
      
      checkMoney(){ 
        if (this.textFieldQuantia <= 0) return true
        else return false
      }, 

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
          postToCreate.public = false
          // iduser 
          postToCreate.iduser = iduser 
          // betpublic - NULL? 
          postToCreate.betpublic = this.switch1
          // idbet - NULL? 
          postToCreate.idbet = null
          
          // idgroup
          if (this.selectedGroups[i] == "Feed"){ 
            postToCreate.idgroup = null
          } else { 
            var grupo = await axios.get(h + "groups/find/" + this.selectedGroups[i])
            postToCreate.idgroup = grupo.data[0].idgroup
          }
          
          postToCreate.idbet = this.betid
          
          postNosGrupos.push(postToCreate)
        }

        this.textArea = "" 
        this.switch1 = false 
        this.selectedGroups = []

        // array de posts por grupooooooo 
        console.log("araaaaaaaaaaaaaaay")
        console.log(postNosGrupos)
        
        for(var i=0; i < postNosGrupos.length; i++){ 
          
          var post = postNosGrupos[i] 
          
          axios.post(h + "posts/", post).then(dados => {
            console.log(dados)
          }).catch(erro => {
            res.status(500).jsonp(erro)
          })

        }


      }, 

      async makebet(){ 

        console.log("entreikiiiiiiiiiii make")
        console.log("CARRRRRRRRRRRRRRRRRRRRRRRRRT") 
        console.log(this.cart)
        console.log(this.textFieldQuantia)

        this.noValueMoney = false

        var userid = JSON.parse(localStorage.getItem("user")).iduser
        var response = await axios.get(h + "users/" + userid + "/balance")

        var balance = response.data.balance

        if(this.textFieldQuantia > balance){
          this.noValueMoney = true;  
          this.$emit("noValueMoney",true)    
          this.dialog=false
          return;
        }
          // verificar se tem saldo indisponível ---> por fazer
          //...

          // verificar se os jogos estão disponiveis para apostar:
          this.notOpenFixture = false;

          var pedidos = []
          var i = 0;
          for(; i < this.cart.length; i++){
            pedidos[i] = axios.get(b + "fixtures/isopen/"+this.cart[i].idfixture)
          }

          axios
               .all(pedidos)
               .then(
                 axios.spread((...responses) => {
                   for(var j = 0; j<responses.length; j++){
                     //console.log("aaaaaaa  " + responses[j].data[0].isopen)
                     this.actualCartFixture = this.cart[j].team
                     if(responses[j].data[0].isopen == 0){
                       this.notOpenFixture = true;
                       return;
                     }

                   }
                   //se chega aqui é porque os jogos estão todos disponiveis
                   var bet = {}
                   bet.cart = this.cart
                   bet.money = parseFloat(this.textFieldQuantia)
                  //fazer o post da bet

                  var currentdate = new Date(); 
                  var datetime = currentdate.getFullYear() + '-' + currentdate.getMonth() + '-' + currentdate.getDate()
                                + 'T' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
                  bet.date = datetime

                  bet.iduser = JSON.parse(localStorage.getItem("user")).iduser
                  bet.originalbetid = null
                  bet.isdraft = false

                  axios.post(h + 'bets/', bet)
                    .then(dados => {
                      console.log(dados.data.insertId)
                      this.betid = dados.data.insertId
                      console.log('id da bet' + this.betid)
                      var item = {}
                      
                      for(var i = 0; i < this.cart.length; i++){
                        console.log(this.cart[i])
                        event = {}
                        event.idbetapi = this.cart[i].idfixture
                        event.odd =  this.cart[i].odd
                        event.bettype =  this.cart[i].tipoaposta
                        event.idbet = this.betid 
                        
                        // if else para apenas retirar o balanço da aposta no último evento do boletim e para não repetir 
                        if (i != this.cart.length-1){ 
                          axios.post(h + 'bets/events/', event) 
                        } else { 
                           axios.post(h + 'bets/events/', event)
                          .then(dados => {
                            
                            axios.put(h + "users/" + userid + "/balance", {balance: -this.textFieldQuantia}).then(dados => { 
                              
                              this.$emit("refreshBalance")
                              this.sucessfulBet = true 
                            
                              
                            })
                            

                          })
                          .catch(err => {this.error = err.message})
                        }
  
                      } 
                      

                    })
                    .catch(err => {this.error = err.message})
                }

                 )
               )
               .catch((err) => {
                 this.error = err.message;
               });
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