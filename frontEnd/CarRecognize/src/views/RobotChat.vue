<template>
    <div class="robot-content">
        <div class="left-sidebar">
            <h2>会话列表</h2>
            <n-space>
                <n-button @click="addNewDialog">添加新会话</n-button>
                <n-button @click="goHome">返回首页</n-button>
            </n-space>
            <ul v-for="item, index in dialogList " :key="index">
                <n-space justify="space-between">
                    <li @click="getDialog(item)">会话{{ index }}</li>
                    <n-button text style="font-size: 24px" @click=optionMenu(item.id)>
                        <n-icon>
                            <Trash />
                        </n-icon>
                    </n-button>
                </n-space>
            </ul>
        </div>
        <div class="right-content">
            <div class="chat-window">
                <div class="message" v-for="message in messages" :key="message.id">
                    <div :class="['message-content', message.type]">
                        {{ message.text }}
                    </div>
                </div>
            </div>
            <div class="text-input">
                <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息...">
                <button @click="sendMessage">发送</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import { Trash } from '@vicons/ionicons5'
const axios = inject("axios")
import { useRouter } from 'vue-router';
const router = useRouter()
const dialogList = ref('')
const messages = ref([
    { id: 1, text: '你好，我是机器人！', type: 'bot' },
    { id: 2, text: '你好！', type: 'user' }
]);
const message1 = inject("message")
const newMessage = ref('');

const addNewDialog = async () => {
    const contextList = JSON.stringify(messages.value)
    console.log(contextList)
    messages.value = [
        { id: 1, text: '你好，我是机器人！', type: 'bot' },
        { id: 2, text: '你好！', type: 'user' }]
    let result = await axios.post('api/writeDialog', { txt: contextList })
    if (result.data.code == 200) {
        console.log('插入成功');
        updateDialogList()
    }
}
const updateDialogList = async () => {
    let result = await axios.post('/api/queryDialog')
    if (result.data.code == 200) {
        console.log('查询成功');
        dialogList.value = result.data.data
    }
}
const getDialog = (item) => {
    console.log(JSON.parse(item.content)[0]);
    const dialogResult = JSON.parse(item.content)
    messages.value = []
    dialogResult.map(item => {
        console.log(item);
        messages.value.push({
            id: item.id,
            text: item.text,
            type: item.type
        })
    })

}
const sendMessage = async () => {
    let result = await axios.post('/api/getData', { msg: newMessage.value })
    const robotText = result.data.choices[0].message.content;
    if (newMessage.value.trim() !== '') {
        messages.value.push({
            id: messages.value.length + 1,
            text: newMessage.value,
            type: 'user'
        });
        newMessage.value = '';
        setTimeout(() => {
            messages.value.push({
                id: messages.value.length + 1,
                text: robotText,
                type: 'bot'
            });
        }, 100);
    }
};
const optionMenu = async (id) => {
    console.log(id);
    let result = await axios.post('/api/deleteDialog', { id: id })
    if (result.data.code == 200) {
        message1.success(
            result.data.msg,
            { duration: 2000 }
        )
        updateDialogList()
    } else {
        message1.error(
            result.data.msg,
            { duration: 2000 }
        )
    }
}
const goHome = () => {
    router.push({
        path: '/'
    })
}
onMounted(() => {
    updateDialogList()
})



</script>

<style scoped>
.robot-content {
    display: flex;
    height: 100vh;
    background-color: #f0f2f5;
}

.left-sidebar {
    width: 20%;
    background-color: #ffffff;
    padding: 1rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.left-sidebar h2 {
    margin-bottom: 1rem;
}

.left-sidebar ul {
    list-style: none;
    padding: 0;
}

.left-sidebar ul li {
    padding: 0.5rem 1.5rem;
    cursor: pointer;
}

.left-sidebar ul li:hover {
    background-color: #f0f0f0;
}

.right-content {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.chat-window {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    background-color: #ffffff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.message {
    margin-bottom: 1rem;
}

.message-content {
    padding: 0.5rem 1rem;
    border-radius: 8px;
}

.message-content.bot {
    background-color: #e1f5fe;
    align-self: flex-start;
}

.message-content.user {
    background-color: #c8e6c9;
    align-self: flex-end;
}

.text-input {
    display: flex;
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.text-input input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-right: 0.5rem;
}

.text-input button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.text-input button:hover {
    background-color: #0056b3;
}
</style>
