import { useState } from 'react';
import { useSession } from "../../context/SessionContext";
import { UserInputs, SelectedItem } from '../../types';
import { complementaryItems } from '../../data/furnitureData';
import { Download, Edit, Check } from 'lucide-react';

interface StepThreeProps {
  userInputs: UserInputs;
  selectedItems: SelectedItem[];
  onEdit: () => void;
  onBack: () => void;
}

export function StepThree({ userInputs, selectedItems, onEdit, onBack }: StepThreeProps) {
  const { user } = useSession(); // ✅ FIX
  const [selectedComplementary, setSelectedComplementary] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);

  const GST_RATE = 0.18;

  const furnitureSubtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const complementarySubtotal = Array.from(selectedComplementary).reduce((sum, id) => {
    const item = complementaryItems.find(i => i.id === id);
    return sum + (item?.price || 0);
  }, 0);

  const subtotal = furnitureSubtotal + complementarySubtotal;
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  const toggleComplementary = (id: string) => {
    const next = new Set(selectedComplementary);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedComplementary(next);
  };

  const handleDownloadQuote = async () => {
  try {
    if (!user) {
      alert("Session expired. Please sign in again.");
      return;
    }

    // 1️⃣ UPDATE SESSION (THIS MUST WORK)
    const updateRes = await fetch(
      `http://localhost:5000/api/sessions/${user.sessionId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType: userInputs.roomType,
          budget: userInputs.budget,
          selections: selectedItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      }
    );

    const updateData = await updateRes.json();

    if (!updateRes.ok) {
      console.error(updateData);
      throw new Error("Session update failed");
    }

    // 2️⃣ DOWNLOAD PDF
    const res = await fetch(
      `http://localhost:5000/api/sessions/${user.sessionId}/pdf`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(text);
      throw new Error("PDF generation failed");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "DecorVista-Quote.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (err) {
    console.error(err);
    alert("Failed to download quote");
  }
};




  const fabrics = complementaryItems.filter(i => i.category === 'fabric');
  const curtains = complementaryItems.filter(i => i.category === 'curtain');
  const accessories = complementaryItems.filter(i => i.category === 'accessory');


  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ 
          backgroundColor: 'var(--color-secondary)' 
        }}>
          <span className="text-sm" style={{ color: 'var(--color-primary)' }}>Step 3 of 3 - Final Review</span>
        </div>
        <h2 className="mb-6">Your Complete Decor Solution</h2>
        <p className="text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
          Review your selections and add complementary items
        </p>
      </div>

      {showSuccess && (
        <div className="mb-8 p-6 rounded-2xl text-center shadow-xl max-w-2xl mx-auto" style={{ 
          backgroundColor: 'var(--color-success)',
          color: 'white'
        }}>
          <Check className="w-8 h-8 inline-block mr-2" />
          Quote downloaded successfully!
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Selected Furniture */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 style={{ color: 'var(--color-primary)' }}>Selected Furniture</h3>
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-md"
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-4">
              {selectedItems.map(item => (
                <div key={item.id} className="flex items-center gap-5 p-5 rounded-xl shadow-md hover:shadow-lg transition-all" style={{ 
                  backgroundColor: 'var(--color-background)' 
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-sm"
                  />
                  <div className="flex-1">
                    <h4 className="mb-2 text-xl" style={{ color: 'var(--color-primary)' }}>{item.name}</h4>
                    <p className="text-lg mb-2" style={{ color: 'var(--color-text-light)' }}>
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm mb-1" style={{ color: 'var(--color-text-light)' }}>Unit Price</p>
                    <p className="text-lg mb-2" style={{ color: 'var(--color-primary)' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>Total</p>
                    <p className="text-2xl" style={{ color: 'var(--color-primary)' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complementary Items - Fabrics */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="mb-8 text-center" style={{ color: 'var(--color-primary)' }}>Recommended Fabrics & Upholstery</h3>
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-5 max-w-3xl w-full">
                {fabrics.slice(0, 6).map(item => {
                  const isSelected = selectedComplementary.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleComplementary(item.id)}
                      className={`text-left p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-105 ${
                        isSelected ? 'ring-4' : ''
                      }`}
                      style={{
                        borderColor: isSelected ? 'var(--color-primary)' : '#e5e7eb',
                        ringColor: 'var(--color-primary)',
                        backgroundColor: isSelected ? 'var(--color-secondary)' : 'white'
                      }}
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 text-lg" style={{ 
                            color: isSelected ? 'var(--color-primary)' : undefined 
                          }}>{item.name}</h4>
                          <p className="text-sm mb-2 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                            {item.description}
                          </p>
                          <p className="text-lg" style={{ color: 'var(--color-primary)' }}>
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Complementary Items - Curtains */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="mb-8 text-center" style={{ color: 'var(--color-primary)' }}>Recommended Curtains & Drapes</h3>
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-5 max-w-3xl w-full">
                {curtains.slice(0, 5).map(item => {
                  const isSelected = selectedComplementary.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleComplementary(item.id)}
                      className={`text-left p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-105 ${
                        isSelected ? 'ring-4' : ''
                      }`}
                      style={{
                        borderColor: isSelected ? 'var(--color-primary)' : '#e5e7eb',
                        ringColor: 'var(--color-primary)',
                        backgroundColor: isSelected ? 'var(--color-secondary)' : 'white'
                      }}
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 text-lg" style={{ 
                            color: isSelected ? 'var(--color-primary)' : undefined 
                          }}>{item.name}</h4>
                          <p className="text-sm mb-2 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                            {item.description}
                          </p>
                          <p className="text-lg" style={{ color: 'var(--color-primary)' }}>
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Complementary Items - Accessories */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="mb-8 text-center" style={{ color: 'var(--color-primary)' }}>Recommended Accessories</h3>
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-5 max-w-3xl w-full">
                {accessories.slice(0, 10).map(item => {
                  const isSelected = selectedComplementary.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleComplementary(item.id)}
                      className={`text-left p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-105 ${
                        isSelected ? 'ring-4' : ''
                      }`}
                      style={{
                        borderColor: isSelected ? 'var(--color-primary)' : '#e5e7eb',
                        ringColor: 'var(--color-primary)',
                        backgroundColor: isSelected ? 'var(--color-secondary)' : 'white'
                      }}
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 text-lg" style={{ 
                            color: isSelected ? 'var(--color-primary)' : undefined 
                          }}>{item.name}</h4>
                          <p className="text-sm mb-2 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                            {item.description}
                          </p>
                          <p className="text-lg" style={{ color: 'var(--color-primary)' }}>
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar - Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-8 rounded-2xl shadow-2xl border-2" style={{ 
            borderColor: 'var(--color-primary)' 
          }}>
            <h3 className="mb-8 text-center" style={{ color: 'var(--color-primary)' }}>Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between pb-3 border-b">
                <span style={{ color: 'var(--color-text-light)' }}>Furniture Subtotal</span>
                <span>₹{furnitureSubtotal.toLocaleString('en-IN')}</span>
              </div>
              
              {complementarySubtotal > 0 && (
                <div className="flex justify-between pb-3 border-b">
                  <span style={{ color: 'var(--color-text-light)' }}>
                    Complementary Items ({selectedComplementary.size})
                  </span>
                  <span>₹{complementarySubtotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              <div className="flex justify-between pb-3 border-b">
                <span style={{ color: 'var(--color-text-light)' }}>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between pb-3 border-b">
                <span style={{ color: 'var(--color-text-light)' }}>GST (18%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between text-xl pt-2">
                <span>Total</span>
                <span style={{ color: 'var(--color-primary)' }}>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Budget Comparison */}
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-background)' }}>
              <div className="flex justify-between mb-2">
                <span className="text-sm" style={{ color: 'var(--color-text-light)' }}>Your Budget</span>
                <span className="text-sm">₹{userInputs.budget.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min((total / userInputs.budget) * 100, 100)}%`,
                    backgroundColor: total <= userInputs.budget ? 'var(--color-success)' : 'var(--color-error)'
                  }}
                />
              </div>
              <p className="text-sm text-center">
                {total <= userInputs.budget ? (
                  <span style={{ color: 'var(--color-success)' }}>
                    ✓ Within budget! Saving ₹{(userInputs.budget - total).toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span style={{ color: 'var(--color-error)' }}>
                    Over budget by ₹{(total - userInputs.budget).toLocaleString('en-IN')}
                  </span>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadQuote}
                className="w-full py-3 rounded-lg transition-all hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
                <span>Download Quote</span>
              </button>
              
              <button
                onClick={onEdit}
                className="w-full py-3 rounded-lg border-2 transition-all hover:scale-105 flex items-center justify-center space-x-2"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)'
                }}
              >
                <Edit className="w-5 h-5" />
                <span>Edit Selections</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm mb-2" style={{ color: 'var(--color-text-light)' }}>
                Questions? Contact us:
              </p>
              <p className="text-sm">
                📞 +91 22 1234 5678<br />
                📧 hello@decorvista.in
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg border transition-all hover:scale-105"
          style={{
            borderColor: 'var(--color-accent)',
            color: 'var(--color-text-light)'
          }}
        >
          ← Back to Furniture Selection
        </button>
      </div>
    </div>
  );
}