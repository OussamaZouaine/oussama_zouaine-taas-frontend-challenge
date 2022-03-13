<template>
    <div class="min-h-screen grid place-content-center">
        <button
            @click="githubAuth"
            class="bg-sky-600 py-4 px-8 rounded text-white text-lg md:text-xl focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
        >
            <i class="fa-brands fa-github mr-2"></i> Authorize my Github account
        </button>
    </div>
</template>

<script>
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const provider = new GithubAuthProvider();

export default {
    name: 'HomeView',
    components: {},
    methods: {
        githubAuth() {
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    const credential =
                        GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    this.$store.commit('setToken', token);
                    this.$store.commit('setUser', user);
                    this.$router.push('/user');
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GithubAuthProvider.credentialFromError(error);
                    // ...
                });
        },
    },
};
</script>
