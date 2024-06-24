interface ATA {
  id: string;
  name: string;
  equipments: any;
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

interface RowClass {
  ATA: ATA;
  Equipment: Equipment;
  Part: Part;
}

class PageData {
  rows: RowClass[] = [];
}

export { PageData };
export type { RowClass };
