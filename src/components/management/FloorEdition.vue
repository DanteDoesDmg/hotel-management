<template>
  <v-container dense justify="center">
    <v-form ref="form" v-model="valid" class="d-flex flex-wrap">
      <v-row>
        <v-col class="d-flex justify-space-between flex-column flex-sm-row">
          <v-col
            v-for="(textField, index) in textFields"
            dense
            class="py-0"
            :key="index"
          >
            <v-text-field
              solo
              dense
              color="black"
              v-model="textField.num"
              :flat="!edit"
              @change="index > 0 && changeRoomRange()"
              :prefix="textField.prefix"
              :placeholder="textField.placeholder"
              :disabled="!edit"
              :rules="textField.rules"
            />
          </v-col>
        </v-col>
        <v-col
          cols="1"
          :align-self="this.$vuetify.breakpoint.xsOnly ? 'end' : 'start'"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="toggleEdit()" icon>
                <v-icon>mdi-{{ icon }}</v-icon>
              </v-btn>
            </template>
            <span> {{ edit ? "Zapisz" : "Edytuj" }} </span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-combobox
            v-show="edit"
            multiple
            chips
            deletable-chips
            v-model="rooms"
            @input="checkIfRangeExceeded"
            outlined
            append-icon=""
            :delimiters="[',']"
            label="Po wpisaniu numeru postaw przecinek aby zatwierdzić"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    floor: {
      type: Object,
      default: () => ({
        floorNumber: null,
        floorRooms: []
      })
    }
  },
  data() {
    return {
      edit: false,
      valid: false,
      rooms: this.floor.floorRooms,
      rules: {
        required: v => !!v || "Wymagane",
        number: v => !isNaN(v) || "Podaj liczbę",
        compared: () => this.textFields[1].num <= this.textFields[2].num || "Max < Min",
      }
    };
  },
  computed: {
    ...mapState("Management", ["testFloor"]),
    icon() {
      return this.edit ? "content-save-outline" : "pencil-outline";
    },
    textFields() {
      return [
        {
          prefix: "Piętro",
          placeholder: "nr",
          num: this.floor.floorNumber,
          rules: [this.rules.required, this.rules.number]
        },
        {
          prefix: "Od",
          placeholder: "nr Pokoju",
          num: Math.min(...this.floor.floorRooms),
          rules: [this.rules.required, this.rules.number, this.rules.compared]
        },
        {
          prefix: "Do",
          placeholder: "nr Pokoju",
          num: Math.max(...this.floor.floorRooms),
          rules: [this.rules.required, this.rules.number, this.rules.compared]
        }
      ];
    },

  },
  methods: {
    toggleEdit() {
      if (!this.edit || this.valid) this.edit = !this.edit;
      else this.$refs.form.validate();
    },
    changeRoomRange() {
      if(this.valid){
        const MinRoom = this.textFields[1].num
        const MaxRoom = this.textFields[2].num
        this.createNewRoomList(MinRoom, MaxRoom)
      }
    },
    createNewRoomList(minRoom, maxRoom) {
      const min = Number(minRoom)
      const max = Number(maxRoom)
      console.log(min)
      this.rooms = Array(max - min + 1)
        .fill()
        .map((_, idx) => min + idx);
    },
    checkIfRangeExceeded(event){
      const inputMax = Math.max(...event)
      const inputMin = Math.min(...event)

      switch(true){
        case inputMax != this.textFields[2].num && inputMax != -Infinity:
          this.textFields[2].num = inputMax
          break;
        case inputMin != this.textFields[1].num && inputMax!= -Infinity:
          this.textFields[2].num = inputMin
          break;
        default:
          
      }
    }}
};
</script>

<style></style>
