import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import clsx from "clsx";
import React, { useMemo, useState } from "react";

const HandiCap = ({ market, isMainCard, handleBetChange }) => {
  const [tabList, setTabList] = useState([]);

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
    const group = market?.Bets?.reduce((groupBy, bet) => {
      const { BaseLine, ...rest } = bet;
      if (!groupBy[BaseLine]) {
        groupBy[BaseLine] = [];
      }
      groupBy[BaseLine].push(rest);
      return groupBy;
    }, {});
    handleBetChange({
      selectedBet,
      allBets: group,
      market: "handicap",
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
        const home = bets?.find((b) => b.Name === "1");
        const away = bets?.find((b) => b.Name === "2");
        if (isMainCard && BaseLine === MainLine) {
          if (home) {
            arr.push(TabTrigger(home.Id, "Home", home.Price));
          }
          if (home && away) {
            arr.push(
              <div
                key={home.Id + away.Id}
                className="flex justify-between text-xs text-white w-[30%]"
              >
                <span>H</span>
                <span>{MainLine}</span>
              </div>,
            );
          }
          if (away) {
            arr.push(TabTrigger(away.Id, "Away", away.Price));
          }
        } else if (!isMainCard) {
          if (home) {
            arr.push(TabTrigger(home.Id, "Home", home.Price));
          }
          if (home && away) {
            arr.push(
              <div
                key={home.Id + away.Id}
                className="flex justify-between text-xs text-white w-[30%]"
              >
                <span>H</span>
                <span>{BaseLine}</span>
              </div>,
            );
          }
          if (away) {
            arr.push(TabTrigger(away.Id, "Away", away.Price));
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
      {tabList?.length !== 0
        ? tabList?.map((tab, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-between w-full bg-transparent"
              >
                {tab?.map((tab) => tab)}
              </div>
            );
          })
        : ""}
    </>
  );
};

export default HandiCap;
