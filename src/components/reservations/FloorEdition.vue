<template>
  <v-row dense justify="center">
    <v-col dense cols="5">
      <v-form
        ref="form"
        class="d-flex justify space-between flex-column flex-md-row"
        v-model="valid"
      >
        <v-col
          v-for="(textField, index) in textFields"
          dense
          md="4"
          class="py-0"
          :key="index"
        >
          <v-text-field
            solo
            dense
            color="black"
            :flat="!edit"
            :prefix="textField.prefix"
            :placeholder="textField.placeholder"
            :readonly="!edit"
            :rules="[rules.required, rules.number]"
          />
        </v-col>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="toggleEdit()" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span> Edytuj </span>
        </v-tooltip>

      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    edit: false,
    valid:false,
    textFields: [
      {
        prefix: "Piętro",
        placeholder: "nr"
      },
      {
        prefix: "Od",
        placeholder: "nr Pokoju"
      },
      {
        prefix: "Do",
        placeholder: "nr Pokoju"
      }
    ],
    rules: {
      required: v => !!v || "Wymagane",
      number: v => !isNaN(v) || "Podaj liczbę"
    }
  }),
  methods: {
    toggleEdit() {
        console.log(!this.edit, this.valid)
        if(!this.edit || this.valid){
            
            this.edit = !this.edit
        }
    }
  }
};
</script>

<style></style>
