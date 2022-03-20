<template>
    <div :class="darkTheme ? 'dark bg-gray-800' : ''">
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    computed: {
        ...mapGetters({ darkTheme: 'getDarkTheme' }),
    },
};
</script>
