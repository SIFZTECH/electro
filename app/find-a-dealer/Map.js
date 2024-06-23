"use client";

const stores = [
  {
    storeLogo: "",
    storeName: "Leon Cycle Melbourne - Head Office",
    distance: "0.01 km away",
    country: "Australia",
    address1: "45 Leaks Road",
    address1: "LAVERTON NORTH VIC. 3026, AU",
    phone: "0123384383",
    email: "support.au@leoncycle.com",
    openAndCloseStore: "Open Monday to Friday 9am-5pm",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  {
    storeLogo: "",
    storeName: "Leon Cycle Melbourne - Head Office 2",
    distance: "0.01 km away",
    country: "Australia",
    address1: "45 Leaks Road",
    address1: "LAVERTON NORTH VIC. 3026, AU",
    phone: "0123384383",
    email: "support.au@leoncycle.com",
    openAndCloseStore: "Open Monday to Friday 9am-5pm",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",

    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    storeLogo: "",
    storeName: "Leon Cycle Melbourne - Head Office 3",
    distance: "0.01 km away",
    country: "Australia",
    address1: "45 Leaks Road",
    address1: "LAVERTON NORTH VIC. 3026, AU",
    phone: "0123384383",
    email: "support.au@leoncycle.com",
    openAndCloseStore: "Open Monday to Friday 9am-5pm",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
  {
    storeLogo: "",
    storeName: "Leon Cycle Melbourne - Head Office 4",
    distance: "0.01 km away",
    country: "Australia",
    address1: "45 Leaks Road",
    address1: "LAVERTON NORTH VIC. 3026, AU",
    phone: "0123384383",
    email: "support.au@leoncycle.com",
    openAndCloseStore: "Open Monday to Friday 9am-5pm",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    position: {
      lat: 36.967508314568164,
      lng: -2.13128394200588,
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function MyMap() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

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
            <button
              className="btn-primary mb-2 bg-gray-200"
              onClick={() => router.push("/dashboard")}
            >
              Go back to Dashboard
            </button>
            <h1 className="font-serif text-lg mb-2 uppercase">Find a store</h1>
            <form className="flex items-center gap-4">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 me-2 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="bg-gray-100 text-gray-900 text-sm  focus:ring-yellow-400 focus:ring-1 focus:outline-none focus:border-yellow-500 block w-full ps-10 p-2.5"
                  placeholder="Search..."
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-6 ms-2 text-sm font-serif bg-color-primary   hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                Search
              </button>
            </form>
            <div className="stores mt-4 h-[30rem] overflow-y-auto">
              <h1 className="font-serif font-semibold mb-3">
                Your closest store
              </h1>
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="store flex items-start gap-1 border-b border-gray-200 pt-3"
                  onClick={() =>
                    router.push(
                      `/find-a-dealer?lat=${store.position.lat}&lng=${store.position.lng}`
                    )
                  }
                >
                  <Image
                    src="/cycle-4.jpg"
                    width={60}
                    height={60}
                    className="rounded-full object-contain"
                    alt="name"
                  />
                  <div>
                    <h1 className="font-serif font-semibold">
                      {store.storeName}
                    </h1>
                    <p className="text-sm ">{store.distance}</p>
                    <p className="my-2">{store.openAndCloseStore}</p>
                    <p>{store.address2}</p>
                    <p>LAVERTON NORTH VIC. 3026, AU</p>
                    <div className="my-2 text-sm">
                      <p className="flex items-center gap-2">
                        <MdOutlineLocalPhone />
                        {store.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <AiOutlineMail />
                        {store.email}
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
              ))}
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
          {stores.map((store) => (
            <Marker
              key={store.id}
              position={[store.position.lat, store.position.lng]}
            >
              <Popup>
                {store.storeName} {store.country}
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
