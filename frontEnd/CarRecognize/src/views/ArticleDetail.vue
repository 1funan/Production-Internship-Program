<template>
    <div class="article-detail">
        <div v-html="decodedContent"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import markdownit from 'markdown-it'

const route = useRoute();
const decodedContent = ref('');

onMounted(() => {
    if (route.query.content) {
        const md = markdownit()
        const result = decodeURIComponent(route.query.content)
        decodedContent.value = md.render(result);
    }
});
</script>

<style scoped>
.article-detail {
    padding: 20px;
}
</style>
