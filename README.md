# Angular Boilerplate

.editorconfig -- 统一不同开发者的不同开发工具的不同开发配置
## 分页操作
- 在路由器的配置中加上分页参数
- 在控制器中提取page
- pageCount = Math.ceil(total/count);向上取整
- start = (page(页码)-1)*count
