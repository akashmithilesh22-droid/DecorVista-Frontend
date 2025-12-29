import { useEffect, useState } from "react";
import { UserInputs, FurnitureItem, SelectedItem } from "../../types";
import { furnitureDatabase } from "../../data/furnitureData";
import {
  Check,
  Info,
  ShoppingCart,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

interface StepTwoProps {
  userInputs: UserInputs;
  initialSelections: SelectedItem[];
  onComplete: (selections: SelectedItem[]) => void;
  onBack: () => void;
}

export function StepTwo({
  userInputs,
  initialSelections,
  onComplete,
  onBack,
}: StepTwoProps) {
  const [items, setItems] = useState<FurnitureItem[]>([]);
  const [selected, setSelected] = useState<Map<string, number>>(new Map());
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const filtered = furnitureDatabase
      .filter(item => {
        if (!item.roomTypes.includes(userInputs.roomType)) return false;
        if (!item.climateCompatible.includes(userInputs.climate)) return false;
        if (item.minArea && userInputs.dimensions < item.minArea) return false;
        if (item.maxArea && userInputs.dimensions > item.maxArea) return false;
        return true;
      })
      .sort((a, b) => a.price - b.price);

    setItems(filtered);

    const map = new Map<string, number>();
    initialSelections.forEach(i => map.set(i.id, i.quantity));
    setSelected(map);
  }, [userInputs, initialSelections]);

  const toggle = (id: string, qty: number) => {
    const next = new Map(selected);
    qty <= 0 ? next.delete(id) : next.set(id, qty);
    setSelected(next);
    setError("");
  };

  const totalCost = Array.from(selected.entries()).reduce((sum, [id, q]) => {
    const item = items.find(i => i.id === id);
    return item ? sum + item.price * q : sum;
  }, 0);

  const remaining = userInputs.budget - totalCost;

  const continueNext = () => {
    if (selected.size === 0) {
      setError("Select at least one item to continue");
      return;
    }

    if (totalCost > userInputs.budget) {
      setError("Your selection exceeds the budget");
      return;
    }

    const final: SelectedItem[] = [];
    selected.forEach((q, id) => {
      const item = items.find(i => i.id === id);
      if (item) final.push({ ...item, quantity: q });
    });

    onComplete(final);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <span
          className="inline-block px-4 py-1 rounded-full text-sm mb-4"
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-primary)",
          }}
        >
          Step 2 of 3
        </span>
        <h2>Select Your Furniture</h2>
        <p className="text-lg mt-2 text-gray-500">
          Curated based on your room, climate, and budget
        </p>
      </div>

      {/* Budget Summary */}
      <div className="flex justify-center">
        <div className="bg-white px-10 py-6 rounded-2xl shadow-lg flex gap-10">
          <Summary label="Budget" value={userInputs.budget} />
          <Summary label="Selected" value={totalCost} highlight />
          <Summary
            label="Remaining"
            value={remaining}
            success={remaining >= 0}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center max-w-xl mx-auto">
          {error}
        </div>
      )}

      {/* Furniture Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => {
          const qty = selected.get(item.id) || 0;
          const isSelected = qty > 0;
          const canAfford = item.price <= remaining + item.price * qty;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${
                isSelected ? "ring-2 scale-[1.02]" : ""
              }`}
              style={{ ringColor: "var(--color-primary)" }}
            >
              {/* Image */}
              <div className="relative h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Check className="text-white w-5 h-5" />
                  </div>
                )}
                {!canAfford && !isSelected && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full">
                      Over Budget
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h4
                  className="text-xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.name}
                </h4>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex justify-between items-center">
                  <span
                    className="text-2xl"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() =>
                      setTooltip(tooltip === item.id ? null : item.id)
                    }
                  >
                    <Info className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {tooltip === item.id && item.whyThis && (
                  <div
                    className="p-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                    }}
                  >
                    <strong>Why this?</strong> {item.whyThis}
                  </div>
                )}

                {/* Quantity / Add */}
                {isSelected ? (
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <button onClick={() => toggle(item.id, qty - 1)}>
                      <Minus />
                    </button>
                    <span>Qty: {qty}</span>
                    <button onClick={() => toggle(item.id, qty + 1)}>
                      <Plus />
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={!canAfford}
                    onClick={() => toggle(item.id, 1)}
                    className={`w-full py-3 rounded-xl text-white transition-all ${
                      canAfford
                        ? "hover:scale-105"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <span className="flex justify-center gap-2">
                      <ShoppingCart /> Add to Selection
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-6 pt-6">
        <button
          onClick={onBack}
          className="px-10 py-4 rounded-xl shadow-md"
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-primary)",
          }}
        >
          Back
        </button>

        <button
          onClick={continueNext}
          className="px-12 py-4 rounded-xl shadow-xl text-white hover:scale-105"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <span className="flex gap-2 items-center">
            Continue <Sparkles />
          </span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Small Helper ---------- */
function Summary({
  label,
  value,
  highlight,
  success,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  success?: boolean;
}) {
  return (
    <div className="text-center">
      <span className="text-sm text-gray-500 block mb-1">{label}</span>
      <p
        className={`text-xl ${
          highlight
            ? "font-semibold"
            : success === false
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        ₹{Math.abs(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
