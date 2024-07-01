package controller

type DataLoad struct {
	EquipmentID int      `json:"equipment_id"`
	PartID      []string `json:"part_id"`
}
