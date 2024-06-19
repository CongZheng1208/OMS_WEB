import { http } from "@/utils/http";
import { MyResponse } from "@/utils/store/response";
import { log } from "console";
import { Ref, ref } from "vue";

class Equipment {
  id: number;
  ATA_id: string;
  name: string;
  condition_text: string;
  ProtocolType: number;
  part_list: any; // Adjust this type according to the actual data type if known

  constructor(
    id: number,
    ATA_id: string,
    name: string,
    condition_text: string,
    ProtocolType: number,
    part_list: any
  ) {
    this.id = id;
    this.ATA_id = ATA_id;
    this.name = name;
    this.condition_text = condition_text;
    this.ProtocolType = ProtocolType;
    this.part_list = part_list;
  }
}

class ATA {
  id: string;
  name: string;
  equipments: Equipment[];

  constructor(id: string, name: string, equipments: Equipment[]) {
    this.id = id;
    this.name = name;
    this.equipments = equipments;
  }
}

class PageData {
  ATAlist: ATA[] = [];

  async getATAlist() {
    const res = (await http({
      url: "/ata_selection",
      method: "GET",
    })) as MyResponse<ATA[]>;
    console.log("[ res ] >", res);
    this.ATAlist = res.result;
  }
}

const pageData = ref(new PageData());

export { PageData, pageData };
