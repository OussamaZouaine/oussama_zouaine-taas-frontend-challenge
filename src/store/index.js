import { createStore } from 'vuex';

const storedToken = localStorage.getItem('token');
const storedUser = JSON.parse(localStorage.getItem('user'));

export default createStore({
    state: {
        token: storedToken ?? '',
        user: storedUser ?? {},
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {},
    modules: {},
});
