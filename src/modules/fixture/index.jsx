import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import FixtureMainCard from "./FixtureMainCard";
import { useDispatch } from "react-redux";
import { setFixtureId, setMarkets } from "@/store/MarketReducer";
import Loader from "../Loader";
import { setLoader } from "@/store/LoaderReducer";
import clsx from "clsx";

const COUNT = 10;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fetchFixtures = async ({ pageParam, sportId }) => {
  const body = {
    gameStatus: "BET",
    start: pageParam * COUNT,
    count: COUNT,
  };
  if (sportId) {
    body.sportIds = [sportId];
  }
  return fetch(`${BACKEND_URL}/fixtures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

const Fixtures = ({ sportId }) => {
  const dispatch = useDispatch();
  const [isInitialFetch, setInitialFetch] = useState(true);
  const { inView, ref } = useInView();
  const [page, setPage] = useState(0);
  const {
    data: fixtures,
    refetch,
    isSuccess,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["fixtures", sportId],
    queryFn: ({ pageParam }) => fetchFixtures({ pageParam, sportId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data) {
        if (lastPage.data.total - (page + 1) * COUNT >= 0) {
          return page + 1;
        }
      }
    },
  });

  useEffect(() => {
    setInitialFetch(true);
    setPage(0);
    refetch();
    dispatch(setMarkets([]));
  }, [sportId]);

  useEffect(() => {
    if (isInitialFetch && fixtures) {
      setInitialFetch(false);
      const market =
        fixtures?.pages && fixtures?.pages?.length > 0
          ? fixtures?.pages[0].data?.documents &&
            fixtures?.pages[0].data?.documents.length > 0
            ? fixtures?.pages[0].data?.documents[0].value?.Markets
            : []
          : [];

      const fixtureId =
        fixtures?.pages && fixtures?.pages?.length > 0
          ? fixtures?.pages[0].data?.documents &&
            fixtures?.pages[0].data?.documents.length > 0
            ? fixtures?.pages[0].data?.documents[0].value?.FixtureId
            : null
          : null;

      dispatch(setMarkets(market === null ? [] : market));
      dispatch(setFixtureId(fixtureId));
    }
  }, [fixtures, isInitialFetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    dispatch(setLoader(isFetching));
  }, [isFetching]);

  return (
    <div className="relative flex flex-col gap-4 h-full">
      <div
        className={clsx("flex flex-col gap-4", {
          "opacity-20": isFetching,
        })}
      >
        {isSuccess &&
          fixtures?.pages.map((page, i) =>
            page?.data?.documents?.map((doc, j) => {
              if (
                fixtures?.pages.length === i + 1 &&
                page?.data?.documents.length === j + 1
              ) {
                return (
                  <FixtureMainCard
                    reference={ref}
                    key={doc?.id}
                    id={doc?.id}
                    markets={doc?.value?.Markets}
                    fixture={doc?.value?.Fixture}
                    fixtureId={doc?.value?.FixtureId}
                  />
                );
              } else {
                return (
                  <FixtureMainCard
                    key={doc?.id}
                    id={doc?.id}
                    markets={doc?.value?.Markets}
                    fixture={doc?.value?.Fixture}
                    fixtureId={doc?.value?.FixtureId}
                  />
                );
              }
            }),
          )}
        {isFetching && <Loader />}
      </div>
    </div>
  );
};

export default Fixtures;
