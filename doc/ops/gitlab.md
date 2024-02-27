## cicd

```yaml

stages:
  - 80_test_publish

deploy1:
  stage: 80_test_publish
  script:
    - cd /home/gitlab-runner/iwork
    - echo "###############checkout test###############"
    - git checkout test
    - echo "###############git pull###############"
    - sudo git pull
    - mvn clean package -DskipTests -pl sms-vte -U -T2C
    - cd ./sms-vte
    - echo "###############docker build###############"
    - sudo docker stop sms-vte
    - sudo docker rm sms-vte
    - sudo docker build -t sms-vte . && docker run -e "PARAMS=--spring.profile.active=beta,uaa"  -p 8311:8311 --name sms-vte --network host sms-vte
  when:
    manual
  tags:
    - betaRunner

```