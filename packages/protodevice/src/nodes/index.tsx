import dynamic from 'next/dynamic'
import { generateColorbyIndex } from 'protoflow/src/diagram/Theme'

const Wifi = dynamic(() => import('./Wifi'))
const Device = dynamic(() => import('./Device'))
const Mqtt = dynamic(() => import('./Mqtt'))
const DeepSleep = dynamic(() => import('./DeepSleep'))
const BinarySensor = dynamic(() => import('./BinarySensor'))
const NeopixelsBus = dynamic(() => import('./NeopixelsBus'))
const Relay = dynamic(() => import('./Relay'))
const GPIOSwitch = dynamic(() => import('./GPIOSwitch'))
const ADCSensor = dynamic(() => import('./ADCSensor'))
const I2cBus = dynamic(() => import('./I2cBus'))
const PCA9685 = dynamic(() => import('./PCA9685'))
const Ethernet = dynamic(() => import('./Ethernet'))
const Dfplayer = dynamic(() => import('./Dfplayer'))
const ModbusLoadCell = dynamic(() => import('./ModbusLoadCell'))
const TempHumidity = dynamic(() => import('./TempHumidity'))
const MicrofirePhEcTemp = dynamic(() => import('./MicrofirePhEcTemp'))
const SEN55 = dynamic(() => import('./SEN55'))
const MHZ19 = dynamic(() => import('./MHZ19'))
const UARTBus = dynamic(() => import('./UARTBus'))
const MPU6050 = dynamic(() => import('./MPU6050'))
const HX711 = dynamic(() => import('./HX711'))
const A4988 = dynamic(() => import('./A4988'))
// import PulseCounter from "./PulseCounter";
// import LEDCOutput from "./LEDCOutput";
// import PIRSensor from "./PIRSensor"
// import HX711 from "./HX711"
// import CapacitiveSoilMoistureSensor from "./CapacitiveSoilMoistureSensor";
// import NFCReader from "./NFCReader";
// import UltrasonicDistanceSensor from "./UltrasonicDistanceSensor";
// import ISOutput from "./ISOutput";
// import XiaomiMiFlora from "./XiaomiMiFlora";
// import ClimateIR from "./ClimateIR";
// import Servo from "./Servo";
// import Mpr121 from "./Mpr121";
// import TempHumidity from "./TempHumidity";
// import BH1750 from "./BH1750";
// import HM3301 from "./HM3301";
// import SEN0377 from "./SEN0377";
// import MPU6050 from "./MPU6050";
// import I2cSensorMatrix from "./I2cSensorMatrix";
// import SEN55 from "./SEN55";
// import MHZ19 from "./MHZ19";


const deviceMasks = [
  {
    id: 'esp32dev',
    type: 'ArrayLiteralExpression',
    check: (node, nodeData) => node.type == "ArrayLiteralExpression" && nodeData['element-1'] == '"esp32dev"',
    getComponent: (node, nodeData, children) => <Device color={getColor('esp32dev')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: '"esp32dev"' } },
    hidden: true,
    nonDeletable: true
  },
  {
    id: 'Wifi',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('wifi'), //TODO: Change output function name
    getComponent: (node, nodeData, children) => <Wifi color={getColor('Wifi')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'wifi', param1: '"SSID"', param2: '"PASSWORD"', param3: '"none"' } }
  },
  {
    id: 'Mqtt',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('mqtt'), //TODO: Change output function name
    getComponent: (node, nodeData, children) => <Mqtt color={getColor('Mqtt')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'mqtt', param1: '"BROKERADDRESS"', param2: '"1883"' } }
  },
  // {
  //   id: 'DeepSleep',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('deepSleep'), //TODO: Change output function name
  //   getComponent: DeepSleep,
  //   getInitialData: () => { return { to: 'deepSleep', param1: '"10"', param2: '"10"', param3: '' } }
  // },
  {
    id: 'Relay',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('relay'), //TODO: Change output function name
    getComponent: (node, nodeData, children) => <Relay color={getColor('Relay')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'relay', param1: '""', param2: '"ALWAYS_OFF"' } }
  },

  {
    id: 'GPIOSwitch',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('GPIOSwitch'), //TODO: Change output function name
    getComponent: (node, nodeData, children) => <GPIOSwitch color={getColor('GPIOSwitch')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'GPIOSwitch', param1: '""', param2: '"ALWAYS_OFF"' } }
  },

  // This was commented on previous platform versions
  // {
  //   id: 'Output',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('output'), //TODO: Change output function name
  //   getComponent: OutputPin,
  //   getInitialData: () => { return { to: 'output', param1: '""' } }
  // },


  {
    id: 'BinarySensor',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('binarySensor'), //TODO: Change output function name
    getComponent: (node, nodeData, children) => <BinarySensor color={getColor('BinarySensor')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'binarySensor', param1: '""' } }
  },
  {
    id: 'NeopixelsBus',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('neopixelsBus'), //TODO: Change output function name
    getComponent: (node, nodeData, children) => <NeopixelsBus color={getColor('NeopixelsBus')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'neopixelsBus', param1: '""', param2: '16', param3: '"GRB"', param4: '"WS2811"', param5: '"ALWAYS_ON"', param6: '"1s"', param7: '0', param8: false, param9: false, param10: false, param11: false, param12: false, param13: false, param14: false, param15: false, param16: false, param17: false, param18: false } }
  },
  {
    id: 'ADCSensor',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('adcSensor'),
    getComponent: (node, nodeData, children) => <ADCSensor color={getColor('ADCSensor')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'adcSensor', param1: '"analogic"', param2: '"30s"', param3: '"auto"' } }
  },
  {
    id: 'I2cBus',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('i2cBus'),
    getComponent: (node, nodeData, children) => <I2cBus color={getColor('I2cBus')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'i2cBus', param1: '""', param2: '22', param3: true } }
  },
  {
    id: 'UARTBus',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('uartBus'),
    getComponent: (node, nodeData, children) => <UARTBus color={getColor('UARTBus')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'uartBus', param1: '""', param2: '17', param3: '"9600"' } }
  },
  {
    id: 'PCA9685',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('pca9685'),
    getComponent: (node, nodeData, children) => <PCA9685 color={getColor('PCA9685')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'pca9685', param1: '""', param2: '1000', param3: false, param4: '0x40', param5: '""' } }
  },
  {
    id: 'Ethernet',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('ethernet'),
    getComponent: (node, nodeData, children) => <Ethernet color={getColor('Ethernet')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'ethernet', param1: '"LAN8720"', param2: '23', param3: '18', param4: '"GPIO17_OUT"', param5: '0', param6: '12' } }
  },
  {
    id: 'TempHumidity',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('tempHumidity'),
    getComponent: (node, nodeData, children) => <TempHumidity color={getColor('TempHumidity')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'tempHumidity', param1: '"temperaturehumidity"', param2: '"DHT22"', param3: '"60s"' } }
  },
  {
    id: 'MicrofirePhEcTemp',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('microfirePhEcTemp'),
    getComponent: (node, nodeData, children) => <MicrofirePhEcTemp color={getColor('MicrofirePhEcTemp')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'microfirePhEcTemp', param1: '"phectemp"', param2: 22, param3: '"60s"' } }
  },
  // {
  //   id: 'PulseCounter',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('pulseCounter'),
  //   getComponent: PulseCounter,
  //   getInitialData: () => { return { to: 'pulseCounter', param1: '""' } }
  // },
  // {
  //   id: 'LEDCOutput',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('ledcOutput'),
  //   getComponent: LEDCOutput,
  //   getInitialData: () => { return { to: 'ledcOutput', param1: '""', param2: '"1000Hz"' } }
  // },
  // {
  //   id: 'PIRSensor',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('pirSensor'),
  //   getComponent: PIRSensor,
  //   getInitialData: () => { return { to: 'pirSensor', param1: '""' } }
  // },
  {
    id: 'HX711',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('hx711'),
    getComponent: (node, nodeData, children) => <HX711 color={getColor('HX711')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'hx711', param1: '""', param2: '', param3: '"128"', param4: '"60s"' } }
  },
  {
    id: 'A4988',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('a4988'),
    getComponent: (node, nodeData, children) => <A4988 color={getColor('A4988')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'a4988', param1: '""', param2: '""', param3: '"250 steps/s"', param4: '"none"', param5: '"inf"', param6: '"inf"' } }
  },

  // {
  //   id: 'Dfplayer',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('dfplayer'),
  //   getComponent: Dfplayer,
  //   getInitialData: () => { return { to: 'dfplayer', param1: '""', param2: '', param3: '' } }
  // },
  // {
  //   id: 'UltrasonicDistanceSensor',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('ultrasonicDistanceSensor'),
  //   getComponent: UltrasonicDistanceSensor,
  //   getInitialData: () => { return { to: 'ultrasonicDistanceSensor', param1: '""', param2: '', param3: '"60s"', param4: '"2.0m"' } }
  // },
  // {
  //   id: 'CapacitiveSoilMoistureSensor',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('capacitiveSoilMoistureSensor'),
  //   getComponent: CapacitiveSoilMoistureSensor,
  //   getInitialData: () => { return { to: 'capacitiveSoilMoistureSensor', param1: '""', param2: '"30s"' } }
  // },
  // {
  //   id: 'NFCReader',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('nfcReader'),
  //   getComponent: NFCReader,
  //   getInitialData: () => { return { to: 'nfcReader', param1: '""', param2: '"22"' } }
  // },
  // {
  //   id: 'ISOutput',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('isOutput'),
  //   getComponent: ISOutput,
  //   getInitialData: () => { return { to: 'isOutput', param1: '""' } }
  // },
  // {
  //   id: 'XiaomiMiFlora',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('xiaomiMiFlora'),
  //   getComponent: XiaomiMiFlora,
  //   getInitialData: () => { return { to: 'xiaomiMiFlora', param1: '""', param2: '""' } }
  // },
  // {
  //   id: 'ClimateIR',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('climateIR'),
  //   getComponent: ClimateIR,
  //   getInitialData: () => { return { to: 'climateIR', param1: '""', param2: '""', param3: '"auto"', param4: '"auto"', param5: '"30"', param6: '"16"' } }
  // },
  // {
  //   id: 'Servo',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('servo'),
  //   getComponent: Servo,
  //   getInitialData: () => { return { to: 'servo', param1: '""' } }
  // },
  // {
  //   id: 'Mpr121',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('mpr121'),
  //   getComponent: Mpr121,
  //   getInitialData: () => { return { to: 'mpr121', param1: '""', param2: '"22"', param3: false, param4: false, param5: false, param6: false, param7: false, param8: false, param9: false, param10: false, param11: false, param12: false, param13: false, param14: false } }
  // },
  // {
  //   id: 'ModbusLoadCell',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('modbusLoadCell'),
  //   getComponent: ModbusLoadCell,
  //   getInitialData: () => { return { to: 'modbusLoadCell', param1: '""', param2: '""', param3: '""', param4: '"2s"', param5: '3', param6: '2', param7: '5'} }
  // }
  // {
  //   id: 'BH1750',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('bh1750'),
  //   getComponent: BH1750,
  //   getInitialData: () => { return { to: 'bh1750', param1: '""', param2: '22', param3: '"0x23"', param4: '"30s"'} }
  // },
  // {
  //   id: 'HM3301',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('hm3301'),
  //   getComponent: HM3301,
  //   getInitialData: () => { return { to: 'hm3301', param1: '""', param2: '22', param3: '"0x40"', param4: '"30s"'} }
  // },
  // {
  //   id: 'SEN0377',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('sen0377'),
  //   getComponent: SEN0377,
  //   getInitialData: () => { return { to: 'sen0377', param1: '""', param2: '22', param3: '"0x75"', param4: '"30s"'} }
  // },
  {
    id: 'MPU6050',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('mpu6050'),
    getComponent: (node, nodeData, children) => <MPU6050 color={getColor('MPU6050')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'mpu6050', param1: '""', param2: '""', param3: '"0x68"', param4: '"30s"' } }
  },
  // {
  //   id: 'I2cSensorMatrix',
  //   type: 'CallExpression',
  //   check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('i2cSensorMatrix'),
  //   getComponent: I2cSensorMatrix,
  //   getInitialData: () => { return { to: 'i2cSensorMatrix', param1: '""', param2: '22', param3: '"30s"', param4: '"0x23"', param5: '"0x40"', param6: '"0x75"', param7: '"0x68"'} }
  // },
  {
    id: 'SEN55',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('sen55'),
    getComponent: (node, nodeData, children) => <SEN55 color={getColor('SEN55')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'sen55', param1: '""', param2: '""', param3: '"0x69"', param4: '"30s"' } }
  },
  {
    id: 'MHZ19',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('mhz19'),
    getComponent: (node, nodeData, children) => <MHZ19 color={getColor('MHZ19')} node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'mhz19', param1: '""', param2: '""', param3: '"30s"' } }
  },
]

const masksLength = deviceMasks.length
export const getColor = (id) => {
  // To future refactor: 
  // If you try to find index by "e.check(...)"" instead "e.id == id" on node menu doesn't get the color
  const index = deviceMasks.findIndex(e => e.id == id)
  const col = generateColorbyIndex(index, masksLength)

  return col
}


export default deviceMasks.map((e) => {
  return {
    ...e,
    capabilities: ["esphome"]
  };
});