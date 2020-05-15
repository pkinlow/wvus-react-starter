import React, { useEffect, useState } from "react";
import appErrorWrapper from "./AppErrorWrapper";
import AppError from "./AppError";
import AppLoad from "./AppLoad";
import AppInactive from "./AppInactive";
import AppActive from "./AppActive";
import initialState from "../../initialState";
import helpers from "../../helpers/helpers";
import appSettings from "../../settings/appSettings";

function App(props) {
  const initialStateVal = getInitialState();
  const [state, setState] = useState(initialStateVal);

  const isTrue = state && state.app && state.app.status && state.app.status.something ? true : false;

  useEffect(() => {
    // Component Did Mount
    init();

    return () => {
      // Clean Up Logic
    };
  }, []);

  async function init() {
    // Include App Init Logic

    // Before Async Request Set App To Load
    setAppStatus("load");

    try {
      // Simulate Async API Request 
      await new Promise((res) => setTimeout(res, 5000));
      
      // Set App To Active Status
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
    setState(({app}) => ({
      app: {
        ...app,
        ...{status}
      }
    }));
  }

  // Render App
  const { app, data } = state;

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