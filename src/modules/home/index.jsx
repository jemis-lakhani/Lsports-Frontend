import React from "react";
import { Card } from "@/components/ui/card";
import Sports from "../sports";

const MainComponent = () => {
  return (
    <div className="h-full p-6 bg-background">
      <h6 className="w-full text-primary text-xl uppercase font-bold mb-2 ml-2">
        Pre Match
      </h6>
      <div style={{ height: "calc(100% - 30px)" }}>
        <Card className="h-full border-[2px]">
          <Sports />
        </Card>
      </div>
    </div>
  );
};

export default MainComponent;
