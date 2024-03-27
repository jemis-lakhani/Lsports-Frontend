import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const BetRow = ({ market, bets, selectedBet }) => {
  const [tabs, setTabs] = useState([]);

  const TabTrigger = (key, title, price) => {
    return (
      <TabsTrigger
        key={key}
        value={key}
        className={clsx(
          "flex flex-row justify-between w-[30%] text-white border-[1px] border-white data-[state=active]:text-black data-[state=active]:bg-white cursor-text",
        )}
      >
        <span className="text-xs">{title}</span>
        <span className="text-xs">{price}</span>
      </TabsTrigger>
    );
  };

  useEffect(() => {
    const arr = [];
    let homeBet;
    let drawBet;
    let awayBet;
    const marketName = market?.toLowerCase();
    if (marketName.includes("odd/even")) {
      homeBet = "Odd";
      drawBet = null;
      awayBet = "Even";
    } else if (marketName.includes("under/over")) {
      homeBet = "Under";
      drawBet = null;
      awayBet = "Over";
    } else if (marketName.includes("1x2") || marketName.includes("winner")) {
      homeBet = "1";
      drawBet = "X";
      awayBet = "2";
    } else if (marketName.includes("handicap")) {
      homeBet = "1";
      drawBet = "X";
      awayBet = "2";
    } else if (marketName.includes("12")) {
      homeBet = "1";
      drawBet = null;
      awayBet = "2";
    }

    if (homeBet) {
      const home = bets?.find((bet) => bet.Name === homeBet);
      if (home) {
        arr.push(TabTrigger(home.Id, homeBet, home.Price));
      }
    }
    if (drawBet) {
      const draw = bets?.find((bet) => bet.Name === drawBet);
      if (draw) {
        arr.push(TabTrigger(draw.Id, drawBet, draw.Price));
      }
    }
    if (awayBet) {
      const away = bets?.find((bet) => bet.Name === awayBet);
      if (away) {
        arr.push(TabTrigger(away.Id, awayBet, away.Price));
      }
    }
    setTabs(arr);
  }, [selectedBet]);

  return (
    <>
      <Tabs className="w-full" value={selectedBet}>
        <TabsList className="flex flex-row justify-between bg-transparent">
          {tabs?.map((tab) => tab)}
        </TabsList>
      </Tabs>
    </>
  );
};

export default BetRow;
