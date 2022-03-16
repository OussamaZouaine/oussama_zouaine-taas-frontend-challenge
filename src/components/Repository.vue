<template>
    <section v-if="Object.keys(repo).length > 0" class="grow">
        <h1 class="font-semibold text-xl">{{ repo.name }}</h1>
        <small>{{ commits.length }}</small>
        <div
            v-for="commit in commits"
            :key="commit.sha"
            class="flex gap-x-3 py-2 px-4 border border-gray-100 rounded mb-2 hover:bg-blue-50"
        >
            <i class="fa-solid fa-code-commit mt-[0.35rem]"></i>
            <div>
                <h2 class="font-semibold capitalize mb-2">
                    <a :href="commit.html_url" target="_blank">{{
                        commit.commit.message
                    }}</a>
                </h2>
                <div class="flex gap-x-2 items-center">
                    <p class="text-sm font-semibold">
                        {{ commit.commit.committer.name }}
                    </p>
                    <p class="text-sm">
                        {{ timestamp(commit.commit.committer.date) }}
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        <h1>Select a Repository</h1>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: 'Repository',
    data() {
        return {};
    },
    methods: {
        timestamp(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        },
    },
    computed: {
        ...mapGetters({ repo: 'getRepo', commits: 'getCommits' }),
    },
};
</script>

<style scoped></style>
