<template>
    <header
        class="h-[10vh] flex justify-between items-center gap-x-4 p-4 z-50 dark:bg-gray-800 dark:text-white"
    >
        <div
            @click="toggleTheme"
            class="py-2 px-4 rounded-full hover:bg-blue-50 hover:text-blue-500"
        >
            <i class="fa-solid fa-sun" v-if="darkTheme"></i>
            <i class="fa-solid fa-moon" v-else></i>
        </div>
        <div id="user-info" class="flex gap-x-4 items-end" v-show="isLoggedIn">
            <h1 class="font-medium text-lg uppercase">
                {{ user.displayName }}
            </h1>
            <div class="relative">
                <img
                    v-click-away="onClickAway"
                    @click="toggleDropdown"
                    :src="user.photoURL"
                    alt="user photo"
                    class="rounded-full w-8 h-8 cursor-pointer ring-1 ring-sky-600 ring-offset-1 ring-offset-transparent"
                />
                <div
                    v-if="dropdown"
                    @click="sign_out"
                    class="absolute right-0 w-32 mt-2 p-3 border shadow-md rounded space-x-3 z-50 cursor-pointer uppercase bg-white hover:bg-blue-50 dark:text-black"
                >
                    <span>Sign out</span>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAuth, signOut } from 'firebase/auth';

export default {
    name: 'Header',
    data() {
        return {
            dropdown: false,
            isLoggedIn: true,
        };
    },
    computed: {
        ...mapGetters({ user: 'getUser', darkTheme: 'getDarkTheme' }),
    },
    methods: {
        toggleDropdown() {
            this.dropdown = !this.dropdown;
        },
        onClickAway() {
            this.dropdown = false;
        },
        toggleTheme() {
            this.$store.commit('setDarkTheme');
        },
        sign_out() {
            signOut(getAuth())
                .then(() => {
                    // Sign-out successful.
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('repos');
                    localStorage.removeItem('repo');
                    localStorage.removeItem('commits');
                    localStorage.removeItem('branches');
                    this.$router.push('/');
                })
                .catch((error) => {
                    // An error happened.
                    console.log(error);
                });
        },
    },
    created() {
        if (getAuth().currentUser) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    },
};
</script>
