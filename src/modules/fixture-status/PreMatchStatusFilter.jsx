import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense, useState } from "react";
import Leagues from "../fixture";

const fixtureStatus = [
  { Id: 1, Value: "Not started yet" },
  { Id: 2, Value: "In progress" },
  { Id: 3, Value: "Finished" },
  { Id: 4, Value: "Canceled" },
  { Id: 5, Value: "Postponed" },
  //   { Id: 6, Value: "Interrupted" },
  //   { Id: 7, Value: "Abandoned" },
  //   { Id: 8, Value: "Coverage lost" },
  //   { Id: 9, Value: "About to start" },
];

const sports = [
  { Id: 6, Value: "Interrupted" },
  { Id: 7, Value: "Abandoned" },
  { Id: 8, Value: "Coverage lost" },
  { Id: 9, Value: "About to start" },
];

const FixtureStatusFilter = () => {
  const [status, setStatus] = useState(fixtureStatus[0].Value);
  const [sport, setSport] = useState(sports[0].Value);
  return (
    <>
      <Tabs
        defaultValue={status}
        className="w-1/2"
        onValueChange={(value) => setStatus(value)}
      >
        <TabsList className="grid w-full grid-cols-5">
          {fixtureStatus?.map((f) => (
            <TabsTrigger
              onValueChange={(value) => console.log(value)}
              key={f.Id + f.Value}
              className="uppercase"
              value={f.Value}
            >
              {f.Value}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Tabs
        defaultValue={sport}
        className="w-1/2"
        onValueChange={(value) => setSport(value)}
      >
        <TabsList className="grid w-full grid-cols-5">
          {sports?.map((f) => (
            <TabsTrigger
              key={f.Id + f.Value}
              className="uppercase"
              value={f.Value}
            >
              {f.Value}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Leagues status={status} sport={sport} />
    </>
  );
};

export default FixtureStatusFilter;
