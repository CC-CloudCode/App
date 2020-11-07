  <template>

<div>

<div class="teste" style="height:50%; background:white">
<v-list subheader >
      <v-subheader>Chat</v-subheader>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="item.active ? '#900000' : 'grey'">mdi-message</v-icon>
        </v-list-item-icon>
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
    }
  }
</script>

  
  
<style >



.teste{
	position: fixed;
	right: 0px;
  bottom: 0;
}
</style>