import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAllIngredients } from "@/hooks/useIngredients";
import { IngredientT } from "@/model/Ingredient";

export function IngredientSelect({
  onSelect,
}: {
  onSelect: (ingredient: IngredientT, quantity: number) => void;
}) {
  const [selectedIngredient, setSelectedIngredient] = useState<
    IngredientT | undefined | null
  >(null);
  const [quantity, setQuantity] = useState("");

  const { data: ingredients, isLoading } = useAllIngredients();

  const handleAdd = () => {
    if (selectedIngredient && quantity) {
      onSelect(selectedIngredient, Number(quantity));
      setSelectedIngredient(selectedIngredient);
      setQuantity("");
    }
  };

  if (isLoading) return <div>Loading ingredients...</div>;

  return (
    <div className="space-y-2">
      <Select
        value={selectedIngredient?._id}
        onValueChange={(value: string) => {
          setSelectedIngredient(
            ingredients?.find((ingredient) => ingredient._id === value),
          );
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an ingredient" />
        </SelectTrigger>
        <SelectContent>
          {ingredients?.map((ingredient: { _id: string; name: string }) => (
            <SelectItem key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Quantity (g)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Button onClick={handleAdd} type={"button"}>
        Add Ingredient
      </Button>
    </div>
  );
}
