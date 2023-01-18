---
date: '2023-01-18 20:18:18'
title: Ubuntu@22.04 安装 MongoDB 出错解决
titleTemplate: false
author: Mochi
outline: false
categories:
  - post
tags:
  - mongodb
  - pit
---

# Ubuntu 22.04 安装 MongoDB 出错解决

对着[官网](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)在 Ubuntu@22.04 上安装 MongoDB@6 时, 老抛出这样的错误：

```text
The following packages have unmet dependencies:
mongodb-org-mongos : Depends: libssl1.1 (>= 1.1.1) but it is not installable
mongodb-org-server : Depends: libssl1.1 (>= 1.1.1) but it is not installable
mongodb-org-shell : Depends: libssl1.1 (>= 1.1.1) but it is not installable
E: Unable to correct problems, you have held broken packages.
```

刚开始以为是安装 MongoDB@6 导致的, 然后安装 MongoDB@5 仍是如此...直到看到[这篇帖子](https://stackoverflow.com/questions/73656873/unable-to-install-mongodb-in-ubuntu-22-04-mongodb-org-libssl1-1), 才真正解决了问题。

其实是因为 MongoDB 需要特定版本的 libssl1.1 才能安装, 执行如下脚本后重新安装即可。

```bash
sudo wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```

Ubuntu 安装 MongoDB:

:::code-group

```bash {0} [step1]
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

```bash [step2]
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

```bash [step3]
sudo apt-get update
```

```bash [step4]
sudo apt-get install -y mongodb-org
```

:::

验证 MongoDB 是否安装成功：

:::code-group

```bash [启动]
sudo systemctl start mongod
```

```bash [查看状态]
sudo systemctl status mongod
```

:::

当看见 MongoDB 正在运行即成功。
