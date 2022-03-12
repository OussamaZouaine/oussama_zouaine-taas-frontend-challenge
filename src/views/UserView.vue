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

        <ul>
            <li v-for="repo in repos" :key="repo.id">{{ repo.name }}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/Header.vue';

export default {
    name: 'AboutView',
    data() {
        return {
            repos: [],
        };
    },
    components: {
        Header,
    },
    computed: {
        ...mapGetters({ token: 'getToken', user: 'getUser' }),
    },
    methods: {
        hideInfo(e) {
            e.target.parentElement.classList.add('hidden');
        },
        async fetchUserData(token) {
            const res = await fetch(
                'https://api.github.com/user/repos?per_page=100&sort=updated',
                {
                    methods: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: 'application/vnd.github.v3+json',
                    },
                }
            );

            const data = await res.json();

            console.log(data);

            this.repos = data;
        },
    },
    created() {
        // console.log(this.$store.state.token);
        this.fetchUserData(this.$store.state.token);
    },
};
</script>
