import React, { useEffect, useState } from "react";
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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FixtureMarket = () => {
  const dispatch = useDispatch();
  const { markets, fixtureId } = useSelector((state) => state.markets);
  const { loader: isLoading } = useSelector((state) => state.loader);

  const Title = (marketName) => {
    return (
      <CardTitle className="text-sm font-normal text-gray-400 ml-2">
        {marketName}
      </CardTitle>
    );
  };

  const handleBetChange = ({ allBets, market, selectedBet }) => {
    let selectedBets = [];
    Object.entries(allBets).forEach(([key, bets]) => {
      if (bets) {
        bets.map((bet) => {
          if (bet.Id === selectedBet) {
            console.log(bets);
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
            selectedBet,
            market,
          }),
        );
      });
  };

  return (
    <div className="relative flex flex-col gap-2 h-full">
      {isLoading && (
        <div className="absolute top-0 right-0 flex justify-center items-center h-full w-full z-50">
          <Loader />
        </div>
      )}
      <div
        className={clsx("flex flex-col gap-2 p-4", {
          "opacity-20": isLoading,
        })}
      >
        <div className="h-[200px] w-full border-2 border-amber-800 rounded-lg"></div>
        <Tabs className="w-full">
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
                console.log({ marketName });
                if (
                  marketName.includes("1x2") ||
                  marketName.includes("winner")
                ) {
                  return (
                    <Card
                      key={id}
                      className="flex flex-col border-2 w-full gap-2 p-2"
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
                      className="flex flex-col border-2 w-full gap-2 p-2"
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
                    <Card key={id} className="flex flex-col border-2 w-full gap-2 p-2">
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
                    <Card key={id} className="flex flex-col border-2 w-full gap-2 p-2">
                      {Title(mk.Name)}
                      <OddEven market={mk} handleBetChange={handleBetChange} />
                    </Card>
                  );
                } else if (marketName.includes("12 including overtime")) {
                  return (
                    <Card key={id} className="flex flex-col border-2 w-full gap-2 p-2">
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
