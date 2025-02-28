import { TabsTrigger } from "@/components/ui/tabs";
import React, { useMemo, useState } from "react";

const OddEven = ({ market, handleBetChange }) => {
  const [tabList, setTabList] = useState([]);

  const onTabSelect = (selectedBetId) => {
    const arr = [];
    const home = market?.Bets?.find((bet) => bet.Name.toLowerCase() === "odd");
    if (home) {
      arr.push(home);
    }
    const away = market?.Bets?.find((bet) => bet.Name.toLowerCase() === "even");
    if (away) {
      arr.push(away);
    }

    handleBetChange({
      selectedBetId,
      allBets: { selectedBetId: arr },
      market: market?.Name,
    });
  };

  const TabTrigger = (key, title, price) => {
    return (
      <TabsTrigger
        key={key + market.Name}
        value={key}
        className="flex flex-row justify-between w-[30%] text-white border-[1px] border-white data-[state=active]:text-black data-[state=active]:bg-white"
        onClick={() => onTabSelect(key)}
      >
        <span className="text-xs">{title}</span>
        <span className="text-xs">{price}</span>
      </TabsTrigger>
    );
  };

  useMemo(() => {
    const arr = [];
    const home = market?.Bets?.find((b) => b.Name.toLowerCase() === "odd");
    const away = market?.Bets?.find((b) => b.Name.toLowerCase() === "even");
    if (home) {
      arr.push(TabTrigger(home.Id, "Odd", home.Price));
    }
    if (away) {
      arr.push(TabTrigger(away.Id, "Even", away.Price));
    }
    setTabList(arr);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between bg-transparent w-full">
        {tabList?.map((tab) => tab)}
      </div>
    </>
  );
};

export default OddEven;
