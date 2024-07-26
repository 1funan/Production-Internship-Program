<template>
    <n-card title="文章撰写">
        <template #header-extra>
            撰写文章
        </template>
        <template #footer>
            <n-space vertical>
                <n-select v-model:value="themeValue" :options="themeOptions" />
                <n-input v-model:value="titleValue" type="text" placeholder="请输入标题" />
                <n-input v-model:value="contentValue" type="textarea" placeholder="快来输入今天的文本内容吧" />
                <n-button @click=sendArticle>提交</n-button>
            </n-space>
        </template>
    </n-card>
</template>
<script setup>
import { inject, reactive, ref } from 'vue';
let titleValue = ref('')
let contentValue = ref('')
const message = inject("message")
const axios = inject("axios")
const themeValue = ref('day')
const themeOptions = reactive([
    {
        label: '日常',
        value: 'day',
    },
    {
        label: '数学',
        value: 'math',
    },
    {
        label: '英语',
        value: 'english',
    }
])
const sendArticle = async () => {
    const result = await axios.post('/api/sendArticle', {
        themeValue: themeValue.value,
        titleValue: titleValue.value,
        contentValue: contentValue.value
    })
    if (result.data.code == 200) {
        message.success(result.data.msg)
    } else {
        message.error(result.data.msg)
    }
    console.log(themeValue.value, titleValue.value, contentValue.value);
}
</script>
<style scoped></style>