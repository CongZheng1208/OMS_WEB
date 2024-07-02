import { http } from "@/utils/http";
import { MyResponse } from "@/utils/store/response";
import { Ref, ref } from "vue";
import { ataNameEnum } from "@/globals/enums";
import { Equipment, Part } from "../store";

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
