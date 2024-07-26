<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">登录</h2>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" id="username" v-model="username" required>
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <button type="submit" class="login-button">登录</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
const message = inject("message")
const axios = inject("axios")
const router = useRouter()
const username = ref('');
const password = ref('');

const handleSubmit = async () => {
    console.log(username.value);
    let result = await axios.post('/admin/login', {
        account: username.value,
        password: password.value
    })
    console.log(result.data.code == 200);
    if (result.data.code == 200) {
        message.success(
            '登录成功',
            { duration: 2000 }
        )
        router.push({
            path: '/blog'
        })
    } else {
        message.error(
            '账号或密码不正确',
            { duration: 2000 }
        )
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
}

.login-card {
    background: #fff;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #0056b3;
}
</style>
