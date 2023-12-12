"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

type SpectrumData = {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
};

const NumericData = (props: SpectrumData) => {
  const [data, setData] = useState<SpectrumData>(props);

  const getNewData = async () => {
    try {
      const response = await axios.get(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus",
      );
      setData(response.data);
    } catch (error) {
      toast.error("Couldn't fetch data. Please try again.");
    }
  };

  return (
    <div className="bg-red-5000 px-4">
      <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Velocity</p>
          <p className="">{data.velocity.toFixed(4)}</p>
        </div>
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Altitude</p>
          <p className="">{data.altitude.toFixed(4)}</p>
        </div>
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Temperature</p>
          <p className="">{data.temperature.toFixed(4)}</p>
        </div>
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Ascending</p>
          <p className="uppercase">{data.isAscending ? "True" : "False"}</p>
        </div>
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Action Required</p>
          <p className={`${data.isActionRequired ? "" : ""} uppercase`}>
            {data.isActionRequired ? "True" : "False"}
          </p>
        </div>
      </div>
      <div className=" mb-5 space-y-2 rounded-md p-5 shadow-md">
        <p className="text-xl font-medium underline underline-offset-2">
          Status Message
        </p>
        <p className="">{data.statusMessage}</p>
      </div>
      <button
        className="rounded-3xl bg-[#095EDD] px-4 py-2 text-xs font-medium uppercase text-white "
        onClick={getNewData}
      >
        request new data
      </button>
    </div>
  );
};

export default NumericData;
