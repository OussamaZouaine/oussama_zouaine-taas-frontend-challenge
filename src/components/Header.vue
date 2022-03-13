<template>
    <header class="flex justify-end items-end gap-x-4 p-4 z-50">
        <h1 class="font-medium text-lg uppercase">{{ user.displayName }}</h1>
        <div class="relative">
            <img
                @click="toggleDropdown"
                :src="user.photoURL"
                alt="user photo"
                class="rounded-full w-8 h-8 cursor-pointer ring-2 ring-sky-600 ring-offset-2"
            />
            <div
                v-if="dropdown"
                @click="sign_out"
                class="absolute right-0 w-32 mt-2 p-3 border shadow-md rounded space-x-3 z-50 cursor-pointer uppercase bg-white hover:bg-blue-50"
            >
                <span>Sign out</span>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
        };
    },
    computed: {
        ...mapGetters({ user: 'getUser' }),
    },
    methods: {
        toggleDropdown() {
            this.dropdown = !this.dropdown;
        },
        sign_out() {
            signOut(getAuth())
                .then(() => {
                    // Sign-out successful.
                    localStorage.clear();
                    this.$router.push('/');
                })
                .catch((error) => {
                    // An error happened.
                    console.log(error);
                });
        },
    },
};
</script>
