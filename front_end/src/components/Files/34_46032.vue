<template>
  <div>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>工程手册</title>

    </head>
    <body>
        <header>
            <h1>34-46032</h1>
        </header>
        <main>
            <section>
                <h2>介绍</h2>
                <p>在这里写上工程手册的介绍内容。</p>
            </section>
            <section>
                <h2>章节一</h2>
                <p>这里是章节一的内容。</p>
            </section>
            <router-link :to="{ path: '/centralMaintenance/groundTest/selectTestNew', query: { ataNumber: '29', equipmentName: 'HLRM B on IMC', T_ID: '71' }}">跳转至启动测试页面</router-link>
            <section>
                <h2>章节二</h2>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
            </section>
            <section>
                <h2>章节三</h2>
                <!-- 插入程序设计领域的图片 -->
                <img src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg" alt="程序设计领域的图片">
                <p>这里是章节三的内容。</p>
            </section>
            <section>
                <h2>章节四</h2>
                <p>这里是章节四的内容。</p>
                <p>这里是章节四的内容。</p>
                <p>这里是章节四的内容。</p>
                <p>这里是章节四的内容。</p>
                <p>这里是章节四的内容。</p>
            </section>
            <section>
                <h2>章节五</h2>
                <p>这里是章节五的内容。</p>
            </section>
        </main>
        <footer>
            <p>&copy; 2022 工程手册</p>
        </footer>
    </body>
    </html>


  </div>
</template>

<script>
export default {

};
</script>


<style>
body {
  color:black;
    background-color: #fff; /* 将背景颜色更改为白色 */
}
</style>
