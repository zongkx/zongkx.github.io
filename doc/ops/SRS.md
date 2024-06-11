## doc

- [FFMPEG转码部署实例](https://github.com/ossrs/srs/wiki/v2_CN_SampleFFMPEG)
- [Live Streaming Transcode](https://github.com/ossrs/srs/wiki/v2_CN_FFMPEG)

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

# 
ffmpeg -i  rtmp://10.13.0.58/live/fdjefg -i rtmp://10.13.0.58/live/bhekhc -filter_complex "[1:v]scale=w=500:h=500:force_original_aspect_ratio=decrease[ckout];[0:v][ckout]overlay=x=W-w-10:y=0[out]" -map "[out]" -c:v libx264 -c:a aac  -f flv rtmp://10.13.0.58/live/acfgab?secret=017b487efd374e4099e9f31ebd80f67c

#
ffmpeg -i rtmp://10.13.0.58/live/fdjefg -i rtmp://10.13.0.58/live/bhekhc -filter_complex "[1:v]scale=w=500:h=500:force_original_aspect_ratio=decrease[ckout]; [0:v][ckout]overlay=x=W-w-10:y=0[outv]; [0:a][1:a]amix=inputs=2[outa]" -map "[outv]" -map "[outa]" -c:v libx264 -c:a aac -f flv rtmp://10.13.0.58/live/acfgab?secret=017b487efd374e4099e9f31ebd80f67c

```

## JAVA SDK

```xml

<dependency>
    <groupId>net.bramp.ffmpeg</groupId>
    <artifactId>ffmpeg</artifactId>
    <version>0.8.0</version>
</dependency>
```

```xml

<dependency>
    <groupId>org.bytedeco</groupId>
    <artifactId>opencv-platform</artifactId>
    <version>4.9.0-1.5.10</version>
</dependency>
```

```java

@Test
@SneakyThrows
public void a1() {
    FFmpeg ffmpeg = new FFmpeg("C:\\Windows\\TEMP\\jave\\ffmpeg-amd64-3.5.0.exe");
    String input = "rtmp://47.107.118.140/live/livestream";
    String output = "rtmp://47.107.118.140/live/fpblfe?secret=7f31562537ba493384827b6fb0ae87cb";

    FFmpegBuilder builder = new FFmpegBuilder()
            .setInput(input)     // 设置输入流
            .overrideOutputFiles(true) // 如果输出文件存在，自动覆盖
            .addOutput(output)   // 设置输出流
            .disableSubtitle()       // No subtiles
            .setAudioChannels(1)         // Mono audio
            .setAudioCodec("aac")        // using the aac codec
            .setAudioSampleRate(48_000)  // at 48KHz
            .setAudioBitRate(32768)      // at 32 kbit/s
            .setFormat("flv")        // 设置输出格式
            .setVideoCodec("libx264")     // Video using x264
            .setVideoFrameRate(24, 1)     // at 24 frames per second
            .setVideoResolution(1280, 720)  // 设置输出分辨率
            .done();
    FFmpegExecutor executor = new FFmpegExecutor(ffmpeg);
    FFmpegJob job = executor.createJob(builder, progress -> System.out.printf(progress.status + "" + progress.frame));
    job.run();

}


@Test
@SneakyThrows
public void a2() {
    FFmpeg ffmpeg = new FFmpeg("C:\\Windows\\TEMP\\jave\\ffmpeg-amd64-3.5.0.exe");
    String input2 = "rtmp://192.168.8.92/live/cbamdd";
    String input1 = "rtmp://192.168.8.92/live/pejfck";
    String output = "rtmp://192.168.8.92/live/lgcfmb?secret=e88f9b13ec9f405bbde1d87cf64ea3be";


    FFmpegBuilder builder = new FFmpegBuilder()
            .addInput(input1)     // 设置输入流
            .addInput(input2)
            .overrideOutputFiles(true) // 如果输出文件存在，自动覆盖
            .addOutput(output)   // 设置输出流
            .disableSubtitle()       // No subtiles
            .setAudioChannels(1)         // Mono audio
            .setAudioCodec("aac")        // using the aac codec
            .setAudioSampleRate(48_000)  // at 48KHz
            .setAudioBitRate(32768)      // at 32 kbit/s
            .setFormat("flv")        // 设置输出格式
            .setVideoCodec("libx264")     // Video using x264
            .setVideoFrameRate(24, 1)     // at 24 frames per second
            .setVideoResolution(1280, 720)  // 设置输出分辨率
            .setVideoBitRate(2000 * 1000)//设置比特率 yu .setVideoQuality(4)互斥
            .addExtraArgs(
                    //                        "-filter_complex", "[1:v]scale=w=500:h=500:force_original_aspect_ratio=decrease[ckout]; [0:v][ckout]overlay=x=W-w-50:y=0[outv]; [0:a][1:a]amix=inputs=2[outa]",
                    "-filter_complex", "[1:v]scale=w=500:h=500:force_original_aspect_ratio=decrease[ckout]; [0:v][ckout]overlay=x=W-w-50:y=0[outv]",
                    "-map", "[outv]",
                    "-preset", "ultrafast",
                    "-tune", "zerolatency"
                    //                        "-map", "[outa]"

            ).done()
            .addExtraArgs("-hwaccel", "cuda");// 使用cuda 加速

    FFmpegExecutor executor = new FFmpegExecutor(ffmpeg);

    FFmpegJob job = executor.createJob(builder);
    job.run();

}


@Test
@SneakyThrows
public void a1231() {
    FFmpeg ffmpeg = new FFmpeg("C:\\Windows\\TEMP\\jave\\ffmpeg-amd64-3.5.0.exe");
    String input = "rtmp://192.168.8.92/live/dedepe";
    String output = "rtmp://192.168.8.92/live/dmelag?secret=e88f9b13ec9f405bbde1d87cf64ea3be";

    FFmpegBuilder builder = new FFmpegBuilder()
            .setInput(input)     // 设置输入流
            //                .addExtraArgs("-stream_loop", "-1")
            //                .addExtraArgs("-f", "gdigrab")
            .overrideOutputFiles(true) // 如果输出文件存在，自动覆盖
            .addOutput(output)   // 设置输出流
            .disableSubtitle()       // No subtiles
            .setAudioChannels(1)         // Mono audio
            .setAudioCodec("aac")        // using the aac codec
            .setAudioSampleRate(48_000)  // at 48KHz
            .setAudioBitRate(32768)      // at 32 kbit/s
            .setFormat("flv")        // 设置输出格式
            .setVideoCodec("libx264")     // Video using x264
            .setVideoFrameRate(24, 1)     // at 24 frames per second
            .setVideoResolution(1280, 720)  // 设置输出分辨率
            .addExtraArgs("-preset", "ultrafast")
            .done().addExtraArgs("-hwaccel", "cuda");// 使用cuda 加速
    FFmpegExecutor executor = new FFmpegExecutor(ffmpeg);
    FFmpegJob job = executor.createJob(builder);
    job.run();
    //
    //  C:\Windows\TEMP\jave\ffmpeg-amd64-3.5.0.exe -f dshow -i video="UVC Camera" -vcodec libx264 -s 1280x720 -r 24/1 -acodec aac -ac 1 -ar 48000 -b:a 32768 -sn  rtmp://192.168.8.92/live/dmelag?secret=e88f9b13ec9f405bbde1d87cf64ea3be
    //   C:\Windows\TEMP\jave\ffmpeg-amd64-3.5.0.exe -list_devices true -f dshow -i dummy
    //  C:\Windows\TEMP\jave\ffmpeg-amd64-3.5.0.exe -f gdigrab -i desktop -vcodec libx264 -preset ultrafast -maxrate 1984k -bufsize 3968k -vf "format=yuv420p" -g 60 -f flv "rtmp://10.13.0.58/live/livestream?secret=b29af544cb824c6db8c84946ed501234"
    // C:\Windows\TEMP\jave\ffmpeg-amd64-3.5.0.exe -y  -v error   -f dshow -i video="UVC Camera"  -f flv -vcodec libx264 -preset ultrafast -s 1280x720 -r 24/1 -acodec aac -ac 1 -ar 48000 -b:a 32768 -sn rtmp://192.168.8.92/live/dmelag?secret=e88f9b13ec9f405bbde1d87cf64ea3be
    // C:\Windows\TEMP\jave\ffmpeg-amd64-3.5.0.exe  -f dshow   -i video="UVC Camera"  -f flv -vcodec libx264 -preset ultrafast -s 1280x720 -r 24/1 -acodec aac -ac 1 -ar 48000 -b:a 32768 -sn rtmp://10.13.0.58/live/ehkdab?secret=fe6c44b4599d4290ab040ef99ee728d3
}

@Test
@SneakyThrows
public void a123222() {
    FFmpeg ffmpeg = new FFmpeg("C:\\Windows\\TEMP\\jave\\ffmpeg-amd64-3.5.0.exe");
    String input = "C:\\Users\\zongkuoxiong\\Videos\\time2.mp4";
    String output = "rtmp://10.13.0.58/live/ehkdab?secret=fe6c44b4599d4290ab040ef99ee728d3";
    // -stream_loop -1 /time2.mp4 -f flv -vcodec libx264 -s 1280x720 -r 24/1 -acodec aac -ac 1 -ar 48000 -b:a 32768 -sn rtmp://10.13.0.58/live/ehkdab?secret=fe6c44b4599d4290ab040ef99ee728d3
    FFmpegBuilder builder = new FFmpegBuilder()
            .setInput(input)     // 设置输入流
            .addExtraArgs("-stream_loop", "-1")
            .overrideOutputFiles(true) // 如果输出文件存在，自动覆盖
            .addOutput(output)   // 设置输出流
            .disableSubtitle()       // No subtiles
            .setAudioChannels(1)         // Mono audio
            .setAudioCodec("aac")        // using the aac codec
            .setAudioSampleRate(48_000)  // at 48KHz
            .setAudioBitRate(32768)      // at 32 kbit/s
            .setFormat("flv")        // 设置输出格式
            .setVideoCodec("libx264")     // Video using x264
            .setVideoFrameRate(24, 1)     // at 24 frames per second
            .setVideoResolution(1280, 720)  // 设置输出分辨率
            .done().addExtraArgs("-hwaccel", "cuda");// 使用cuda 加速
    FFmpegExecutor executor = new FFmpegExecutor(ffmpeg);
    FFmpegJob job = executor.createJob(builder);
    job.run();

}

```