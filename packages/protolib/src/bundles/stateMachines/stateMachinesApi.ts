import path from 'path'
import { promises as fs } from 'fs'
import { getRoot } from 'protonode'
import { StateMachine } from './stateMachine'
import { AutoAPI } from 'protonode'
import { StateMachineModel } from './stateMachineSchema'

export const StateMachinesAPI = (app, context) => {
  const runtimeMachines: { [key: string]: StateMachine } = {}
  const machineDefinitions = context.machineDefinitions

  const getDB = (path, req, session) => {
    const db = {
      async *iterator() {
        for (let i = 0; i < Object.keys(runtimeMachines).length; i++) {
          const instanceName = Object.keys(runtimeMachines).sort()[i] // sort to guarantee order
          let instanceData = {}

          try {
            instanceData = runtimeMachines[instanceName].inspect()
          } catch (e) {
            console.error("Error getting machine instances: ", e)
          }

          yield [instanceName, JSON.stringify({
            name: instanceName,
            ...instanceData
          })]
        }
      },

      async del(key, value) {

      },

      async put(key, value) {
        // manually handled 
      },

      async get(key) {
      }
    };

    return db;
  }

  const checkMachineInstanceName = (req, res, next) => {
    if (!runtimeMachines[req.params.instanceName]) {
      return res.status(404).json({ status: "Machine instance not found" })
    }

    next()
  }

  const autoAPI = AutoAPI({
    modelName: 'statemachines',
    modelType: StateMachineModel,
    prefix: '/adminapi/v1/',
    getDB: getDB,
    connectDB: () => new Promise(resolve => resolve(null)),
    requiresAdmin: ['*'],
    useEventEnvironment: false,
    useDatabaseEnvironment: false
  })
  autoAPI(app, context)

  // get all machines inspection
  app.get("/adminapi/v1/statemachines/inspect", async (req, res) => {
    const inspections = []

    try {
      Object.keys(runtimeMachines).forEach(machine => {
        let machineInspectionData = {
          name: machine,
          ...runtimeMachines[machine].inspect()
        }
        inspections.push(machineInspectionData)
      })
    } catch (e) {
      console.error("Cannot inspect machines instances", e)
      return res.status(500).json({ status: "Cannot inspect machines instances" })
    }

    return res.status(200).json({ status: "Ok", machines: inspections })
  })

  // get instance
  app.get("/adminapi/v1/statemachines/:instanceName", checkMachineInstanceName, async (req, res) => {
    return res.status(200).json({ status: "Ok", [req.params.instanceName]: runtimeMachines[req.params.instanceName] })
  })

  // start and stop instance
  app.get("/adminapi/v1/statemachines/:instanceName/start", checkMachineInstanceName, async (req, res) => {
    const instanceName = req.params.instanceName
    try {
      if (runtimeMachines[instanceName].startMachine()) {
        return res.status(200).json({ status: "Machine instance started", [instanceName]: runtimeMachines[instanceName] })
      } else {
        return res.status(200).json({ status: "Machine instance already started", [instanceName]: runtimeMachines[instanceName] })
      }
    } catch (e) {
      console.error("Cannot start machine instance")
      return res.status(500).json({ status: "Cannot start machine instance" })
    }
  })

  app.get("/adminapi/v1/statemachines/:instanceName/stop", checkMachineInstanceName, async (req, res) => {
    const instanceName = req.params.instanceName
    try {
      if (runtimeMachines[instanceName].stopMachine()) {
        return res.status(200).json({ status: "Machine instance stopped", [instanceName]: runtimeMachines[instanceName] })
      } else {
        return res.status(200).json({ status: "Machine instance already stopped", [instanceName]: runtimeMachines[instanceName] })
      }
    } catch (e) {
      console.error("Cannot stop machine instance")
      return res.status(500).json({ status: "Cannot stop machine instance" })
    }
  })

  // change instance state
  app.post("/adminapi/v1/statemachines/:instanceName/emit", checkMachineInstanceName, async (req, res) => {
    const instanceName = req.params.instanceName
    const { emitType, payload } = req.body ?? {}

    if (!emitType) {
      return res.status(400).json({ status: "Bad request. Required emitType." })
    }

    try {
      if (runtimeMachines[instanceName].emit(emitType, payload ?? {})) {
        return res.status(200).json({ status: "Machine message emitted", [instanceName]: runtimeMachines[instanceName] })
      } else {
        return res.status(400).json({ status: "Machine instance is not started", [instanceName]: runtimeMachines[instanceName] })
      }
    } catch (e) {
      console.error("Cannot emit message to machine instance")
      return res.status(500).json({ status: "Cannot emit message to machine instance" })
    }
  })

  // debugging options
  app.get("/adminapi/v1/statemachines/:instanceName/inspect", checkMachineInstanceName, async (req, res) => {
    const instanceName = req.params.instanceName

    try {
      const machineInspectionData = runtimeMachines[instanceName].inspect()
      return res.status(200).json({ status: "Ok", [instanceName]: machineInspectionData })
    } catch (e) {
      console.error("Cannot inspect machine instance")
      return res.status(500).json({ status: "Cannot inspect machine instance" })
    }
  })

  // generate machine instance from definition
  app.post("/adminapi/v1/statemachines", async (req, res) => {
    console.log('BODY: ', req.body)
    const {name, definition} = req.body

    if (!name || !definition) {
        return res.status(400).json({status: "Bad request. Missing params name or definition."})
    }

    if (!machineDefinitions[definition.name]) {
      return res.status(404).json({ status: "Machine definition not found" })
    }

    const machine = StateMachine.CreateStateMachine(machineDefinitions[definition.name])
    if (!machine) {
      return res
        .status(500)
        .json({ status: "Cannot create machine from the '" + definition.name + "' machine definition" })
    }

    runtimeMachines[name] = machine 
    res.status(200).json(req.body)
  })
}