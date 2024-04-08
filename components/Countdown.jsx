import React from "react";

const Completionist = () => <span className="text-[1.3rem] font-semibold">Closed</span>;

const CountDownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="grid grid-flow-col gap-2 text-center auto-cols-max mt-2">
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content text-sm">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": days }}></span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content text-sm">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": hours }}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content text-sm">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": minutes }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content text-sm">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": seconds }}></span>
          </span>
          sec
        </div>
      </div>
    );
  }
};

export default CountDownRenderer;
