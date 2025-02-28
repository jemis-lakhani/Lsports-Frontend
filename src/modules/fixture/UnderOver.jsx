import { TabsTrigger } from "@/components/ui/tabs";
import React, { useMemo, useState } from "react";

const UnderOver = ({ market, isMainCard, handleBetChange }) => {
  const [tabList, setTabList] = useState([]);

  const TabTrigger = (betId, title, price, baseLine) => {
    return (
      <TabsTrigger
        key={betId + market.Name}
        value={betId}
        className="flex flex-row justify-between w-[30%] text-white border-[1px] border-white data-[state=active]:text-black data-[state=active]:bg-white"
        onClick={() => onTabSelect(betId, baseLine)}
      >
        <span className="text-xs">{title}</span>
        <span className="text-xs">{price}</span>
      </TabsTrigger>
    );
  };

  const onTabSelect = (selectedBetId, baseLine) => {
    const group = market?.Bets?.reduce((groupBy, bet) => {
      const { BaseLine, ...rest } = bet;
      if (!groupBy[BaseLine]) {
        groupBy[BaseLine] = [];
      }
      groupBy[BaseLine].push(rest);
      return groupBy;
    }, {});

    handleBetChange({
      selectedBetId,
      allBets: group,
      market: market?.Name,
      baseLine,
    });
  };

  useMemo(() => {
    const group = market?.Bets?.reduce((groupBy, bet) => {
      const { BaseLine, ...rest } = bet;
      if (!groupBy[BaseLine]) {
        groupBy[BaseLine] = [];
      }
      groupBy[BaseLine].push(rest);
      return groupBy;
    }, {});

    if (group) {
      const { MainLine } = market;
      const tabList = [];
      Object.entries(group).forEach(([BaseLine, bets]) => {
        const arr = [];
        const home = bets?.find((b) => b.Name.toLowerCase() === "under");
        const away = bets?.find((b) => b.Name.toLowerCase() === "over");
        if (isMainCard && BaseLine === MainLine) {
          if (home) {
            arr.push(TabTrigger(home.Id, "Under", home.Price, BaseLine));
          }
          if (home && away) {
            arr.push(
              <div
                key={home.Id + away.Id}
                className="flex justify-between items-center text-xs text-white w-[30%]"
              >
                <span>U/O</span>
                <span>{MainLine}</span>
              </div>,
            );
          }
          if (away) {
            arr.push(TabTrigger(away.Id, "Over", away.Price, BaseLine));
          }
        } else if (!isMainCard) {
          if (home) {
            arr.push(TabTrigger(home.Id, "Under", home.Price, BaseLine));
          }
          if (home && away) {
            arr.push(
              <div
                key={home.Id + away.Id}
                className="flex justify-between items-center text-xs text-white w-[30%]"
              >
                <span>U/O</span>
                <span>{BaseLine}</span>
              </div>,
            );
          }
          if (away) {
            arr.push(TabTrigger(away.Id, "Over", away.Price, BaseLine));
          }
        }
        if (arr.length > 0) {
          tabList.push(arr);
        }
      });
      setTabList(tabList);
    }
  }, []);

  return (
    <>
      {tabList?.length !== 0 &&
        tabList?.map((tab, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-between bg-transparent w-full"
            >
              {tab?.map((tab) => tab)}
            </div>
          );
        })}
    </>
  );
};

export default UnderOver;
