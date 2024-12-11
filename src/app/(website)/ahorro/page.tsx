import React, { Suspense } from "react";
import SavingsTracker from "./page.client";
import Loading from "./loading";

const Ahorro = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SavingsTracker />
    </Suspense>
  );
};

export default Ahorro;
