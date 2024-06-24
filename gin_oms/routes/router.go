package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/wejectchen/ginblog/middleware"
	"github.com/wejectchen/ginblog/routes/api"
	"github.com/wejectchen/ginblog/utils"
)

// func createMyRender() multitemplate.Renderer {
// 	p := multitemplate.NewRenderer()
// 	p.AddFromFiles("front", "web/dist/index.html")
// 	return p
// }

func InitRouter() *gin.Engine {
	gin.SetMode(utils.AppMode)
	r := gin.Default()
	// 设置信任网络 []string
	// nil 为不计算，避免性能消耗，上线应当设置
	_ = r.SetTrustedProxies(nil)

	// r.HTMLRender = createMyRender()
	r.Use(middleware.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.Cors())
	r.Static("/assets", "./web/dist/assets")
	r.Static("/static", "./web/dist/static")
	r.StaticFile("/favicon.ico", "/web/dist/favicon.ico")
	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "front", nil)
	})

	// 注册路由
	api.RegisterBlogRouters(r)
	// 注册管理路由
	api.RegisterBlogManageRouter(r)
	api.RegisterOMSRouter(r)

	// 这里使用通配符路由来匹配所有未匹配的路径
	// r.NoRoute(func(c *gin.Context) {
	// 	c.HTML(200, "front", nil)
	// })
	return r
}
