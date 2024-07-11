/* eslint-disable react-hooks/exhaustive-deps */
"use client";

const getFormattedOpeningHours = (weeks) => {
  const dayMap = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  const formattedWeeks = weeks.map((week) => {
    const day = dayMap[week.day.toLowerCase()];
    const openingHours = week.opening_hours
      ? new Date(`1970-01-01T${week.opening_hours}Z`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Closed";
    const closingHours = week.closing_hours
      ? new Date(`1970-01-01T${week.closing_hours}Z`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Closed";
    const isHoliday = week.is_holiday;

    return {
      day,
      openingHours,
      closingHours,
      isHoliday,
    };
  });

  const openDays = formattedWeeks.filter(
    (week) =>
      !week.isHoliday &&
      week.openingHours !== "Closed" &&
      week.closingHours !== "Closed"
  );

  const openDaysGrouped = openDays.reduce((acc, curr) => {
    if (!acc.length || acc[acc.length - 1].endDay !== curr.day) {
      acc.push({
        startDay: curr.day,
        endDay: curr.day,
        openingHours: curr.openingHours,
        closingHours: curr.closingHours,
      });
    } else if (
      acc[acc.length - 1].openingHours === curr.openingHours &&
      acc[acc.length - 1].closingHours === curr.closingHours
    ) {
      acc[acc.length - 1].endDay = curr.day;
    } else {
      acc.push({
        startDay: curr.day,
        endDay: curr.day,
        openingHours: curr.openingHours,
        closingHours: curr.closingHours,
      });
    }
    return acc;
  }, []);

  const formattedString = openDaysGrouped
    .map((group) =>
      group.startDay === group.endDay
        ? `${group.startDay} ${group.openingHours} - ${group.closingHours}`
        : `${group.startDay}-${group.endDay} ${group.openingHours} - ${group.closingHours}`
    )
    .join(", ");

  return formattedString;
};

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
import { useGeolocation } from "../_hooks/useMGeolocation";

import Image from "next/image";
import { MdOutlineLocalPhone } from "react-icons/md";
import { RiDirectionLine } from "react-icons/ri";

import { AiOutlineGlobal, AiOutlineMail } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAllDealerUsersInfo } from "../_features/users/useUsers";
import { SkeletonFiler } from "../components/ui/SkeletonFilter";
import Link from "next/link";
import { BASE_URL_IMAGE, getCoordinatesFromUrl } from "../lib/utils";

export default function MyMap() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { data, isLoading, error } = useAllDealerUsersInfo();

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
        <div className="find-store p-4 bg-white absolute max-w-[30rem]  left-6 top-6 z-[99999]">
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
                  className="bg-gray-100 text-gray-900 text-sm  focus:ring-color-primary-shade-2 focus:ring-1 focus:outline-none focus:border-color-primary-shade-2 block w-full ps-10 p-2.5"
                  placeholder="Search..."
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-6 ms-2 text-sm font-serif bg-color-primary text-white   hover:bg-color-primary text-white focus:ring-4 focus:outline-none focus:ring-color-primary_shade-3"
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
              {isLoading && (
                <div>
                  <SkeletonFiler />
                  <SkeletonFiler />
                  <SkeletonFiler />
                  <SkeletonFiler />
                  <SkeletonFiler />
                  <SkeletonFiler />
                </div>
              )}
              {!isLoading &&
                data.data.map((store, i) => {
                  return (
                    <div
                      key={i + 1}
                      className="store flex items-start gap-1 border-b border-gray-200 pt-3"
                    >
                      <Image
                        src={
                          store.logo
                            ? `${BASE_URL_IMAGE}${store.logo}`
                            : "/cycle-4.jpg"
                        }
                        width={60}
                        height={60}
                        className="rounded-full object-contain"
                        alt="name"
                      />
                      <div>
                        <h1 className="font-serif font-semibold">
                          {store.company_name || "Company Name Not Found"}
                        </h1>
                        <p className="text-sm ">0.02km</p>
                        {/* <p className="my-2">{store.openAndCloseStore}</p> */}

                        <p className="my-2">
                          {getFormattedOpeningHours(store.weeks)}
                        </p>
                        {/* <p>{(store.weeks)}</p> */}
                        {/* <p>{getFormattedOpeningHours(store.weeks)}</p> */}
                        <p>{store.state}</p>
                        <p>
                          {store.street_address || "Unavailable Street Address"}
                          . {store.postal_code || "Unavailable Postal code"},{" "}
                          {store.city || "Unavailable City"}
                        </p>
                        <div className="my-2 text-sm">
                          <p className="flex items-center gap-2">
                            <MdOutlineLocalPhone />
                            {store.phone || "Not Available"}
                          </p>
                          <p className="flex items-center gap-2">
                            <AiOutlineMail />
                            {store.email || "Not Available"}
                          </p>
                        </div>
                        <div className="flex gap-4 my-4 text-[15px]">
                          {store.map_url && (
                            <button
                              className="flex items-center gap-1 font-serif"
                              onClick={() => {
                                const position = getCoordinatesFromUrl(
                                  store.map_url
                                );

                                return router.push(
                                  `/find-a-dealer?lat=${position.latitude}&lng=${position.longitude}`
                                );
                              }}
                            >
                              <RiDirectionLine />
                              Directions
                            </button>
                          )}

                          {store.weburl && (
                            <Link
                              href={store.weburl}
                              className="flex items-center gap-1 font-serif"
                            >
                              <AiOutlineGlobal />
                              VIEW WEBSITE
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );

                  // <div
                  //   key={store.id}
                  //   className="store flex items-start gap-1 border-b border-gray-200 pt-3"
                  //   onClick={() =>
                  //     router.push(
                  //       `/find-a-dealer?lat=${store.position.lat}&lng=${store.position.lng}`
                  //     )
                  //   }
                  // >
                  //   <Image
                  //     src="/cycle-4.jpg"
                  //     width={60}
                  //     height={60}
                  //     className="rounded-full object-contain"
                  //     alt="name"
                  //   />
                  //   <div>
                  //     <h1 className="font-serif font-semibold">
                  //       {store.storeName}
                  //     </h1>
                  //     <p className="text-sm ">{store.distance}</p>
                  //     <p className="my-2">{store.openAndCloseStore}</p>
                  //     <p>{store.address2}</p>
                  //     <p>LAVERTON NORTH VIC. 3026, AU</p>
                  //     <div className="my-2 text-sm">
                  //       <p className="flex items-center gap-2">
                  //         <MdOutlineLocalPhone />
                  //         {store.phone}
                  //       </p>
                  //       <p className="flex items-center gap-2">
                  //         <AiOutlineMail />
                  //         {store.email}
                  //       </p>
                  //     </div>
                  //     <div className="flex gap-4 my-4 text-[15px]">
                  //       <button className="flex items-center gap-1 font-serif">
                  //         <RiDirectionLine />
                  //         DIRECTIONS
                  //       </button>
                  //       <button className="flex items-center gap-1 font-serif">
                  //         <AiOutlineGlobal />
                  //         VIEW WEBSITE
                  //       </button>
                  //     </div>
                  //   </div>
                  // </div>
                })}
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
          {!isLoading &&
            data.data.map((store, i) => {
              const markerPosition = getCoordinatesFromUrl(store.map_url);

              return (
                <Marker
                  key={i + 1}
                  position={[markerPosition.latitude, markerPosition.longitude]}
                >
                  <Popup>
                    {store.company_name} {store.city}
                  </Popup>
                </Marker>
              );
            })}
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
