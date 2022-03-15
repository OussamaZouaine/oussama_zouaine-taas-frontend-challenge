import { createStore } from 'vuex';

const storedToken = localStorage.getItem('token');
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedRepos = JSON.parse(localStorage.getItem('repos'));
const storedRepo = JSON.parse(localStorage.getItem('repo'));

export default createStore({
    state: {
        token: storedToken ?? '',
        user: storedUser ?? {},
        repos: storedRepos ?? [],
        repo: storedRepo ?? {},
        commits: [],
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        getRepos: (state) => state.repos,
        getRepo: (state) => state.repo,
        getCommits: (state) => state.commits,
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
        setRepo(state, payload) {
            state.repo = payload;
        },
        setCommits(state, payload) {
            state.commits = payload;
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
        async fetchRepoData(state, payload) {
            const res = await fetch(
                `https://api.github.com/repos/${payload.owner}/${payload.name}`,
                {
                    methods: 'GET',
                    headers: {
                        Authorization: `Bearer ${payload.token}`,
                        accept: 'application/vnd.github.v3+json',
                    },
                }
            );

            const data = await res.json();

            localStorage.setItem('repo', JSON.stringify(data));

            state.commit('setRepo', data);

            console.log(data);
        },
        async fetchCommits(state, payload) {
            const res = await fetch(
                `https://api.github.com/repos/${payload.owner}/${payload.name}/commits`,
                {
                    methods: 'GET',
                    headers: {
                        Authorization: `Bearer ${payload.token}`,
                        accept: 'application/vnd.github.v3+json',
                    },
                }
            );

            const data = res.json();

            const commit = await data;

            state.commit('setCommits', commit);
            console.log(state.state.commits);
        },
    },
    modules: {},
});
