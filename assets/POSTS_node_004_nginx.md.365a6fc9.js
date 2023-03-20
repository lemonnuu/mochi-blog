import{_ as s,c as n,o as a,a as l}from"./app.e0b3b0bc.js";const D=JSON.parse('{"title":"Nginx","titleTemplate":false,"description":"","frontmatter":{"date":"2023-01-29 17:11:02","title":"Nginx","titleTemplate":false,"author":"Mochi","outline":[2,4],"categories":["post"],"tags":["nginx"]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"文件","slug":"文件","link":"#文件","children":[{"level":3,"title":"Nginx 可执行脚本存放位置","slug":"nginx-可执行脚本存放位置","link":"#nginx-可执行脚本存放位置","children":[]},{"level":3,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]},{"level":3,"title":"日志文件","slug":"日志文件","link":"#日志文件","children":[]}]},{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[{"level":3,"title":"查看 80 端口占用情况","slug":"查看-80-端口占用情况","link":"#查看-80-端口占用情况","children":[]},{"level":3,"title":"停止","slug":"停止","link":"#停止","children":[]},{"level":3,"title":"开启","slug":"开启","link":"#开启","children":[]},{"level":3,"title":"重启","slug":"重启","link":"#重启","children":[]},{"level":3,"title":"重新加载磁盘位置","slug":"重新加载磁盘位置","link":"#重新加载磁盘位置","children":[]},{"level":3,"title":"检测配置文件是否有语法错误","slug":"检测配置文件是否有语法错误","link":"#检测配置文件是否有语法错误","children":[]},{"level":3,"title":"查看所有命令","slug":"查看所有命令","link":"#查看所有命令","children":[]}]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[{"level":3,"title":"配置规则","slug":"配置规则","link":"#配置规则","children":[]},{"level":3,"title":"配置 HTTPS 安全协议","slug":"配置-https-安全协议","link":"#配置-https-安全协议","children":[]},{"level":3,"title":"反向代理","slug":"反向代理","link":"#反向代理","children":[]},{"level":3,"title":"前端网站","slug":"前端网站","link":"#前端网站","children":[]}]}],"relativePath":"_POSTS/node/004_nginx.md","lastUpdated":1675047349000}'),p={name:"_POSTS/node/004_nginx.md"},e=l(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-hidden="true">#</a></h1><p><a href="https://nginx.org/en/docs/" target="_blank" rel="noreferrer">Nginx</a> 是一款轻量级的 Web 服务器、反向代理服务器，由于它的内存占用少, 启动极快, 高并发能力强, 在互联网项目中广泛应用。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h2><p><a href="https://nginx.org/en/linux_packages.html#Ubuntu" target="_blank" rel="noreferrer">Ubuntu 安装 Nginx</a> 可以不像官网描述的这么复杂, 直接执行以下命令即可。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apt-get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apt-get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"></span></code></pre></div><p>两者唯一的区别是官网安装的是最新版的 Nginx, 而上面命令安装的是 1.18.0 特定版本。但由于 Nginx 非常稳定, 版本相差不大也不要紧。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span></span>
<span class="line"></span></code></pre></div><p>安装结束后执行 <code>nginx -v</code> 出现相应版本号即表示安装成功。</p><h2 id="文件" tabindex="-1">文件 <a class="header-anchor" href="#文件" aria-hidden="true">#</a></h2><h3 id="nginx-可执行脚本存放位置" tabindex="-1">Nginx 可执行脚本存放位置 <a class="header-anchor" href="#nginx-可执行脚本存放位置" aria-hidden="true">#</a></h3><p>nginx 的可执行脚本存放在 /usr/share/nginx/ 目录里面, 一般不需要操作此文件夹。</p><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-hidden="true">#</a></h3><p>nginx 的配置文件存放在 /etc/nginx/ 目录里面。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-ni3jq" id="tab-dBnUzfz" checked="checked"><label for="tab-dBnUzfz">执行脚本</label><input type="radio" name="group-ni3jq" id="tab-23pLhU0"><label for="tab-23pLhU0">示例</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/</span></span>
<span class="line"><span style="color:#FFCB6B;">ls</span></span>
<span class="line"></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">root@mochi:~# cd /etc/nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">root@mochi:/etc/nginx# ls</span></span>
<span class="line"><span style="color:#A6ACCD;">conf.d        fastcgi_params  koi-win     modules-available  nginx.conf    scgi_params      sites-enabled  uwsgi_params</span></span>
<span class="line"><span style="color:#A6ACCD;">fastcgi.conf  koi-utf         mime.types  modules-enabled    proxy_params  sites-available  snippets       win-utf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></div></div><ul><li>nginx.conf : 配置文件, 其中引入了 sites-available 目录下的所有文件</li><li>sites-available : 包含 default 配置文件, 一般就是更改 default 文件</li></ul><h3 id="日志文件" tabindex="-1">日志文件 <a class="header-anchor" href="#日志文件" aria-hidden="true">#</a></h3><p>日志文件存放在 /var/log/nginx 文件夹下。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-DyqZS" id="tab-5WiGoZX" checked="checked"><label for="tab-5WiGoZX">执行脚本</label><input type="radio" name="group-DyqZS" id="tab-pTajX7o"><label for="tab-pTajX7o">示例</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/var/log/nginx</span></span>
<span class="line"><span style="color:#FFCB6B;">ls</span></span>
<span class="line"></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">root@mochi:~# cd /var/log/nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">root@mochi:/var/log/nginx# ls</span></span>
<span class="line"><span style="color:#A6ACCD;">access.log  error.log</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></div></div><ul><li>access.log : 请求日志</li><li>error.log : 错误日志</li></ul><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-hidden="true">#</a></h2><h3 id="查看-80-端口占用情况" tabindex="-1">查看 80 端口占用情况 <a class="header-anchor" href="#查看-80-端口占用情况" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">netstat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-tupln</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">grep</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span></code></pre></div><h3 id="停止" tabindex="-1">停止 <a class="header-anchor" href="#停止" aria-hidden="true">#</a></h3><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-DeVA3" id="tab-Hez4cqI" checked="checked"><label for="tab-Hez4cqI">强制停止</label><input type="radio" name="group-DeVA3" id="tab-9cFoOas"><label for="tab-9cFoOas">退出</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">quit</span></span>
<span class="line"></span></code></pre></div></div></div><p>stop 与 quit 的区别就是 stop 会立即停止 nginx, 而 quit 会等子进程处理完毕再停止, 但不接收新的请求。</p><h3 id="开启" tabindex="-1">开启 <a class="header-anchor" href="#开启" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span></span>
<span class="line"></span></code></pre></div><h3 id="重启" tabindex="-1">重启 <a class="header-anchor" href="#重启" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reload</span></span>
<span class="line"></span></code></pre></div><h3 id="重新加载磁盘位置" tabindex="-1">重新加载磁盘位置 <a class="header-anchor" href="#重新加载磁盘位置" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reopen</span></span>
<span class="line"></span></code></pre></div><p>nginx 日志文件的存取是基于磁盘位置的, 也就是说即使将 access.log 重命名为 test.log, nginx 仍然会将日志文件写入 test.log。</p><p>reopen 命令可以让 nginx 重新获取磁盘位置, 写入新创建的 access.log 中。</p><h3 id="检测配置文件是否有语法错误" tabindex="-1">检测配置文件是否有语法错误 <a class="header-anchor" href="#检测配置文件是否有语法错误" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span></span>
<span class="line"></span></code></pre></div><h3 id="查看所有命令" tabindex="-1">查看所有命令 <a class="header-anchor" href="#查看所有命令" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-h</span></span>
<span class="line"></span></code></pre></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-hidden="true">#</a></h2><h3 id="配置规则" tabindex="-1">配置规则 <a class="header-anchor" href="#配置规则" aria-hidden="true">#</a></h3><p>打开 /etc/nginx/nginx.conf 文件, 其内容可大致分为几个区域。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-y12yu" id="tab-bF0OAew" checked="checked"><label for="tab-bF0OAew">nginx.conf</label><input type="radio" name="group-y12yu" id="tab-5mfLl58"><label for="tab-5mfLl58">配置规则</label><input type="radio" name="group-y12yu" id="tab-h-6y7HL"><label for="tab-h-6y7HL">nginx.conf 示例</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx</span></span>
<span class="line"><span style="color:#FFCB6B;">vi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx.conf</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">Main</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#全局配置区</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">events</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># events 事件区, 子进程核心配置</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">http</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># http 服务器配置区</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 不同服务配置区</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># location 不同请求路径配置区</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;"># 具体配置选项</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">mail</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 邮件代理配置区</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 邮件服务配置区</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 具体配置选项</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">user</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">www-data</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">worker_processes</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">auto</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">pid</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/run/nginx.pid</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">include</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/modules-enabled/</span><span style="color:#A6ACCD;">*</span><span style="color:#C3E88D;">.conf</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">events</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">worker_connections</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">768</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># multi_accept on;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">http</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Basic Settings</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">sendfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">tcp_nopush</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">types_hash_max_size</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2048</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># server_tokens off;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># server_names_hash_bucket_size 64;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># server_name_in_redirect off;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">include</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/mime.types</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">default_type</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">application/octet-stream</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># SSL Settings</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">ssl_protocols</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TLSv1</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TLSv1.</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TLSv1.</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TLSv1.</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># Dropping SSLv3, ref: POODLE</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">ssl_prefer_server_ciphers</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Logging Settings</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">access_log</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/var/log/nginx/access.log</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">error_log</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/var/log/nginx/error.log</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Gzip Settings</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">gzip</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># gzip_vary on;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># gzip_proxied any;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># gzip_buffers 16 8k;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Virtual Host Configs</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">include</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/conf.d/</span><span style="color:#A6ACCD;">*</span><span style="color:#C3E88D;">.conf</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">include</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/sites-enabled/</span><span style="color:#A6ACCD;">*</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#mail {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	# See sample authentication script at:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	# auth_http localhost/auth.php;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	# pop3_capabilities &quot;TOP&quot; &quot;USER&quot;;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	# imap_capabilities &quot;IMAP4rev1&quot; &quot;UIDPLUS&quot;;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	server {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#		listen     localhost:110;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#		protocol   pop3;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#		proxy      on;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	server {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#		listen     localhost:143;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#		protocol   imap;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#		proxy      on;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#}</span></span>
<span class="line"></span></code></pre></div></div></div><p>其中 nginx.conf 又引入了 /etc/nginx/sites-enabled/*, 而我们实际需要配置的就是 /etc/nginx/sites-enabled/default 文件。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-OBMvH" id="tab-ZqB2P8Y" checked="checked"><label for="tab-ZqB2P8Y">default</label><input type="radio" name="group-OBMvH" id="tab-JovpNtz"><label for="tab-JovpNtz">default 示例</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/sites-enabled</span></span>
<span class="line"><span style="color:#FFCB6B;">vi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight has-diff"><code><span class="line"><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># You should look at the following URL&#39;s in order to grasp a solid understanding</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># of Nginx configuration files in order to fully unleash the power of Nginx.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://www.nginx.com/resources/wiki/start/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># https://wiki.debian.org/Nginx/DirectoryStructure</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># In most cases, administrators will remove this file from sites-enabled/ and</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># leave it as reference inside of sites-available where it will continue to be</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># updated by the nginx packaging team.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># This file will automatically load configuration files provided by other</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># applications, such as Drupal or Wordpress. These applications will be made</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># available underneath a path with that package name, such as /drupal8.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Default server configuration</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#FFCB6B;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">listen</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default_server</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">listen</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">::</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">:80 </span><span style="color:#C3E88D;">default_server</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># SSL configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># listen 443 ssl default_server;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># listen [::]:443 ssl default_server;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Note: You should disable gzip for SSL traffic.</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># See: https://bugs.debian.org/773332</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Read up on ssl_ciphers to ensure a secure configuration.</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># See: https://bugs.debian.org/765782</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Self signed certs generated by the ssl-cert package</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Don&#39;t use them in a production server!</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># include snippets/snakeoil.conf;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">root</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/var/www/html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># Add index.php to the list if you are using PHP</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">index</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index.html</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index.htm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index.nginx-debian.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">server_name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">_</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#676E95;font-style:italic;"># First attempt to serve request as file, then</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#676E95;font-style:italic;"># as directory, then fall back to displaying a 404.</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#FFCB6B;">try_files</span><span style="color:#A6ACCD;"> $uri $uri</span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#F78C6C;">404</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># pass PHP scripts to FastCGI server</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#	include snippets/fastcgi-php.conf;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#	# With php-fpm (or other unix sockets):</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#	fastcgi_pass unix:/run/php/php7.4-fpm.sock;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#	# With php-cgi (or other tcp sockets):</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#	fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># deny access to .htaccess files, if Apache&#39;s document root</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># concurs with nginx&#39;s one</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#location ~ /\\.ht {</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#	deny all;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">#}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Virtual Host configuration for example.com</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># You can move that to a different file under sites-available/ and symlink that</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># to sites-enabled/ to enable it.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#server {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	listen 80;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	listen [::]:80;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	server_name example.com;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	root /var/www/example.com;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	index index.html;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	location / {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#		try_files $uri $uri/ =404;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#	}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#}</span></span>
<span class="line"></span></code></pre></div></div></div><h3 id="配置-https-安全协议" tabindex="-1">配置 HTTPS 安全协议 <a class="header-anchor" href="#配置-https-安全协议" aria-hidden="true">#</a></h3><p>首先得去阿里云获取免费的 SSL 证书并下载 nginx 的版本。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># listen 80 default_server;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;"># listen [::]:80 default_server;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">listen</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">443</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ssl</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">server_name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">www.moyo.love</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 域名, 需写全</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">ssl_certificate</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/m.pem</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 下载的证书</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">ssl_certificate_key</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/nginx/m.key</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 下载的密钥</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-hidden="true">#</a></h3><p>以 /api 开头的请求都会被 3000 端口接管处理。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/api</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#FFCB6B;">proxy_pass</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">HTTP://127.0.0.1:</span><span style="color:#F78C6C;">3000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="前端网站" tabindex="-1">前端网站 <a class="header-anchor" href="#前端网站" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/mochi-blog</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#82AAFF;">alias</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/mochi/mochi-blog/</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#676E95;font-style:italic;"># 这个 base 如果有子目录则填子目录, 否则不用填写</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#FFCB6B;">try_files</span><span style="color:#A6ACCD;"> $uri $uri</span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/base/index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div>`,51),t=[e];function o(c,i,r,y,C,A){return a(),n("div",null,t)}const h=s(p,[["render",o]]);export{D as __pageData,h as default};
