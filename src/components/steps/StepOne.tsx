import { useState } from 'react';
import { UserInputs } from '../../types';
import { roomOptions, climateOptions } from '../../data/furnitureData';
import {
  Ruler,
  CloudRain,
  DollarSign,
  Plus,
  Lightbulb,
  Flower2,
  Sparkles,
  Leaf,
} from 'lucide-react';

interface StepOneProps {
  initialInputs: UserInputs;
  onComplete: (inputs: UserInputs) => void;
}

export function StepOne({ initialInputs, onComplete }: StepOneProps) {
  const [inputs, setInputs] = useState<UserInputs>(initialInputs);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const extraFeatureOptions = [
    { value: 'lighting', label: 'Lighting', icon: Lightbulb },
    { value: 'wallart', label: 'Wall Art', icon: Sparkles },
    { value: 'plants', label: 'Plants', icon: Flower2 },
    { value: 'smarthome', label: 'Smart Home Integration', icon: Plus },
    { value: 'ecofriendly', label: 'Eco-Friendly Materials', icon: Leaf },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!inputs.roomType) newErrors.roomType = 'Please select a room type';
    if (inputs.dimensions <= 0)
      newErrors.dimensions = 'Please enter a valid room dimension';
    if (!inputs.climate) newErrors.climate = 'Please select a climate type';
    if (inputs.budget < 10000)
      newErrors.budget = 'Minimum budget is ₹10,000';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onComplete(inputs);
  };

  const toggleExtraFeature = (feature: string) => {
    setInputs({
      ...inputs,
      extraFeatures: inputs.extraFeatures.includes(feature)
        ? inputs.extraFeatures.filter((f) => f !== feature)
        : [...inputs.extraFeatures, feature],
    });
  };

  return (
    /* PAGE CENTER WRAPPER */
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <span
              className="text-sm"
              style={{ color: 'var(--color-primary)' }}
            >
              Step 1 of 3
            </span>
          </div>
          <h2 className="mb-6">Tell Us About Your Space</h2>
          <p
            className="text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-light)' }}
          >
            Help us understand your needs to provide personalized
            recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* ROOM TYPE */}
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h3
              className="mb-8 text-center"
              style={{ color: 'var(--color-primary)' }}
            >
              Select Room Type
            </h3>

            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
                {roomOptions.map((room) => (
                  <button
                    key={room.value}
                    type="button"
                    onClick={() => {
                      setInputs({ ...inputs, roomType: room.value });
                      setErrors({ ...errors, roomType: '' });
                    }}
                    className={`relative overflow-hidden rounded-xl border-3 transition-all hover:scale-105 shadow-md hover:shadow-xl ${
                      inputs.roomType === room.value ? 'ring-4' : ''
                    }`}
                    style={{
                      borderColor:
                        inputs.roomType === room.value
                          ? 'var(--color-primary)'
                          : '#e5e7eb',
                      ringColor: 'var(--color-primary)',
                    }}
                  >
                    <div className="aspect-square">
                      <img
                        src={room.image}
                        alt={room.label}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-all ${
                          inputs.roomType === room.value
                            ? 'bg-black/50'
                            : 'bg-black/30'
                        }`}
                      >
                        <span className="text-white text-lg text-center px-2">
                          {room.label}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {errors.roomType && (
              <p
                className="mt-4 text-center text-lg"
                style={{ color: 'var(--color-error)' }}
              >
                {errors.roomType}
              </p>
            )}
          </div>

          {/* DIMENSIONS */}
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Ruler className="w-7 h-7" style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ color: 'var(--color-primary)' }}>
                Room Dimensions
              </h3>
            </div>

            <label className="block mb-4 text-center text-lg">
              Room Area (in square meters)
            </label>

            <input
              type="number"
              value={inputs.dimensions || ''}
              onChange={(e) =>
                setInputs({ ...inputs, dimensions: Number(e.target.value) })
              }
              placeholder="e.g., 15.5"
              className="w-full px-6 py-4 rounded-xl border-2 text-center text-lg"
              style={{ borderColor: 'var(--color-secondary)' }}
            />

            <input
              type="range"
              min="5"
              max="100"
              value={inputs.dimensions || 5}
              onChange={(e) =>
                setInputs({ ...inputs, dimensions: Number(e.target.value) })
              }
              className="w-full h-2 mt-6"
              style={{ accentColor: 'var(--color-primary)' }}
            />
          </div>

          {/* CLIMATE */}
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <CloudRain
                className="w-7 h-7"
                style={{ color: 'var(--color-primary)' }}
              />
              <h3 style={{ color: 'var(--color-primary)' }}>Climate Type</h3>
            </div>

            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mx-auto">
                {climateOptions.map((climate) => (
                  <button
                    key={climate.value}
                    type="button"
                    onClick={() =>
                      setInputs({ ...inputs, climate: climate.value })
                    }
                    className={`p-6 rounded-xl border-2 text-center transition-all ${
                      inputs.climate === climate.value ? 'ring-4' : ''
                    }`}
                    style={{
                      borderColor:
                        inputs.climate === climate.value
                          ? 'var(--color-primary)'
                          : '#e5e7eb',
                      backgroundColor:
                        inputs.climate === climate.value
                          ? 'var(--color-secondary)'
                          : 'white',
                    }}
                  >
                    <h4 className="text-xl mb-2">{climate.label}</h4>
                    <p className="text-lg" style={{ color: 'var(--color-text-light)' }}>
                      {climate.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BUDGET */}
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <DollarSign
                className="w-7 h-7"
                style={{ color: 'var(--color-primary)' }}
              />
              <h3 style={{ color: 'var(--color-primary)' }}>Budget (INR)</h3>
            </div>

            <input
              type="range"
              min="10000"
              max="500000"
              value={inputs.budget}
              onChange={(e) =>
                setInputs({ ...inputs, budget: Number(e.target.value) })
              }
              className="w-full h-2"
              style={{ accentColor: 'var(--color-primary)' }}
            />
          </div>

          {/* EXTRA FEATURES */}
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
                {extraFeatureOptions.map((feature) => {
                  const Icon = feature.icon;
                  const selected = inputs.extraFeatures.includes(feature.value);
                  return (
                    <button
                      key={feature.value}
                      type="button"
                      onClick={() => toggleExtraFeature(feature.value)}
                      className={`flex items-center gap-4 p-5 rounded-xl border-2 ${
                        selected ? 'ring-4' : ''
                      }`}
                      style={{
                        borderColor: selected
                          ? 'var(--color-primary)'
                          : '#e5e7eb',
                        backgroundColor: selected
                          ? 'var(--color-secondary)'
                          : 'white',
                      }}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-lg">{feature.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-16 py-5 rounded-xl text-xl shadow-xl hover:scale-105"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            >
              Generate Recommendations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
