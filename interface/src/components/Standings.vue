<template> 
                            <v-simple-table dense fixed-header height="300px">
                              <template v-slot:default>
                                <thead>
                                   <tr>
                                    
                                    <th class="text-left"></th>
                                    <th class="text-left">
                                      Equipa
                                    </th>
                                    <th class="text-left">
                                      Posição
                                    </th>
                                    <th class="text-left">
                                      Pontos
                                    </th>
                                    <th class="text-left"> 
                                      Jogos Jogados
                                    </th> 
                                    <th class="text-left"> 
                                      Vitórias
                                    </th>
                                    <th class="text-left"> 
                                      Empates
                                    </th> 
                                    <th class="text-left"> 
                                      Derrotas
                                    </th>
                                    <th class="text-left"> 
                                      Golos Marcados
                                    </th> 
                                    <th class="text-left"> 
                                      Golos Sofridos 
                                    </th> 
                                    <th class="text-left"> 
                                      Diferença de Golos 
                                    </th> 


                                  </tr>
                                </thead>
                                <tbody>
                                  
                                  <tr
                                    v-for="item in standings"
                                    :key="item.teamname"
                                  >
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      <v-img
                                        v-bind:src="item.teamlogo"
                                        width="20px"
                                      ></v-img>
                                    </td>
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.teamname }}
                                    </td>
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.position }}
                                    </td>
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.points }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.matchsPlayedTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.winsTotal }}
                                    </td> 
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.losesTotal }}
                                    </td> 
                                    
                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.drawsTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.goalsForTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.goalsAgainstTotal }}
                                    </td> 

                                    <td
                                      :style="{
                                        backgroundColor:
                                          item.teamname == statshometeam ||
                                          item.teamname == statsawayteam
                                            ? '#afd29a'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.goalsDiff }}
                                    </td>
                                    
                                    

                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>

</template> 

<script> 
   export default { 
        
        props: ['standings','statshometeam','statsawayteam'], 
   }
</script>