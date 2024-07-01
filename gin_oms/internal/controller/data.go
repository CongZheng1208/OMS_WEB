package controller

import (
	"fmt"

	"github.com/wejectchen/ginblog/internal/model"
)

func GetEquipmentByATA(first_word string) []model.Equipment {
	var equipmentlist []model.Equipment
	println("ATA:", first_word)
	GetDb().Where("ATA_id like ?", first_word+"%").Find(&equipmentlist)
	return equipmentlist
}

func GetPartByEquipment(equipment_id string) []model.Part {
	var rel_eq_part []model.RelEquipmentPart
	GetDb().Where("equipment_id = ?", equipment_id).Find(&rel_eq_part)
	var partlist []model.Part
	for i := 0; i < len(rel_eq_part); i++ {
		var part model.Part
		GetDb().Where("id = ?", rel_eq_part[i].PartID).Find(&part)
		fmt.Println("part:", rel_eq_part[i].PartID)
		partlist = append(partlist, part)
	}
	return partlist
}

type ResDataLoad struct {
	model.Equipment `json:"equipment"`
	PartList        []model.Part `json:"part_list"`
}

func GetDataLoadList(data []DataLoad) []ResDataLoad {
	var resDataLoad []ResDataLoad
	for i := 0; i < len(data); i++ {
		var resDataLoadItem ResDataLoad
		var equipment model.Equipment
		GetDb().Model(&model.Equipment{}).Where("id = ?", data[i].EquipmentID).Find(&equipment)
		resDataLoadItem.Equipment = equipment
		GetDb().Model(&model.Part{}).Where("id in (?)", data[i].PartID).Find(&resDataLoadItem.PartList)
		resDataLoad = append(resDataLoad, resDataLoadItem)
	}
	return resDataLoad
}
