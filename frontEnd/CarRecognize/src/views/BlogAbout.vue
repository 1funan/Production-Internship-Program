<template>
    <div class="content-about">
        <h1>这里是用于生成实习而设计的项目</h1>
        <hr>
        <h3>写在前面</h3>
        <p>由于时间限制和能力有限,功能可能会有不完善之处,
            比如说博客的分页、引入 wangEditor 作为富文本编辑器都没有被考虑进去</p>
        <h3>项目组成</h3>
        <ul>
            <li>车型识别</li>
            <p>车型识别使用 yolov8 来进行训练, epoch=100,batchsize=16 利用 node 子程序来调用 python 文件，添加了一个对结果的评价系统</p>
            <li>个人博客</li>
            <p>个人博客写的很简陋,就简单的查询删除数据库,增加了登录查询验证和提示,
                并没有加入token来防止地址栏直接进入其它路由。将来有时间再把富文本加上去</p>
            <li>机器人对话</li>
            <p>使用了通义千问的API,利用 axios 来进行 post 请求得到回复，
                将得到的数据存入数据库,前端发起查询请求就可以完成消息的载入</p>
        </ul>
        <h3>项目架构</h3>
        <ul>
            <li>前端</li>
            <p>vue + naive-ui + vite</p>
            <li>后端</li>
            <p>express.js + multer + axios + sqlite3</p>
        </ul>
        <div class="author-p"></div>
        <p class="gradient-text">@author JXUST ZengHong @author JXUST ZhouXiuhao @author JXUST WuQiuwen</p>
    </div>

</template>
<script setup>
</script>
<style scoped>
.content-about {
    padding: 20px;
}

.gradient-text {
    color: rgb(58, 225, 86);
}

.author-p {
    display: flex;
    gap: 10px;
}
</style>