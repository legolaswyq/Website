# Website
A website for practise





需求1.0 版本



![image-20200901153306220](C:\Users\walter\AppData\Roaming\Typora\typora-user-images\image-20200901153306220.png)

![image-20200901153314575](C:\Users\walter\AppData\Roaming\Typora\typora-user-images\image-20200901153314575.png)





设计:

1. 注册页面
   1. 接受姓名,email,密码
   2. 验证数据 
      1. 名字至少6个字符以上,不能重复,非空
      2. email格式 用regex验证
      3. 密码至少8位以上
      4. 密码用md5加密
2. 登录页面
   1. 输入名字和密码
   2. 再数据库中查找若匹配登录成功
   3. 登录成功显示欢迎信息,跳转主页面
   4. 登录失败发送错误信息,转回登录页面
3. 主页面
   1. 发布框,发布按钮
   2. 其他人发布的信息
   3. 点赞按钮
   4. 删除按钮
4. 业务逻辑
   1. 登录权限
   2. 一般权限
   3. 管理员权限









改进

1. 创建账户时,可在数据库设置主键,先插入若主键冲突再弹错误.