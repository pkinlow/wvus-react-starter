import React, { useEffect, useState } from "react";
import appErrorWrapper from "./AppErrorWrapper";
import AppError from "./AppError";
import AppLoad from "./AppLoad";
import AppInactive from "./AppInactive";
import AppActive from "./AppActive";
import initialState from "../../initialState";
import { mockRequest } from "../../services/appRequest";
import helpers from "../../helpers/helpers";
import appSettings from "../../settings/appSettings";
const COMPONENT_DID_MOUNT = [];

function App(props) {
  const initialStateVal = getInitialState();
  const [data, setData] = useState(initialStateVal.data);
  const [app, setApp] = useState(initialStateVal.app);

  useEffect(() => {
    // Component Did Mount
    init();

    return () => {
      // Clean Up Logic
    };
  }, COMPONENT_DID_MOUNT);

  async function init() {
    // Include App Init Logic

    // Before Async Request Set App To Load
    setAppStatus("load");

    try {
      // Simulate Async API Request 
      const resp = await mockRequest();
      
      // Set App To Active Status
      setData(resp.data);
      setAppStatus("active");
    } catch (err) {
      // Critical Request Failure
      console.log(err);
      setAppStatus("error");
    }
  }

  function getInitialState() {
    // Override Initial State Here
    const overrideState = {};

    // Return Initial State
    return Object.assign({}, initialState, overrideState);
  }

  function setAppStatus(status) {
    // Set App Status
    setApp((prevState) => ({
      ...prevState,
      ...{status}
    }));
  }

  // Render App
  // data and app

  switch (app.status) {
    case "inactive":
      return <AppInactive 
        timeout={20 * 1000} 
        app={app} 
        setAppStatus={setAppStatus} 
      />;
    case "load":
      return <AppLoad
        timeout={30 * 1000} 
        app={app} 
        setAppStatus={setAppStatus} 
      />;
    case "active":
      return <AppActive 
        app={app} 
        data={data}
        setAppStatus={setAppStatus} 
      />;
    default:
      return <AppError app={app} />;
  }
}

export default appErrorWrapper(App);