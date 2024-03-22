import React, { useMemo, useState } from "react";
import WinOrLose from "./WinOrLose";
import { Card, CardHeader } from "@/components/ui/card";
import UnderOver from "./UnderOver";
import { Button } from "@/components/ui/button";
import HandiCap from "./HandiCap";
import { useDispatch } from "react-redux";
import BetRow from "./BetRow";
import { Separator } from "@/components/ui/separator";

function BetCard({ market, bets, fixture, fixtureId, selectedBet }) {
  const dispatch = useDispatch();
  const [leagueName, setLeagueName] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [time, setTime] = useState();

  useMemo(() => {
    setLeagueName(fixture?.League?.Name);
    setTime(fixture?.StartDate.replace("T", " "));
    if (fixture?.Participants.length !== 0) {
      const team1 = fixture?.Participants?.find((p) => p.Position === "1");
      if (team1) setTeam1(team1.Name);
      const team2 = fixture?.Participants?.find((p) => p.Position === "2");
      if (team2) setTeam2(team2.Name);
    }
  }, []);

  const handleMarket = () => {};

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-gray-400 ml-1">{leagueName}</span>
      <Card className="flex flex-col gap-2 bg-gradient-to-r from-amber-900 to-pink-900 p-2">
        <div className="flex justify-end h-5 items-center space-x-2 text-xs">
          <div className="font-bold">{market}</div>
          <Separator className="w-[2px]" orientation="vertical" />
          <span>{time}</span>
        </div>
        <CardHeader className="flex flex-row justify-evenly items-center space-y-0 text-sm p-0 px-1">
          <span>{team1}</span>
          <span>VS</span>
          <span>{team2}</span>
        </CardHeader>
        <BetRow market={market} bets={bets} selectedBet={selectedBet} />
      </Card>
    </div>
  );
}

export default BetCard;
