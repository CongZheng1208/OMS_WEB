import { http } from "@/utils/http";
import { MyResponse } from "@/utils/store/response";

interface PartLoadLogOutput {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  rel_equipment_part_id: number;
  load_status: string;
  load_progress: number;
  start_time: string;
  elapsed_time: number;
  detail: string;
  rel_equipment_part: RelEquipmentPart;
  equipment: Equipment;
  part: Part;
}

interface RelEquipmentPart {
  id: number;
  equipment_id: number;
  part_id: string;
  part_load_logs: any;
}

interface Equipment {
  id: number;
  ATA_id: string;
  name: string;
  condition_text: string;
  protocol_type: number;
  part_list: any;
}

interface Part {
  id: string;
  description: string;
  equipments: any;
}

class PageData {
  part_data_log_output: PartLoadLogOutput[] = [];
  async get_log_list() {
    const res = (await http({
      url: "/all_load_status",
      method: "GET",
    })) as MyResponse<PartLoadLogOutput[]>;

    if (res.code === 200) {
      this.part_data_log_output = res.result;
    }
  }
  async search_equipment(content: string) {
    const res = (await http({
      url: "/search-log-by-equipment",
      method: "GET",
      params: {
        equipment_name: content,
      },
    })) as MyResponse<PartLoadLogOutput[]>;
    if (res.code === 200) {
      this.part_data_log_output = res.result;
    }
  }
  async search_part(content: string) {
    const res = (await http({
      url: "/search-log-by-part",
      method: "GET",
      params: {
        part_name: content,
      },
    })) as MyResponse<PartLoadLogOutput[]>;
    if (res.code === 200) {
      this.part_data_log_output = res.result;
    }
  }
}

function formatDateString(dateString: string): string {
  // 创建 Date 对象
  const date = new Date(dateString);

  // 获取年份、月份、日期、小时、分钟和秒
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，需要加1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // 拼接成目标格式
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export { PageData, formatDateString };
