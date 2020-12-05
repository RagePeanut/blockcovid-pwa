import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Scanner from '../views/Scanner.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/scanner',
        name: 'Scanner',
        component: Scanner
    },
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

export default router;
