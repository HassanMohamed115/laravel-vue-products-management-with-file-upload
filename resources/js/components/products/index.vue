<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

let products = ref([])
const getProducts = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/products');
        const data = res.data.products
        products.value = data
    } catch (error) {
        console.log(error)
    }
}
onMounted(async () => {
    getProducts()
    console.log(products)
})
const router = useRouter()
const newProduct = () => {
    router.push('/products/create')
}

const handleEdit = (product_id) => {
    router.push(`/products/${product_id}/edit`)
}

const handleDelete = (product_id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/products/${product_id}`)
            .then(() => {Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            })
            getProducts()
        })

            
        }
    });
}

</script>


<template>
    <div class="products__list table  my-3">

        <div class="customers__titlebar dflex justify-content-between align-items-center">
            <div class="customers__titlebar--item">
                <h1 class="my-1">Products</h1>
            </div>
            <div class="customers__titlebar--item">
                <button class="btn btn-secondary my-1" @click="newProduct">
                    Add Product
                </button>
            </div>
        </div>

        <div class="table--heading mt-2 products__list__heading " style="padding-top: 20px;background:#FFF">
            <!-- <p class="table--heading--col1">&#32;</p> -->
            <p class="table--heading--col1">image</p>
            <p class="table--heading--col2">
                Product
            </p>
            <p class="table--heading--col4">Type</p>
            <p class="table--heading--col3">
                Inventory
            </p>
            <!-- <p class="table--heading--col5">&#32;</p> -->
            <p class="table--heading--col5">actions</p>
        </div>

        <!-- product 1 -->
        <div class="table--items products__list__item" v-for="product in products" :key="product.id">
            <div class="products__list__item--imgWrapper">
                <img class="products__list__item--img" :src="product.image" style="height: 40px;">
            </div>
            <a href="# " class="table--items--col2">
                {{ product.name }}
            </a>
            <p class="table--items--col2">
                {{ product.type }}
            </p>
            <p class="table--items--col3">
                {{ product.quantity }}
            </p>
            <div>
                <button class="btn-icon btn-icon-success" @click="handleEdit(product.id)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn-icon btn-icon-danger" @click="handleDelete(product.id)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>

    </div>
</template>