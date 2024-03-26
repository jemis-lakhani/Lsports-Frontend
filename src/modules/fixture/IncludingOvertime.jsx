import React, { useMemo, useState } from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const IncludingOvertime = ({ market, handleBetChange }) => {
  const [tabs, setTabs] = useState([]);

  const TabTrigger = (key, title, price) => {
    return (
      <TabsTrigger
        key={key + market.Name}
        value={key}
        className={clsx(
          "flex flex-row justify-between w-[30%] text-white border-[1px] border-white data-[state=active]:text-black data-[state=active]:bg-white",
        )}
        onClick={() => onTabSelect(key)}
      >
        <span className="text-xs">{title}</span>
        <span className="text-xs">{price}</span>
      </TabsTrigger>
    );
  };

  const onTabSelect = (selectedBet) => {
    const arr = [];
    const home = market?.Bets?.find((bet) => bet.Name === "1");
    if (home) {
      arr.push(home);
    }
    const away = market?.Bets?.find((bet) => bet.Name === "2");
    if (away) {
      arr.push(away);
    }

    handleBetChange({
      selectedBet,
      allBets: { selectedBet: arr },
      market: market?.Name,
    });
  };

  useMemo(() => {
    const arr = [];
    const home = market?.Bets?.find((bet) => bet.Name === "1");
    if (home) {
      arr.push(TabTrigger(home.Id, "Home", home.Price));
    }
    const away = market?.Bets?.find((bet) => bet.Name === "2");
    if (away) {
      arr.push(TabTrigger(away.Id, "Away", away.Price));
    }
    setTabs(arr);
  }, []);

  return (
    <div className="flex flex-row justify-between bg-transparent w-full">
      {tabs?.map((tab) => tab)}
    </div>
  );
};

export default IncludingOvertime;
