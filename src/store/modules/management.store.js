export default {
  namespaced: true,
  state: {
    emptyFloor: {
      floorNumber: "",
      rooms: [],
      empty: true
    },
    floors: [
      {
        floorNumber: "1",
        rooms: ["101", "102", "103", "104", "105", "106"]
      },
      {
        floorNumber: "2",
        rooms: ["201", "202", "203", "204"]
      },
      {
        floorNumber: "3",
        rooms: ["301", "302", "303", "304"]
      }
    ]
  },
  getters: {
    filteredFloors: state => floorNumber => {
      return state.floors.find(el => el.floorNumber === floorNumber);
    },
    floorNumbers(state) {
      return state.floors.map(el => el.floorNumber);
    }
  },
  actions: {
    createNewFloor({ commit, state }) {
      commit("addNewFloor", state.emptyFloor);
    },
    saveFloorChanges({ commit, getters }, payload) {
      if (getters.filteredFloors(payload.floorNumber)) {
        commit("updateFloor", payload);
      } else {
        commit("saveFloor", payload);
      }
    }
  },
  mutations: {
    addNewFloor(state, payload) {
      if (!state.floors.find(el => el.empty)) {
        state.floors.push(payload);
      }
    },
    saveFloor(state, payload) {
      state.floors = state.floors.map(el => {
        return el.empty ? payload : el
      });
    },
    updateFloor(state, payload) {
      state.floors = state.floors.map(el => {
        if (el.floorNumber == payload.floorNumber) {
          return payload;
        } else {
          return el;
        }
      });
    }
  }
};
