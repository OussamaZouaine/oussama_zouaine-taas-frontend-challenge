import { createStore } from 'vuex';

const storedToken = localStorage.getItem('token');
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedRepos = JSON.parse(localStorage.getItem('repos'));
const storedRepo = JSON.parse(localStorage.getItem('repo'));
const storedCommits = JSON.parse(localStorage.getItem('commits'));

export default createStore({
    state: {
        token: storedToken ?? '',
        user: storedUser ?? {},
        repos: storedRepos ?? [],
        repo: storedRepo ?? {},
        commits: storedCommits ?? [],
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
        // Fetch All repositories
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

            state.commit('setRepos', data);

            localStorage.setItem('repos', JSON.stringify(data));
        },
        // Fetch a specific repository
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

            state.commit('setRepo', data);

            localStorage.setItem('repo', JSON.stringify(data));

            console.log(data);
        },
        // Fetch commits of a specific repository
        async fetchCommits(state, payload) {
            const res = await fetch(
                `https://api.github.com/repos/${payload.owner}/${payload.name}/commits?per_page=100`,
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

            localStorage.setItem('commits', JSON.stringify(commit));

            console.log(state.state.commits);
        },
    },
    modules: {},
});
