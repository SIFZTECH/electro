"use client";

const cities = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
  {
    cityName: "Nijar",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2023-04-03T07:47:59.202Z",
    notes: "",
    position: {
      lat: "36.967508314568164",
      lng: "-2.13128394200588",
    },
    id: 98443198,
  },
];

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useUrlPosition } from "../_hooks/useUrlPosition";
import { useEffect, useState } from "react";
import { useGeolocation } from "../_hooks/useGeoLocation";
import { Dialog, DialogContent } from "../components/ui/dialog";
import Search from "../components/ui/Search";
import Image from "next/image";
import { Phone } from "lucide-react";
import { MdEmail, MdOutlineLocalPhone, MdWebStories } from "react-icons/md";
import { RiDirectionLine } from "react-icons/ri";

import { AiOutlineGlobal, AiOutlineMail } from "react-icons/ai";

export default function MyMap() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  //   const [mapLat, mapLng] = useUrlPosition();

  //   useEffect(
  //     function () {
  //       if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  //     },
  //     [mapLat, mapLng]
  //   );

  useEffect(function () {
    getPosition();
  }, []);

  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );
  return (
    <>
      <div className="flex flex-col h-dvh w-dvw">
        <div className="find-store p-4 bg-white absolute left-6 top-6 z-[99999]">
          <div>
            <h1 className="font-serif text-lg mb-2 uppercase">Find a store</h1>
            <Search />
            <div className="stores mt-4 h-[30rem] overflow-y-auto">
              <h1 className="font-serif font-semibold mb-3">
                Your closest store
              </h1>
              <div className="store flex items-start gap-1 border-b border-gray-200 pt-3">
                <Image
                  src="/cycle-4.jpg"
                  width={60}
                  height={60}
                  className="rounded-full object-contain"
                  alt="name"
                />
                <div>
                  <h1 className="font-serif font-semibold">
                    Leon Cycle Melbourne - Head Office
                  </h1>
                  <p className="text-sm ">0.01 km away</p>
                  <p className="my-2">Open Monday to Friday 9am-5pm</p>
                  <p>45 Leaks Road</p>
                  <p>LAVERTON NORTH VIC. 3026, AU</p>
                  <div className="my-2 text-sm">
                    <p className="flex items-center gap-2">
                      <MdOutlineLocalPhone />
                      0123384383
                    </p>
                    <p className="flex items-center gap-2">
                      <AiOutlineMail />
                      support.au@leoncycle.com
                    </p>
                  </div>
                  <div className="flex gap-4 my-4 text-[15px]">
                    <button className="flex items-center gap-1 font-serif">
                      <RiDirectionLine />
                      DIRECTIONS
                    </button>
                    <button className="flex items-center gap-1 font-serif">
                      <AiOutlineGlobal />
                      VIEW WEBSITE
                    </button>
                  </div>
                </div>
              </div>
              <div className="store flex items-start gap-1 border-b border-gray-200 pt-3">
                <Image
                  src="/cycle-4.jpg"
                  width={60}
                  height={60}
                  className="rounded-full object-contain"
                  alt="name"
                />
                <div>
                  <h1 className="font-serif font-semibold">
                    Leon Cycle Melbourne - Head Office
                  </h1>
                  <p className="text-sm ">0.01 km away</p>
                  <p className="my-2">Open Monday to Friday 9am-5pm</p>
                  <p>45 Leaks Road</p>
                  <p>LAVERTON NORTH VIC. 3026, AU</p>
                  <div className="my-2 text-sm">
                    <p className="flex items-center gap-2">
                      <MdOutlineLocalPhone />
                      0123384383
                    </p>
                    <p className="flex items-center gap-2">
                      <AiOutlineMail />
                      support.au@leoncycle.com
                    </p>
                  </div>
                  <div className="flex gap-4 my-4 text-[15px]">
                    <button className="flex items-center gap-1 font-serif">
                      <RiDirectionLine />
                      DIRECTIONS
                    </button>
                    <button className="flex items-center gap-1 font-serif">
                      <AiOutlineGlobal />
                      VIEW WEBSITE
                    </button>
                  </div>
                </div>
              </div>
              <div className="store flex items-start gap-1 border-b border-gray-200 pt-3">
                <Image
                  src="/cycle-4.jpg"
                  width={60}
                  height={60}
                  className="rounded-full object-contain"
                  alt="name"
                />
                <div>
                  <h1 className="font-serif font-semibold">
                    Leon Cycle Melbourne - Head Office
                  </h1>
                  <p className="text-sm ">0.01 km away</p>
                  <p className="my-2">Open Monday to Friday 9am-5pm</p>
                  <p>45 Leaks Road</p>
                  <p>LAVERTON NORTH VIC. 3026, AU</p>
                  <div className="my-2 text-sm">
                    <p className="flex items-center gap-2">
                      <MdOutlineLocalPhone />
                      0123384383
                    </p>
                    <p className="flex items-center gap-2">
                      <AiOutlineMail />
                      support.au@leoncycle.com
                    </p>
                  </div>
                  <div className="flex gap-4 my-4 text-[15px]">
                    <button className="flex items-center gap-1 font-serif">
                      <RiDirectionLine />
                      DIRECTIONS
                    </button>
                    <button className="flex items-center gap-1 font-serif">
                      <AiOutlineGlobal />
                      VIEW WEBSITE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MapContainer
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full flex-1 w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                {city.cityName} {city.country}
              </Popup>
            </Marker>
          ))}
          <ChangeCenter position={mapPosition} />
        </MapContainer>
        <div className="flex justify-center gap-4">
          <div className="dealer-info px-4 py-6 text-center">
            <h1 className="font-serif text-lg mb-1 items-center justify-center">
              Adrenalin Cycling
            </h1>
            <div className="flex flex-col">
              <p>Monday-Friday 8:30am - 5am</p>
              <p>Saturday 8:30am - 5am</p>
              <p>Sunday Close</p>

              <p className="mt-4">68 Tarquay Rd.</p>
              <p>PIALBA, QLD 4655, AU</p>
              <p className="flex items-center justify-center gap-2 mt-4">
                <MdOutlineLocalPhone />
                0123384383
              </p>
            </div>
          </div>
          <div className="dealer-info px-4 py-6 text-center">
            <h1 className="font-serif text-lg mb-1 items-center justify-center">
              Adrenalin Cycling
            </h1>
            <div className="flex flex-col">
              <p>Monday-Friday 8:30am - 5am</p>
              <p>Saturday 8:30am - 5am</p>
              <p>Sunday Close</p>

              <p className="mt-4">68 Tarquay Rd.</p>
              <p>PIALBA, QLD 4655, AU</p>
              <p className="flex items-center justify-center gap-2 mt-4">
                <MdOutlineLocalPhone />
                0123384383
              </p>
            </div>
          </div>
          <div className="dealer-info px-4 py-6 text-center">
            <h1 className="font-serif text-lg mb-1 items-center justify-center">
              Adrenalin Cycling
            </h1>
            <div className="flex flex-col">
              <p>Monday-Friday 8:30am - 5am</p>
              <p>Saturday 8:30am - 5am</p>
              <p>Sunday Close</p>

              <p className="mt-4">68 Tarquay Rd.</p>
              <p>PIALBA, QLD 4655, AU</p>
              <p className="flex items-center justify-center gap-2 mt-4">
                <MdOutlineLocalPhone />
                0123384383
              </p>
            </div>
          </div>
          <div className="dealer-info px-4 py-6 text-center">
            <h1 className="font-serif text-lg mb-1 items-center justify-center">
              Adrenalin Cycling
            </h1>
            <div className="flex flex-col">
              <p>Monday-Friday 8:30am - 5am</p>
              <p>Saturday 8:30am - 5am</p>
              <p>Sunday Close</p>

              <p className="mt-4">68 Tarquay Rd.</p>
              <p>PIALBA, QLD 4655, AU</p>
              <p className="flex items-center justify-center gap-2 mt-4">
                <MdOutlineLocalPhone />
                0123384383
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
