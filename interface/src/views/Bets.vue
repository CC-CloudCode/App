<!-- <template>
  
<div>
    
<div v-for="(item,index) in countries" v-bind:key="item.idcountry + index">
    <p>{{item.name}}</p>
</div>

</div>
</template>
-->
<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg">
              <v-row
                align="start"
                justify="center"
                v-for="(item, index) in unique_countries"
                v-bind:key="item.idcountry + index"
              >
                <!-- para todos não vai buscar o country flag -->
                <v-btn
                  text
                  @click="
                    toggleActiveButton(index);
                    buscarFixtures(item.id);
                  "
                  :class="{ active: item.active }"
                >
                  {{ item.id }}
                  <v-img
                    v-if="item.id != 'Todos'"
                    right
                    v-bind:src="item.countryflag"
                    width="20px"
                  ></v-img>
                </v-btn>
              </v-row>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet rounded="lg">
              <!-- 
                
                Existe sempre a verificação do lista_jogos_pais, por exemplo ==0 porque no início a lista está vazia, 
                é preciso clicar num pais primeiro !  
                Desta maneira, sem ter um país selecionado é possível fazer display de todos os jogos
                
                -->

              <v-row align="start" justify="center">
                <v-col cols="12" md="1">
                  <div v-if="lista_jogos_pais.length != 0">
                    <div
                      v-for="(item, index) in lista_jogos_pais"
                      v-bind:key="item.idcountry + index"
                    >
                      {{ item.begintime }}
                    </div>
                  </div>

                  <div v-if="lista_jogos_pais.length == 0">
                    <div
                      v-for="(item, index) in infototal"
                      v-bind:key="item.idcountry + index"
                    >
                      {{ item.begintime.substring(0, 10) }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="1">
                  <div v-if="lista_jogos_pais.length != 0">
                    <v-btn
                      small
                      text
                      v-for="(item, index) in lista_jogos_pais"
                      v-bind:key="item.idcountry + index"
                    >
                      {{ item.hometeamname }}
                      <v-img
                        right
                        v-bind:src="item.hometeamlogo"
                        width="20px"
                      ></v-img>
                    </v-btn>
                  </div>

                  <div v-if="lista_jogos_pais.length == 0">
                    <v-btn
                      small
                      text
                      v-for="(item, index) in infototal"
                      v-bind:key="item.idcountry + index"
                    >
                      {{ item.hometeamname }}
                      <v-img
                        right
                        v-bind:src="item.hometeamlogo"
                        width="20px"
                      ></v-img>
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="3">
                  <div v-if="lista_jogos_pais.length != 0">
                    <v-btn
                      small
                      text
                      v-for="(item, index) in lista_jogos_pais"
                      v-bind:key="item.idcountry + index"
                    >
                      {{ item.awayteamname }}
                      <v-img
                        right
                        v-bind:src="item.awayteamlogo"
                        width="20px"
                      ></v-img>
                    </v-btn>
                  </div>

                  <div v-if="lista_jogos_pais.length == 0">
                    <v-btn
                      small
                      text
                      v-for="(item, index) in infototal"
                      v-bind:key="item.idcountry + index"
                    >
                      {{ item.awayteamname }}
                      <v-img
                        right
                        v-bind:src="item.awayteamlogo"
                        width="20px"
                      ></v-img>
                    </v-btn>
                  </div>
                </v-col>

                <!-- Butões das Odds home/draw/away v-cols em cada 1 -->
                <!-- Usar a lisa jogos pais quando se tem selecionado o todos, o tamanho desta lista é 0 se tiver selecionado todos os jogos -->
                <v-col cols="12" md="1">
                  <div v-if="lista_jogos_pais.length != 0">
                    <v-btn
                      text
                      small
                      v-for="(item, index) in lista_jogos_pais"
                      v-bind:key="item.idcountry + index"
                      class="d-flex justify-space-between"
                      @click="
                        addCart(item.hometeamname, item.oddhome, item.idfixture)
                      "
                    >
                      {{ item.oddhome }}
                    </v-btn>
                  </div>

                  <div v-if="lista_jogos_pais.length == 0">
                    <v-btn
                      text
                      small
                      v-for="(item, index) in infototal"
                      v-bind:key="item.idcountry + index"
                      class="d-flex justify-space-between"
                      @click="
                        addCart(item.hometeamname, item.oddhome, item.idfixture)
                      "
                    >
                      {{ item.oddhome }}
                    </v-btn>
                  </div>
                </v-col>

                <!-- DRAW -->
                <v-col cols="12" md="1">
                  <div v-if="lista_jogos_pais.length != 0">
                    <v-btn
                      text
                      small
                      v-for="(item, index) in lista_jogos_pais"
                      v-bind:key="item.idcountry + index"
                      class="d-flex justify-space-between"
                      @click="
                        addCart(
                          item.hometeamname + item.awayteamname,
                          item.odddraw,
                          item.idfixture
                        )
                      "
                    >
                      {{ item.odddraw }}
                    </v-btn>
                  </div>

                  <div v-if="lista_jogos_pais.length == 0">
                    <v-btn
                      text
                      small
                      v-for="(item, index) in infototal"
                      v-bind:key="item.idcountry + index"
                      class="d-flex justify-space-between"
                      @click="
                        addCart(
                          item.hometeamname + item.awayteamname,
                          item.odddraw,
                          item.idfixture
                        )
                      "
                    >
                      {{ item.odddraw }}
                    </v-btn>
                  </div>
                </v-col>

                <!-- EQUIPA ADVERSARIA -->
                <v-col cols="12" md="1">
                  <div v-if="lista_jogos_pais.length != 0">
                    <v-btn
                      text
                      small
                      v-for="(item, index) in lista_jogos_pais"
                      v-bind:key="item.idcountry + index"
                      class="d-flex justify-space-between"
                      @click="
                        addCart(item.awayteamname, item.oddaway, item.idfixture)
                      "
                    >
                      {{ item.oddaway }}
                    </v-btn>
                  </div>

                  <div v-if="lista_jogos_pais.length == 0">
                    <v-btn
                      text
                      small
                      v-for="(item, index) in infototal"
                      v-bind:key="item.idcountry + index"
                      class="d-flex justify-space-between"
                      @click="
                        addCart(item.awayteamname, item.oddaway, item.idfixture)
                      "
                    >
                      {{ item.oddaway }}
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="1">
                  <!-- No caso de ainda ter selecionado um país -->
                  <div v-if="lista_jogos_pais.length != 0">
                    <v-dialog v-model="dialog" width="700">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-for="(item, index) in lista_jogos_pais"
                          v-bind:key="item.idcountry + index"
                          class="d-flex justify-space-between"
                          text
                          small
                          color="#F55C5C"
                          v-on="on"
                          @click.stop="
                            getStats(
                              item.idleague,
                              item.hometeamid,
                              item.awayteamid,
                              item.hometeamname,
                              item.awayteamname,
                              item.idfixture,
                              item.leaguename
                            )
                          "
                        >
                          <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon dark v-bind="attrs" v-on="on">
                                mdi-chart-box-outline
                              </v-icon>
                            </template>
                            <span>Ver estatísticas</span>
                          </v-tooltip>
                        </v-btn>
                      </template>

                      <v-card>
                        <!--
                          <v-card-title class="headline red--text">{{league_name}}  <v-img v-bind:src="infototal[0].leaguelogo" max-width="25" max-height="25"></v-img> <p> Estatísticas {{statshometeam}} vs {{statsawayteam}} </p></v-card-title>
                          -->
                        <v-card-title class="headline red--text"
                          >{{ league_name }}
                          <p>
                            Estatísticas {{ statshometeam }} vs
                            {{ statsawayteam }}
                          </p></v-card-title
                        >
                        <v-divider class="mx-4" horizontal></v-divider>

                        <div
                          v-if="hometeamstats != null || awayteamstats != null"
                        >
                          <v-card-text>
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
                                            ? '#F55C5C'
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
                                            ? '#F55C5C'
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
                                            ? '#F55C5C'
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
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.points }}
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>

                            <v-row align="start" justify="center">
                              <v-col>
                                <p>
                                  {{ statshometeam }} :
                                  {{ standing_home }} posição
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedTotal
                                  }}
                                  Jogos totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.winsHome }} Vitórias em
                                  casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.winsAway }} Vitórias
                                  fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.losesHome }} Derrotas
                                  casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.losesAway }} Derrotas
                                  fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.drawsAway }} Empates
                                  fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.drawsHome }} Empates
                                  casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstHome
                                  }}
                                  Golos marcados contra em casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstAway
                                  }}
                                  Golos marcados contra fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsForTotal }} Golos
                                  contra total
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstTotal
                                  }}
                                  Golos contra totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.winsTotal }} Vitórias
                                  totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.drawsTotal }} Empates
                                  totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.losesTotal }} Derrotas
                                  totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.avgGoalsForHome }} Média
                                  de golos em casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.avgGoalsForAway }} Média
                                  de golos fora de casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.avgGoalsForTotal
                                  }}
                                  Média de golos total
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.avgGoalsAgainstTotal
                                  }}
                                  Média de golos contra total
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsDiff }} Diferença
                                  de golos
                                </p>
                              </v-col>

                              <v-col>
                                <p>
                                  {{ statsawayteam }} :
                                  {{ standing_away }} posição
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedTotal
                                  }}
                                  Jogos totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.winsHome }} Vitórias em
                                  casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.winsAway }} Vitórias
                                  fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.losesHome }} Derrotas
                                  casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.losesAway }} Derrotas
                                  fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.drawsAway }} Empates
                                  fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.drawsHome }} Empates
                                  casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstHome
                                  }}
                                  Golos marcados contra em casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstAway
                                  }}
                                  Golos marcados contra fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsForTotal }} Golos
                                  contra total
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstTotal
                                  }}
                                  Golos contra totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.winsTotal }} Vitórias
                                  totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.drawsTotal }} Empates
                                  totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.losesTotal }} Derrotas
                                  totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.avgGoalsForHome }} Média
                                  de golos em casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.avgGoalsForAway }} Média
                                  de golos fora de casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.avgGoalsForTotal
                                  }}
                                  Média de golos total
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.avgGoalsAgainstTotal
                                  }}
                                  Média de golos contra total
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsDiff }} Diferença
                                  de golos
                                </p>
                              </v-col>
                            </v-row>

                            <!-- H2H TABELA -->
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
                                    <td v-if="id_home_team == item.homeTeamId">
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
                          </v-card-text>
                        </div>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                depressed
                                color="white"
                                @click="dialog = false"
                                v-on="on"
                              >
                                <v-icon large>mdi-door-open</v-icon>
                              </v-btn>
                            </template>
                            <span>Lorem impsum</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>

                  <!-- No caso de ter selecionado não ter selecionado nenhum pais (todos,etc) -->
                  <div v-if="lista_jogos_pais.length == 0">
                    <v-dialog v-model="dialog" width="700">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-for="(item, index) in infototal"
                          v-bind:key="item.idcountry + index"
                          class="d-flex justify-space-between"
                          text
                          small
                          color="#F55C5C"
                          v-on="on"
                          @click.stop="
                            getStats(
                              item.idleague,
                              item.hometeamid,
                              item.awayteamid,
                              item.hometeamname,
                              item.awayteamname,
                              item.idfixture,
                              item.leaguename
                            )
                          "
                        >
                          <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon dark v-bind="attrs" v-on="on">
                                mdi-chart-box-outline
                              </v-icon>
                            </template>
                            <span>Ver estatísticas</span>
                          </v-tooltip>
                        </v-btn>
                      </template>

                      <v-card>
                        <!--
                          <v-card-title class="headline red--text">{{league_name}}  <v-img v-bind:src="infototal[0].leaguelogo" max-width="25" max-height="25"></v-img> <p> Estatísticas {{statshometeam}} vs {{statsawayteam}} </p></v-card-title>
                          -->
                        <v-card-title class="headline red--text"
                          >{{ league_name }}
                          <p>
                            Estatísticas {{ statshometeam }} vs
                            {{ statsawayteam }}
                          </p></v-card-title
                        >
                        <v-divider class="mx-4" horizontal></v-divider>

                        <div
                          v-if="hometeamstats != null || awayteamstats != null"
                        >
                          <v-card-text>
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
                                            ? '#F55C5C'
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
                                            ? '#F55C5C'
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
                                            ? '#F55C5C'
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
                                            ? '#F55C5C'
                                            : 'transparent',
                                      }"
                                    >
                                      {{ item.points }}
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>

                            <v-row align="start" justify="center">
                              <v-col>
                                <p>
                                  {{ statshometeam }} :
                                  {{ standing_home }} posição
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.matchsPlayedTotal
                                  }}
                                  Jogos totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.winsHome }} Vitórias em
                                  casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.winsAway }} Vitórias
                                  fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.losesHome }} Derrotas
                                  casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.losesAway }} Derrotas
                                  fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.drawsAway }} Empates
                                  fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.drawsHome }} Empates
                                  casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstHome
                                  }}
                                  Golos marcados contra em casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstAway
                                  }}
                                  Golos marcados contra fora
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsForTotal }} Golos
                                  contra total
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.goalsAgainstTotal
                                  }}
                                  Golos contra totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.winsTotal }} Vitórias
                                  totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.drawsTotal }} Empates
                                  totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.losesTotal }} Derrotas
                                  totais
                                </p>
                                <p>
                                  {{ this.hometeamstats.avgGoalsForHome }} Média
                                  de golos em casa
                                </p>
                                <p>
                                  {{ this.hometeamstats.avgGoalsForAway }} Média
                                  de golos fora de casa
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.avgGoalsForTotal
                                  }}
                                  Média de golos total
                                </p>
                                <p>
                                  {{
                                    this.hometeamstats.avgGoalsAgainstTotal
                                  }}
                                  Média de golos contra total
                                </p>
                                <p>
                                  {{ this.hometeamstats.goalsDiff }} Diferença
                                  de golos
                                </p>
                              </v-col>

                              <v-col>
                                <p>
                                  {{ statsawayteam }} :
                                  {{ standing_away }} posição
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedHome
                                  }}
                                  Jogos jogados em casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedAway
                                  }}
                                  Jogos jogados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.matchsPlayedTotal
                                  }}
                                  Jogos totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.winsHome }} Vitórias em
                                  casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.winsAway }} Vitórias
                                  fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.losesHome }} Derrotas
                                  casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.losesAway }} Derrotas
                                  fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.drawsAway }} Empates
                                  fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.drawsHome }} Empates
                                  casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsForHome }} Golos
                                  marcados em casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsForAway }} Golos
                                  marcados fora de casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstHome
                                  }}
                                  Golos marcados contra em casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstAway
                                  }}
                                  Golos marcados contra fora
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsForTotal }} Golos
                                  contra total
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.goalsAgainstTotal
                                  }}
                                  Golos contra totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.winsTotal }} Vitórias
                                  totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.drawsTotal }} Empates
                                  totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.losesTotal }} Derrotas
                                  totais
                                </p>
                                <p>
                                  {{ this.awayteamstats.avgGoalsForHome }} Média
                                  de golos em casa
                                </p>
                                <p>
                                  {{ this.awayteamstats.avgGoalsForAway }} Média
                                  de golos fora de casa
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.avgGoalsForTotal
                                  }}
                                  Média de golos total
                                </p>
                                <p>
                                  {{
                                    this.awayteamstats.avgGoalsAgainstTotal
                                  }}
                                  Média de golos contra total
                                </p>
                                <p>
                                  {{ this.awayteamstats.goalsDiff }} Diferença
                                  de golos
                                </p>
                              </v-col>
                            </v-row>

                            <!-- H2H TABELA -->
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
                                    <td v-if="id_home_team == item.homeTeamId">
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
                          </v-card-text>
                        </div>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                depressed
                                color="white"
                                @click="dialog = false"
                                v-on="on"
                              >
                                <v-icon large>mdi-door-open</v-icon>
                              </v-btn>
                            </template>
                            <span>Lorem impsum</span>
                          </v-tooltip>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <div v-if="cart.length == 0">
                <p class="font-weight-bold red--text">
                  Por favor adicione um jogo, o boletim encontra-se vazio!
                </p>
              </div>

              <div v-if="cart.length != 0">
                <div
                  v-for="(item, index) in cart"
                  v-bind:key="item.team + index"
                >
                  {{ item.team }} {{ item.odd }}
                </div>
              </div>

              <v-row>
                <v-col class="pb-0">
                  <!-- se o cart estiver vazio (não tem jogos no boletim) não dá para colocar valores no textfield -->
                  <v-text-field
                    name="textFieldQuantia"
                    v-model.number="textFieldQuantia"
                    type="number"
                    label="Quantia"
                    placeholder="100.00€"
                    :rules="rulesQuantia" 
                    outlined
                    @change="calculaGains()"
                    :disabled="cart.length == 0"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0">
                  <v-btn elevation="2" small>Apostar</v-btn>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="clearCart()"
                        small
                        v-bind="attrs"
                        v-on="on"
                      >
                        Clear
                      </v-btn>
                    </template>
                    <span>Limpar Boletim</span>
                  </v-tooltip>
                </v-col>
              </v-row>

              <!--Apresentar Ganhos-->
              <div v-if="gains != null">
                <p
                  class="font-weight-bold red--text"
                  style="white-space: pre-line"
                >
                  Ganhos Totais: {{ gains }}€
                </p>
              </div>
            </v-sheet>

            <v-sheet rounded="lg" min-height="268" class="mt-5">
              <!--  -->
              <p>Publicidade</p>
            </v-sheet>
          </v-col>

          <!-- Alerta caso o jogador coloque um jogo repetido no boletim -->
          <div v-if="jogo_rep_boletim == true">
            <v-alert
              prominent
              close-text="Close Alert"
              border="left"
              dense
              color="#FF0000"
              type="error"
              dismissible
            >
              Jogo já existente no boletim! Por favor adicione um novo.
            </v-alert>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
const betspath = require("@/config/hosts").hostBetsApi;
import VueJwtDecode from "vue-jwt-decode";
import Chat from "@/components/Chat.vue";

export default {
  components: {
    Chat,
  },
  data() {
    return {
      infototal: [],
      list_leagues_unique: [],
      lista_jogos_pais: [],
      unique_countries: [],
      cart: [],
      gains: null,
      textFieldQuantia: "",
      dialog: false,
      hometeamstats: null,
      awayteamstats: null,
      statshometeam: null,
      statsawayteam: null,
      h2h: null,
      standings: null,
      jogo_rep_boletim: null,
      standing_home: "",
      standing_away: "",
      league_name: "",
      id_home_team: null,
      id_away_team: null,
      rulesQuantia: [
        v => {
          const pattern1 = /^\d+$/
          const pattern2 = /^\d+\.\d$/
          const pattern3 = /^\d+\.\d\d$/
          return (pattern1.test(v) || pattern2.test(v) || pattern3.test(v)) || 'Formato de número inválido'
        },
         v => v > 0 || 'Não pode introduzir um valor negativo ou zero'
        
        
        ],

    };
  },
  mounted: function() {
    axios
      .get(betspath + "fixtures/allinfo")
      .then((dados) => {
        this.infototal = dados.data; //jogos todos vindos da database

        console.log("info que vem da api");
        console.log(this.infototal);

        var obj = {};
        var league = [];

        /*
        // Objeto estatico criado para teste
        obj.countryname = "Portugal" 
        obj.countrycode = "PT" 
        obj.countryflag = "https://media.api-sports.io/flags/pt.svg" 
        obj.oddhome = "1.3" 
        obj.oddaway = "3" 
        obj.odddraw = "5.6" 
        obj.hometeamname = "Abragonense" 
        obj.awayteamname = "Amigos de S Miguel" 
        obj.hometeamlogo = "https://media.api-sports.io/football/teams/45.png" 
        obj.awayteamlogo = "https://media.api-sports.io/football/teams/33.png" 
        obj.begintime = "2020-11-10T12:30:00.000Z"   
        obj.idfixture = "1233" 
        obj.idleague = "2" 
        obj.state = "Not Started"
        
        dados.data.push(obj) 
        */
        obj = {};

        var i = 0;
        var coiso = [];

        for (; i < dados.data.length; i++) {
          obj.id = dados.data[i].countryname;
          obj.countrycode = dados.data[i].contrycode;
          obj.countryflag = dados.data[i].countryflag;
          obj.oddhome = dados.data[i].oddhome;
          obj.oddaway = dados.data[i].oddaway;
          obj.odddraw = dados.data[i].odddraw;
          obj.hometeamname = dados.data[i].hometeamname;
          obj.awayteamname = dados.data[i].awayteamname;
          obj.hometeamlogo = dados.data[i].hometeamlogo;
          obj.awayteamlogo = dados.data[i].awayteamlogo;
          obj.begintime = dados.data[i].begintime;
          obj.hometeamid = dados.data[i].hometeamid;
          obj.awayteamid = dados.data[i].awayteamid;
          obj.idleague = dados.data[i].idleague;
          obj.idfixture = dados.data[i].idfixture;
          obj.leaguename = dados.data[i].leaguename;
          // array de ligas associado ao pais
          league.push(dados.data[i].leaguelogo);
          obj.leagues = league;
          coiso.push(obj);
          obj = {};
        }

        var unique_list = new Set(coiso);
        this.list_leagues_unique = Array.from(unique_list);

        var j = 0;
        var merda = [];
        var merdaboa = [];

        for (j; j < this.list_leagues_unique.length; j++) {
          merda = this.list_leagues_unique[j].leagues;
          merdaboa = merda.filter((v, i, a) => a.indexOf(v) === i);
          this.list_leagues_unique[j].leagues = merdaboa;
        }

        console.log("list leagues unique");
        console.log(this.list_leagues_unique);

        // para criar array para fazer display dos paises na aba lateral

        var unique_country = [];
        // filter por country (unique)
        unique_country = this.list_leagues_unique.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );

        var x = 0;
        var obj_unq = {};
        // Display de todos os jogos, tem active para mudar depois a cor de fundo (todos por defeito no início tem cor de fundo)
        obj_unq.id = "Todos";
        obj_unq.active = true;
        this.unique_countries.push(obj_unq);
        obj_unq = {};
        // Counstruir array de objetos com nome da liga/flag
        for (x; x < unique_country.length; x++) {
          obj_unq.id = unique_country[x].id;
          obj_unq.countryflag = unique_country[x].countryflag;
          obj_unq.active = false;
          this.unique_countries.push(obj_unq);
          obj_unq = {};
        }

        /*
       const uniquecountries = [...new Set(this.infototal.map(item => item.countryname))];

       function agruparPor(objetoArray, propriedade) {
           return objetoArray.reduce(function (acc, obj) {
               let key = obj[propriedade];
               if (!acc[key]) {
               acc[key] = [];
               }
               acc[key].push(obj);
               return acc;
           }, {});
       }
         
       let bycountry = agruparPor(this.infototal, 'countryname');
                             
       var result = []
       uniquecountries.map(x => result.push({'countryname': x , 'leagues': agruparPor(bycountry[x], 'leaguename')}))

       console.log("resultado:" ) 
       console.log(result)
        */
      })
      .catch((err) => {
        this.error = err.message;
      });
  },
  methods: {
    getStats(
      idleague,
      idhome,
      idaway,
      homename,
      awayhome,
      idfixture,
      leaguename
    ) {
      console.log(String(idfixture));
      let get_stats =
        betspath +
        "teamstats/teamstats/" +
        idleague +
        "/" +
        idhome +
        "/" +
        idaway;
      let get_standing = betspath + "standings/" + idleague;
      let get_h2h = betspath + "head2head/" + String(idfixture);

      this.statshometeam = homename;
      this.statsawayteam = awayhome;
      this.league_name = leaguename;
      this.id_home_team = idhome;
      this.id_away_team = idaway;

      const res_stats = axios.get(get_stats);
      const res_standing = axios.get(get_standing);
      const res_h2h = axios.get(get_h2h);

      axios
        .all([res_stats, res_standing, res_h2h])
        .then(
          axios.spread((...responses) => {
            console.log("statssssssssssssssssssssssssssssssssssssssssssssss");
            this.hometeamstats = responses[0].data.equipa1[0];
            console.log(this.hometeamstats);
            this.awayteamstats = responses[0].data.equipa2[0];
            console.log(this.awayteamstats);
            this.standings = responses[1].data;
            this.h2h = responses[2].data;

            console.log("head2heeeeeeeeeeeeeead");
            console.log(this.h2h);

            // encontrar a posição das 2 equipas da fixture
            var i = 0;
            for (i; i < this.standings.length; i++) {
              if (this.standings[i].teamname == this.statshometeam) {
                this.standing_home = this.standings[i].position;
                console.log(this.standings[i].position);
              }
              if (this.standings[i].teamname == this.statsawayteam) {
                this.standing_away = this.standings[i].position;
              }
            }

            console.log("positionsssss");
            console.log(this.standing_home);
            console.log(this.standing_away);

            this.dialog = true;
          })
        )
        .catch((err) => {
          this.error = err.message;
        });
    },

    toggleActiveButton: function(index) {
      this.unique_countries.forEach(function(button) {
        button.active = false;
      });
      this.unique_countries[index].active = !this.unique_countries[index]
        .active;
    },

    onlyUnique: function(value, index, self) {
      return self.indexOf(value) === index;
    },

    calculaGains() {
      // calcula os ganhos da aposta
      var i = 0;
      var total_odds = 0;
      for (i; i < this.cart.length; i++) {
        console.log(this.cart[i].odd);
        total_odds += parseFloat(this.cart[i].odd);
      }
      console.log(total_odds);
      this.gains =
        total_odds * this.textFieldQuantia -
        this.textFieldQuantia +
        this.textFieldQuantia;
      this.gains = Math.round((this.gains + Number.EPSILON) * 100) / 100;
    },

    addCart(hometeamname, odd, idfixture) {
      // criar o objeto para adicionar ao cart (team,odd)
      this.jogo_rep_boletim = false;

      var obj = {};
      var i = 0;
      obj.team = hometeamname;
      obj.odd = odd;
      obj.idfixture = idfixture;

      // não permite a inserção da mesma fixture 2 vezes.
      var index = this.cart.findIndex((x) => x.idfixture == idfixture);

      if (index === -1) {
        this.cart.push(obj);
      } else this.jogo_rep_boletim = true;

      console.log(this.cart);
    },

    clearCart() {
      this.cart = [];
      this.textFieldQuantia = "";
      this.gains = null;
    },

    buscarFixtures(idcountry, index) {
      // BUSCAR FIXTURES DE UM COUNTRY SELECIONADO
      //console.log("Nome country selecionado: " + idcountry)
      var i = 0;
      var obj = {};
      var coiso = [];

      //console.log("buscar fixutres list league")
      //console.log(this.list_leagues_unique)
      if (idcountry != "Todos") {
        for (i; i < this.list_leagues_unique.length; i++) {
          if (this.list_leagues_unique[i].id == idcountry) {
            obj.oddhome = this.list_leagues_unique[i].oddhome;
            obj.oddaway = this.list_leagues_unique[i].oddaway;
            obj.odddraw = this.list_leagues_unique[i].odddraw;
            obj.hometeamname = this.list_leagues_unique[i].hometeamname;
            obj.awayteamname = this.list_leagues_unique[i].awayteamname;
            obj.hometeamlogo = this.list_leagues_unique[i].hometeamlogo;
            obj.awayteamlogo = this.list_leagues_unique[i].awayteamlogo;
            obj.hometeamid = this.list_leagues_unique[i].hometeamid;
            obj.awayteamid = this.list_leagues_unique[i].awayteamid;
            obj.idleague = this.list_leagues_unique[i].idleague;
            obj.idfixture = this.list_leagues_unique[i].idfixture;
            obj.leaguename = this.list_leagues_unique[i].leaguename;
            var sub_str = this.list_leagues_unique[i].begintime.substring(
              0,
              10
            );
            obj.begintime = sub_str;
            coiso.push(obj);
            this.lista_jogos_pais = coiso;
            obj = {};
          }
        }
      } else {
        for (i; i < this.list_leagues_unique.length; i++) {
          obj.oddhome = this.list_leagues_unique[i].oddhome;
          obj.oddaway = this.list_leagues_unique[i].oddaway;
          obj.odddraw = this.list_leagues_unique[i].odddraw;
          obj.hometeamname = this.list_leagues_unique[i].hometeamname;
          obj.awayteamname = this.list_leagues_unique[i].awayteamname;
          obj.hometeamlogo = this.list_leagues_unique[i].hometeamlogo;
          obj.awayteamlogo = this.list_leagues_unique[i].awayteamlogo;
          obj.hometeamid = this.list_leagues_unique[i].hometeamid;
          obj.awayteamid = this.list_leagues_unique[i].awayteamid;
          obj.idleague = this.list_leagues_unique[i].idleague;
          obj.idfixture = this.list_leagues_unique[i].idfixture;
          obj.leaguename = this.list_leagues_unique[i].leaguename;
          var sub_str = this.list_leagues_unique[i].begintime.substring(0, 10);
          obj.begintime = sub_str;
          coiso.push(obj);
          this.lista_jogos_pais = coiso;
          obj = {};
        }
      }

      console.log("JOGOS PAIS");
      console.log(this.lista_jogos_pais);
    },
    checknumformat(num){

      if(num.match()){
          return true;
      }
      else if(num.match()){
              return true;
          }
      else if(num.match()){
              return true;
          }
      else{
          return false
      }
    },
  },
};
</script>

<style scoped>
.col-md-1 {
  flex: 0 0 8.3333333333%;
  max-width: 24.3333333333%;
}

/* butões das odds */
.v-btn:not(.v-btn--round).v-size--small {
  height: 36px;
  min-width: 10px;
  padding: 0 12.4444444444px;
}

/* butões de apostar e clear */
.v-btn:not(.v-btn--round).v-size--small[data-v-0efef83c][data-v-0efef83c] {
  height: 25px;
  min-width: 10px;
  padding: 0 12.4444444444px;
}

.v-dialog__container {
  display: unset;
}
</style>

<style scoped>
.active {
  background-color: #f55c5c;
}
</style>
