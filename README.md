# ts-demo

typescript版本项目初始化demo

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```  
* v-echart组件封装了echarts的原生事件可以直接@click来获取图标点击时间 
同时鼠标事件参数有EchartMouseEvent这个类型描述
事件参数中有一个chart字段是当前图标的Echarts实例
* 添加了简易的依赖注入@Injectable @Service
* node-sass 可以使用/deep/ sass或dart-sass可以使用 ::v-deep


#### 插件
#1.自动滚动   vue-seamless-scroll
安装：npm install vue-seamless-scroll --save


#2.水球图 vue-quill-editor
1.安装：  npm install vue-quill-editor --save
         npm install quill --save

#3.词云   echarts-wordcloud
安装          npm install echarts-wordcloud@1.1.3 -S
引入          import 'echarts-wordcloud'
注意版本问题：  echarts 4.x 对应  echarts-wordcloud  1.x版本
             echarts 5.x 对应  echarts-wordcloud  2.x版本
