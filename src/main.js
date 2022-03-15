import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueClickAway from 'vue3-click-away';
import './assets/index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyDhGoUa-MBM3JqPDqhEuycHmsbHWc6JXTU',
    authDomain: 'vue-auth-a5a80.firebaseapp.com',
    projectId: 'vue-auth-a5a80',
    storageBucket: 'vue-auth-a5a80.appspot.com',
    messagingSenderId: '818258389190',
    appId: '1:818258389190:web:cd19418020c9a91468cfc7',
};

// Initialize Firebase
initializeApp(firebaseConfig);

let app;

onAuthStateChanged(getAuth(), (user) => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(VueClickAway)
            .mount('#app');
    }
});
