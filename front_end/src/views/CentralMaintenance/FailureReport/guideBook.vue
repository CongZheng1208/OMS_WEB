<template>
   <el-container style="display: flex; flex-direction: column">
    <div class="html_page">
    <div class="html_btn">
      <el-button
        icon="el-icon-close"
        circle
        size="mini"
        @click=" $router.push({name: 'FailureList' });">
      </el-button>
    </div>
    <div>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>工程手册</title>

    </head>
    <body>
        <header>
            <h1>工程手册（总）</h1>
        </header>
        <main>
            <section>
                <h2>介绍</h2>
                <p>在这里写上工程手册的介绍内容。</p>
            </section>
            <section>
                <h2  id="chapter1">章节一</h2>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
                <p>这里是章节一的内容。</p>
            </section>
            <!-- <router-link :to="{ path: '/centralMaintenance/groundTest/selectTestNew', query: { ataNumber: '29', equipmentName: 'HLRM B on IMC', T_ID: '71' }}">跳转至启动测试页面</router-link> -->
            <span @click="sendMessage">跳转至启动测试页面 </span>
            <section>
                <h2>章节二</h2>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
                <p>这里是章节二的内容。</p>
            </section>
            <section>
                <h2>章节三</h2>
                <!-- 插入程序设计领域的图片 -->
                <img src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg" alt="程序设计领域的图片">
                <p>这里是章节三的内容。</p>
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
                <h2 id="chapter5">章节五</h2>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>

                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
                <p>这里是章节五的内容。</p>
            </section>

            <div>
              <a href="#chapter1">跳转至章节一</a>
              <a href="#chapter5">跳转至章节五</a>
              <!-- 添加其他章节超链接 -->
          </div>
        </main>

        <footer>
            <p>&copy; 2022 工程手册</p>
        </footer>
    </body>
    </html>
  </div>
  </div>
  </el-container>



</template>


<script>
import axios from 'axios';
  export default {
    mounted() {
      const chapter = this.$route.params.chapter;
      this.scrollToChapter(chapter)
    },
    methods: {
      scrollToChapter(chapter) {
        const chapterElement = document.getElementById(chapter);
        if (chapterElement) {
          chapterElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
      sendMessage(){
        axios.get('http://localhost:8888/oms/php/centralMaintenance/FailureReportNew/OMDclient.php').then(
        response => {
          console.log(response)

        },
        error => {
          // alert('发送请求失败！', error.message)
        }
      )
      }
    }
  };
</script>


<style>
body {
  color:black;
  background-color: #fff; /* 将背景颜色更改为白色 */
}
</style>
