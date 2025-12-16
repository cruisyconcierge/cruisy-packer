import React, { useState, useMemo } from 'react';
import { 
  Luggage, Sun, Shirt, ShoppingBag, Trash2, CheckSquare, 
  Square, ExternalLink, RotateCcw, Anchor, Camera, Menu, 
  X, Plus, ArrowRight, Smile, User, Map, Compass, Watch, Smartphone,
  Umbrella, Coffee
} from 'lucide-react';

// --- ASSETS: SVG MANNEQUINS ---
const MannequinSVG = ({ gender, bodyType, clothing }) => {
  // Simple SVG paths for silhouettes
  const malePath = "M100,50 C100,20 130,20 130,50 C130,65 145,70 160,75 L160,160 L145,160 L145,280 L160,280 L160,450 L125,450 L125,300 L115,300 L115,450 L80,450 L80,280 L95,280 L95,160 L80,160 L80,75 C95,70 100,65 100,50 Z";
  const femalePath = "M100,50 C100,20 130,20 130,50 C130,65 115,70 150,75 C165,80 160,140 160,160 C160,180 170,200 160,220 L155,450 L125,450 L125,300 L115,300 L115,450 L85,450 L80,220 C70,200 80,180 80,160 C80,140 75,80 90,75 C125,70 100,65 100,50 Z";
  
  // Dynamic width adjustment for body type
  const scaleX = bodyType === 'plus' ? 1.3 : bodyType === 'petite' ? 0.9 : 1;
  const path = gender === 'male' ? malePath : femalePath;

  return (
    <div className="relative w-64 h-96 mx-auto transition-all duration-500">
      <svg viewBox="0 0 240 500" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor:"#e5e7eb", stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:"#f3f4f6", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#d1d5db", stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* The Body Silhouette */}
        <path 
          d={path} 
          fill="url(#skinGradient)" 
          stroke="#9ca3af" 
          strokeWidth="2"
          transform={`scale(${scaleX}, 1) translate(${bodyType === 'plus' ? -20 : bodyType === 'petite' ? 10 : 0}, 0)`}
        />
      </svg>

      {/* VISUAL OVERLAYS (Clothing Items appear here) */}
      <div className="absolute inset-0 flex flex-col items-center pt-20">
        {/* TOP */}
        <div className={`transition-all duration-500 ${clothing.top ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
           {clothing.top && (
             <div className={`p-4 rounded-xl shadow-lg ${clothing.top.color} flex items-center justify-center transform hover:scale-110 transition-transform`}>
               <Shirt size={40} className="text-gray-800 opacity-75" />
             </div>
           )}
        </div>
        
        {/* BOTTOM */}
        <div className={`mt-2 transition-all duration-500 delay-75 ${clothing.bottom ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
           {clothing.bottom && (
             <div className={`p-4 w-20 h-24 rounded-lg shadow-lg ${clothing.bottom.color} flex items-center justify-center transform hover:scale-110 transition-transform`}>
               {/* Just a visual block for pants/shorts */}
             </div>
           )}
        </div>

        {/* SHOES */}
        <div className={`absolute bottom-8 flex space-x-8 transition-all duration-500 delay-150 ${clothing.shoes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
           {clothing.shoes && (
             <>
               <div className={`w-8 h-6 rounded-md shadow-md ${clothing.shoes.color}`}></div>
               <div className={`w-8 h-6 rounded-md shadow-md ${clothing.shoes.color}`}></div>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

// --- DATA ---
const OUTFIT_DATA = {
  male: {
    casual: [
      { id: 'm_c_1', name: 'Linen Button Down', price: 28.99, type: 'top', color: 'bg-blue-200' },
      { id: 'm_c_2', name: 'Chino Shorts', price: 24.50, type: 'bottom', color: 'bg-orange-100' },
      { id: 'm_c_3', name: 'Boat Shoes', price: 55.00, type: 'shoes', color: 'bg-stone-400' },
    ],
    formal: [
      { id: 'm_f_1', name: 'Navy Blazer', price: 89.99, type: 'top', color: 'bg-blue-800' },
      { id: 'm_f_2', name: 'Crisp White Shirt', price: 45.00, type: 'top_layer', color: 'bg-white border' },
      { id: 'm_f_3', name: 'Slim Fit Slacks', price: 39.99, type: 'bottom', color: 'bg-gray-700' },
      { id: 'm_f_4', name: 'Leather Loafers', price: 70.00, type: 'shoes', color: 'bg-amber-900' },
    ],
    active: [
      { id: 'm_a_1', name: 'Moisture Wick Tee', price: 18.00, type: 'top', color: 'bg-gray-300' },
      { id: 'm_a_2', name: 'Swim Trunks', price: 22.00, type: 'bottom', color: 'bg-cyan-300' },
      { id: 'm_a_3', name: 'Water Shoes', price: 30.00, type: 'shoes', color: 'bg-black' },
    ]
  },
  female: {
    casual: [
      { id: 'f_c_1', name: 'Floral Maxi Dress', price: 35.00, type: 'top', color: 'bg-rose-200' }, 
      { id: 'f_c_2', name: 'Straw Sun Hat', price: 18.99, type: 'access', color: 'bg-yellow-100' },
      { id: 'f_c_3', name: 'Strappy Sandals', price: 25.00, type: 'shoes', color: 'bg-amber-200' },
    ],
    formal: [
      { id: 'f_f_1', name: 'Cocktail Midi Dress', price: 65.00, type: 'top', color: 'bg-emerald-600' },
      { id: 'f_f_2', name: 'Statement Clutch', price: 30.00, type: 'access', color: 'bg-gray-900' },
      { id: 'f_f_3', name: 'Block Heels', price: 45.00, type: 'shoes', color: 'bg-black' },
    ],
    active: [
      { id: 'f_a_1', name: 'Tankini Top', price: 28.00, type: 'top', color: 'bg-pink-300' },
      { id: 'f_a_2', name: 'High Waist Bottoms', price: 24.00, type: 'bottom', color: 'bg-pink-400' },
      { id: 'f_a_3', name: 'Cover-up Sarong', price: 15.00, type: 'access', color: 'bg-white border-dashed' },
    ]
  }
};

const ESSENTIALS_DATA = [
  { id: 'e1', name: 'Univ. Adapter', price: 19.99, category: 'Tech', icon: <Smartphone size={20}/> },
  { id: 'e2', name: 'Power Bank', price: 29.99, category: 'Tech', icon: <Watch size={20}/> },
  { id: 'e3', name: 'Packing Cubes', price: 24.99, category: 'Gear', icon: <Luggage size={20}/> },
  { id: 'e4', name: 'Waterproof Pouch', price: 9.99, category: 'Gear', icon: <Umbrella size={20}/> },
  { id: 'e6', name: 'Reef Safe Sunscreen', price: 14.50, category: 'Toiletries', icon: <Sun size={20}/> },
  { id: 'e7', name: 'Motion Sickness', price: 12.00, category: 'Health', icon: <Anchor size={20}/> },
];
// --- COMPONENTS ---

const Header = ({ view, setView, myBagCount }) => (
  <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100 transition-all">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        
        {/* LOGO AREA */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => setView('home')}
        >
          <div className="bg-brand/10 p-2 rounded-full mr-3 group-hover:bg-brand/20 transition-colors">
             <Anchor className="text-brand" size={28} />
          </div>
          <span className="font-header text-2xl text-gray-800 tracking-wide group-hover:text-brand transition-colors">
            CRUISY <span className="text-brand">TRIP KIT</span>
          </span>
        </div>
        
        {/* NAVIGATION PILLS */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <button 
            onClick={() => setView('planner')} 
            className={`hidden md:flex px-4 py-2 rounded-full text-sm font-bold transition-all ${view === 'planner' ? 'bg-gray-100 text-brand' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
          >
            Essentials
          </button>
          <button 
            onClick={() => setView('outfit')} 
            className={`hidden md:flex px-4 py-2 rounded-full text-sm font-bold transition-all ${view === 'outfit' ? 'bg-gray-100 text-brand' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
          >
            Visualizer
          </button>
          
          {/* CART / BAG - PRIMARY ACTION */}
          <button 
            onClick={() => setView('mybag')} 
            className="flex items-center bg-brand text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-brand/30 hover:shadow-brand/50 hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <ShoppingBag size={20} className="mr-2" />
            <span className="hidden sm:inline">My Bag</span>
            {myBagCount > 0 && (
               <span className="ml-2 bg-white text-brand text-xs py-0.5 px-2 rounded-full font-extrabold">
                 {myBagCount}
               </span>
            )}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ setView }) => (
  <div className="relative overflow-hidden bg-gradient-to-b from-cyan-50/50 to-white py-24">
    <div className="max-w-5xl mx-auto text-center px-4">
      <div className="inline-flex items-center bg-white border border-cyan-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
         <Sun size={16} className="text-orange-400 mr-2 animate-spin-slow" />
         <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">The Ultimate Packing Tool</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-header text-gray-900 mb-6 leading-tight drop-shadow-sm">
        Pack for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-400">Adventure</span>
      </h1>
      
      <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
        Don't guess what to bring. Use our 3D-style visualizer and smart lists to build the perfect kit for your next cruise.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-5">
        <button 
          onClick={() => setView('planner')} 
          className="flex items-center justify-center px-8 py-4 bg-brand text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand/20 hover:bg-cyan-600 hover:scale-105 transition-all"
        >
          <CheckSquare className="mr-2" /> Build Checklist
        </button>
        <button 
          onClick={() => setView('outfit')} 
          className="flex items-center justify-center px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-brand hover:text-brand hover:bg-cyan-50 transition-all"
        >
          <User className="mr-2" /> Try Visualizer
        </button>
      </div>
    </div>
  </div>
);
const OutfitMixer = ({ 
  gender, setGender, bodyType, setBodyType, 
  outfitCategory, shuffleOutfit, currentOutfitSet, addToBag 
}) => {
  
  // Helper to find current items by type for the mannequin
  const currentClothing = useMemo(() => {
    return {
      top: currentOutfitSet.find(i => i.type === 'top' || i.type === 'full'),
      bottom: currentOutfitSet.find(i => i.type === 'bottom'),
      shoes: currentOutfitSet.find(i => i.type === 'shoes'),
    };
  }, [currentOutfitSet]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CONTROLS */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-header text-xl text-gray-800 mb-6">Visualizer Settings</h3>
                
                {/* Gender Toggle */}
                <div className="flex bg-gray-100 p-1.5 rounded-xl mb-6">
                   {['female', 'male'].map(g => (
                     <button
                       key={g}
                       onClick={() => setGender(g)}
                       className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all ${gender === g ? 'bg-white text-brand shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                     >
                       {g}
                     </button>
                   ))}
                </div>

                {/* Body Type */}
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Body Shape</label>
                <div className="grid grid-cols-3 gap-2 mb-8">
                   {['petite', 'average', 'plus'].map(b => (
                     <button
                       key={b}
                       onClick={() => setBodyType(b)}
                       className={`py-2 rounded-lg text-xs font-bold capitalize border-2 transition-all ${bodyType === b ? 'border-brand bg-cyan-50 text-brand' : 'border-transparent bg-gray-50 text-gray-500'}`}
                     >
                       {b}
                     </button>
                   ))}
                </div>

                <button 
                  onClick={shuffleOutfit}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all shadow-lg"
                >
                  <RotateCcw className="mr-2" size={18}/> Mix New Outfit
                </button>
             </div>

             {/* Item List for Mobile/Details */}
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-header text-md text-gray-800 mb-4">Current Look Details</h4>
                <div className="space-y-3">
                  {currentOutfitSet.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg group cursor-pointer" onClick={() => addToBag(item)}>
                       <span className="text-gray-600">{item.name}</span>
                       <Plus size={16} className="text-brand opacity-0 group-hover:opacity-100"/>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* RIGHT: MANNEQUIN STAGE */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden border border-gray-100">
             
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white"></div>
             
             {/* Category Badge */}
             <div className="absolute top-8 right-8 z-10 bg-white/80 backdrop-blur border border-gray-200 px-4 py-2 rounded-full font-bold text-sm text-gray-600 uppercase tracking-wider shadow-sm">
                {outfitCategory} Collection
             </div>

             {/* THE SVG MANNEQUIN */}
             <div className="relative z-10 transform scale-110 lg:scale-125 transition-transform">
                <MannequinSVG 
                  gender={gender} 
                  bodyType={bodyType} 
                  clothing={currentClothing}
                />
             </div>

             {/* Add All Button */}
             <div className="absolute bottom-10 z-20">
                <button 
                  onClick={() => currentOutfitSet.forEach(i => addToBag(i))}
                  className="flex items-center px-8 py-3 bg-brand text-white rounded-full font-bold shadow-xl hover:bg-cyan-600 hover:scale-105 transition-all"
                >
                  <Plus size={20} className="mr-2"/> Add Outfit to Bag
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Planner = ({ addToBag }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-header text-gray-900 mb-4">The Essentials</h2>
      <p className="text-lg text-gray-500">Tap the <Plus size={16} className="inline text-brand"/> to add items to your trip kit.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Dynamic Cards based on Categories */}
      {['Tech', 'Gear', 'Health'].map(cat => (
        <div key={cat} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-gray-50/50 p-6 border-b border-gray-100">
             <h3 className="font-header text-xl text-gray-800">{cat}</h3>
          </div>
          <div className="p-4 space-y-2">
             {ESSENTIALS_DATA.filter(i => (cat === 'Health' ? ['Health', 'Toiletries'].includes(i.category) : i.category === cat)).map(item => (
               <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-cyan-50/50 group transition-colors">
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg text-gray-400 group-hover:text-brand shadow-sm mr-3 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">${item.price}</p>
                    </div>
                  </div>
                  <button onClick={() => addToBag(item)} className="bg-gray-100 text-gray-400 p-2 rounded-full hover:bg-brand hover:text-white transition-all">
                    <Plus size={18} />
                  </button>
               </div>
             ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MyBag = ({ myBag, setMyBag, removeFromBag, toggleCheck, estimatedTotal, handleBuy, setView }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex items-center justify-between mb-8">
         <h2 className="text-3xl font-header text-gray-900">Your Trip Kit</h2>
         <button onClick={() => setView('planner')} className="text-sm font-bold text-brand hover:underline">
           + Add More Items
         </button>
      </div>

      {myBag.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
           <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4"/>
           <p className="text-gray-500 text-lg">Your bag is empty.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
           <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-xs">{myBag.length} Items</span>
              <span className="font-header text-2xl text-gray-900">${estimatedTotal}</span>
           </div>
           
           <div className="divide-y divide-gray-50">
             {myBag.map(item => (
               <div key={item.id} className="p-4 flex items-center justify-between hover:bg-cyan-50/30 transition-colors">
                  <div className="flex items-center">
                     <button onClick={() => toggleCheck(item.id)} className={`mr-4 ${item.checked ? 'text-brand' : 'text-gray-300 hover:text-gray-400'}`}>
                       {item.checked ? <CheckSquare size={24}/> : <Square size={24}/>}
                     </button>
                     <span className={`font-medium ${item.checked ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                       {item.name}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={() => handleBuy(item.name)} className="text-xs font-bold bg-brand text-white px-3 py-1.5 rounded-lg hover:bg-cyan-600 transition-colors">
                        Buy on Amazon
                     </button>
                     <button onClick={() => removeFromBag(item.id)} className="p-2 text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 size={18}/>
                     </button>
                  </div>
               </div>
             ))}
           </div>
           
           <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setMyBag([])} className="text-sm font-bold text-gray-500 hover:text-red-500 px-4">Clear All</button>
              <button onClick={() => window.print()} className="bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-800 shadow-lg">
                 Print / PDF
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('home'); 
  const [gender, setGender] = useState('female');
  const [bodyType, setBodyType] = useState('average');
  const [myBag, setMyBag] = useState([]);
  const [outfitCategory, setOutfitCategory] = useState('casual');

  const addToBag = (item) => {
    const bagItem = { ...item, id: item.id + '_' + Date.now(), checked: false };
    setMyBag([...myBag, bagItem]);
  };

  const removeFromBag = (id) => setMyBag(myBag.filter(i => i.id !== id));
  const toggleCheck = (id) => setMyBag(myBag.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  const estimatedTotal = useMemo(() => myBag.reduce((acc, curr) => acc + curr.price, 0).toFixed(2), [myBag]);
  const currentOutfitSet = OUTFIT_DATA[gender][outfitCategory] || [];
  
  const shuffleOutfit = () => {
    const categories = ['casual', 'formal', 'active'];
    const nextCat = categories[Math.floor(Math.random() * categories.length)];
    setOutfitCategory(nextCat);
  };

  const handleBuy = (itemName) => {
    window.open(`https://www.amazon.com/s?k=${encodeURIComponent(itemName)}&tag=YOUR_TAG_HERE`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-body text-gray-800 flex flex-col">
      <Header view={view} setView={setView} myBagCount={myBag.length} />
      <div className="flex-grow">
        {view === 'home' && <Hero setView={setView} />}
        {view === 'planner' && <Planner addToBag={addToBag} />}
        {view === 'outfit' && (
          <OutfitMixer 
            gender={gender} setGender={setGender}
            bodyType={bodyType} setBodyType={setBodyType}
            outfitCategory={outfitCategory} shuffleOutfit={shuffleOutfit}
            currentOutfitSet={currentOutfitSet} addToBag={addToBag}
          />
        )}
        {view === 'mybag' && (
          <MyBag 
            myBag={myBag} setMyBag={setMyBag} removeFromBag={removeFromBag}
            toggleCheck={toggleCheck} estimatedTotal={estimatedTotal}
            handleBuy={handleBuy} setView={setView}
          />
        )}
      </div>
      <footer className="bg-gray-50 border-t border-gray-100 py-12 text-center text-gray-400 text-sm">
         &copy; 2024 Cruisy Travel. All rights reserved.
      </footer>
    </div>
  );
}
