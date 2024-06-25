package api

import (
	"github.com/gin-gonic/gin"
	v1 "github.com/wejectchen/ginblog/api/v1"
)

func RegisterOMSRouter(r *gin.Engine) {
	/*
		后台管理路由接口
	*/
	auth := r.Group("/php")
	// auth.Use(middleware.JwtToken())
	{
		// 用户模块的路由接口
		auth.GET("/ata_selection", v1.GetATASelection)
		auth.GET("/part_selection", v1.GetPartSelection)
		auth.POST("/load-ATA-equipment", v1.LoadATAEquipment)
		auth.GET("/all_load_status", v1.GetAllLoadStatus)
		auth.GET("/all_part", v1.GetAllPart)
		auth.GET("/equipments_by_part_id", v1.GetEquipmentsByPartID)
		auth.POST("/get-dataload-list-info", v1.GetDataloadListInfo)
		auth.POST("/load-equipment-part", v1.SaveDataloadListInfo)
	}
}
