# Mithril

该SPA使用的是 Mithril框架

[参考](https://mithril.js.org/index.html)

## 部署

nginx 配置

```conf
# test web
location ^~ /demo {
	alias /var/www/front/demo/;
		proxy_read_timeout 150;
	index  index.html index.htm;
		try_files $uri $uri/ /index.html;
}
location /demo/assets/ {
	alias /var/www/front/demo/assets/;
}
```

[demo](http://127.0.0.1/demo)

## 目录结构

- demo
	- assets
		- css
		- img
		- js
			- models
			- plugin
			- public
				- public.js
			- view
				- index.js
				- Layout.js
			- translations.js
	- app.js
	- index.html
	- style.css

`assets`:  根目录  
`assets>css`:  插件对应的css  
`assets>img`:  图片  
`assets>js>models`:  组件数据模型目录  
`assets>js>plugin`: 公共js插件目录  
`assets>js>public`:  公共变量、函数、组件 目录  
`assets>js>view`:  视图目录  
`assets>js>view>index.js`:  index视图  
`assets>js>view>Layout.js`:  布局  
`assets>translations.js`: 翻译文本   
`app.js`:  程序入口  
`index.html`:  SPA界面  
`style.css`:  自定义的公共的样式



