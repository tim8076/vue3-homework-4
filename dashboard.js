
import pagination from './component/pagination.js'

let myModal = {};
const app = Vue.createApp({
    data() {
        return {
            api: 'https://vue3-course-api.hexschool.io/',
            path: 'tim8076',
            products: [],
            tempProduct: {},
            isNew: false,
            loading: false,
            pagination: {},
        }
    },
    components:{
        pagination
    },
    methods:{
        openModal(isNew, item) {
            if (isNew) {
                this.tempProduct = {};
                this.isNew = true;
            } else {
                this.tempProduct = { ...item };
                this.isNew = false;
            } 
            myModal.show();
        },
        getProductList(page = 1){
            this.loading = true;
            axios.get(`${this.api}api/${this.path}/admin/products?page=${page}`)
                .then(res => {
                    console.log(res);
                    if(res.data.success){
                        const { products, pagination } = res.data;
                        this.products = products;
                        this.pagination = pagination;
                        this.loading = false;
                    }else{
                        alert(res.data.message);
                        this.loading = false;
                    }
                })         
        },
        updateProduct(tempProduct){
            this.loading = true;
            let api = `${this.api}api/${this.path}/admin/product`;
            let httpMethod = 'post';
            if(!this.isNew){
                api = `${this.api}api/${this.path}/admin/product/${this.tempProduct.id}`;
                httpMethod = 'put';
            }
            axios[httpMethod](api, { data: tempProduct })
                .then(res => {
                    if (res.data.success) {
                        myModal.hide();
                        this.getProductList();
                        this.loading = false;
                    }else{
                        alert(res.data.message);
                        this.loading = false;
                    }
                })
        },
        deleteProduct(product){
            if(confirm(`確認刪除 ${product.title} ?`)){
                this.loading = true;
                axios.delete(`${this.api}api/${this.path}/admin/product/${product.id}`)
                    .then(res => {
                        if (res.data.success) {
                            this.getProductList();
                        }else {
                            alert(res.data.message);
                        }
                    })
            }
            this.loading = false;
        },
        uploadImage(formData){
            this.loading = true;
            axios.post(`${this.api}api/${this.path}/admin/upload`,formData)
                .then(res =>{
                    if(res.data.success){
                        this.tempProduct.imageUrl = res.data.imageUrl;
                        this.loading = false;
                    }else{
                        alert(res.data.message);
                        this.loading = false;
                    }
                })
        }
    },
    mounted(){
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('timToken='))
            .split('=')[1];
        axios.defaults.headers.common['Authorization'] = token;
        this.getProductList();
        myModal = new bootstrap.Modal(document.getElementById('modal'));
    }
})


app.component('product-modal',{
    template: '#modalComponent',
    props: {
        tempProduct: {
            type: Object,
            required: true
        },
        isNew: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update-product','upload-img'],
    computed:{
        modalTitle(){
            return this.isNew ? '新增產品' : '編輯產品'
        }
    },
    methods:{
        updateProduct(){
            this.$emit('update-product', this.tempProduct);
        },
        uploadImage(e){
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file-to-upload', file);
            this.$emit('upload-img', formData);
        }
    }
})
app.mount('#dashboard');