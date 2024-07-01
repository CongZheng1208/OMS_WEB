package v1

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/wejectchen/ginblog/internal/controller"
)

func GetEquipmentByATAID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("ATA_id"))
	res := controller.GetEquipmentByATA(fmt.Sprint(id))

	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": res,
	})
}

func GetPartByEquipmentID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Query("equipment_id"))
	res := controller.GetPartByEquipment(fmt.Sprint(id))

	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": res,
	})
}

func SaveDataloadListInfo(c *gin.Context) {
	var data []controller.DataLoad
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
	// conn, err := net.Dial("tcp", "192.168.1.10:5001")

	// if err != nil {
	// 	fmt.Println(err)
	// }
	// defer conn.Close()
	fmt.Println(jsonString)
	// fmt.Fprintf(conn, jsonString)
	// msg, _ := bufio.NewReader(conn).ReadString('\n')
	// fmt.Println("服务器响应:", msg)
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": "success",
	})
}

func GetDataloadListInfo(c *gin.Context) {
	var data []controller.DataLoad
	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
	}
	res := controller.GetDataLoadList(data)
	c.JSON(http.StatusOK, gin.H{
		"code":   http.StatusOK,
		"result": res,
	})
}
