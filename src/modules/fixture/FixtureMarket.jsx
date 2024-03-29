import React from "react";
import OddEven from "./OddEven";
import WinOrLose from "./WinOrLose";
import UnderOver from "./UnderOver";
import HandiCap from "./HandiCap";
import { Card, CardTitle } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import clsx from "clsx";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { setBets } from "@/store/BetSlipReducer";
import IncludingOvertime from "./IncludingOvertime";
import { FaAngleLeft } from "react-icons/fa6";
import { showMarkets } from "@/store/MobileViewReducer";
import { FcSportsMode } from "react-icons/fc";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FixtureMarket = () => {
  const dispatch = useDispatch();
  const { markets, fixtureId, leagueName } = useSelector(
    (state) => state.markets,
  );
  const { loader: isLoading } = useSelector((state) => state.loader);
  const { bets, currentSlip } = useSelector((state) => state.betSlip);

  const Title = (marketName) => {
    return (
      <CardTitle className="text-sm font-normal text-gray-400">
        {marketName}
      </CardTitle>
    );
  };

  const handleBetChange = ({ allBets, market, selectedBetId, baseLine }) => {
    let selectedBets = [];
    Object.entries(allBets).forEach(([key, bets]) => {
      if (bets) {
        bets.some((bet) => {
          if (bet.Id === selectedBetId) {
            selectedBets = bets;
            return true;
          }
        });
      }
    });
    fetch(`${BACKEND_URL}/fixture/${fixtureId}`, {
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .then((fixture) => {
        dispatch(
          setBets({
            fixtureId,
            bets: selectedBets,
            fixture: fixture?.data?.Fixture,
            selectedBetId,
            market,
            baseLine,
          }),
        );
      });
  };

  const selectedBetFromMainCard = () => {
    return bets &&
      bets[currentSlip] &&
      bets[currentSlip][fixtureId] &&
      bets[currentSlip][fixtureId].selectedBetId
      ? bets[currentSlip][fixtureId].selectedBetId
      : "";
  };

  return (
    <div className="relative flex flex-col h-full">
      {isLoading && (
        <div className="absolute top-0 right-0 flex justify-center items-center h-full w-full z-50">
          <Loader />
        </div>
      )}

      {/* Mobile View */}
      <div className="sticky w-full top-0 right-0 xl:hidden flex items-center p-5 text-white font-bold bg-muted rounded-none border-0">
        <button
          className="flex items-center uppercase leading-none cursor-pointer"
          onClick={() => dispatch(showMarkets())}
        >
          <FaAngleLeft className=" text-white" />
          <span className="ml-2">Pre Match</span>
        </button>
      </div>
      {/* Mobile View */}

      <div
        className={clsx("flex flex-col gap-3 p-4", {
          "opacity-20": isLoading,
        })}
      >
        <div className="flex items-center justify-center h-[200px] w-full rounded-lg">
          <FcSportsMode className="h-16 w-16 opacity-90" />
        </div>
        <div className="text-center text-sm mx-auto font-semibold text-gray-400">
          {leagueName}
        </div>
        <Tabs className="w-full select-none" value={selectedBetFromMainCard()}>
          <TabsList className="flex flex-col h-full gap-3 p-0 justify-between bg-transparent">
            {markets.length > 0 && markets?.length !== 0 ? (
              markets?.map((mk, index) => {
                const id =
                  mk?.Bets.length > 0
                    ? mk?.Bets[0]?.Id +
                      mk?.Bets[0]?.Price +
                      mk?.Bets[0]?.LastUpdate
                    : index;
                const marketName = mk.Name?.toLowerCase();
                if (
                  marketName.includes("1x2") ||
                  marketName.includes("winner")
                ) {
                  return (
                    <Card
                      key={id}
                      className="flex flex-col bg-muted border-2 w-full gap-3 p-3 rounded-lg"
                    >
                      {Title(mk.Name)}
                      <WinOrLose
                        isMainCard={false}
                        market={mk}
                        handleBetChange={handleBetChange}
                      />
                    </Card>
                  );
                } else if (marketName.includes("under/over")) {
                  return (
                    <Card
                      key={id}
                      className="flex flex-col  bg-muted border-2 w-full gap-3 p-3 rounded-lg"
                    >
                      {Title(mk.Name)}
                      <UnderOver
                        isMainCard={false}
                        market={mk}
                        handleBetChange={handleBetChange}
                      />
                    </Card>
                  );
                } else if (marketName.includes("handicap")) {
                  return (
                    <Card
                      key={id}
                      className="flex flex-col bg-muted border-2 w-full gap-3 p-3 rounded-lg"
                    >
                      {Title(mk.Name)}
                      <HandiCap
                        isMainCard={false}
                        market={mk}
                        handleBetChange={handleBetChange}
                      />
                    </Card>
                  );
                } else if (marketName.includes("odd/even")) {
                  return (
                    <Card
                      key={id}
                      className="flex flex-col bg-muted border-2 w-full gap-3 p-3 rounded-lg"
                    >
                      {Title(mk.Name)}
                      <OddEven market={mk} handleBetChange={handleBetChange} />
                    </Card>
                  );
                } else if (marketName.includes("12")) {
                  return (
                    <Card
                      key={id}
                      className="flex flex-col bg-muted border-2 w-full gap-3 p-3 rounded-lg"
                    >
                      {Title(mk.Name)}
                      <IncludingOvertime
                        market={mk}
                        handleBetChange={handleBetChange}
                      />
                    </Card>
                  );
                }
              })
            ) : (
              <div className="flex items-center justify-center uppercase text-xs mt-5">
                Select league to see markets
              </div>
            )}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default FixtureMarket;
