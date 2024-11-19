import { createRouter, createWebHistory } from "vue-router";
import ProductIndex from '../components/products/index.vue'
import ProductCreate from '../components/products/addProduct.vue'
import ProductUpdate from '../components/products/editProduct.vue'
import NotFound from '../components/NotFound.vue'


const routes = [
    {
        path: '/',
        name: 'products.index',
        component: ProductIndex
    },
    {
        path: '/products/create',
        name: 'products.create',
        component: ProductCreate
    },
    {
        path: '/products/:product_id/edit',
        name: 'products.edit',
        component: ProductUpdate
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;