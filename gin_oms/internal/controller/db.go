package controller

import (
	"github.com/wejectchen/ginblog/internal/model"
	"gorm.io/gorm"
)

func GetDb() *gorm.DB {
	return model.GetDb()
}
