<template>
            <v-card rounded class="testeBoletim elevation-5" min-height="268">
              <div v-if="cart.length == 0">
                <p class="font-weight-bold green--text">
                  Por favor adicione um jogo, o boletim encontra-se vazio!
                </p>
              </div>

              <div v-if="cart.length != 0">
                 
                  <v-list dense flat>
                    <v-list-item-group v-model="selection">
                      <v-list-item
                        v-for="(item, i) in cart"
                        :key="i" 
                        @click="clearGame(item.team)"
                      >

                        <v-list-item-content>
                          <v-list-item-title v-text="item.team + ' ' + item.odd"></v-list-item-title>
                        </v-list-item-content>
                       
                        <v-list-item-icon>
                          <v-icon>mdi-close</v-icon>
                        </v-list-item-icon>
                      
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
             
              </div>

              <v-row>
                <v-col class="pb-0">
                  <!-- se o cart estiver vazio (não tem jogos no boletim) não dá para colocar valores no textfield -->
                  <v-text-field
                    class="pa-1"
                    name="textFieldQuantia"
                    v-model.number="textFieldQuantia"
                    type="number"
                    label="Quantia"
                    placeholder="100.00€"
                    :rules="rulesQuantia" 
                    outlined
                    @change="calculaGains()"
                    :disabled="cart.length == 0"
                    required
                  ></v-text-field>
                </v-col>


                <v-col class="pb-0">

                  <!--Apresentar Ganhos-->
                  <div v-if="gains != null && gains > 0 && this.cart.length > 0">
                    <p
                      class="font-weight-bold green--text"
                      style="white-space: pre-line"
                    >
                      Ganhos Totais: {{ this.gains }}€
                    </p>
                  </div>

                  <ButtonShareBets :disabled="checkCart()" :cart="this.cart" :textFieldQuantia="this.textFieldQuantia" :gains="this.gains" @refreshBalance="refreshBalance"  @clearCart="clearCart" @noValueMoney="(noValueMoney)=>{warningNoMoney(noValueMoney)}"/>

                  <v-btn  text :disabled="checkCart()" small @click="saveDraft"> 
                   <v-icon left>
                      mdi-content-save
                    </v-icon>   
                    Guardar Rascunho
                  </v-btn>
                  

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="clearCart()"
                        small
                        v-bind="attrs"
                        v-on="on" 
                        text 
                        :disabled="checkCart()"
                      > 
                    <v-icon left>
                      mdi-eraser
                    </v-icon>   
                        Clear
                      </v-btn>
                    </template>
                    <span>Limpar Boletim</span>
                  </v-tooltip>
                </v-col>
              </v-row>

            </v-card>

</template>

<script>
import axios from "axios";
const datapath = require("@/config/hosts").hostDataApi; 
const betspath = require("@/config/hosts").hostBetsApi;
import ButtonShareBets from "@/components/ButtonShareBets.vue" 

export default {

    props: ['cart'],   
    
    components: {
        ButtonShareBets
    },

    data(){ 
        return { 
            textFieldQuantia: '', 
            gains: '', 
            selection: null, 
            notOpenFixture: false,
            noValueMoney: false, 
            sucessfulBet: false,
            actualCartFixture: null,
            showWarningMoney: false,
            token:"",      
            rulesQuantia: [
                v => {
                const pattern1 = /^\d+$/
                const pattern2 = /^\d+\.\d$/
                const pattern3 = /^\d+\.\d\d$/
                return (pattern1.test(v) || pattern2.test(v) || pattern3.test(v)) || 'Formato de número inválido'
                },
                v => v > 0 || 'Não pode introduzir um valor negativo ou zero'
                
                
                ], 
        }
    },
    created: async function(){
      this.token = localStorage.getItem("jwt")
    },
    methods: { 

        refreshBalance: function(){
            this.$emit("refreshBalanco") 
            // limpa os campos depois de fazer a aposta (que é concretizada no ButtonShareBets)
           
            this.textFieldQuantia=''; 
            //this.cart = [];
            this.gains = ''  
        },

        checkCart(){ 
            if(this.cart.length == 0) return true 
            else return false
         },
        
        clearCart: function(){
            this.$emit("refreshCart") 
            
            //this.cart = [];
            this.textFieldQuantia = "";
            this.gains = null;
        },   

        warningNoMoney: function(noValueMoney){ 
            this.$emit("refreshNoMoney") 
            this.noValueMoney = noValueMoney
            this.showWarningMoney = true
            this.textFieldQuantia = "" 
            this.gains = null
        }, 

        
    clearGame(name){ 

        this.$emit("removeGame",name)
        
    },

    calculaGains() {
      // calcula os ganhos da aposta
      var i = 0;
      var total_odds = 1;
      for (i; i < this.cart.length; i++) {
        console.log(this.cart[i].odd);
        total_odds *= parseFloat(this.cart[i].odd);
      }
      console.log(total_odds);
      this.gains =
        total_odds * this.textFieldQuantia -
        this.textFieldQuantia +
        this.textFieldQuantia;
      this.gains = Math.round((this.gains + Number.EPSILON) * 100) / 100;
    },

    async saveDraft(){
      this.noValueMoney = false;
      if(this.textFieldQuantia == ""){
        this.noValueMoney = true;
        return;
      }
        // verificar se tem saldo indisponível ---> por fazer
        //...
        
        // verificar se os jogos estão disponiveis para apostar:
        this.notOpenFixture = false;

        var pedidos = []
        var i = 0;
        for(; i < this.cart.length; i++){
          pedidos[i] = await axios.get(betspath + "fixtures/isopen/"+this.cart[i].idfixture)
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
                bet.isdraft = true

                axios.post(datapath + 'bets/' + "/?token=" + this.token, bet)
                  .then(async dados => {
                    console.log(dados.data.insertId)
                    let betid = dados.data.insertId
                    console.log('id da bet' + betid)
                    var item = {}
                    for(var i = 0; i < this.cart.length; i++){
                      console.log(this.cart[i])
                      event = {}
                      event.idbetapi = this.cart[i].idfixture
                      event.odd =  this.cart[i].odd
                      event.bettype =  this.cart[i].tipoaposta
                      event.idbet = betid
                      await axios.post(datapath + 'bets/events/' + "?token=" + this.token, event)
                        .then(dados => {alert(dados.data)})
                        .catch(err => {this.error = err.message})
                    }
                  })
                  .catch(err => {this.error = err.message})
              }

               )
             )
             .catch((err) => {
               this.error = err.message;
             });
    },    
    
    }
}
</script>

  
<style >

.testeBoletim{
  position: fixed;
  right: 0px;
  top: 70px;
  width: 15%;
  background:white;
  z-index:1000;
}

</style>