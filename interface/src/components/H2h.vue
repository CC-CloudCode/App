<template>
                            <v-simple-table dense fixed-header height="300px">
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Data
                                    </th>
                                    <th class="text-left">
                                      Equipa Casa
                                    </th>
                                    <th class="text-left">
                                      Resultado
                                    </th>
                                    <th class="text-left">
                                      Equipa Fora
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="item in h2h" :key="item.idfixture">
                                    <td>{{ item.date.substring(0, 10) }}</td>
                                    <td v-if="id_home_team == item.homeTeamId" >
                                      {{ statshometeam }}
                                    </td>
                                    <td v-else>{{ statsawayteam }}</td>
                                    <td>{{ item.score }}</td>
                                    <td v-if="id_away_team == item.awayTeamId">
                                      {{ statsawayteam }}
                                    </td>
                                    <td v-else>{{ statshometeam }}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
</template>

<script> 
   export default { 
        
        props: ['h2h','id_home_team','id_away_team', 'statshometeam', 'statsawayteam'], 
   }
</script>