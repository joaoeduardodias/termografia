
import { SideBar } from "./components/sidebar";
import { TemperatureChart } from "./components/temperature-chart";

export default function Home() {
  return (
    <div className="flex w-screen">
      <SideBar />
      <main className="p-4 flex-1 grid grid-cols-home grid-rows-home gap-2  mt-14 items-start">
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
        <TemperatureChart />
      </main>
    </div>
  );
}