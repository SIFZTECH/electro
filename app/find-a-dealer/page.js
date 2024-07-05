"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import Spinner from "../components/ui/Spinner";

export default function MyPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/find-a-dealer/Map"), {
        loading: () => (
          <div className="w-dvw">
            <Spinner />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return (
    <div className="">
      <Map />
    </div>
  );
}
