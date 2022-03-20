import { createStore } from 'vuex';

const storedTheme = JSON.parse(localStorage.getItem('theme'));
const storedToken = localStorage.getItem('token');
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedRepos = JSON.parse(localStorage.getItem('repos'));
const storedRepo = JSON.parse(localStorage.getItem('repo'));
const storedCommits = JSON.parse(localStorage.getItem('commits'));
const storedBranches = JSON.parse(localStorage.getItem('branches'));

export default createStore({
    state: {
        darkThem: storedTheme ?? false,
        // isLoading: true,
        token: storedToken ?? '',
        user: storedUser ?? {},
        repos: storedRepos ?? [],
        repo: storedRepo ?? {},
        commits: storedCommits ?? [],
        branches: storedBranches ?? [],
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        getRepos: (state) => state.repos,
        getRepo: (state) => state.repo,
        getCommits: (state) => state.commits,
        getBranches: (state) => state.branches,
        getDarkTheme: (state) => state.darkThem,
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
            localStorage.setItem('token', payload);
        },
        setUser(state, payload) {
            state.user = payload;
            localStorage.setItem('user', JSON.stringify(payload));
        },
        setRepos(state, payload) {
            state.repos = payload;
            localStorage.setItem('repos', JSON.stringify(payload));
        },
        setRepo(state, payload) {
            state.repo = payload;
            localStorage.setItem('repo', JSON.stringify(payload));
        },
        setCommits(state, payload) {
            state.commits = payload;
            localStorage.setItem('commits', JSON.stringify(payload));
        },
        setBranches(state, payload) {
            state.branches = payload;
            localStorage.setItem('branches', JSON.stringify(payload));
        },
        setDarkTheme(state) {
            state.darkThem = !state.darkThem;
            localStorage.setItem('theme', state.darkThem);
        },
    },
    actions: {
        // Fetch All repositories
        async fetchReposData(state, payload) {
            try {
                // state.state.isLoading = true;
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

                // state.state.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
        // Fetch a specific repository
        async fetchRepoData(state, payload) {
            try {
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
            } catch (error) {
                console.log(error);
            }
        },
        // Fetch commits of a specific repository
        async fetchCommits(state, payload) {
            try {
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
            } catch (error) {
                console.log(error);
            }
        },
        // Fetch Branches of a specific repository
        async fetchBranches(state, payload) {
            try {
                const res = await fetch(
                    `https://api.github.com/repos/${payload.owner}/${payload.name}/branches`,
                    {
                        methods: 'GET',
                        headers: {
                            Authorization: `Bearer ${payload.token}`,
                            accept: 'application/vnd.github.v3+json',
                        },
                    }
                );

                const data = res.json();

                const branch = await data;

                state.commit('setBranches', branch);
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {},
});
