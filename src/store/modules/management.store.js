export default {
  namespaced: true,
  state: {
    floors: [
      {
        floorNumber: 1,
        rooms: [101, 102, 103, 104, 105, 106]
      }
    ],
    testFloor: {
      floorNumber: 20,
      floorRooms: ['101', '102', '103', '104'],
    }
  },
  getters: {},
  actions: {},
  mutations: {}
};
