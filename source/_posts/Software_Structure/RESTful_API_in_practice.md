title: RESTful API 实践
date: 2017/01/25 16:00:00
tags: [RESTful API]
categories: [软件架构]
---
## 常规接口
```
get api/v1/orgs 获取所有组织机构
get api/v1/orgs/:id 获取特定组织机构
post api/v1/orgs 创建组织机构
put/patch api/v1/orgs/:id 更新组织机构
delete api/v1/orgs/:id 删除特定组织机构
```
## 查询规则
### 精确查询
```
get /buildings?name=研究生2号楼 
```
查询建筑名称===研究生2号楼的建筑
### 模糊查询
```
get /buildings?search=研究生2号楼
```
模糊查询接口根据各资源特有的属性特征，默认选择特定几个字段进行查询。
<!--more-->
## 分页规则
```
/buildings?page=1&per_page=30

返回第1条到第30条数据，返回格式：

{
    "data": [],
    "records": 1200
}
```
## 排序规则
```
get /buildings?search=研究生楼&sort_by=name&order_by=asc&page=1&limit=30
sort_by 是根据字段进行排序，

order_by 默认是降序desc，asc升序
```
## 关联字段规则

只需要返回建筑的名称
```
get /buildings?fields=name
{
    "id":1,
    "name":"研究生2号楼"
}
```
返回关联设备，只包含设备名称
```
get /buildings?fields=name,meters.name
{
    "id":1,
    "name":"研究生2号楼",
    "meters":[{
      "id":1,
      "name": "研究生2号楼总表"
    }]
}
```
## 示例接口

计费管理系统

### 例1、网管和表具管理

查询建筑下特定设备类型设备接口，包含子建筑，子设备类型的数据。

当前：
```
meters/GetMetersInBuiding/{buildingId}/{FirstValue}
```
建议使用：
```
buildings/:bid/meters?type=0网关，1电，2水，参见字典
```
### 例2、价格管理

#### 新增价格

当前：
```
MonitoringConfigs/AddListV2
```
建议使用
```
post MonitoringConfigs
```
#### 删除价格

当前：
```
MonitoringConfigs/DelTemplateV2/{templateId}
```
建议使用：
```
delete MonitoringConfigs/:tid
```
#### 修改价格

当前：
```
MonitoringConfigs/UpdateTemplateV2/{oldTemplateId}
```
建议使用：
```
Put/Patch MonitoringConfigs/:tid
```
### 例3、配置某能耗用户电补水补

当前：
```
MonitoringConfigs/AddMonitoringConfigWithDetails
```
建议使用：
```
Post users/:uid/subsidies
```
### 控制状态

#### 打开一栋楼下的某些设备
```
post /buildings/:bid/meters/open?meter_type=类型
```
#### 关闭某类设备
```
delete /buildings/:bid/meters/open?meter_type=类型
```
#### 查询某类设备物理状态：开或关
```
get /buildings/:bid/meters/open?meter_type=类型
```
#### 单独打开某个设备
```
post buildings/:bid/meters/:mid/open
```
#### 关闭某个设备
```
delete  buildings/:bid/meters/:mid/open
```
#### 获取某个设备物理状态
```
get buildings/:bid/meters/:mid/open
```
## 参考资料

 * GitHub API : https://developer.github.com/v3/
 * PayPal API : https://developer.paypal.com/docs/api/
 * RESTful tutorial : http://www.restapitutorial.com
 * RESTful 设计指南 : http://www.ruanyifeng.com/blog/2014/05/restful_api.html 
 * REST best practices : https://bourgeois.me/rest/
 * Principles of good RESTful API Design : https://codeplanet.io/principles-good-restful-api-design/ 