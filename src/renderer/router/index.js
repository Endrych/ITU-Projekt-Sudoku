import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'menu-page',
            component: require('@/components/MenuPage/MenuPage').default
        },
        {
            path: '/new-game/:difficult/:time',
            name: 'game',
            component: require('@/components/NewGame/NewGame').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
