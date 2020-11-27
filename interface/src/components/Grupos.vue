  <template>

<div >

<div class="testes elevation-5" >
<v-list subheader >
      <v-subheader>Grupos</v-subheader>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="goToGrupo(0)"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>

    </div>
  </div>
</template>

<script>

export default {
    data () {
      return {
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
    methods:{
                goToGrupo: function(id){
          this.$router.push({name: 'Grupo', params:{ id : id}})
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