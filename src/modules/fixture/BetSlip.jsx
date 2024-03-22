import { deleteSlip, setCurrentSlip, setSlips } from "@/store/BetSlipReducer";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BetCard from "./BetCard";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";

const BetSlip = () => {
  const dispatch = useDispatch();
  const { slips, currentSlip, bets } = useSelector((state) => state.bets);
  const { fixtureId } = useSelector((state) => state.markets);

  useEffect(() => {
    if (Object.keys(bets).length !== 0) {
      //   console.log({ fixtureId }, { currentSlip });
      if (fixtureId && currentSlip) {
        // console.log({ bets });
      }
    }
  }, [bets, fixtureId, currentSlip]);

  const createSlip = (e, number) => {
    if (!slips.includes(number)) {
      dispatch(setSlips(number));
      dispatch(setCurrentSlip(number));
    } else {
      dispatch(setCurrentSlip(number));
    }
  };

  const slipComponents = [1, 2, 3].map((number) => (
    <div
      key={number}
      className={clsx(
        "relative text-white h-12 w-12 flex items-center justify-center rounded-md cursor-pointer select-none",
        {
          "bg-gray-800": !slips.includes(parseInt(number)),
          "bg-amber-800": slips.includes(parseInt(number)),
        },
      )}
    >
      <label
        htmlFor={`folder-${number}`}
        className="relative flex items-center justify-center w-full h-full has-[:checked]:text-white cursor-pointer select-none"
      >
        <input
          type="checkbox"
          id={`folder-${number}`}
          className="hidden"
          onClick={(e) => createSlip(e, number)}
        />
        {currentSlip === number ? (
          <FaCheck />
        ) : slips.includes(number) ? (
          number
        ) : (
          "+"
        )}
      </label>
    </div>
  ));

  const deleteBetSlip = () => {
    dispatch(deleteSlip(currentSlip));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 p-2">{slipComponents}</div>
      <Button
        className={clsx("", {
          "opacity-40 pointer-events-none select-none truncate":
            slips.length === 0,
        })}
        onClick={() => deleteBetSlip()}
      >
        Delete Slip
      </Button>
      {Object.keys(bets).length !== 0 &&
      bets[currentSlip] &&
      Object.keys(bets[currentSlip])?.length !== 0
        ? Object.entries(bets[currentSlip]).map(([key, data]) => {
            return (
              <BetCard
                key={key}
                market={data?.market}
                bets={data?.bets}
                fixture={data?.fixture}
                fixtureId={data?.fixtureId}
                selectedBet={data?.selectedBet}
              />
            );
          })
        : ""}
    </div>
  );
};

export default BetSlip;
