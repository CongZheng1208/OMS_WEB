package api

import (
	"github.com/gin-gonic/gin"
	v1 "github.com/wejectchen/ginblog/api/v1"
)

func RegisterOMSRouter(r *gin.Engine) {
	/*
		后台管理路由接口
	*/
	auth := r.Group("/oms/php")
	// auth.Use(middleware.JwtToken())
	{
		auth.GET("/equipment-list", v1.GetEquipmentByATAID)
		auth.GET("/part-list", v1.GetPartByEquipmentID)
		// 用户模块的路由接口
		auth.POST("/load-equipment-part", v1.SaveDataloadListInfo)
		auth.POST("/get-dataload-list-info",v1.GetDataloadListInfo)
	}
}
