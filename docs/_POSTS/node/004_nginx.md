---
date: '2023-01-29 17:11:02'
title: Nginx
titleTemplate: false
author: Mochi
outline: [2, 4]
categories:
  - post
tags:
  - nginx
---

# Nginx

[Nginx](https://nginx.org/en/docs/) 是一款轻量级的 Web 服务器、反向代理服务器，由于它的内存占用少, 启动极快, 高并发能力强, 在互联网项目中广泛应用。

## 安装

[Ubuntu 安装 Nginx](https://nginx.org/en/linux_packages.html#Ubuntu) 可以不像官网描述的这么复杂, 直接执行以下命令即可。

```shell
sudo apt-get update
sudo apt-get install nginx
```

两者唯一的区别是官网安装的是最新版的 Nginx, 而上面命令安装的是 1.18.0 特定版本。但由于 Nginx 非常稳定, 版本相差不大也不要紧。

```shell
nginx -v
```

安装结束后执行 `nginx -v` 出现相应版本号即表示安装成功。

## 文件

### Nginx 可执行脚本存放位置

nginx 的可执行脚本存放在 /usr/share/nginx/ 目录里面, 一般不需要操作此文件夹。

### 配置文件

nginx 的配置文件存放在 /etc/nginx/ 目录里面。

:::code-group

```shell [执行脚本]
cd /etc/nginx/
ls
```

```text [示例]
root@mochi:~# cd /etc/nginx
root@mochi:/etc/nginx# ls
conf.d        fastcgi_params  koi-win     modules-available  nginx.conf    scgi_params      sites-enabled  uwsgi_params
fastcgi.conf  koi-utf         mime.types  modules-enabled    proxy_params  sites-available  snippets       win-utf
```

:::

- nginx.conf : 配置文件, 其中引入了 sites-available 目录下的所有文件
- sites-available : 包含 default 配置文件, 一般就是更改 default 文件

### 日志文件

日志文件存放在 /var/log/nginx 文件夹下。

:::code-group

```shell [执行脚本]
cd /var/log/nginx
ls
```

```text [示例]
root@mochi:~# cd /var/log/nginx
root@mochi:/var/log/nginx# ls
access.log  error.log
```

:::

- access.log : 请求日志
- error.log : 错误日志

## 常用命令

### 查看 80 端口占用情况

```shell
netstat -tupln | grep 80
```

### 停止

:::code-group

```shell [强制停止]
nginx -s stop
```

```shell [退出]
nginx -s quit
```

:::

stop 与 quit 的区别就是 stop 会立即停止 nginx, 而 quit 会等子进程处理完毕再停止, 但不接收新的请求。

### 开启

```shell
nginx
```

### 重启

```shell
nginx -s reload
```

### 重新加载磁盘位置

```shell
nginx -s reopen
```

nginx 日志文件的存取是基于磁盘位置的, 也就是说即使将 access.log 重命名为 test.log, nginx 仍然会将日志文件写入 test.log。

reopen 命令可以让 nginx 重新获取磁盘位置, 写入新创建的 access.log 中。

### 检测配置文件是否有语法错误

```shell
nginx -t
```

### 查看所有命令

```shell
nginx -h
```

## 配置

### 配置规则

打开 /etc/nginx/nginx.conf 文件, 其内容可大致分为几个区域。

:::code-group

```shell [nginx.conf]
cd /etc/nginx
vi nginx.conf
```

```shell [配置规则]
Main #全局配置区

events { # events 事件区, 子进程核心配置

}

http { # http 服务器配置区
  server { # 不同服务配置区
    location { # location 不同请求路径配置区
      # 具体配置选项
    }
  }
}

mail { # 邮件代理配置区
  server { # 邮件服务配置区
    # 具体配置选项
  }
}
```

```shell [nginx.conf 示例]
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
#
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}
```

:::

其中 nginx.conf 又引入了 /etc/nginx/sites-enabled/\*, 而我们实际需要配置的就是 /etc/nginx/sites-enabled/default 文件。

:::code-group

```shell [default]
cd /etc/nginx/sites-enabled
vi default
```

```shell [default 示例]
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	# SSL configuration
	#
	# listen 443 ssl default_server;
	# listen [::]:443 ssl default_server;
	#
	# Note: You should disable gzip for SSL traffic.
	# See: https://bugs.debian.org/773332
	#
	# Read up on ssl_ciphers to ensure a secure configuration.
	# See: https://bugs.debian.org/765782
	#
	# Self signed certs generated by the ssl-cert package
	# Don't use them in a production server!
	#
	# include snippets/snakeoil.conf;

	root /var/www/html;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

	# pass PHP scripts to FastCGI server
	#
	#location ~ \.php$ {
	#	include snippets/fastcgi-php.conf;
	#
	#	# With php-fpm (or other unix sockets):
	#	fastcgi_pass unix:/run/php/php7.4-fpm.sock;
	#	# With php-cgi (or other tcp sockets):
	#	fastcgi_pass 127.0.0.1:9000;
	#}

	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	#location ~ /\.ht {
	#	deny all;
	#}
}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#	listen 80;
#	listen [::]:80;
#
#	server_name example.com;
#
#	root /var/www/example.com;
#	index index.html;
#
#	location / {
#		try_files $uri $uri/ =404;
#	}
#}
```

:::

### 配置 HTTPS 安全协议

首先得去阿里云获取免费的 SSL 证书并下载 nginx 的版本。

```shell
server {
	# listen 80 default_server;
	# listen [::]:80 default_server;
	listen 443 ssl;
	server_name www.moyo.love; # 域名, 需写全
	ssl_certificate /etc/nginx/m.pem; # 下载的证书
	ssl_certificate_key /etc/nginx/m.key; # 下载的密钥
}
```

### 反向代理

以 /api 开头的请求都会被 3000 端口接管处理。

```shell
server {
	location /api {
		proxy_pass HTTP://127.0.0.1:3000;
	}
}
```

### 前端网站

```shell
server {
	location /mochi-blog {
		alias /mochi/mochi-blog/;
		# 这个 base 如果有子目录则填子目录, 否则不用填写
		try_files $uri $uri/ /base/index.html;
	}
}
```
