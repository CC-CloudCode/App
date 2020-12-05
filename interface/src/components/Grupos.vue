  <template>

<div >

<div class="testes elevation-5 pa-1" >
<v-list subheader >
      <v-subheader>Grupos</v-subheader>
      <center><v-btn @click="createGroup()" color="#afd29a"> Criar Grupo </v-btn></center>
      <v-text-field
      v-model="filter"
      prepend-icon="mdi-magnify"
      color="#009263"
      label="Pesquisar por outros.."
      single-line
      @change="pesquisar()"
      ></v-text-field>
      <v-container v-if="showSearch">
        <div >
        <v-list >
          <v-list-item
          
          v-for="item in groups"
          :key="item.idgroup"
          @click="goToGrupo(item)"
          >
              
                  <v-list-item-avatar>
                  <v-img
                      class="elevation-6"
                      src="https://www.dbsacoloradosprings.org/wp-content/uploads/2017/05/gptpit65-1.png"
                  ></v-img>
                  </v-list-item-avatar>

                  <span v-text="item.name" ></span>
          </v-list-item>
      </v-list>
      </div>
    </v-container>
      <v-subheader>Meus Grupos</v-subheader>
      <v-list-item
        v-for="group in myGroups"
        :key="group.idgroup"
        @click="goToGrupo(group)"
      >
        <v-list-item-avatar>
          <v-img src="https://www.dbsacoloradosprings.org/wp-content/uploads/2017/05/gptpit65-1.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="group.name"></v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>

    </div>
  </div>
</template>

<script>

import axios from 'axios'
const h = require("@/config/hosts").hostDataApi

export default {
    data () {
      return {
        groups:[],
        myGroups: [],
        showSearch:false,
        filter:"",
        token:"",
        user:{},
        items: [
          { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
        ],
        items2: [
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
        ]
      }
    },
    created: async function(){
       this.token = localStorage.getItem("jwt")
       this.user = JSON.parse(localStorage.getItem("user"))
       var response = await axios.get(h + "users/" + this.user.iduser + "/groups?token=" + this.token)
       this.myGroups = response.data
    },
    methods:{
        limpar: async function(){
          this.showSearch = false
        },
        pesquisar: async function(){
          if(this.filter.length != 0){
            var response = await axios.get(h + "groups/find/" + this.filter + "?token=" + this.token)
            this.groups = response.data
            this.showSearch = true
          }
        },
        goToGrupo: function(group){
          this.$router.push({name: 'Grupo', params:{ id : group.idgroup}})
        },
        createGroup: function(){
          this.$router.push({name: 'Criar Grupo'})
        }
    }
  }
</script>

  
  
<style >



.testes{
	position: fixed;
	left: 0px;
  min-width: 230px;
  height:50%; 
  background:white;
   z-index:100;
}

.doctor {
  position: -webkit-sticky;
  position: sticky;
  float: right;
  bottom: 1rem;
  align-self: flex-end;
}



</style>