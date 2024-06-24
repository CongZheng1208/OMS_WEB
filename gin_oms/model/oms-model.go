package model

import (
	"time"

	"github.com/jinzhu/copier"
	"gorm.io/gorm"
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
	ATAID         string  `gorm:"type:varchar(20);not null" json:"ATA_id"`          // 26-01
	Name          string  `gorm:"type:varchar(30);not null" json:"name"`            // 设备名称
	ConditionText string  `gorm:"type:varchar(912);not null" json:"condition_text"` //前端在选中后需要在界面上显示的
	ProtocolType  uint    `json:"protocol_type"`                                    // 接口类型
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
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`
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

type ATAEvent struct {
	ATA
	ATAList []ATA `json:"ATAList"`
	Total   int64 `json:"total"`
}

// EditUser 编辑用户信息
func (ctl *ATAEvent) GetAll() error {
	// err = db.Find(&ctl.ATAList).Error
	err = db.Model(&ATA{}).Preload("Equipments").Find(&ctl.ATAList).Count(&ctl.Total).Error
	return err
}

type EquipmentEvent struct {
	Equipment
	EquipmentList []Equipment `json:"equipment_list"`
}

type PartEvent struct {
	Part
	PartList []Part `json:"part_list"`
}

func (ctl *EquipmentEvent) GetListByEquipment(id int) error {
	err = db.Preload("Parts").Where("ID = ?", id).First(&ctl.Equipment).Error
	return err
}

type LoadATAEquipmentParam struct {
	EquipmentID uint   `json:"equipment_id"`
	PartlistId  []uint `json:"partlist_id"`
}

func SaveLog(data LoadATAEquipmentParam) error {
	var rel_equipment_part_list []RelEquipmentPart
	err := db.Model(&RelEquipmentPart{}).Where("equipment_id = ?", data.EquipmentID).Where("part_id in (?)", data.PartlistId).Find(&rel_equipment_part_list).Error
	for _, v := range rel_equipment_part_list {
		db.Create(&PartLoadLog{
			RelEquipmentPartID: v.ID,
			LoadStatus:         "Loading",
			LoadProgress:       0,
			StartTime:          time.Now(),
			ElapsedTime:        0,
			Detail:             "Loading",
		})
	}
	return err
}

type PartLoadLogOutput struct {
	PartLoadLog
	RelEquipmentPart RelEquipmentPart `json:"rel_equipment_part"`
	Equipment        Equipment        `json:"equipment"`
	Part             Part             `json:"part"`
}

func GetAllLog() ([]PartLoadLogOutput, error) {
	var res_list []PartLoadLogOutput
	var tbl_part_load_log []PartLoadLog
	// 查询 PartLoadLog
	err := db.Model(&PartLoadLog{}).Order("id desc").Find(&tbl_part_load_log).Error
	if err != nil {
		return nil, err
	}
	// 查询 RelEquipmentPart
	for _, item := range tbl_part_load_log {
		var res PartLoadLogOutput
		var rel_equipment_part RelEquipmentPart
		var tbl_part Part
		var tbl_equipment Equipment
		copier.Copy(&res, &item)
		db.Model(&RelEquipmentPart{}).Where("id = ?", item.RelEquipmentPartID).First(&rel_equipment_part)
		db.Model(&Part{}).Where("id = ?", rel_equipment_part.PartID).First(&tbl_part)
		db.Model(&Equipment{}).Where("id = ?", rel_equipment_part.EquipmentID).First(&tbl_equipment)
		res.RelEquipmentPart = rel_equipment_part
		res.Part = tbl_part
		res.Equipment = tbl_equipment
		res_list = append(res_list, res)
	}
	return res_list, err
}

func (ctl *Part) GetAllPart() ([]Part, error) {
	// err = db.Find(&ctl.ATAList).Error
	var tbl_part_list []Part
	err = db.Model(&Part{}).Find(&tbl_part_list).Error
	return tbl_part_list, err
}

func (ctl *Equipment) GetEquipmentsByPartID(id int) (Part, error) {
	var tbl_part Part
	err = db.Model(&Part{}).Preload("Equipments").Where("id = ?", id).First(&tbl_part).Error
	return tbl_part, err
}



type DataLoad struct {
	EuipmentId uint   `json:"equipment_id"`
	PartId     string `json:"part_id"`
}

type ResDataLoadList struct {
	ATA       ATA
	Equipment Equipment
	Part      Part
}

func GetLogByDataLoadList(data []DataLoad) ([]ResDataLoadList, error) {
	var res_data_load_list []ResDataLoadList
	for _, v := range data {
		var res_data_load ResDataLoadList
		db.Model(&Equipment{}).Where("id = ?", v.EuipmentId).Find(&res_data_load.Equipment)
		db.Model(&Part{}).Where("id = ?", v.PartId).Find(&res_data_load.Part)
		db.Model(&ATA{}).Where("id = ?", res_data_load.Equipment.ATAID).Find(&res_data_load.ATA)
		res_data_load_list = append(res_data_load_list, res_data_load)
	}
	return res_data_load_list, err
}

func SaveLogByDataLoadList(data []DataLoad) error {
	var rel_equipment_part_list []RelEquipmentPart
	for _, v := range data {
		var rel_equipment_part RelEquipmentPart
		db.Debug().Model(&RelEquipmentPart{}).Where("equipment_id = ?", v.EuipmentId).Where("part_id=?", v.PartId).Find(&rel_equipment_part)
		rel_equipment_part_list = append(rel_equipment_part_list, rel_equipment_part)
	}
	for _, v := range rel_equipment_part_list {
		db.Create(&PartLoadLog{
			RelEquipmentPartID: v.ID,
			LoadStatus:         "Loading",
			LoadProgress:       0,
			StartTime:          time.Now(),
			ElapsedTime:        0,
			Detail:             "Loading",
		})
	}
	return err
}
