import {Protofy} from 'protobase'
import inoculateApi from "./inoculate";
import pumpApi from "./pump";
import pumpoutApi from "./pumpout";
import moveApi from "./move";
import stopApi from "./stop";
import backwardApi from "./backward";
import forwardApi from "./forward";
import leftApi from "./left";
import rightApi from "./right";
import uploaddefinitionApi from "./uploaddefinition";

const autoApis = Protofy("apis", {
    inoculate: inoculateApi,
    pump: pumpApi,
    pumpout: pumpoutApi,
    move: moveApi,
    stop: stopApi,
    backward: backwardApi,
    forward: forwardApi,
    left: leftApi,
    right: rightApi,
    uploaddefinition: uploaddefinitionApi
})

export default (app, context) => {
    Object.keys(autoApis).forEach((k) => {
        autoApis[k](app, context)
    })
}