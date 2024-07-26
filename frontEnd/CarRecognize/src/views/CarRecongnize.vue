<template>
    <div class="content-container">
        <div class="left-set">
            <n-upload multiple directory-dnd action="http://localhost:8081/api/uploadImg" :max="5">
                <n-upload-dragger>
                    <div style="margin-bottom: 12px">
                        <n-icon size="48" :depth="3">
                            <ArchiveIcon />
                        </n-icon>
                    </div>
                    <n-text style="font-size: 16px">
                        点击或者拖动文件到该区域来上传
                    </n-text>
                    <n-p depth="3" style="margin: 8px 0 0 0">
                        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                    </n-p>
                </n-upload-dragger>
            </n-upload>
            <n-space justify="space-between">
                <n-button @click="goAbout">关于</n-button>
                <n-button @click="testImage">测试</n-button>
                <n-button @click="goHome">首页</n-button>
            </n-space>
            <div class="slider-div">
                <span>置信度</span>
                <n-slider v-model:value="sliderValue" :step="10" />
                <br>
                <n-button @click="goRobot">机器人对话</n-button>
            </div>
        </div>
        <div class="right-set">
            <div class="recongnize-result">
                <span>识别结果</span>
                <n-image width="500px" :src="imagrUrl" />
            </div>
            <div class="right-result">
                <span>识别出来的车型: {{ carName }}</span>
                <br>
                <span>请对识别结果打分喵</span>
                <br>
                <n-rate color="#4fb233" v-model:value="starValue" />
                <br>
                <div class="qr-code">
                    <div class="di-qr">
                        <n-qr-code value="https://qm.qq.com/q/hrujLzAqmk"
                            icon-src="https://s21.ax1x.com/2024/07/24/pkHrFEQ.png" error-correction-level="H"
                            icon-border-radius="10" />
                        <span>QQ</span>
                    </div>
                    <div class="di-qr">
                        <n-qr-code value="https://github.com/1funan/"
                            icon-src="https://s21.ax1x.com/2024/07/24/pkHrMbF.png" error-correction-level="H"
                            icon-border-radius="10" />
                        <span>Github</span>
                    </div>
                    <div class="di-qr">
                        <n-qr-code value="https://space.bilibili.com/226325019"
                            icon-src="https://s21.ax1x.com/2024/07/24/pkHraDO.png" error-correction-level="H"
                            icon-border-radius="10" />
                        <span>B站</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { inject, ref, watch } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()
const message = inject("message")
const imagrUrl = ref('')
const carName = ref('')
const starValue = ref(4)
const sliderValue = ref(60)
const axios = inject("axios")
const testImage = async () => {
    imagrUrl.value = 'http://localhost:8081/'
    let result = await axios.post('/api/carName', { conf: sliderValue.value })
    if (result.data.code == 200) {
        imagrUrl.value = imagrUrl.value + result.data.data.path
        console.log(imagrUrl.value);
        console.log(result.data.data.name);
        carName.value = result.data.data.name
    }
}
watch(starValue, (newValue, oldValue) => {
    console.log(newValue);
    message.success(
        '谢谢好评喵'
    )
})
const goAbout = () => {
    router.push({
        path: '/blog/about'
    })
}
const goHome = ()=>{
    router.push({
        path: '/'
    })
}
const goRobot = ()=>{
    router.push({
        path: '/chat'
    })
}
</script>

<style scoped>
.content-container {
    display: flex;
    width: 100%;
    height: 100vh;
}

.left-set {
    width: 300px;
    padding: 16px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
}

.right-set {
    display: flex;
    flex-grow: 1;
    padding: 16px;
    background-color: #ffffff;
}

.slider-div {
    margin-top: 20px;
}

.recongnize-result {
    display: flex;
    flex-direction: column;
    min-width: 550px;
    padding: 10px;
}

.right-result {
    padding: 10px;
    flex: 1
}

.qr-code {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    padding-top: 20px;
}

.di-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
