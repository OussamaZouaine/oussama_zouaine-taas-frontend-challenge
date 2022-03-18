<template>
    <div class="container bg-white text-black dark:bg-gray-800 dark:text-white">
        <Header />

        <!-- Info -->
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
        <!-- End Info -->

        <!-- Search Form -->
        <form
            @submit.prevent=""
            class="flex items-center gap-x-2 w-fit py-3 px-6 border border-blue-100 rounded shadow-sm focus-within:border-blue-500 mb-6"
        >
            <input
                type="text"
                name="name"
                v-model="repoName"
                placeholder="Search a repo by name..."
                class="w-64 bg-transparent focus:outline-none placeholder:text-blue-300"
            />
            <i class="fa-solid fa-magnifying-glass text-blue-500"></i>
        </form>
        <!-- End Search Form -->

        <!-- Repositories -->
        <div class="md:flex md:gap-x-8 py-4 space-y-8 md:space-y-1">
            <!-- List of repositories -->
            <ul
                v-if="!this.$store.state.isLoading"
                class="h-[70vh] md:h-auto min-w-fit overflow-auto mb-4"
            >
                <li
                    @click="fetchRepo(repo.id, repo.name, repo.owner.login)"
                    v-for="repo in filteredRepos"
                    :key="repo.id"
                    class="p-2 cursor-pointer hover:bg-blue-100 hover:font-semibold hover:text-black"
                >
                    {{ repo.name }}
                </li>
            </ul>
            <!-- End list of repositories -->

            <!-- Repository component to show selected repo -->
            <Repository />
            <!-- End Repository component to show selected repo -->
        </div>
        <!-- End Repositories -->
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
            this.$store.dispatch('fetchBranches', {
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
            return this.$store.state.repos.filter((repo) =>
                repo.name.toLowerCase().includes(this.repoName.toLowerCase())
            );
        },
    },
    created() {
        this.$store.dispatch('fetchReposData', this.$store.state.token);
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
