<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p>{{ token }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AboutView',
    data() {
        return {};
    },
    computed: {
        ...mapGetters({ token: 'getToken' }),
    },
    methods: {
        async fetchUserData(token) {
            const res = await fetch('https://api.github.com/user/repos', {
                methods: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: 'application/vnd.github.v3+json',
                },
            });

            const data = await res.json();

            console.log(data);
        },
    },
    created() {
        console.log(this.$store.state.token);
        this.fetchUserData(this.$store.state.token);
    },
};
</script>
