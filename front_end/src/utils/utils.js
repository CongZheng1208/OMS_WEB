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
