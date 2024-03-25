import { cityObject } from "./Weather";

// import { type cityObject } from './Weather';
const CitySelectButtons = ({
  citiesList,
  handleSelectCity,
}: {
  citiesList: cityObject[];
  handleSelectCity: Function;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {citiesList.map(({ name, country, lat, lon, state }) => (
        <button
          className="rounded-full bg-cyan-600 p-2 text-slate-200"
          key={name + lon + lat}
          onClick={() => handleSelectCity({ name, country, lat, lon, state })}
        >
          {name},{state ? state + "," : ""} {country}
        </button>
      ))}
    </div>
  );
};

export default CitySelectButtons;
