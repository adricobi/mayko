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

import { getAuth } from "protonode";
import { API, Protofy, getLogger } from "protobase";
import { APIContext } from "protolib/bundles/apiContext";
import { Application } from "express";
import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "..", "..");
const logger = getLogger();

Protofy("type", "CustomAPI");

export default Protofy(
  "code",
  async (app: Application, context: typeof APIContext) => {
    //PUT YOUR API HERE
    //context.deviceAction function allows to communicate with devices via mqtt
    //context.deviceSub allows to receive notifications from devices via mqtt
    //app is a normal expressjs object
    //context.mqtt is a mqttclient connection
    context.automations.automation({
      name: "pumpsuport",
      responseMode: "manual",
      app: app,
      onRun: async (params, res) =>
        await context.flow2.switch({
          condition: params.action == "open",
          then: async (output) =>
            await context.deviceAction(
              "romeo",
              "in1",
              "on",
              undefined,
              async () =>
                await context.deviceAction(
                  "romeo",
                  "in2",
                  "off",
                  undefined,
                  async () =>
                    setTimeout(
                      async () => context.automationResponse(res, "opened"),
                      2000
                    ),
                  null
                ),
              null
            ),
          otherwise: async (output) =>
            await context.deviceAction(
              "romeo",
              "in1",
              "off",
              undefined,
              async () =>
                await context.deviceAction(
                  "romeo",
                  "in2",
                  "on",
                  undefined,
                  async () =>
                    setTimeout(
                      async () => context.automationResponse(res, "closed"),
                      2000
                    ),
                  null
                ),
              null
            ),
        }),
    });
  }
);
