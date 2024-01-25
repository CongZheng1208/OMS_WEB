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