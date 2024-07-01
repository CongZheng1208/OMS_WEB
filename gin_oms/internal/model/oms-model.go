package model

type Equipment struct {
	ID            int    `gorm:"primarykey" json:"id"`
	ATAID         string `gorm:"type:varchar(20);not null" json:"ATA_id"` // 26-01
	Name          string `gorm:"type:varchar(30);not null" json:"name"`   // 设备名称
	ConditionText string `gorm:"type:varchar(912);not null" json:"condition_text"`
	ProtocolType  int    `json:"protocol_type"` // 接口类型
}

func (Equipment) TableName() string {
	return "tbl_equipment"
}

type Part struct {
	ID          string `gorm:"primarykey" json:"id"` // string?
	Description string `gorm:"type:varchar(200)" json:"description"`
}

func (Part) TableName() string {
	return "tbl_part"
}

// 定义 RelEquipmentPart 结构体，表示多对多关系
type RelEquipmentPart struct {
	ID          int    `gorm:"primarykey" json:"id"`
	EquipmentID int    `json:"equipment_id"`
	PartID      string `json:"part_id"`
}

// 设置 MemberSystem 和 Part 之间的关联
func (RelEquipmentPart) TableName() string {
	return "rel_equipment_part"
}

type PartLoadLog struct {
	ID           int    `gorm:"primarykey" json:"id"`
	EquipmentID  int    `json:"equipment_id"`
	PartID       string `json:"part_id"`
	LoadStatus   string `gorm:"type:varchar(20);not null" json:"load_status"`
	LoadProgress int    `gorm:"type:varchar(20);not null" json:"load_progress"`
	StartTime    string `json:"start_time"`
	ElapsedTime  string `json:"elapsed_time"`
	Detail       string `gorm:"type:varchar(200);not null" json:"detail"`
}

func (PartLoadLog) TableName() string {
	return "tbl_partloadlog"
}


