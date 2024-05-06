  import { postTestOrder } from '@/services/centralMaintenance/groundTest/index.js';
  /**
   * 本函数用于打印页面
   */
  export function printPage() {
    window.print();
  }

  /**
   * 本函数用于根据排序对象确定排序逻辑
   * @param {number/string} a - 排序对象1
   * @param {number/string} b - 排序对象2
   * @returns {number/string} 排序逻辑
   */
  export function customSortMethodForProgressColumn(a, b) {
    // 判断a和b的类型
    if (typeof a === 'string' && typeof b === 'string') {
      // 字符串类型，使用localeCompare进行字典序排序
      return a.localeCompare(b);
    } else {
      // 数字类型，根据数值大小排序
      return a - b;
    }
  }

  /**
   * 本函数用于跳转参数展示的三种不同模块
   * @param {string} value 代表三种模块的不同字符值
   */
  export function changeRadio(value) {
    this.displaySelected = value
  }


  /**
   * 本函数用于更新实时时间
   */
  export function updateCurrentTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    this.currentDate = now.toLocaleDateString();
  }


  /**
   * 本函数用于向成员系统发送post请求
   * @param {Object} tmp 代表qs.stringify处理后的Object格式的命令
   */
  export function handleTestOrder(tmp) {

    console.log("send msg is:",tmp)

    postTestOrder(tmp).then(response => {
      // 显示加载条
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      });

      // 等待1秒
      setTimeout(() => {
        // 关闭加载条
        loading.close();

        // 根据返回信息弹出成功或者失败信息
        if(response.status === 'success') {
          this.$message({ message: 'Post request successful', type: 'success'});
        } else {
          this.$message({ message: 'Post request failed', type: 'error'});
        }
      }, 500);
    })
    .catch(error => {
      console.error('Error in fetching parameter list:', error);
    });
  }


