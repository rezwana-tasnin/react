import countriesJson from "@/data/countries.json";
import statesJson from "@/data/states.json";
import citiesJson from "@/data/cities.json";

import { useState } from "react";
import { cn } from "~/utils/cn";
import { Input } from "~/components/Input";

const Box = ({ title, search, setSearch, children }: any) => {
  return (
    <div className="bg-neutral-800 h-200 w-120 rounded-md flex flex-col">
      <div className=" flex-none p-4">
        <div className="text-xl font-bold text-center mb-2">{title}</div>
        <Input placeholder="Search..." value={search} onChange={setSearch} />
      </div>
      <ul className="space-y-2 overflow-auto flex-1 px-4">{children}</ul>
    </div>
  );
};

export default function Filter() {
  const [selectedState, setSelectedState] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<any>({});
  const [selectedCity, setSelectedCity] = useState<any>({});
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const countries = countriesJson.filter((country, index) => {
    const cs = countrySearch.toLowerCase();
    return (
      country.name.toLowerCase().includes(cs) ||
      country.iso2.toLowerCase() === cs ||
      country.iso3.toLowerCase() === cs ||
      country.phonecode === countrySearch.replace("+", "")
    );
  });

  const states = statesJson.filter((state, index) => {
    return (
      state.country_id === selectedCountry.id &&
      (state.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
        state.iso2.toLowerCase() === stateSearch.toLowerCase())
    );
  });

  const cities = citiesJson.filter((city, index) => {
    return (
      city.state_id === selectedState.id &&
      city.name.toLowerCase().includes(citySearch.toLowerCase())
    );
  });

  return (
    <div className="flex gap-20 p-10 justify-center bg-neutral-950 h-screen">
      <Box
        title="Countries"
        search={countrySearch}
        setSearch={setCountrySearch}
      >
        {countries.map((country, index) => {
          return (
            <li
              key={index}
              className={cn(
                "bg-neutral-900 p-4 rounded-md flex gap-2 items-center hover:bg-neutral-700",
                { "bg-neutral-700 border": selectedCountry.id === country.id }
              )}
              onClick={() => {
                setSelectedCountry(country);
                setSelectedState({});
                setSelectedCity({});
              }}
            >
              <img
                width="30"
                alt={country.name}
                src={`https://flagcdn.com/${country.iso2.toLowerCase()}.svg`}
              />
              <div>
                +{country.phonecode} {country.name}
              </div>
            </li>
          );
        })}
      </Box>

      <Box title="States" search={stateSearch} setSearch={setStateSearch}>
        {states.map((state, index) => {
          return (
            <li
              key={index}
              className={cn(
                "bg-neutral-900 p-4 rounded-md flex gap-2 items-center hover:bg-neutral-700",
                { "bg-neutral-700 border": selectedState.id === state.id }
              )}
              onClick={() => {
                setSelectedState(state);
                setSelectedCity({});
              }}
            >
              <div>{state.name}</div>
            </li>
          );
        })}
      </Box>

      <Box title="Cities" search={citySearch} setSearch={setCitySearch}>
        {cities.map((city, index) => {
          return (
            <li
              key={index}
              className={cn(
                "bg-neutral-900 p-4 rounded-md flex gap-2 items-center hover:bg-neutral-700",
                { "bg-neutral-700 border": selectedCity.id === city.id }
              )}
              onClick={() => {
                setSelectedCity(city);
              }}
            >
              <div>{city.name}</div>
            </li>
          );
        })}
      </Box>
    </div>
  );
}
