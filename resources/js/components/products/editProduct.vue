<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const form = reactive({
    name: "",
    description: "",
    image: null,
    type: "",
    quantity: "",
    price: "",
    image_preview: null

})
const route = useRoute();
const getProduct = async () => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${route.params.product_id}`)
        const result = res.data.product;
        form.name = result.name
        form.description = result.description
        form.image = result.image
        form.type = result.type
        form.quantity = result.quantity || 0
        form.price = result.price || 0
        //form.image_preview = result.image_preview

    } catch (error) {
        console.log(error)
    }
}
onMounted(async () => {
    getProduct()
})
let errors = ref([])

const getImage = () => {
    let image = "/uploads/1.jpg"
    // console.log(form.image.name)
    if (form.image_preview) {
        if (form.image_preview.indexOf("base64") != -1) {
            image = form.image_preview
        } else {
            image = "/uploads/" + form.image_preview
        }
    }
    console.log(image)

    return image
}
const handleFileChange = (e) => {
    form.image = e.target.files[0];
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (file) => {
        form.image_preview = reader.result
    }
    reader.readAsDataURL(file)
}

const handleSave = async () => {
    try {
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('descriptin', form.description || '')
        formData.append('image', form.image || '')
        formData.append('type', form.type || '')
        formData.append('quantity', form.quantity)
        formData.append('price', form.price)
        console.log(formData.get('image'))
        const res = await axios.post(`http://127.0.0.1:8000/api/products/edit/${route.params.product_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res.status === 200) {
            router.push('/')
            toast.fire({
                icon: "success",
                title: res.data.message
            });
        }
    } catch (error) {
        console.log(error)
        if(error.response.status === 422){
            errors.value = error.response.data.errors
           
        }
    }
    // const response = await fetch(`http://127.0.0.1:8000/api/products/edit/${route.params.product_id}`, {
    //         method: 'POST', // or 'PUT'
    //         headers: {
               
    //             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content, // for CSRF protection in Laravel
    //         },
    //         body: formData
            
    //     })
    //     const res = await response.json()
    //     console.log(res)
    //     if (response.ok) {
    //         router.push('/')
    //         toast.fire({
    //             icon: "success",
    //             title: res.message
    //         });
    //     } else if(response.status === 422){
    //         console.log(response)
    //         errors.value = res.errors
    //      }
       
    // } catch (error) {
    //     // console.log(error)
    //     // if(error.response.status === 422){
    //     //     errors.value = error.response.data.errors
           
    //     // }
    // }
}

</script>
<template>
    <div class="products__create ">

        <div class="products__create__titlebar dflex justify-content-between align-items-center">
            <div class="products__create__titlebar--item">

                <h1 class="my-1">Add Product</h1>
            </div>
            <div class="products__create__titlebar--item">

                <button class="btn btn-secondary ml-1" @click="handleSave">
                    Save
                </button>
            </div>
        </div>

        <div class="products__create__cardWrapper mt-2">
            <div class="products__create__main">
                <div class="products__create__main--addInfo card py-2 px-2 bg-white">
                    <p class="mb-1">Name</p>
                    <input type="text" class="input" v-model="form.name">
                    <small style="color: red;" v-if="errors.name">{{ errors.name[0] }}</small>
                    <p class="my-1">Description (optional)</p>
                    <textarea cols="10" rows="5" class="textarea" v-model="form.description"></textarea>

                    <div class="products__create__main--media--images mt-2">
                        <ul class="products__create__main--media--images--list list-unstyled">
                            <li class="products__create__main--media--images--item">
                                <div class="products__create__main--media--images--item--imgWrapper">
                                    <img class="products__create__main--media--images--item--img" :src="getImage()"
                                        alt="" />
                                </div>
                            </li>
                            <!-- upload image small -->
                            <li class="products__create__main--media--images--item">
                                <form class="products__create__main--media--images--item--form">
                                    <label class="products__create__main--media--images--item--form--label"
                                        for="myfile">Add Image</label>
                                    <input class="products__create__main--media--images--item--form--input" type="file"
                                        id="myfile" @change="handleFileChange">
                                </form>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <div class="products__create__sidebar">
                <!-- Product Organization -->
                <div class="card py-2 px-2 bg-white">

                    <!-- Product unit -->
                    <div class="my-3">
                        <p>Product type</p>
                        <input type="text" class="input" v-model="form.type">
                    </div>
                    <hr>

                    <!-- Product invrntory -->
                    <div class="my-3">
                        <p>Inventory</p>
                        <input type="text" class="input" v-model="form.quantity">
                    </div>
                    <hr>

                    <!-- Product Price -->
                    <div class="my-3">
                        <p>Price</p>
                        <input type="text" class="input" v-model="form.price">
                    </div>
                </div>

            </div>
        </div>
        <!-- Footer Bar -->
        <div class="dflex justify-content-between align-items-center my-3">
            <p></p>
            <button class="btn btn-secondary">Save</button>
        </div>

    </div>
</template>