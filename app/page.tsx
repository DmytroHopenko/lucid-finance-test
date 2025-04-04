"use client";

import { Loader } from "@/components/globals/loader";
import { VariableOverlay } from "@/components/overlays/variable";
import { FinanceTable } from "@/components/tables/finance";
import { fetchData } from "@/lib/actions/table";
import { useVariableStore } from "@/lib/store/variable-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Home = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["variables"],
    queryFn: fetchData,
  });

  const { setVariables } = useVariableStore();

  useEffect(() => {
    if (data?.json) {
      const uniqueVariables = data.json.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      );
      setVariables(uniqueVariables);
    }
  }, [data]);

  return (
    <section className="wrapper py-10">
      <div className="flex mb-10">
        <h1 className="text-3xl text-darkin font-bold">Manage your tables</h1>
      </div>
      <div className="w-full overflow-auto">
        {isPending ? (
          <Loader />
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <FinanceTable />
        )}
      </div>
      <VariableOverlay />
    </section>
  );
};

export default Home;
