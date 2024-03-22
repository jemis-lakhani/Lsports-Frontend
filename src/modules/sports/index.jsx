import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Fixtures from "../fixture";
import FixtureMarket from "../fixture/FixtureMarket";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setLoader } from "@/store/LoaderReducer";
import BetSlip from "../fixture/BetSlip";
import { BiFootball } from "react-icons/bi";
import { FaBaseball } from "react-icons/fa6";
import { IoMdFootball } from "react-icons/io";
import { IoIosBasketball } from "react-icons/io";
import { CgGames } from "react-icons/cg";
import { GiHockey } from "react-icons/gi";
import { FaVolleyball } from "react-icons/fa6";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const icons = {
  "American Football": (
    <BiFootball style={{ height: "1.5rem", width: "1.5rem" }} />
  ),
  Baseball: <FaBaseball style={{ height: "1.25rem", width: "1.25rem" }} />,
  Basketball: <IoIosBasketball style={{ height: "1.5rem", width: "1.5rem" }} />,
  Volleyball: <FaVolleyball style={{ height: "1.25rem", width: "1.25rem" }} />,
  "Ice Hockey": <GiHockey style={{ height: "1.5rem", width: "1.5rem" }} />,
  "E-Games": <CgGames style={{ height: "1.5rem", width: "1.5rem" }} />,
  Football: <IoMdFootball style={{ height: "1.5rem", width: "1.5rem" }} />,
};

const Sports = () => {
  const dispatch = useDispatch();
  const [sportId, setSportId] = useState();
  const {
    data: sportsList,
    isSuccess,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["sports-list"],
    queryFn: () => {
      return fetch(`${BACKEND_URL}/sports`, { method: "POST" })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {isSuccess && !isFetching && sportsList?.data?.length !== 0 && (
        <Tabs
          className="w-full px-4"
          defaultValue={sportsList.data[0].Id}
          onValueChange={(value) => {
            dispatch(setLoader(true));
            setSportId(value);
          }}
        >
          <TabsList className="grid grid-cols-7 w-full h-auto">
            {sportsList?.data?.map((s) => (
              <TabsTrigger
                key={s.Id + s.Name}
                value={s.Id}
                className="justify-evenly text-primary text-xs truncate uppercase select-none"
              >
                {icons[s.Name]}
                {s.Name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      {isFetching && (
        <div className="animate-pulse px-4">
          <div className="h-10 bg-gray-800 rounded"></div>
        </div>
      )}
      <div className="grid grid-cols-3 xl:grid-cols-3 gap-4 h-full">
        <div className="scrollbar-thumb-rounded scrollbar-thin scrollbar-track-rounded scrollbar-thumb-slate-700 scrollbar-track-transparent h-full px-4 overflow-y-auto ">
          <div className="h-full max-h-[75vh] min-h-[75vh]">
            <Fixtures sportId={sportId} />
          </div>
        </div>
        <div className="scrollbar-thumb-rounded scrollbar-thin scrollbar-track-rounded scrollbar-thumb-slate-700 scrollbar-track-transparent h-full px-4 overflow-y-auto ">
          <div className="h-full max-h-[75vh] min-h-[75vh]">
            <FixtureMarket />
          </div>
        </div>
        <div className="scrollbar-thumb-rounded scrollbar-thin scrollbar-track-rounded scrollbar-thumb-slate-700 scrollbar-track-transparent h-full px-4 py-2 overflow-y-auto border-2 border-amber-700 rounded-lg">
          <div className="h-full max-h-[75vh] min-h-[75vh]">
            <BetSlip />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports;
