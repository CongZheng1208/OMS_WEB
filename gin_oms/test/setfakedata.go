package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

// type ATA struct {
// 	ID   string `gorm:"primarykey;type:varchar(20);not null" json:"id"` // 26-01
// 	Name string `gorm:"type:varchar(20);" json:"name"`
// }

// func (ATA) TableName() string {
// 	return "tbl_ata"
// }

type Equipment struct {
	ID            int    `gorm:"primarykey" json:"id"`
	ATAID         string `gorm:"type:varchar(20);not null" json:"ATA_id"` // 26-01
	Name          string `gorm:"type:varchar(30);not null" json:"name"`   // 设备名称
	ConditionText string `gorm:"type:varchar(912);not null" json:"condition_text"`
	ProtocolType  int    `json:"protocol_type"`  // 接口类型
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
	ID           int           `gorm:"primarykey" json:"id"`
	EquipmentID  int           `json:"equipment_id"`
	PartID       string        `json:"part_id"`
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

func main() {
	// 初始化数据库
	db, err := gorm.Open(mysql.Open("root:Comac.000@tcp(127.0.0.1:3306)/oms_shiwei?charset=latin1&parseTime=True&loc=Local"), &gorm.Config{
		// gorm日志模式：silent
		Logger: logger.Default.LogMode(logger.Silent),
		// 外键约束
		DisableForeignKeyConstraintWhenMigrating: false,
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
	// db.AutoMigrate(&ATA{}, Equipment{}, Part{}, RelEquipmentPart{}, PartLoadLog{})

	// var equipment_list []Equipment
	// db.Model(&Equipment{}).Find(&equipment_list)
	// fmt.Println(equipment_list)

	// var part_list []Part
	// db.Model(&Part{}).Find(&part_list)
	// fmt.Println(part_list)
}
