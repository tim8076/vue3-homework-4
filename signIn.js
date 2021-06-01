
const app = Vue.createApp({
    data(){
        return{
            api: 'https://vue3-course-api.hexschool.io/',
            username: '',
            password: '',
        }
    },
    methods: {
        signIn(e){
            e.preventDefault();
            let signinData = {
                username: this.username,
                password: this.password
            }
            axios.post(`${this.api}admin/signin`,signinData)
                .then(res =>{
                    if (res.data.success){
                        const { token, expired } = res.data;
                        document.cookie = `timToken=${token}; expires=${expired}`;
                        location.assign('./dashboard.html');
                    }else{
                        alert('帳號或密碼錯誤');
                    }
                    this.username = '';
                    this.password = '';
                })
                .catch(err=>{
                    console.dir(err);
                })
        }
    },
})
app.mount('#app');