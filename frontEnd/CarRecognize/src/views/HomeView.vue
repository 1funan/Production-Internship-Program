<template>

  <body>
    <div class="container-home">
      <h3 class="gradient-text">欢迎使用车型识别和机器人对话系统</h3>
      <n-space justify="space-between">
        <n-button color="#ff7f50" size="medium" ghost @click="goRecongnize">车型识别</n-button>
        <n-button color="#b815ce" size="medium" ghost @click="goBlog">个人博客</n-button>
        <n-button color="#184fad" size="medium" ghost @click="goChat">机器人对话</n-button>
      </n-space>
    </div>
  </body>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const goRecongnize = () => {
  router.push({
    path: '/recongnize'
  })
}
const goBlog = () => {
  router.push({
    path: '/login'
  })
}
const goChat = () => {
  router.push({
    path: '/chat'
  })
}
</script>

<style scoped>
body {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #7f94cf, #9fe29f);
}

.container-home {
  text-align: center;
}

.gradient-text {
  background-image: linear-gradient(to right, #ff7f50, #184fad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2em;
}
</style>
