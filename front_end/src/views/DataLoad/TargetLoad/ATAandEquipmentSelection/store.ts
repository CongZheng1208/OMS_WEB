import { http } from "@/utils/http";
import { MyResponse } from "@/utils/store/response";
import { Ref, ref } from "vue";
import { ataNameEnum } from "@/globals/enums";

class Equipment {
  id: number;
  ATA_id: string;
  name: string;
  condition_text: string;
  protocol_type: number;

  constructor(data: Equipment) {
    this.id = data.id;
    this.ATA_id = data.ATA_id;
    this.name = data.name;
    this.condition_text = data.condition_text;
    this.protocol_type = data.protocol_type;
  }
}

class Part {
  id: string;
  description: string;

  constructor(id: string, description: string, equipments: any[]) {
    this.id = id;
    this.description = description;
  }
}

class PageData {
  equipmentlist: Equipment[] = [];
  partlist: Part[] = [];

  async getPartByEquipment(equipment_id: number) {
    const res = (await http({
      url: "/part_selection",
      method: "GET",
      params: {
        equipment_id: equipment_id,
      },
    })) as MyResponse<Part[]>;
    this.partlist = res.result;
  }
}

const pageData = ref(new PageData());

export { PageData, pageData, type Equipment, type Part };
