import React, { useEffect, useMemo, useState } from "react";
import WinOrLose from "./WinOrLose";
import { Card, CardHeader } from "@/components/ui/card";
import UnderOver from "./UnderOver";
import { Button } from "@/components/ui/button";
import HandiCap from "./HandiCap";
import { useDispatch } from "react-redux";
import { setFixtureId, setMarkets } from "../../store/MarketReducer";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { setBets } from "@/store/BetSlipReducer";
import { cardBG } from "@/lib/constants";
import { showMarkets } from "@/store/MobileViewReducer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function FixtureMainCard({ id, markets, fixture, reference, fixtureId }) {
  const dispatch = useDispatch();
  const [leagueName, setLeagueName] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [time, setTime] = useState();
  const [total, setTotal] = useState(0);
  const [isMobileScreen, setMobileScreen] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setMobileScreen(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMemo(() => {
    let total = 0;
    markets?.map((mk) => {
      total += mk?.Bets?.length;
    });
    setTotal(total);
    setLeagueName(fixture?.League?.Name);
    setTime(fixture?.StartDate.replace("T", " "));
    if (fixture?.Participants.length !== 0) {
      const team1 = fixture?.Participants?.find((p) => p.Position === "1");
      if (team1) setTeam1(team1.Name);
      const team2 = fixture?.Participants?.find((p) => p.Position === "2");
      if (team2) setTeam2(team2.Name);
    }
  }, []);

  const handleMarket = () => {
    dispatch(setMarkets(markets === null ? [] : markets));
    dispatch(setFixtureId(fixtureId));
    if (isMobileScreen) {
      dispatch(showMarkets());
    }
  };

  const handleBetChange = ({ allBets, market, selectedBet }) => {
    let selectedBets = [];
    Object.entries(allBets).forEach(([key, bets]) => {
      if (bets) {
        bets.map((bet) => {
          if (bet.Id === selectedBet) {
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
    <div className="flex flex-col gap-2" ref={reference}>
      <span className="text-xs text-gray-400 ml-1">{leagueName}</span>
      <Card className={`flex flex-col gap-2 p-3 ${cardBG[fixture?.Sport?.Id]}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 text-white text-xs p-0 px-1">
          <span className="mt-0">{time}</span>
          {total > 0 ? (
            <span className="mt-0">
              <Button
                className="text-xs font-bold h-6 px-3 py-4"
                onClick={() => handleMarket()}
              >
                {total}+
              </Button>
            </span>
          ) : (
            ""
          )}
        </CardHeader>
        <CardHeader className="flex flex-row justify-evenly items-center space-y-0 text-sm p-0 px-1">
          <span className="w-2/5 text-center">{team1}</span>
          <span className="w-[20%] text-center">VS</span>
          <span className="w-2/5 text-center">{team2}</span>
        </CardHeader>
        <Tabs className="w-full">
          <TabsList className="flex flex-col h-full gap-3 justify-between bg-transparent">
            {markets?.map((mk) => {
              if (mk.Id === 1) {
                return (
                  <WinOrLose
                    key={mk.Id}
                    isMainCard
                    market={mk}
                    handleBetChange={handleBetChange}
                  />
                );
              } else if (mk.Id === 2) {
                return (
                  <UnderOver
                    key={mk.Id}
                    isMainCard
                    market={mk}
                    handleBetChange={handleBetChange}
                  />
                );
              } else if (mk.Id === 3) {
                return (
                  <HandiCap
                    key={mk.Id}
                    isMainCard
                    market={mk}
                    handleBetChange={handleBetChange}
                  />
                );
              }
            })}
          </TabsList>
        </Tabs>
      </Card>
    </div>
  );
}

export default FixtureMainCard;
