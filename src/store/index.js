import { createStore } from 'vuex';

const storedToken = localStorage.getItem('token');
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedRepos = JSON.parse(localStorage.getItem('repos'));
console.log(storedRepos);

export default createStore({
    state: {
        token: storedToken ?? '',
        user: storedUser ?? {},
        repos: storedRepos ?? [],
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        getRepos: (state) => state.repos,
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setRepos(state, payload) {
            state.repos = payload;
        },
    },
    actions: {
        async fetchReposData(state, payload) {
            const res = await fetch(
                'https://api.github.com/user/repos?per_page=100&sort=updated',
                {
                    methods: 'GET',
                    headers: {
                        Authorization: `Bearer ${payload}`,
                        accept: 'application/vnd.github.v3+json',
                    },
                }
            );

            const data = await res.json();

            localStorage.setItem('repos', JSON.stringify(data));

            state.commit('setRepos', data);
        },
    },
    modules: {},
});
