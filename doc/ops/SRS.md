## 部署

```yaml
  srs:
    container_name: srs
    image: registry.cn-hangzhou.aliyuncs.com/ossrs/oryx:5
    ports:
      - 8080:2022
      - 2443:2443
      - 1935:1935
      - 8000:8000/udp
      - 10080:10080/udp
```

## ffmpeg转码

```shell
docker run -itd --name app_ffmpeg1 -p 8067:8080 -v /home/mjl/ffmpeg/:/mnt/app/ --entrypoint='bash' jrottenberg/ffmpeg
```

转码

```shell
ffmpeg -i rtmp://10.13.0.58/live/livestream -c:v libx264 -preset veryfast -tune zerolatency -b:v 1000k  -r 30 -vf scale=1280:720 -c:a aac -ar 44100 -f flv rtmp://10.13.0.58/live/ffdcek?secret=97e315f6bc44468495841a13acd863a5

ffmpeg -i rtmp://10.13.0.58/live/ccefca -c:v libx264 -preset veryfast -tune zerolatency -b:v 1000k  -r 30 -vf scale=1280:720 -c:a aac -ar 44100 -f flv rtmp://10.13.0.58/live/fdjefg?secret=017b487efd374e4099e9f31ebd80f67cc

```

合并流

```shell
ffmpeg -i rtmp://10.13.0.58/live/livestream -i rtmp://10.13.0.58/live/mbbmao -filter_complex "[0:v:0][1:v:0]hstack=inputs=2[outv]; [0:a:0][1:a:0]amix=inputs=2[outa]" -map "[outv]" -map "[outa]" -f flv rtmp://10.13.0.58/live/fhgaek?secret=97e315f6bc44468495841a13acd863a5
```

```shell


ffmpeg -i  rtmp://10.13.0.58/live/livestream -i rtmp://10.13.0.58/live/mbbmao -filter_complex "[1:v]scale=w=500:h=500:force_original_aspect_ratio=decrease[ckout];[0:v][ckout]overlay=x=W-w-10:y=0[out]" -map "[out]" -c:v libx264 -c:a aac  -f flv rtmp://10.13.0.58/live/fhgaek?secret=97e315f6bc44468495841a13acd863a5


```