import { createStore } from 'vuex';

const storedToken = localStorage.getItem('token');

export default createStore({
    state: {
        token: storedToken ?? '',
    },
    getters: {
        getToken: (state) => state.token,
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },
    },
    actions: {},
    modules: {},
});
