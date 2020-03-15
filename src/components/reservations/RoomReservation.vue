<template>
  <v-card class="mx-auto" flat outlined >
    <v-toolbar short>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>Wróć</span>
      </v-tooltip>
      <v-toolbar-title>
        Piętra/numery pokojów
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>
          mdi-bell-outline
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row justify="center" dense>
        <v-col cols="5">
          <p class="title text-center">
            Wpisz numery pięter i zakres numeracji pokojów/apartementów, które
            na nich występują
          </p>
          <p class="text-center">
            <v-icon>mdi-lightbulb-on-outline</v-icon>
            Aby edytować zakres, lub wpisać poszczególne numery ręcznie, kliknij
            ikonę ołówka
          </p>
        </v-col>
      </v-row>
      <v-container>
        <floor-edition/>
        <v-row dense justify="center">
          <v-btn color="primary">
            Dodaj piętro
            <v-icon right>mdi-plus-circle</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="success" > Dalej </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FloorEdition from './FloorEdition'
export default {
  components:{
    'floor-edition': FloorEdition
  },
  mounted() {}
};
</script>

<style></style>
