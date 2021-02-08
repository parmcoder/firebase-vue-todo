export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    }
  },
  actions: {
    setAuthenticated(context, user){
      context.commit('setUser', user);
    },

  },
  getters: {
    authenticated(state) {
      return state.user != null;
    },
  },
};
