const ATAlist = [
  { key: "21", value: "Air Conditioning" },
  { key: "22", value: "Auto Flight" },
  { key: "23", value: "Communications" },
  { key: "24", value: "Electrical Power" },
  { key: "25", value: "Equipment/Furnishings" },
  { key: "26", value: "Fire Protection" },
  { key: "27", value: "Flight Controls" },
  { key: "28", value: "Fuel" },
  { key: "73", value: "Engine Fuel and Control" },
  { key: "32", value: "Landing Gear" },
  { key: "45", value: "Central Maintenance System" },
  { key: "42", value: "Integranted Module Avionics" },
  { key: "34", value: "Navigation" },
  { key: "49", value: "Airborne Auxiliary Power" },
  { key: "29", value: "Hydraulic Power" },
  { key: "71", value: "Power Plant" },
  { key: "30", value: "Ice and Rain Protection" },
  { key: "31", value: "Indications/Recording" },
  { key: "38", value: "WWS" },
  { key: "47", value: "Inert Gas System" },
  { key: "52", value: "Doors" },
];

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

  constructor(id: string, description: string) {
    this.id = id;
    this.description = description;
  }
}

export { ATAlist, Equipment, Part };
