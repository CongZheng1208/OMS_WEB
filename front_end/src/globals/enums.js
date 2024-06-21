// 所有枚举值

// 飞行阶段
export const flightPhaseEnum = {
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
export const failureStateEnum = {
  0: "INACTV",
  1: "ACTV",
  3: "LATCH",
};

// FDE状态
export const fdeStatusEnum = {
  0: "INACTV",
  1: "ACTV",
  2: "INHB",
};

// FDE类型
export const fdeClassEnum = {
  0: "--",
  1: "CAUT",
  2: "ADVR",
  3: "STAT",
  4: "WARN",
};

// ATA对应的名称
export const ataNameEnum = {
  21: "Air Conditioning",
  22: "Auto Flight",
  23: "Communications",
  24: "Electrical Power",
  25: "Equipment/Furnishings",
  26: "Fire Protection",
  27: "Flight Controls",
  28: "Fuel",
  73: "Engine Fuel and Control",
  32: "Landing Gear",
  45: "Central Maintenance System",
  42: "Integranted Module Avionics",
  34: "Navigation",
  49: "Airborne Auxiliary Power",
  29: "Hydraulic Power",
  71: "Power Plant",
  30: "Ice and Rain Protection",
  31: "Indications/Recording",
  38: "WWS",
  47: "Inert Gas System",
  52: "Doors",
};

// 测试对应的种类
export const testTypeEnum = {
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
export const testStatusEnum = {
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

export const HYDRAULIC_Enum = [
  "3264",
  "3260",
  "3256",
  "3240",
  "3236",
  "3232",
  "3216",
  "3212",
  "3208",
  "3184",
  "3172",
  "3160",
  "1696",
  "1694",
  "1692",
  "1568",
  "1566",
  "1564",
  "456",
  "454",
  "452",
];

export const LANDING_GEAR_Enum = [
  "5412",
  "5410",
  "5408",
  "5406",
  "5404",
  "4370",
  "4361",
  "2619",
  "2605",
  "2301",
  "2291",
  "2243",
  "2054",
  "2037",
  "2029",
  "2004",
  "2002",
];

export const LANDING_GEAR_BRAKES_Enum = [
  "5395",
  "5392",
  "5384",
  "5381",
  "2649",
  "2648",
  "2647",
  "2645",
  "2642",
  "2641",
  "2638",
  "2640",
  "2637",
  "1981",
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
];
