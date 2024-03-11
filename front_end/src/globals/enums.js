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
}

// 失效状态
export const failureStateEnum = {
  0: "INACTV",
  1: "ACTV",
  3: "LATCH",
}

// FDE状态
export const fdeStatusEnum = {
  0: "INACTV",
  1: "ACTV",
  2: "INHB",
}

// FDE类型
export const fdeClassEnum = {
  0: "--",
  1: "CAUT",
  2: "ADVR",
  3: "STAT",
  4: "WARN",
}

// ATA对应的名称
export const ataNameEnum = {
  '21': 'Air Conditioning',
  '22': 'Auto Flight',
  '23': 'Communications',
  '24': 'Electrical Power',
  '25': 'Equipment/Furnishings',
  '26': 'Fire Protection',
  '27': 'Flight Controls',
  '28': 'Fuel',
  '73': 'Engine Fuel and Control',
  '32': 'Landing Gear',
  '45': 'Central Maintenance System',
  '42': 'Integranted Module Avionics',
  '34': 'Navigation',
  '49': 'Airborne Auxiliary Power',
  '29': 'Hydraulic Power',
  '71': 'Power Plant',
  '30': 'Ice and Rain Protection',
  '31': 'Indications/Recording',
  '38': 'WWS',
  '47': 'Inert Gas System',
  '52': 'Doors'
}

// 测试对应的种类
export const testTypeEnum = {
  '0': 'All Tests',
  '1': 'Operational Test',
  '2': 'LRU Replacement Verification Test',
  '3': 'System Test',
  '4': 'Interactive Fault Location Test',
  '5': 'Alignment and Rigging Test',
  '6': 'Interface Monitoring',
  '7': 'Hardware and Software Configuration Identification',
}


// 测试对应的状态
export const testStatusEnum = {
  '0': 'GROUND_TEST_PASS',
  '1': 'GROUND_TEST_INPUT_REQUIRED',
  '2': 'GROUND_TEST_IN_PROGRESS',
  '3': 'GROUND_TEST_NOT_STARTED',
  '4': 'GROUND_TEST_FAIL',
  '5': 'GROUND_TEST_ERROR',
  '6': 'GROUND_TEST_INHIBITED',
  '7': 'GROUND_TEST_ABORTED',
  '8': 'GROUND_TEST_COMPLETE',
  '9': 'N/A',
}
