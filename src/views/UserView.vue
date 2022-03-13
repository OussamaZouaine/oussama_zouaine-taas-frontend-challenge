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

        <div>
            <ul>
                <li v-for="repo in filteredRepos" :key="repo.id" class="">
                    {{ repo.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/Header.vue';

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
    },
    methods: {
        hideInfo(e) {
            e.target.parentElement.classList.add('hidden');
        },
    },
    created() {
        this.$store.dispatch('fetchReposData', this.$store.state.token);
    },
    computed: {
        ...mapGetters({ token: 'getToken' }),
        filteredRepos() {
            return this.repos.filter((repo) =>
                repo.name.toLowerCase().includes(this.repoName.toLowerCase())
            );
        },
    },
};
</script>
