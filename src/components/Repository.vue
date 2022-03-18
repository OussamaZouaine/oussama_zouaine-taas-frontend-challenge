<template>
    <!-- this section going to show in case a repo selected -->
    <section v-if="Object.keys(repo).length > 0" class="grow">
        <!-- Repo Info -->
        <div class="mb-4">
            <h1
                class="flex gap-x-3 items-center font-semibold text-xl capitalize"
            >
                <i
                    class="fa-solid fa-lock text-blue-500"
                    v-if="repo.private"
                ></i>
                <i class="fa-solid fa-unlock text-blue-500" v-else></i>
                <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
            </h1>
            <small>
                <span class="font-semibold">Created at:</span>
                {{ timestamp(repo.created_at) }}
            </small>
            <small class="ml-4">
                <span class="font-semibold">Language:</span>
                {{ repo.language }}
            </small>
        </div>
        <!-- End Repo Info -->

        <select
            class="mb-4 px-4 py-2 w-fit rounded shadow-sm bg-white dark:bg-gray-800 border border-blue-100 focus:border-blue-500"
        >
            <option
                v-for="branch in branches"
                :key="branch.name"
                :value="branch.name"
            >
                {{ branch.name }}
            </option>
        </select>

        <!-- <p>{{ branches }}</p> -->

        <!-- Commit Info -->
        <div
            v-for="commit in commits"
            :key="commit.sha"
            class="flex gap-x-3 py-2 px-4 border border-gray-100 rounded mb-2 hover:bg-blue-50 hover:text-black"
        >
            <i class="fa-solid fa-code-commit mt-[0.35rem] text-blue-500"></i>
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
                        committed on
                        {{ timestamp(commit.commit.committer.date) }}
                    </p>
                </div>
            </div>
        </div>
        <!-- End Commit Info -->
    </section>

    <!-- this section going to show in case no repo has been selected -->
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
        ...mapGetters({
            repo: 'getRepo',
            commits: 'getCommits',
            branches: 'getBranches',
        }),
    },
};
</script>

<style scoped></style>
