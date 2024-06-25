import { http } from "@/utils/http";
import { MyResponse } from "@/utils/store/response";
class Part {
  id: string;
  description: string;
  equipments: any;

  constructor(id: string, description: string, equipments: any) {
    this.id = id;
    this.description = description;
    this.equipments = equipments;
  }
}

class Equipment {
  id: number;
  ATA_id: string;
  name: string;
  condition_text: string;
  protocol_type: number;
  part_list: any;

  constructor(
    id: number,
    ATA_id: string,
    name: string,
    condition_text: string,
    protocol_type: number,
    part_list: any
  ) {
    this.id = id;
    this.ATA_id = ATA_id;
    this.name = name;
    this.condition_text = condition_text;
    this.protocol_type = protocol_type;
    this.part_list = part_list;
  }
}

class PageData {
  part_list: Part[] = [];
  equipment_list: Equipment[] = [];

  async get_all_part() {
    const res = (await http({
      url: "/all_part",
      method: "GET",
    })) as MyResponse<Part[]>;

    if (res.code === 200) {
      this.part_list = res.result;
    }
  }

  async get_equipments_by_part_id(part_id: string) {
    const res = (await http({
      url: "/equipments_by_part_id",
      method: "GET",
      params: {
        part_id: part_id,
      },
    })) as MyResponse<Equipment[]>;
    if (res.code === 200) {
      this.equipment_list = res.result;
    }
  }

  async selectPartAndEquipment(part_id: string, equipment_list_id: number[]) {
    const res = (await http({
      url: "/select_part_and_equipment",
      method: "GET",
      params: {
        part_id: part_id,
        equipment_list_id,
      },
    })) as MyResponse<any>;
    // console.log(res);
    return res;
  }
}

export { PageData };
