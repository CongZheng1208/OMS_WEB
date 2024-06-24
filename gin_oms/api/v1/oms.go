package v1

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/wejectchen/ginblog/model"
)

func GetATASelection(c *gin.Context) {
	var ctl model.ATAEvent
	if err := ctl.GetAll(); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	c.JSON(
		http.StatusOK, gin.H{
			"code":   http.StatusOK,
			"result": ctl.ATAList,
		},
	)
}

func GetPartSelection(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("equipment_id"))
	var ctl model.EquipmentEvent
	if err := ctl.GetListByEquipment(id); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": ctl.Equipment.Parts,
	})
}

func LoadATAEquipment(c *gin.Context) {
	var data model.LoadATAEquipmentParam
	_ = c.ShouldBindJSON(&data)
	if err := model.SaveLog(data); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": "success",
	})
}

func GetAllLoadStatus(c *gin.Context) {
	res, err := model.GetAllLog()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": res,
	})
}

func GetAllPart(c *gin.Context) {
	var ctl model.Part
	res, err := ctl.GetAllPart()
	fmt.Println(res)
	fmt.Println(err)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": res,
	})
}

func GetEquipmentsByPartID(c *gin.Context) {
	var ctl model.Equipment
	id, _ := strconv.Atoi(c.Query("part_id"))
	res, err := ctl.GetEquipmentsByPartID(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": res.Equipments,
	})
}

func GetDataloadListInfo(c *gin.Context) {
	var data []model.DataLoad
	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	res_list, err := model.GetLogByDataLoadList(data)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": res_list,
	})
}

func SaveDataloadListInfo(c *gin.Context) {
	var data []model.DataLoad
	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	// if err := model.SaveLogByDataLoadList(data); err != nil {
	// 	c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	// }
	var maps = make(map[string]interface{})
	maps["OrderType"] = "DATALOAD START"
	maps["INDEX"] = data

	jsonBytes, err := json.Marshal(maps)
	if err != nil {
		fmt.Println(err)
	}
	jsonString := string(jsonBytes)
	conn, err := net.Dial("tcp", "192.168.1.10:5001")

	if err != nil {
		fmt.Println(err)
	}
	defer conn.Close()
	fmt.Println(jsonString)
	fmt.Fprintf(conn, jsonString)
	msg, _ := bufio.NewReader(conn).ReadString('\n')
	fmt.Println("服务器响应:", msg)
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": "success",
	})
}
