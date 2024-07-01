// 所有枚举值

// 飞行阶段
const flightPhaseEnum = {
  0: "--",
  1: "PWR-ON",
  2: "ENG-START",
  3: "TAXI-OUT",
  4: "TO-ROLL",
  5: "INT-CLIMB",
  6: "CLIMB",
  7: "CRUISE",
  8: "DESCENT",
  9: "APPROACH",
  10: "GO-AROUND",
  11: "FLARE",
  12: "ROLLOUT",
  13: "TAXI-IN",
  14: "ENG-STOP",
  15: "MAINT",
};

// 失效状态
const failureStateEnum = {
  0: "INACTV",
  1: "ACTV",
  3: "LATCH",
};

// FDE状态
const fdeStatusEnum = {
  0: "INACTV",
  1: "ACTV",
  2: "INHB",
};

// FDE类型
const fdeClassEnum = {
  0: "--",
  1: "CAUT",
  2: "ADVR",
  3: "STAT",
  4: "WARN",
};

// ATA对应的名称
const ataNameEnum = {
  "21": "Air Conditioning",
  "22": "Auto Flight",
  "23": "Communications",
  "24": "Electrical Power",
  "25": "Equipment/Furnishings",
  "26": "Fire Protection",
  "27": "Flight Controls",
  "28": "Fuel",
  "73": "Engine Fuel and Control",
  "32": "Landing Gear",
  "45": "Central Maintenance System",
  "42": "Integranted Module Avionics",
  "34": "Navigation",
  "49": "Airborne Auxiliary Power",
  "29": "Hydraulic Power",
  "71": "Power Plant",
  "30": "Ice and Rain Protection",
  "31": "Indications/Recording",
  "38": "WWS",
  "47": "Inert Gas System",
  "52": "Doors",
};

// 测试对应的种类
const testTypeEnum = {
  0: "All Tests",
  1: "Operational Test",
  2: "LRU Replacement Verification Test",
  3: "System Test",
  4: "Interactive Fault Location Test",
  5: "Alignment and Rigging Test",
  6: "Interface Monitoring",
  7: "Hardware and Software Configuration Identification",
};

// 测试对应的状态
const testStatusEnum = {
  0: "NOT_STARTED",
  1: "WAITED",
  2: "PASS",
  3: "INPUT_REQUIRED",
  4: "IN_PROGRESS",
  5: "FAIL",
  6: "INHIBITED",
  7: "ERROR",
  8: "ABORTED",
  9: "COMPLETE",
};

const HYDRAULIC_Enum = [
  "3264",
  "3212",
  "1692",

  "3260",
  "3208",
  "1568",

  "3256",
  "3184",
  "1566",

  "3240",
  "3172",
  "1564",

  "3236",
  "3160",
  "456",

  "3232",
  "1696",
  "454",

  "3216",
  "1694",
  "452",
];

const LANDING_GEAR_Enum = [
  "5412",
  "5410",

  "5408",
  "2619",
  "2054",

  "5406",
  "2605",
  "2037",

  "5404",
  "2301",
  "2029",

  "4370",
  "2291",
  "2004",

  "4361",
  "2243",
  "2002",
];

const LANDING_GEAR_BRAKES_Enum = [
  "1827",
  "1313",

  "1337",
  "1339",
  "1336",
  "1333",

  "1332",
  "1329",
  "1331",
  "1328",

  "5395",
  "5392",

  "5384",
  "2647",
  "2638",

  "5381",
  "2645",
  "2640",

  "2648",
  "2641",
  "1981",

  "2649",
  "2642",
  "2637",
];

export {
  flightPhaseEnum,
  failureStateEnum,
  fdeStatusEnum,
  fdeClassEnum,
  ataNameEnum,
  testTypeEnum,
  testStatusEnum,
  HYDRAULIC_Enum,
  LANDING_GEAR_Enum,
  LANDING_GEAR_BRAKES_Enum,
};
