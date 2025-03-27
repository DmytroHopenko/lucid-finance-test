import { useState } from "react";
import { Input } from "@/components/ui/input";

export const FormulaInput = () => {
  const [formula, setFormula] = useState<string>("");

  return (
    <div className="relative">
      <Input
        value={formula}
        placeholder="Enter formula"
        onChange={(e) => setFormula(e.target.value)}
      />
    </div>
  );
};
