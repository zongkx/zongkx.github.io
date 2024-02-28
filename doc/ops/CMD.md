## datetime

```shell
@echo off
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set mydatetime=%%I
set mydatetime=%mydatetime:~0,8%%mydatetime:~8,4%
echo %mydatetime%


 mvn   docker:build -DskipTests=true -Ddocker.tag=%mydatetime%
```