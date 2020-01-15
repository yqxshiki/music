module.exports = {
	publicPath: '/',                  //根路径
	outputDir: __dirname + '/./wyyunapi/public/music',
	devServer: {
		open: true,              //自动开启首页
		host: 'localhost',
		port: '8080',
		https: false,
		hotOnly: false,
		proxy: {
			//配置跨域
			'/api': {
				target: 'http://localhost:5000/api/',
				ws: true,
				changeOrigin: true,
				pahtRewrite: {
					'^/api': ''
				}
			}
		}
	}


}