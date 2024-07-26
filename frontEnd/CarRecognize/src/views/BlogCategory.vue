<template>
    <div class="category-content">
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>id</th>
                    <th>theme</th>
                    <th>title</th>
                    <th>content</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item, index in categoryList" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.theme }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.content.slice(0, 5) + '...' }}</td>
                    <td>
                        <n-space>
                            <n-button @click="lookArticle(item.content)">查看</n-button>
                            <n-button @click="deleteArticle(item.id)">删除</n-button>
                        </n-space>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const axios = inject('axios')
const message = inject('message')
const dialog = inject('dialog')
const categoryList = reactive([])
const updateCategory = async () => {
    const result = await axios.post('/api/getCategory')
    if (result.data.code == 200) {
        categoryList.length = 0
        console.log(result.data.data);
        result.data.data.map(item => {
            categoryList.push(item)
        })
    } else {
        console.log(result.data.msg);
    }
}
const lookArticle = (content) => {
    console.log("康康你的");
    router.push({
        path: '/blog/detail',
        query: { content: encodeURIComponent(content) }
    })
}
const deleteArticle = async (idCategory) => {
    dialog.warning({
        title: '警告',
        content: '确认删除吗',
        positiveText: '是',
        negativeText: '否',
        onPositiveClick: async () => {
            const result = await axios.post('/api/deleteCategory', { id: idCategory })
            if (result.data.code == 200) {
                message.success('删除成功')
                console.log(result.data.msg);
                updateCategory()
            } else {
                console.log(result.data.msg);
            }
        },
    })

}
onMounted(() => {
    updateCategory()
})
</script>
<style scoped>
.category-content {
    width: 80%;
    padding: 20px;
}
</style>