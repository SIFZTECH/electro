import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useUrlPosition } from "../_hooks/useUrlPosition";
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
          timeZone: "UTC",
        })
      : "Closed";
    const closingHours = week.closing_hours
      ? new Date(`1970-01-01T${week.closing_hours}Z`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })
      : "Closed";

    const isHoliday = week.is_holiday === "1";

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

  const holydays = formattedWeeks.filter((week) => week.isHoliday);

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

  const holidaysString = holydays
    .map((holiday) => `${holiday.day} (Holiday)`)
    .join(", ");

  return { formattedString, holidaysString };
};

const isStoreOpenToday = (weeks) => {
  const dayMap = {
    0: "sun",
    1: "mon",
    2: "tue",
    3: "wed",
    4: "thu",
    5: "fri",
    6: "sat",
  };
  const today = new Date().getDay();
  const todayName = dayMap[today];
  const todayWeek = weeks.find((week) => week.day.toLowerCase() === todayName);

  if (todayWeek) {
    return todayWeek.is_holiday === "0" &&
      todayWeek.opening_hours !== null &&
      todayWeek.closing_hours !== null
      ? "Open Today"
      : "Closed Today";
  } else {
    return "Closed Today";
  }
};

const haversineDistance = (coords1, coords2, isMiles = false) => {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(coords2.latitude, coords1.latitude);
  const dLon = distance(coords2.longitude, coords1.longitude);

  const lat1 = toRadian(coords1.latitude);
  const lat2 = toRadian(coords2.latitude);

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  if (isMiles) {
    finalDistance /= 1.60934;
  }

  return finalDistance.toFixed(2);
};

export default function MyMap() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const { data, isLoading, error } = useAllDealerUsersInfo();
  const [filteredStores, setFilteredStores] = useState([]);

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
        setMapPosition([geolocationPosition?.lat, geolocationPosition?.lng]);
      }
    },
    [geolocationPosition]
  );
  useEffect(() => {
    if (data) {
      setFilteredStores(data.data);
    }
  }, [data]);

  const onSubmit = (query) => {
    const searchQuery = query.search.toLowerCase();
    const filtered = data?.data?.filter(
      (store) =>
        store.company_name.toLowerCase().includes(searchQuery) ||
        store.city.toLowerCase().includes(searchQuery) ||
        store.state.toLowerCase().includes(searchQuery)
    );
    setFilteredStores(filtered);
  };

  return (
    <>
      <div className="flex flex-col h-dvh w-dvw">
        <div className="find-store p-4 bg-white absolute max-w-[30rem] left-6 top-6 z-[99999]">
          <div>
            <button
              className="btn-primary mb-2 bg-gray-200"
              onClick={() => router.push("/dashboard")}
            >
              Go back to Dashboard
            </button>
            <h1 className="font-serif text-lg mb-2 uppercase">Find a store</h1>
            <form
              className="flex items-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  {...register("search")}
                  className="bg-gray-100 text-gray-900 text-sm  focus:ring-yellow-400 focus:ring-1 focus:outline-none focus:border-yellow-500 block w-full ps-10 p-2.5"
                  placeholder="Search..."
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
                filteredStores?.map((store, i) => {
                  const storeCoordinates = getCoordinatesFromUrl(store.map_url);
                  const distance = haversineDistance(
                    {
                      latitude: geolocationPosition?.lat,
                      longitude: geolocationPosition?.lng,
                    },
                    storeCoordinates
                  );
                  const { formattedString, holidaysString } =
                    getFormattedOpeningHours(store.weeks);
                  const openStatus = isStoreOpenToday(store.weeks);

                  return (
                    <div
                      key={i + 1}
                      className="store flex items-start gap-1 border-b border-gray-200 py-3"
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
                      <div className="pl-2">
                        <h1 className="font-serif font-semibold">
                          {store.company_name || "Company Name Not Found"}
                        </h1>
                        <p className="text-sm ">{distance} km</p>
                        <p className="my-2">{formattedString}</p>
                        {/* <p className="text-red-500">
                          Holidays: {holidaysString}
                        </p> */}
                        <p className="font-semibold font-serif text-sm mb-2">
                          {openStatus.startsWith("Open") ? (
                            <span className="bg-green-400 text-gray-50 py-1 px-2 rounded-full">
                              Open Today
                            </span>
                          ) : (
                            <span className="bg-red-400 text-gray-100 py-1 px-2 rounded-full">
                              Closed Today
                            </span>
                          )}
                        </p>
                        <p>{store.state}</p>
                        <p>
                          {store.street_address || "Unavailable Street Address"}
                          .{store.postal_code || "Unavailable Postal code"},{" "}
                          {store.city || "Unavailable City"}
                        </p>
                        <div className="my-2 text-sm">
                          <p className="flex items-center gap-2">
                            <MdOutlineLocalPhone className="text-color-primary" />{" "}
                            <span>
                              <Link
                                href={`tel:${store.phone}`}
                                className="hover:text-yellow-500"
                              >
                                {store.phone || "Unavailable"}
                              </Link>
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <AiOutlineMail className="text-color-primary" />{" "}
                            <span>
                              <Link
                                href={`mailto:${store.email}`}
                                className="hover:text-yellow-500"
                              >
                                {store.email || "Unavailable Email"}
                              </Link>
                            </span>
                          </p>
                          {store?.web_url && (
                            <p className="flex items-center gap-2">
                              <AiOutlineGlobal className="text-color-primary" />{" "}
                              <span>
                                <Link
                                  href={store.web_url}
                                  className="hover:text-yellow-500"
                                >
                                  {store.website || "Unavailable Website"}
                                </Link>
                              </span>
                            </p>
                          )}
                        </div>
                        <Link
                          href={`/find-a-dealer?lat=${storeCoordinates?.latitude}&lng=${storeCoordinates?.longitude}`}
                          className="btn-primary inline-flex items-center"
                        >
                          <RiDirectionLine className="text-xl me-1" />
                          Get direction
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <MapContainer
          center={mapPosition}
          zoom={14}
          scrollWheelZoom={true}
          className="h-dvh w-dvw"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={mapPosition}>
            <Popup>Your location</Popup>
          </Marker>
          {data &&
            data.data.map((store, index) => {
              const storeCoordinates = getCoordinatesFromUrl(store.map_url);
              return (
                <Marker
                  key={index}
                  position={[
                    storeCoordinates.latitude,
                    storeCoordinates.longitude,
                  ]}
                >
                  <Popup autoPan>
                    <div className="text-base">
                      <h1 className="font-serif font-semibold text-lg">
                        {store.company_name || "Company Name Not Found"}
                      </h1>
                      <p>
                        {store.street_address || "Unavailable Street Address"}.
                        {store.postal_code || "Unavailable Postal code"},{" "}
                        {store.city || "Unavailable City"}
                      </p>
                      <p className="flex items-center gap-2">
                        <MdOutlineLocalPhone className="text-color-primary" />{" "}
                        <span>
                          <Link
                            href={`tel:${store.phone}`}
                            className="text-gray-900 hover:underline"
                          >
                            {store.phone || "Unavailable"}
                          </Link>
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <AiOutlineMail className="text-color-primary" />{" "}
                        <span>
                          <Link
                            href={`mailto:${store.email}`}
                            className="text-gray-900 hover:underline"
                          >
                            {store.email || "Unavailable Email"}
                          </Link>
                        </span>
                      </p>
                      {store.web_url && (
                        <p className="flex items-center gap-2">
                          <AiOutlineGlobal className="text-color-primary" />{" "}
                          <span>
                            <Link
                              href={store.web_url}
                              className="text-gray-900 hover:underline"
                            >
                              {store.website}
                            </Link>
                          </span>
                        </p>
                      )}

                      <Link
                        href={store.map_url}
                        className="btn-primary inline-flex items-center mt-2"
                      >
                        <RiDirectionLine className="text-xl me-1" />
                        Get direction From Google Map
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          <ChangeCenter position={mapPosition} />
        </MapContainer>
      </div>
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
