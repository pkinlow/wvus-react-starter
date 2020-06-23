import React from "react";

function AppActive(props) {
  const { data } = props;

  return (
    <div className="App">
      Starter App. {data.greeting || ""}
    </div>
  );
}

export default AppActive;