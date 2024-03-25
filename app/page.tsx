import Gmail from "./components/Gmail";
import Search from "./components/Search";
import Statusbar from "./components/Statusbar";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <main className="w-full pl-16">
      <div className="wrapper flex h-screen flex-col items-center justify-start px-16 py-4">
        <div className="top flex h-1/3 w-full items-start justify-between">
          <Statusbar />
          <Weather />
        </div>
        <div className="bottom flex w-full items-center justify-between">
          <div className="gmail">
            <Gmail />
          </div>
          <div className="search">
            <Search />
          </div>
        </div>
      </div>
    </main>
  );
}
