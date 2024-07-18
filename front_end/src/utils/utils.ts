import { postTestOrder } from "@/services/centralMaintenance/groundTest/index";

export function printPage() {
  window.print();
}

export function customSortMethodForProgressColumn(
  a: number | string,
  b: number | string
): number | string {
  // 判断a和b的类型
  // if (typeof a === "string" && typeof b === "string") {
  //   // 字符串类型，使用localeCompare进行字典序排序
  //   return a.localeCompare(b);
  // } else {
  //   // 数字类型，根据数值大小排序
  //   return a - b;
  // }

  if (typeof a === "string" && typeof b === "string") {
    // 如果字符串可以转化为数字，则转换为数字进行比较
    const numA = !isNaN(Number(a)) ? Number(a) : a;
    const numB = !isNaN(Number(b)) ? Number(b) : b;
    return numA - numB;
  } else {
    // 数字类型，根据数值大小排序
    return a - b;
  }
}

export function changeRadio(value: string) {
  this.displaySelected = value;
}

// 本函数用于更新实时时间
export function updateCurrentTime() {
  const now = new Date();
  this.currentTime = now.toLocaleTimeString();
  this.currentDate = now.toLocaleDateString();
}

//本函数用于向成员系统发送post请求
export function handleTestOrder(tmp: Object) {
  console.log("send msg is:", tmp);

  postTestOrder(tmp)
    .then((response) => {
      // 显示加载条
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)",
      });

      // 等待1秒
      setTimeout(() => {
        // 关闭加载条
        loading.close();

        // 根据返回信息弹出成功或者失败信息
        if (response.status === "success") {
          this.$message({
            message: "Post request successful",
            type: "success",
          });
        } else {
          this.$message({ message: "Post request failed", type: "error" });
        }
      }, 500);
    })
    .catch((error) => {
      console.error("Error in fetching parameter list:", error);
    });
}
