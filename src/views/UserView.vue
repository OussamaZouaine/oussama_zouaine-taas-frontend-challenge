<template>
    <div class="container">
        <Header />

        <div
            class="relative flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded my-8 text-lg"
        >
            <i class="fa-solid fa-circle-info mr-3"></i>
            Your Github account was successfully authorized
            <i
                @click="hideInfo"
                class="fa-solid fa-xmark absolute right-4 cursor-pointer"
            ></i>
        </div>

        <form
            @submit.prevent=""
            class="flex items-center gap-x-2 w-fit py-3 px-6 border border-blue-100 rounded shadow-md focus-within:border-blue-500 mb-6"
        >
            <input
                type="text"
                name="name"
                v-model="repoName"
                placeholder="Search a repo by name..."
                class="w-60 focus:outline-none placeholder:text-blue-300"
            />
            <i class="fa-solid fa-magnifying-glass text-blue-500"></i>
        </form>

        <div class="md:flex md:gap-8 py-4">
            <ul class="h-[100vh] min-w-fit overflow-auto">
                <li
                    @click="fetchRepo(repo.id, repo.name, repo.owner.login)"
                    v-for="repo in filteredRepos"
                    :key="repo.id"
                    class="p-2 cursor-pointer hover:bg-blue-100 hover:font-semibold"
                >
                    {{ repo.name }}
                </li>
            </ul>

            <Repository />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Repository from '@/components/Repository.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'AboutView',
    data() {
        return {
            repos: this.$store.state.repos,
            repoName: '',
        };
    },
    components: {
        Header,
        Repository,
    },
    methods: {
        hideInfo(e) {
            e.target.parentElement.classList.add('hidden');
        },
        fetchRepo(id, name, owner) {
            this.$store.dispatch('fetchRepoData', {
                token: this.$store.state.token,
                id,
                name,
                owner,
            });
            this.$store.dispatch('fetchCommits', {
                token: this.$store.state.token,
                id,
                name,
                owner,
            });
        },
    },
    computed: {
        ...mapGetters({ repo: 'getRepo' }),
        filteredRepos() {
            return this.repos.filter((repo) =>
                repo.name.toLowerCase().includes(this.repoName.toLowerCase())
            );
        },
    },
    created() {
        this.$store.dispatch('fetchReposData', this.$store.state.token);
        // console.log(this.$store.state.token);
    },
};
</script>

<style scoped>
ul {
    scrollbar-color: #3b82f6 #dbeafe;
    scrollbar-width: thin;
    scroll-behavior: smooth;
}
</style>
