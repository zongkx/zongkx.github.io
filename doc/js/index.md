```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title></title>
    <script src="https://unpkg.com/vue@next"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
<div id="app">
    <button @click="sendCorsRequest">发起跨域请求</button>
</div>
<script>
    const App = {
        data() {
            return {}
        },
        methods: {
            sendCorsRequest() {
                axios.post('http://localhost:8080/token', {
                    username: '',
                    pwd: ''
                }).then(function (response) {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
    };
    Vue.createApp(App).mount('#app');
</script>
</body>
</html>

```