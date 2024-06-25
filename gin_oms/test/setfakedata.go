package main

import (
	"fmt"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

type ATA struct {
	ID         string       `gorm:"primarykey;type:varchar(20);not null" json:"id"` // 26-01
	Name       string       `gorm:"type:varchar(20);" json:"name"`
	Equipments []*Equipment `gorm:"foreignkey:ATAID" json:"equipments"`
}

func (ATA) TableName() string {
	return "tbl_ata"
}

type Equipment struct {
	ID            uint    `gorm:"primarykey" json:"id"`
	ATAID         string  `gorm:"type:varchar(20);not null" json:"ATA_id"` // 26-01
	Name          string  `gorm:"type:varchar(30);not null" json:"name"`   // 设备名称
	ConditionText string  `gorm:"type:varchar(912);not null" json:"condition_text"`
	ProtocolType  uint    // 接口类型
	Parts         []*Part `gorm:"many2many:rel_equipment_part" json:"part_list"`
}

func (Equipment) TableName() string {
	return "tbl_equipment"
}

type Part struct {
	ID          string       `gorm:"primarykey" json:"id"` // string?
	Description string       `gorm:"type:varchar(200)" json:"description"`
	Equipments  []*Equipment `gorm:"many2many:rel_equipment_part" json:"equipments"`
}

func (Part) TableName() string {
	return "tbl_part"
}

// 定义 RelEquipmentPart 结构体，表示多对多关系
type RelEquipmentPart struct {
	ID           uint          `gorm:"primarykey" json:"id"`
	EquipmentID  uint          `json:"equipment_id"`
	PartID       string        `json:"part_id"`
	PartLoadLogs []PartLoadLog `gorm:"foreignkey:RelEquipmentPartID;association_foreignkey:ID" json:"part_load_logs"`
}

// 设置 MemberSystem 和 Part 之间的关联
func (RelEquipmentPart) TableName() string {
	return "rel_equipment_part"
}

type BaseModel struct {
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type PartLoadLog struct {
	BaseModel
	RelEquipmentPartID uint      `gorm:"not null" json:"rel_equipment_part_id"`
	LoadStatus         string    `gorm:"type:varchar(20);not null" json:"load_status"`
	LoadProgress       uint8     `gorm:"type:varchar(20);not null" json:"load_progress"`
	StartTime          time.Time `json:"start_time"`
	ElapsedTime        uint      `json:"elapsed_time"`
	Detail             string    `gorm:"type:varchar(200);not null" json:"detail"`
}

func (PartLoadLog) TableName() string {
	return "tbl_partloadlog"
}

func main() {
	// 初始化数据库
	db, err := gorm.Open(mysql.Open("root:Comac.000@tcp(127.0.0.1:3306)/oms_dataload?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{
		// gorm日志模式：silent
		Logger: logger.Default.LogMode(logger.Silent),
		// 外键约束
		DisableForeignKeyConstraintWhenMigrating: true,
		// 禁用默认事务（提高运行速度）
		SkipDefaultTransaction: true,
		// 表名加前缀和禁用复数表名
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "",   // 表名前缀，`User`表为`t_users`
			SingularTable: true, // 使用单数表名，启用该选项后，`User` 表将是`user`
		},
	})

	if err != nil {
		panic("failed to connect database")
	}

	// 自动迁移模式
	db.AutoMigrate(&ATA{}, Equipment{}, Part{}, RelEquipmentPart{}, PartLoadLog{})
	tbl_ata := []ATA{
		{ID: "21", Name: "ATA2"},
		{ID: "22", Name: "ATA3"},
		{ID: "23", Name: "ATA4"},
		{ID: "24", Name: "ATA5"},
		{ID: "25", Name: "ATA6"},
		{ID: "26", Name: "ATA7"},
		{ID: "27", Name: "ATA8"},
		{ID: "28", Name: "ATA9"},
		{ID: "29", Name: "ATA10"},
		{ID: "30", Name: "ATA11"},
		{ID: "31", Name: "ATA12"},
	}

	db.Create(&tbl_ata)

	// 创建伪数据
	tbl_equipment_list := []Equipment{
		{ATAID: tbl_ata[0].ID, Name: "IASC1A", ConditionText: "ConditionText1"},
		{ATAID: tbl_ata[0].ID, Name: "IASC1B", ConditionText: "ConditionText2"},
		{ATAID: tbl_ata[0].ID, Name: "IASC1C", ConditionText: "ConditionText3"},
		{ATAID: tbl_ata[0].ID, Name: "IASC1D", ConditionText: "ConditionText4"},
		{ATAID: tbl_ata[1].ID, Name: "IASC1E", ConditionText: "ConditionText5"},
		{ATAID: tbl_ata[1].ID, Name: "IASC1G", ConditionText: "ConditionText6"},
		{ATAID: tbl_ata[1].ID, Name: "IASC1T", ConditionText: "ConditionText7"},
		{ATAID: tbl_ata[1].ID, Name: "GDC-L", ConditionText: "ConditionText8"},
		{ATAID: tbl_ata[1].ID, Name: "GDC-A", ConditionText: "ConditionText9"},
		{ATAID: tbl_ata[1].ID, Name: "GDC-V", ConditionText: "ConditionText10"},
		{ATAID: tbl_ata[2].ID, Name: "GDC-S", ConditionText: "ConditionText11"},
		{ATAID: tbl_ata[2].ID, Name: "GDC-R", ConditionText: "ConditionText12"},
		{ATAID: tbl_ata[2].ID, Name: "GDC-P", ConditionText: "ConditionText13"},
		{ATAID: tbl_ata[2].ID, Name: "GDC-M", ConditionText: "ConditionText14"},
		{ATAID: tbl_ata[2].ID, Name: "GDC-N", ConditionText: "ConditionText15"},
		{ATAID: tbl_ata[2].ID, Name: "GDC-O", ConditionText: "ConditionText16"},
	}

	tbl_part_list := []Part{
		{ID: "part-1", Description: "Part1"},
		{ID: "part-2", Description: "Part2"},
	}

	db.Create(&tbl_equipment_list)
	db.Create(&tbl_part_list)

	// 创建 MemberSystemPart 和 PartLoadLog 伪数据
	for _, ms := range tbl_equipment_list {
		for _, p := range tbl_part_list {
			msp := RelEquipmentPart{EquipmentID: ms.ID, PartID: p.ID}
			db.Create(&msp)
			partLoadLogs := []PartLoadLog{
				{RelEquipmentPartID: msp.ID, LoadStatus: "Loaded", LoadProgress: 50, StartTime: time.Now(), ElapsedTime: 30, Detail: "Initial load"},
				{RelEquipmentPartID: msp.ID, LoadStatus: "Completed", LoadProgress: 100, StartTime: time.Now(), ElapsedTime: 30, Detail: "Final load"}}
			db.Create(&partLoadLogs)
		}
	}

	fmt.Println("Data has been seeded.")
}
