"use client";
import LineChart from "@/components/charts/LineChart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

// const DynamicComponentWithNoSSR = dynamic(
//   () => import("../components/AudioComponent"),
//   { ssr: false },
// );

type SpectrumData = {
  Velocity: number;
  Altitude: number;
  Temperature: number;
  StatusMessage: string;
  IsAscending: boolean;
  IsActionRequired: boolean;
};

const date = new Date();
let audio: HTMLAudioElement;

if (typeof window !== "undefined") {
  audio = new Audio("/alertSound.mp3");
}

export type LineGraphType = { labels: string[]; data: number[] };

const RealTimeData = () => {
  const [data, setData] = useState<SpectrumData>({
    Velocity: 0,
    Altitude: 0,
    Temperature: 0,
    StatusMessage: "",
    IsAscending: false,
    IsActionRequired: false,
  });
  const [soundAlert, setSoundAlert] = useState(false);
  const [velocityLineData, setVelocityLineData] = useState<LineGraphType>({
    labels: [],
    data: [],
  });
  const [altitudeLineData, setAltitudeLineData] = useState<LineGraphType>({
    labels: [],
    data: [],
  });
  const [temperatureLineData, setTemperatureLineData] = useState<LineGraphType>(
    {
      labels: [],
      data: [],
    },
  );

  const soundAlarm = async () => {
    audio.loop = true;
    await audio
      .play()
      .then()
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const ws = new WebSocket(
      "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS",
    );
    ws.onmessage = (event) => {
      if (JSON.parse(event.data)?.IsActionRequired) {
        setSoundAlert(true);
      }
      setData(JSON.parse(event?.data));
      setVelocityLineData((currentData) => ({
        ...currentData,
        labels: [...currentData.labels, date.toLocaleTimeString()],
        data: [...currentData.data, JSON.parse(event?.data).Velocity],
      }));
      setAltitudeLineData((currentData) => ({
        ...currentData,
        labels: [...currentData.labels, date.toLocaleTimeString()],
        data: [...currentData.data, JSON.parse(event?.data).Altitude],
      }));
      setTemperatureLineData((currentData) => ({
        ...currentData,
        labels: [...currentData.labels, date.toLocaleTimeString()],
        data: [...currentData.data, JSON.parse(event?.data).Temperature],
      }));
    };
  }, []);

  const actOnSpectrum = async () => {
    try {
      const response = await axios.get(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum",
      );
      audio.pause();
      audio.currentTime = 0;
      setSoundAlert(false);
      toast.success("Successfully acted on spectrum");
    } catch (error) {
      toast.error("Couldn't complete action. Please try again.");
    }
  };

  useEffect(() => {
    if (soundAlert) {
      soundAlarm();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [soundAlert]);

  return (
    <div className="bg-red-5000 px-4">
      <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Velocity</p>
          <p className="">{data?.Velocity?.toFixed(4)}</p>
        </div>
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Altitude</p>
          <p className="">{data?.Altitude?.toFixed(4)}</p>
        </div>
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Temperature</p>
          <p className="">{data?.Temperature?.toFixed(4)}</p>
        </div>
        <div className=" space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg">
          <p className="text-xl font-medium">Ascending</p>
          <p className="uppercase">{data.IsAscending ? "True" : "False"}</p>
        </div>
        <div
          className={` ${
            soundAlert ? " animate-pulse bg-red-500 uppercase text-white" : ""
          } space-y-2 rounded-md border-[1px] border-gray-100 p-5 shadow-lg `}
        >
          <p className="text-xl font-medium">Action Required</p>
          <p className={`${data.IsActionRequired ? "" : ""} uppercase`}>
            {data.IsActionRequired ? "True" : "False"}
          </p>
        </div>
      </div>
      <div className=" mb-5 space-y-2 rounded-md p-5 shadow-md">
        <p className="text-xl font-medium underline underline-offset-2">
          Status Message
        </p>
        <p className="">{data.StatusMessage}</p>
      </div>
      {soundAlert && (
        <button
          className="rounded-3xl bg-[#095EDD] px-4 py-2 text-xs font-medium uppercase text-white "
          onClick={actOnSpectrum}
        >
          Act on Spectrum
        </button>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="">
          <LineChart
            title="Real Time Velocity Line Graph"
            data={velocityLineData.data}
            labels={velocityLineData.labels}
            label="Velocity"
            borderColor="rgb(34, 139, 34)"
            backgroundColor="rgba(34, 139, 34, 0.5)"
          />
        </div>
        <div className="">
          <LineChart
            title="Real Time Altitude Line Graph"
            data={altitudeLineData.data}
            labels={altitudeLineData.labels}
            label="Altitude"
            borderColor="rgb(65,105,225)"
            backgroundColor="rgba(65, 105, 225, 0.5)"
          />
        </div>
        <div className="">
          <LineChart
            title="Real Time Temperature Line Graph"
            data={temperatureLineData.data}
            labels={temperatureLineData.labels}
            label="Temperature"
            borderColor="rgb(255, 99, 132)"
            backgroundColor="rgba(255, 99, 132, 0.5)"
          />
        </div>
      </div>
    </div>
  );
};

export default RealTimeData;
