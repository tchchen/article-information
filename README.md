# article-information

没有账号可直接输入 手机号 和 密码 即可注册并登录
密码统一为：246810

 这是一个 vue2、vue-router、vant、axios、less 的移动端项目

 使用 postcss postcss-pxtorem + amfe-flexible 实现响应式布局

 有登录模块、频道模块、编辑频道、搜索模块、搜索结果、文章列表、反馈文章、关注作者、点赞文章、发布评论、点赞评论

 个人中心、修改个人资料、机器人客服

 token 过期的两种解决方式

 前提：因为其它请求接口要求 请求头 有 Authorization 字段值为登录时存储的有效 token，才能请求其它数据(获取文章、点赞、评论等等)

方式 1：axios 里的响应拦截器 判断 token 过期的 401 状态码。清空 token 并 replace 跳转回登录页，为了让用户体验好点。
可以在 replace 要跳转的路由加上 query 参数，参数为 token 过期时 所在的路由完整路径

方式 2：因为登录时有 可刷新的 token 的 refresh_token。所以可以在 token 过期时 用 refresh_token 获取新的 token，
继续完成上次 因为 token 过期而请求失败的请求。
但用来刷新 token 的 refresh_token 也会过期，所以在响应拦截器请求失败的函数里，也要加上 判断 refresh_token 过期。
这时就要跳转到 登录页，重新获取 token 和 用来刷新 token 的 refresh_token
