#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
pnpm build

# 进入待发布的目录
cd dist

# 告诉 github pages 当前网站不是基于 jekyll 
touch .nojekyll

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:lemonnuu/mochi-blog.git master:gh-pages

cd ../

rm -rf dist

cd -