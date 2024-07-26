<template>
    <n-space vertical>
        <n-layout has-sider>
            <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
                show-trigger @collapse="collapsed = true" @expand="collapsed = false">
                <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
                    :options="menuOptions" />
            </n-layout-sider>
            <n-layout>
                <router-view></router-view>
            </n-layout>
        </n-layout>
    </n-space>
</template>

<script setup>
import { h, reactive, ref, watch } from "vue";
import { NIcon } from "naive-ui";
import {
    BookOutline as BookIcon,
} from "@vicons/ionicons5";
import { useRouter } from 'vue-router';
const router = useRouter()
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}
const activeKey = ref('')
const collapsed = ref(true)

const menuOptions = reactive([
    {
        label: "文章",
        key: "article",
        icon: renderIcon(BookIcon)
    },
    {
        label: "归档",
        key: "category",
        icon: renderIcon(BookIcon),
    },
    {
        label: "关于",
        key: "about",
        icon: renderIcon(BookIcon)
    },
    {
        label: "首页",
        key: "home",
        icon: renderIcon(BookIcon)
    },
]);
watch(activeKey, (newValue, oldValue) => {
    console.log(newValue);
    if (newValue == 'home') {
        router.push({
            path: '/'
        })
    }
    else {
        router.push({
            path: '/blog' + '/' + newValue
        })
        
    }

})

</script>