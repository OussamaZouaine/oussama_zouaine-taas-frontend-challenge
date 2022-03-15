<template>
    <section>
        <h1 class="font-semibold text-xl">{{ repo.name }}</h1>
        <small>{{ commits.length }}</small>
        <p v-for="commit in commits" :key="commit.sha">
            <span>{{ commit.commit.author.name }}</span>
            {{ commit.commit.message }}
        </p>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Repo',
    methods: {},
    computed: {
        ...mapGetters({ repo: 'getRepo', commits: 'getCommits' }),
    },
};
</script>
