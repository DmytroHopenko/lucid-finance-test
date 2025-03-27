import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useVariableStore } from "@/lib/store/variable-store";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";

export const VariableOverlay = () => {
  const { open, closeOverlay, variables, addActiveVariable } =
    useVariableStore();
  const memoizedVariables = useMemo(() => variables, [variables]);
  const [newVariableName, setNewVariableName] = useState<string>("");
  const [newVariableValue, setNewVariableValue] = useState<string>("");

  const handleSelectVariable = useCallback(
    (id: string) => {
      const selected = variables.find((v) => v.id === id);
      if (selected) {
        addActiveVariable(selected);
        closeOverlay();
      }
    },
    [variables, addActiveVariable, closeOverlay]
  );

  const handleCreateNewVariable = useCallback(() => {
    const newVariable = {
      id: uuidv4(),
      name: newVariableName || "New variable",
      category: "",
      value: newVariableValue || undefined,
      isEditing: false,
      formula: "",
    };
    addActiveVariable(newVariable);
    setNewVariableName(""); 
    setNewVariableValue("");
  }, [newVariableName, newVariableValue, addActiveVariable]);

  return (
    <Dialog open={open} onOpenChange={closeOverlay}>
      <DialogContent className="w-full !max-w-[340px] h-[300px]">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Manage your variables
          </DialogTitle>
          <DialogDescription>
            Here you can add active variables
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <h2 className="text-lg font-bold mb-5">Select existing variable</h2>
          <Select onValueChange={handleSelectVariable}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Variable" />
            </SelectTrigger>
            <SelectContent className="h-[200px]">
              {memoizedVariables.map((variable) => (
                <SelectItem key={variable.id} value={variable.id}>
                  {variable.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-lg font-bold">Add new variable</h2>
        <div className="flex gap-3">
          <Input
            placeholder="Variable tag"
            value={newVariableName}
            onChange={(e) => setNewVariableName(e.target.value)}
          />
          <Input
            placeholder="Variable value"
            value={newVariableValue}
            onChange={(e) => setNewVariableValue(e.target.value)}
          />
          <Button onClick={handleCreateNewVariable} variant="link">
            <IoIosAddCircleOutline className="size-6 text-lucid-main" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
