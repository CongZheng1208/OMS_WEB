class Equipment {
  id: number;
  ATA_id: string;
  name: string;
  condition_text: string;
  protocol_type: number;

  constructor(
    id: number,
    ATA_id: string,
    name: string,
    condition_text: string,
    protocol_type: number
  ) {
    this.id = id;
    this.ATA_id = ATA_id;
    this.name = name;
    this.condition_text = condition_text;
    this.protocol_type = protocol_type;
  }
}

class Part {
  id: string;
  description: string;

  constructor(id: string, description: string) {
    this.id = id;
    this.description = description;
  }
}

class EquipmentWithParts {
  equipment: Equipment;
  part_list: Part[];

  constructor(equipment: Equipment, part_list: Part[]) {
    this.equipment = equipment;
    this.part_list = part_list;
  }
}

export { EquipmentWithParts };
