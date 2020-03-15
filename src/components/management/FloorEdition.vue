<template>
  <v-container class="py-0" justify="center">
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
              hide-details="auto"
              solo
              dense
              color="black"
              v-model="textField.num"
              :flat="!edit"
              @change="index > 0 && changeRoomRange()"
              :prefix="textField.prefix"
              :placeholder="textField.placeholder"
              :disabled="!edit"
              required
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
        <v-col v-show="edit" cols="12">
          <v-combobox
            hide-details="auto"
            multiple
            chips
            deletable-chips
            v-model="rooms"
            @change="checkIfRangeExceeded"
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
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    floor: {
      type: Object,
      default: () => ({
        floorNumber: null,
        rooms: []
      })
    }
  },
  data() {
    return {
      edit: false,
      valid: true,
      rooms: this.floor.rooms,
      rules: {
        required: v => !!v || "Wymagane",
        number: v => !isNaN(v) || "Podaj liczbę",
        exists: v => this.floorNumbers.indexOf(v) == -1 || "Piętro istnieje",
        compared: () => {
          
          if(
            this.textFields[1].num == "" || this.textFields[2].num == ""
          ){
            return true
          }else{
            return this.textFields[1].num <= this.textFields[2].num || "Max < Min"
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters("Management", ["floorNumbers"]),
    icon() {
      return this.edit ? "content-save-outline" : "pencil-outline";
    },
    textFields() {
      return [
        {
          prefix: "Piętro",
          placeholder: "nr",
          num: this.floor.floorNumber,
          rules: [this.rules.required, this.rules.number, this.rules.exists]
        },
        {
          prefix: "Od",
          placeholder: "nr Pokoju",
          num: this.floor.empty ? "" : Math.min(...this.floor.rooms),
          rules: [this.rules.required, this.rules.number, this.rules.compared]
        },
        {
          prefix: "Do",
          placeholder: "nr Pokoju",
          num: this.floor.empty ? "" : Math.max(...this.floor.rooms),
          rules: [this.rules.required, this.rules.number, this.rules.compared]
        }
      ];
    }
  },
  methods: {
    ...mapActions("Management", ["saveFloorChanges"]),
    toggleEdit() {
      if (!this.edit || this.valid) {
        this.edit = !this.edit;
        this.saveData();
      } else {
        this.$refs.form.validate();
      }
    },
    saveData() {
      if (this.valid) {
        const preparedFloorData = {
          floorNumber: this.textFields[0].num,
          rooms: this.rooms
        };
        this.saveFloorChanges(preparedFloorData);
      }
    },
    changeRoomRange() {
        const minRoom = this.textFields[1].num;
        const maxRoom = this.textFields[2].num;
        if(minRoom < maxRoom){
          this.createNewRoomList(minRoom, maxRoom);
        }

    },
    createNewRoomList(minRoom, maxRoom) {
      const min = Number(minRoom);
      const max = Number(maxRoom);
      this.rooms = Array(max - min + 1)
        .fill()
        .map((_, idx) => min + idx);
    },
    checkIfRangeExceeded(event) {
      const inputMax = Math.max(...event);
      const inputMin = Math.min(...event);
      if (!isNaN(inputMax + inputMin)) {
        switch (true) {
          case inputMax != this.textFields[2].num && inputMax != -Infinity:
            this.textFields[2].num = inputMax;
            break;
          case inputMin != this.textFields[1].num && inputMin != Infinity:
            this.textFields[1].num = inputMin;
            break;
          default:
        }
      } else {
        this.rooms = this.rooms.filter(el => !isNaN(el));
      }
    }
  }
};
</script>
