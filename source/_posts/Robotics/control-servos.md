title: 舵机控制实验
date: 2016/12/19 20:00:00
tags: [Ionic 2,Hexapod,舵机]
categories: [机器人]
---
## 总体思路
使用手机对舵机进行控制，使用ESP8266作为接收端，主控程序也直接烧入到里面，因为本身WIFI模块才占用自身的`MCU`(Micro Compute Unit)20%的计算量，
ESP的MCU要比Arduino的还要强大，所以作为主控是没有问题的，这次我使用的是ESP8266-12F，先烧入测试程序到ESP中，看看是否能使用`I2C`(Inter-Integrated Circuit)来和舵机控制板进行通信控制，之后再使用手机上的软件通过Websocket和ESP通信，从而控制舵机。
## 所需材料

 * 手机(android 4.5以上运行 Ionic 2)
 * 9g 舵机
 * ESP8266 WIFI 模块
 * 16路舵机控制板(PCA9685)
 * PL2303 USB转串口 (USB to UART converter)
 * 6V 电源，供舵机使用(power supply)，能够提供的最大电流至少 2A 以上
 * 5A 降压模块(四足的话3A就够，12个9g舵机最大电流在2A左右)
 * 面包板(bread board)
 * 一些线(some wires)

<!--more-->
## ESP8266-12F 控制舵机
关于如何将舵机连上PCA9685控制板，参考[here][Adafruit 16-Channel Servo Driver with Arduino]只要这个测试没有问题，测试ESP也是差不多的，只是使用UART(Universal Asynchronous Recevier/Transmitter)烧入接线会有点不同。

### 烧入测试程序
到这步，说明你的舵机已经连上控制板，并能跑起来[Adafruit_PWMServoDriver][Adafruit_PWMServoDriver]中的`servo`示例程序。现在要做的是把这个示例程序直接烧录到ESP上，根据[datasheet][ESP8266-12F datasheet]中的介绍:
![ESP8266-12 UART download mode](http://7xoed1.com1.z0.glb.clouddn.com/2017/robotics/ESP8266-12_UART_download_mode.png "ESP8266-12烧录模式")
如果要开启烧录模式，先需要将GPIO0和GPIO15拉低(接GND)，GPIO2拉高(接VCC)。
再按照如下方式把ESP和PL2303进行连接：
```
PL2303 <------> ESP8266-12F
  RX   <------>   TX  
  TX   <------>   RX 
  GND  <------>   GND
```
之后打开Arduino IDE，依次选择：
 1、Tools -> Board -> Generic ESP8266 Module
 2、Port -> 选择你相应的UART
 3、upload Adafruit_PWMServoDriver库中的servo测试示例代码到ESP8266中
 4、重新启动ESP

如果出现如下错误信息：
```
error: espcomm_open failed
error: espcomm_upload_mem failed
```
可以将ESP的电源断开，再连接，之后马上进行Upload操作。

**注意**：这里遇到一个问题，就是官方的Adafruit_PWMServoDriver库，在ESP8266下使用有点问题，我是编译的时候无法通过，找不到`Wire1`,所以我就自己把源文件作了一些简单修改，具体原因没有深究。修改`Adafruit_PWMServoDriver.cpp`文件内代码，参考如下：
```
修改前
#if defined(ARDUINO_SAM_DUE)
 #define WIRE Wire1
#else
 #define WIRE Wire
#endif
修改后
#define WIRE Wire
```

到这已经能够使用ESP与PCA9685来控制舵机。


### ESP8266 WebSocket 通信测试
将ESP设置成[SAP][ESP8266 Soft Access Point](Soft Access Point)模式，让手机去连接ESP所开启的WebSocket服务，并简单的向ESP发送0-180(220-520)的数值，这里的传输格式选用JSON，方便后期扩展。
```
## 备注
### pulse width for 9g servos
```
#define SERVOMIN  220 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  520 // this is the 'maximum' pulse length count (out of 4096)
```
这里在两侧各留几度角，防止扫齿。


## 参考资料

 * [Calculating Voltage, Resistance and Current for Resistors in Parallel (YouTube) ](https://www.youtube.com/watch?v=WT6wbh39MX4)
 * [Arduino WiFi Control with ESP8266 Module](http://androidcontrol.blogspot.com/2015/05/arduino-wifi-control-with-esp8266-module.html)
 * [ESP8266 WiFi Control Relay](http://androidcontrol.blogspot.com/2016/05/esp8266-wifi-control-relay.html)
 * [A Guide to Understanding LiPo Batteries](http://rogershobbycenter.com/lipoguide/)
 * [Orientation and motion data explained](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained)
 * [ESP8266 Library](https://github.com/esp8266/Arduino/blob/master/doc/esp8266wifi/readme.md#quick-start)
 * [ESP8266 Server](https://github.com/esp8266/Arduino/blob/master/doc/esp8266wifi/server-examples.md)
 * [Embedded System Using JSON](https://github.com/bblanchon/ArduinoJson)
 * [ESP8266+Websocket server RGB LED controller](http://www.instructables.com/id/Esp8266Websockets-RGB-LED-controller/)
 * [Arduino WebSocket Library](https://github.com/Links2004/arduinoWebSockets)
 * [Adafruit 16-Channel Servo Driver with Arduino][Adafruit 16-Channel Servo Driver with Arduino]
 * [ESP8266-12F Datasheet][ESP8266-12F Datasheet]
 * [PCA9685 DataSheet][PCA9685 Datasheet]

[OTA Update]:https://github.com/esp8266/Arduino/blob/master/doc/ota_updates/readme.md
[Adafruit 16-Channel Servo Driver with Arduino]:https://learn.adafruit.com/16-channel-pwm-servo-driver/overview
[ESP8266-12F Datasheet]:http://www.mikrocontroller.net/attachment/286085/ESP8266-12F_Tronixlabs_Australia.pdf
[Adafruit_PWMServoDriver]:https://github.com/adafruit/Adafruit-PWM-Servo-Driver-Library
[ESP8266 Soft Access Point]:https://github.com/esp8266/Arduino/blob/master/doc/esp8266wifi/readme.md#soft-access-point
[PCA9685 Datasheet]:https://cdn-shop.adafruit.com/datasheets/PCA9685.pdf