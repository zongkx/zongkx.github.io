## cicd

```yaml

variables:
  SOURCE_URI: "/home/gitlab-runner/demo"

stages:
  - deploy_demo
#打包任务
deploy_sms_data:
  stage: deploy_demo
  script:
    - echo "Variables are '$SOURCE_URI' "
    - echo "开始构建..."
    - cd $SOURCE_URI
    - echo "开始拉取代码"
    - git reset --hard origin/dev
    - git pull
    - mvn clean deploy  -pl demo -DskipTests
  only:
    refs: ## 指定分支
      - dev
    changes: ## 按模块所在目录触发
      - "demo/**/*"
  tags:
    - testRunner 
```