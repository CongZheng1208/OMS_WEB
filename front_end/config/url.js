//目前选取的开发模式是基于vue调试
const pattern = "vue";

//根据不同开发模式，定义了不同URL头部(其中，linux模式并未完成)
const urlHeads = {
  "vue": "http://localhost:8080/",
  "build": "./", 
  "linux": "http://linux/", 
  "websocket": "ws://localhost:8080/"
};

export {
	pattern,
	urlHeads
}