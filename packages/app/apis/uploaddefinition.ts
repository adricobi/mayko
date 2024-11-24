/*

app is an express object, you can use app.get/app.post to create new endpoints
you can define newendpoints like:

app.get('/api/v1/testapi', (req, res) => {
    //you code goes here
    //reply with res.send(...)
})

the session argument is a session object, with the following shape:
{
    user: { admin: boolean, id: string, type: string },
    token: string,
    loggedIn: boolean
}

use the chat if in doubt
*/

import { getAuth,getServiceToken} from "protonode";
import { API, Protofy, getLogger } from "protobase";
import { APIContext } from "protolib/bundles/apiContext";
import { Application } from "express";
import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "..", "..");
const logger = getLogger();

Protofy("type", "CustomAPI");

const deviceDef = {
  device: false,
  name: "prova2",
  board: {
    id: "5",
    name: "ESP32 S3 Romeo",
    core: "esp32s3",
    ports: [
      {
        number: 1,
        side: "left",
        name: "3V3",
        type: "P",
        analog: false,
        description: "3.3 V power supply",
        maxVoltage: 3.3,
        rtc: false,
      },
      {
        number: 2,
        side: "left",
        name: "3V3",
        type: "P",
        analog: false,
        description: "3.3 V power supply",
        maxVoltage: 3.3,
        rtc: false,
      },
      {
        number: 3,
        side: "left",
        name: "RST",
        type: "I",
        analog: false,
        description: "EN",
        maxVoltage: 3.3,
        rtc: false,
      },
      {
        number: 4,
        side: "left",
        name: "4",
        type: "IO",
        analog: true,
        description: "RTC_GPIO4, GPIO4, TOUCH4, ADC1_CH3",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 5,
        side: "left",
        name: "5",
        type: "IO",
        analog: true,
        description: "RTC_GPIO5, GPIO5, TOUCH5, ADC1_CH4",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 6,
        side: "left",
        name: "6",
        type: "IO",
        analog: true,
        description: "RTC_GPIO6, GPIO6, TOUCH6, ADC1_CH5",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 7,
        side: "left",
        name: "7",
        type: "IO",
        analog: true,
        description: "RTC_GPIO7, GPIO7, TOUCH7, ADC1_CH6",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 8,
        side: "left",
        name: "15",
        type: "IO",
        analog: true,
        description: "RTC_GPIO15, GPIO15, U0RTS, ADC2_CH4, XTAL_32K_P",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 9,
        side: "left",
        name: "16",
        type: "IO",
        analog: true,
        description: "RTC_GPIO16, GPIO16, U0CTS, ADC2_CH5, XTAL_32K_N",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 10,
        side: "left",
        name: "17",
        type: "IO",
        analog: true,
        description: "RTC_GPIO17, GPIO17, U1TXD, ADC2_CH6",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 11,
        side: "left",
        name: "18",
        type: "IO",
        analog: true,
        description: "RTC_GPIO18, GPIO18, U1RXD, ADC2_CH7, CLK_OUT3",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 12,
        side: "left",
        name: "8",
        type: "IO",
        analog: true,
        description: "RTC_GPIO8, GPIO8, TOUCH8, ADC1_CH7, SUBSPICS1",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 13,
        side: "left",
        name: "3",
        type: "IO",
        analog: true,
        description: "RTC_GPIO3, GPIO3, TOUCH3, ADC1_CH2",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 14,
        side: "left",
        name: "46",
        type: "IO",
        analog: true,
        description: "GPIO46",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 15,
        side: "left",
        name: "9",
        type: "IO",
        analog: true,
        description: "RTC_GPIO9, GPIO9, TOUCH9, ADC1_CH8, FSPIHD, SUBSPIHD",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 16,
        side: "left",
        name: "10",
        type: "IO",
        analog: true,
        description:
          "RTC_GPIO10, GPIO10, TOUCH10, ADC1_CH9, FSPICS0, FSPIIO4, SUBSPICS0",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 17,
        side: "left",
        name: "11",
        type: "IO",
        analog: true,
        description:
          "RTC_GPIO11, GPIO11, TOUCH11, ADC2_CH0, FSPID, FSPIIO5, SUBSPID",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 18,
        side: "left",
        name: "12",
        type: "IO",
        analog: true,
        description:
          "RTC_GPIO12, GPIO12, TOUCH12, ADC2_CH1, FSPICLK, FSPIIO6, SUBSPICLK",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 19,
        side: "left",
        name: "13",
        type: "IO",
        analog: true,
        description:
          "RTC_GPIO13, GPIO13, TOUCH13, ADC2_CH2, FSPIQ, FSPIIO7, SUBSPIQ",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 20,
        side: "left",
        name: "14",
        type: "IO",
        analog: true,
        description:
          "RTC_GPIO14, GPIO14, TOUCH14, ADC2_CH3, FSPIWP, FSPIDQS, SUBSPIWP",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 21,
        side: "left",
        name: "5V",
        type: "P",
        analog: false,
        description: "5 V power supply",
        maxVoltage: 5,
        rtc: false,
      },
      {
        number: 22,
        side: "left",
        name: "GND",
        type: "G",
        analog: false,
        description: "Ground",
        maxVoltage: 0,
        rtc: false,
      },
      {
        number: 1,
        side: "right",
        name: "GND",
        type: "G",
        analog: false,
        description: "Ground",
        maxVoltage: 0,
        rtc: false,
      },
      {
        number: 2,
        side: "right",
        name: "TX",
        type: "IO",
        analog: true,
        description: "U0TXD, GPIO43, CLK_OUT1",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 3,
        side: "right",
        name: "RX",
        type: "IO",
        analog: true,
        description: "U0RXD, GPIO44, CLK_OUT2",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 4,
        side: "right",
        name: "1",
        type: "IO",
        analog: true,
        description: "RTC_GPIO1, GPIO1, TOUCH1, ADC1_CH0",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 5,
        side: "right",
        name: "2",
        type: "IO",
        analog: true,
        description: "RTC_GPIO2, GPIO2, TOUCH2, ADC1_CH1",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 6,
        side: "right",
        name: "42",
        type: "IO",
        analog: true,
        description: "MTMS, GPIO42",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 7,
        side: "right",
        name: "41",
        type: "IO",
        analog: true,
        description: "MTDI, GPIO41, CLK_OUT1",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 8,
        side: "right",
        name: "40",
        type: "IO",
        analog: true,
        description: "MTDO, GPIO40, CLK_OUT2",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 9,
        side: "right",
        name: "39",
        type: "IO",
        analog: true,
        description: "MTCK, GPIO39, CLK_OUT3, SUBSPICS1",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 10,
        side: "right",
        name: "38",
        type: "IO",
        analog: true,
        description: "GPIO38, FSPIWP, SUBSPIWP, RGB LED",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 11,
        side: "right",
        name: "37",
        type: "IO",
        analog: true,
        description: "SPIDQS, GPIO37, FSPIQ, SUBSPIQ",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 12,
        side: "right",
        name: "36",
        type: "IO",
        analog: true,
        description: "SPIIO7, GPIO36, FSPICLK, SUBSPICLK",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 13,
        side: "right",
        name: "35",
        type: "IO",
        analog: true,
        description: "SPIIO6, GPIO35, FSPID, SUBSPID",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 14,
        side: "right",
        name: "0",
        type: "IO",
        analog: true,
        description: "RTC_GPIO0, GPIO0",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 15,
        side: "right",
        name: "45",
        type: "IO",
        analog: true,
        description: "GPIO45",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 16,
        side: "right",
        name: "48",
        type: "IO",
        analog: true,
        description: "GPIO48, SPICLK_N, SUBSPICLK_N_DIFF",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 17,
        side: "right",
        name: "47",
        type: "IO",
        analog: true,
        description: "GPIO47, SPICLK_P, SUBSPICLK_P_DIFF",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 18,
        side: "right",
        name: "21",
        type: "IO",
        analog: true,
        description: "RTC_GPIO21, GPIO21",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 19,
        side: "right",
        name: "20",
        type: "IO",
        analog: true,
        description: "RTC_GPIO20, GPIO20, U1CTS, ADC2_CH9, CLK_OUT1, USB_D+",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 20,
        side: "right",
        name: "19",
        type: "IO",
        analog: true,
        description: "RTC_GPIO19, GPIO19, U1RTS, ADC2_CH8, CLK_OUT2, USB_D-",
        maxVoltage: 3.3,
        rtc: true,
      },
      {
        number: 21,
        side: "right",
        name: "GND",
        type: "G",
        analog: false,
        description: "Ground",
        maxVoltage: 0,
        rtc: false,
      },
      {
        number: 22,
        side: "right",
        name: "GND",
        type: "G",
        analog: false,
        description: "Ground",
        maxVoltage: 0,
        rtc: false,
      },
    ],
    config: {
      "esphome-arduino": {
        esphome: {
          platformio_options: {
            build_flags: ["-DARDUINO_USB_CDC_ON_BOOT=1"],
          },
        },
        esp32: {
          board: "esp32-s3-devkitc-1",
          variant: "esp32s3",
          flash_size: "16Mb",
          framework: {
            type: "arduino",
          },
        },
      },
      "esphome-idf": {
        esphome: {
          platformio_options: {
            build_flags: ["-DARDUINO_USB_CDC_ON_BOOT=1"],
          },
        },
        esp32: {
          board: "esp32-s3-devkitc-1",
          variant: "esp32s3",
          flash_size: "16Mb",
          framework: {
            type: "esp-idf",
            version: "latest",
            platform_version: "6.6.0",
          },
        },
      },
    },
  },
  sdk: "esphome-arduino",
  config: {
    components:
      '[\n  "mydevice",\n  "ESP32 S3 Romeo",\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n\n  relay("in3", "ALWAYS_OFF"),\n  null,\n\n  relay("in2", "ALWAYS_OFF"),\n\n  ledcOutput("m3speed", "50 Hz"),\n\n  relay("m3dir", "ALWAYS_ON"),\n\n  relay("m4dir", "ALWAYS_OFF"),\n\n  ledcOutput("m1speed", "1220Hz"),\n\n  relay("m1dir", "ALWAYS_ON"),\n\n  ledcOutput("m2speed", "1220Hz"),\n  null,\n  null,\n  null,\n  null,\n  null,\n\n  mqtt("192.168.0.250"),\n\n  wifi("DEMOFY", "PR0T0FY100", "none"),\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  null,\n  relay("in4", "ALWAYS_OFF"),\n\n  relay("in1", "ALWAYS_OFF"),\n\n  ledcOutput("m4speed", "1220Hz"),\n\n  relay("m2dir", "ALWAYS_OFF"),\n  ,\n  null,\n  null,\n  null,\n];\n',
    sdkConfig: {
      esphome: {
        platformio_options: {
          build_flags: ["-DARDUINO_USB_CDC_ON_BOOT=1"],
        },
      },
      esp32: {
        board: "esp32-s3-devkitc-1",
        variant: "esp32s3",
        flash_size: "16Mb",
        framework: {
          type: "arduino",
        },
      },
    },
  },
};

export default Protofy(
  "code",
  async (app: Application, context: typeof APIContext) => {
    //PUT YOUR API HERE
    //context.deviceAction function allows to communicate with devices via mqtt
    //context.deviceSub allows to receive notifications from devices via mqtt
    //app is a normal expressjs object
    //context.mqtt is a mqttclient connection
    context.automations.automation({
      name: "uploaddefinition",
      responseMode: "wait",
      app: app,
      onRun: async (params, res) =>
        await API.post("/api/core/v1/devicedefinitions?token="+ getServiceToken(),deviceDef),
    });
  }
);
