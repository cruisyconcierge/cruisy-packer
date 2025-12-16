import React, { useState, useMemo } from 'react';
import { 
  Suitcase, Sun, Shirt, ShoppingBag, Trash2, CheckSquare, 
  Square, ExternalLink, RotateCcw, Anchor, Camera, Menu, 
  X, Plus, ArrowRight, Smile, User
} from 'lucide-react';

// --- DATA & CONFIG ---
const OUTFIT_DATA = {
  male: {
    casual: [
      { id: 'm_c_1', name: 'Linen Button Down', price: 28.99, type: 'top', color: 'bg-blue-100' },
      { id: 'm_c_2', name: 'Chino Shorts', price: 24.50, type: 'bottom', color: 'bg-orange-50' },
      { id: 'm_c_3', name: 'Boat Shoes', price: 55.00, type: 'shoes', color: 'bg-stone-200' },
    ],
    formal: [
      { id: 'm_f_1', name: 'Navy Blazer', price: 89.99, type: 'top', color: 'bg-blue-900 text-white' },
      { id: 'm_f_2', name: 'Crisp White Shirt', price: 45.00, type: 'top_layer', color: 'bg-white border' },
      { id: 'm_f_3', name: 'Slim Fit Slacks', price: 39.99, type: 'bottom', color: 'bg-gray-700 text-white' },
      { id: 'm_f_4', name: 'Leather Loafers', price: 70.00, type: 'shoes', color: 'bg-amber-900 text-white' },
    ],
    active: [
      { id: 'm_a_1', name: 'Moisture Wick Tee', price: 18.00, type: 'top', color: 'bg-gray-200' },
      { id: 'm_a_2', name: 'Swim Trunks', price: 22.00, type: 'bottom', color: 'bg-cyan-200' },
      { id: 'm_a_3', name: 'Water Shoes', price: 30.00, type: 'shoes', color: 'bg-gray-800 text-white' },
    ]
  },
  female: {
    casual: [
      { id: 'f_c_1', name: 'Floral Maxi Dress', price: 35.00, type: 'full', color: 'bg-rose-100' },
      { id: 'f_c_2', name: 'Straw Sun Hat', price: 18.99, type: 'access', color: 'bg-yellow-100' },
      { id: 'f_c_3', name: 'Strappy Sandals', price: 25.00, type: 'shoes', color: 'bg-amber-100' },
    ],
    formal: [
      { id: 'f_f_1', name: 'Cocktail Midi Dress', price: 65.00, type: 'full', color: 'bg-emerald-800 text-white' },
      { id: 'f_f_2', name: 'Statement Clutch', price: 30.00, type: 'access', color: 'bg-gray-900 text-white' },
      { id: 'f_f_3', name: 'Block Heels', price: 45.00, type: 'shoes', color: 'bg-black text-white' },
    ],
    active: [
      { id: 'f_a_1', name: 'Tankini Top', price: 28.00, type: 'top', color: 'bg-pink-200' },
      { id: 'f_a_2', name: 'High Waist Bottoms', price: 24.00, type: 'bottom', color: 'bg-pink-300' },
      { id: 'f_a_3', name: 'Cover-up Sarong', price: 15.00, type: 'access', color: 'bg-white border-dashed' },
    ]
  }
};

const ESSENTIALS_DATA = [
  { id: 'e1', name: 'Universal Travel Adapter', price: 19.99, category: 'Tech' },
  { id: 'e2', name: 'Power Bank (10000mAh)', price: 29.99, category: 'Tech' },
  { id: 'e3', name: 'Packing Cubes (Set of 4)', price: 24.99, category: 'Gear' },
  { id: 'e4', name: 'Waterproof Phone Pouch', price: 9.99, category: 'Gear' },
  { id: 'e5', name: 'Travel Insurance Docs', price: 0, category: 'Docs' },
  { id: 'e6', name: 'Reef Safe Sunscreen', price: 14.50, category: 'Toiletries' },
  { id: 'e7', name: 'Motion Sickness Bands', price: 12.00, category: 'Health' },
  { id: 'e8', name: 'Noise Cancelling Headphones', price: 150.00, category: 'Tech' },
];
// --- COMPONENTS ---

const Header = ({ view, setView, myBagCount, isMenuOpen, setIsMenuOpen }) => (
  <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center cursor-pointer transform hover:scale-105 transition-transform" onClick={() => setView('home')}>
          <img 
            src="https://cruisytravel.com/wp-content/uploads/2024/01/cropped-20240120_025955_0000.png" 
            alt="Cruisy Travel" 
            className="h-10 w-auto mr-3 md:h-12"
          />
          <span className="font-header text-xl md:text-2xl text-gray-800 hidden sm:block">CRUISY TRAVEL</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => setView('planner')} 
            className={`font-body font-medium transition-colors ${view === 'planner' ? 'text-brand underline underline-offset-4' : 'text-gray-600 hover:text-brand'}`}
          >
            Essential Lists
          </button>
          <button 
            onClick={() => setView('outfit')} 
            className={`font-body font-medium transition-colors ${view === 'outfit' ? 'text-brand underline underline-offset-4' : 'text-gray-600 hover:text-brand'}`}
          >
            Style Mixer
          </button>
          <button 
            onClick={() => setView('mybag')} 
            className="flex items-center bg-brand text-white px-5 py-2 rounded-full font-body font-medium shadow-md hover:opacity-90 transition-all transform hover:-translate-y-0.5"
          >
            <ShoppingBag size={18} className="mr-2" />
            My Bag ({myBagCount})
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Nav */}
    {isMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg z-50">
        <div className="px-4 pt-2 pb-6 space-y-2">
          <button onClick={() => {setView('planner'); setIsMenuOpen(false)}} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-brand hover:bg-cyan-50 rounded-lg">Essential Lists</button>
          <button onClick={() => {setView('outfit'); setIsMenuOpen(false)}} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-brand hover:bg-cyan-50 rounded-lg">Style Mixer</button>
          <button onClick={() => {setView('mybag'); setIsMenuOpen(false)}} className="block w-full text-left px-4 py-3 text-base font-medium text-brand font-bold bg-cyan-50 rounded-lg flex justify-between">
            <span>My Bag</span>
            <span className="bg-brand text-white px-2 py-0.5 rounded-full text-sm">{myBagCount}</span>
          </button>
        </div>
      </div>
    )}
  </nav>
);

const Hero = ({ setView }) => (
  <div className="relative bg-white overflow-hidden min-h-[80vh] flex items-center">
    <div className="max-w-7xl mx-auto w-full">
      <div className="relative z-10 pb-8 bg-white/90 backdrop-blur-sm sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 rounded-r-3xl pr-8">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 text-brand text-sm font-semibold mb-4">
              <Sun size={14} className="mr-2"/> New: Summer '24 Collections
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-header">
              <span className="block xl:inline">Don't just travel.</span>{' '}
              <span className="block text-brand xl:inline">Travel Cruisy.</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-body leading-relaxed">
              The ultimate packing companion. Build your custom list, visualize your outfits, and grab the gear you need directly from Amazon.
            </p>
            <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
              <button 
                onClick={() => setView('planner')} 
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-brand hover:bg-cyan-600 md:py-4 md:text-lg font-body shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-1"
              >
                Start Packing
              </button>
              <button 
                onClick={() => setView('outfit')} 
                className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border-2 border-brand text-base font-medium rounded-lg text-brand bg-transparent hover:bg-cyan-50 md:py-4 md:text-lg font-body transition-all"
              >
                Try Style Mixer
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-cyan-50">
      <div className="relative w-full h-full overflow-hidden">
         <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand opacity-10 blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
         <div className="flex flex-col items-center justify-center h-full text-brand/20 space-y-8">
            <Suitcase size={180} />
         </div>
      </div>
    </div>
  </div>
);

const OutfitMixer = ({ 
  gender, setGender, bodyType, setBodyType, 
  outfitCategory, shuffleOutfit, currentOutfitSet, addToBag 
}) => {
  const getBodyWidth = () => {
    if (bodyType === 'petite') return 'w-32';
    if (bodyType === 'plus') return 'w-64';
    return 'w-48'; 
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-header text-gray-900">Virtual Style Mixer</h2>
          <p className="mt-2 text-gray-600 font-body">Visualize your look before you book.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-header text-lg mb-4 text-gray-800 flex items-center">
                <User size={20} className="mr-2 text-brand"/> Model Settings
              </h3>
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-body">Gender</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['female', 'male'].map((g) => (
                    <button key={g} onClick={() => setGender(g)} className={`flex-1 capitalize py-2 rounded-md text-sm font-medium transition-all ${gender === g ? 'bg-white text-brand shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-body">Body Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['petite', 'average', 'plus'].map((b) => (
                    <button key={b} onClick={() => setBodyType(b)} className={`capitalize py-2 px-1 border rounded-md text-xs font-medium transition-all ${bodyType === b ? 'border-brand bg-cyan-50 text-brand' : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <h3 className="font-header text-lg mb-4 text-gray-800 flex items-center">
                <Shirt size={20} className="mr-2 text-brand"/> Wardrobe
              </h3>
               <button onClick={shuffleOutfit} className="w-full flex items-center justify-center bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg transform active:scale-95 font-bold">
                 <RotateCcw size={18} className="mr-2" /> Shuffle Outfit
               </button>
               <p className="text-center text-xs text-gray-400 mt-3">Randomizes between Casual, Formal, and Active</p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl shadow-xl relative overflow-hidden flex flex-col items-center justify-center p-8 min-h-[600px]">
            <div className="absolute top-6 right-6 z-10 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-bold uppercase tracking-wide text-brand flex items-center">
              <div className="w-2 h-2 rounded-full bg-brand mr-2 animate-pulse"></div>
              {outfitCategory}
            </div>

            <div className="relative z-10 flex flex-col items-center transform scale-90 md:scale-100 transition-transform duration-500">
              <div className="w-24 h-28 bg-stone-200 rounded-[2rem] mb-2 shadow-inner flex items-center justify-center">
                <Smile className="text-stone-300 opacity-50" size={32} />
              </div>
              <div className="w-12 h-6 bg-stone-200 -mt-2 mb-1"></div>
              <div className={`transition-all duration-500 ease-in-out ${getBodyWidth()} min-h-[16rem] bg-stone-100 rounded-3xl relative shadow-lg flex flex-col items-center justify-start p-4 border border-stone-200`}>
                 <div className="w-full space-y-2 mt-2">
                   {currentOutfitSet.map((item) => (
                     <div key={item.id} className={`${item.color || 'bg-white'} p-4 rounded-xl shadow-sm border border-black/5 flex items-center justify-between transform transition-all hover:scale-105 cursor-pointer group relative overflow-hidden`}>
                        <div className="flex items-center relative z-10">
                          <div className="bg-white/50 p-2 rounded-full mr-3 text-gray-800">
                            {item.type === 'shoes' ? <Anchor size={16}/> : <Shirt size={16} />}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold opacity-90">{item.name}</p>
                            <p className="text-xs opacity-75">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToBag(item); }} className="bg-white text-brand p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-white" title="Add to Bag">
                          <Plus size={18} />
                        </button>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="flex space-x-3 -mt-4 pt-4">
                <div className={`w-14 h-48 bg-stone-200 rounded-b-full shadow-inner ${bodyType === 'plus' ? 'w-20' : ''}`}></div>
                <div className={`w-14 h-48 bg-stone-200 rounded-b-full shadow-inner ${bodyType === 'plus' ? 'w-20' : ''}`}></div>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 z-10">
              <button onClick={() => currentOutfitSet.forEach(i => addToBag(i))} className="bg-brand text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-cyan-600 transition-all flex items-center">
                Add All <Plus size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Planner = ({ addToBag }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-header text-gray-900">Essentials & Gear</h2>
      <p className="mt-2 text-gray-600 font-body">Cruisy approved packing lists.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="bg-gray-800 p-5 flex justify-between items-center">
          <h3 className="text-white font-header text-lg">Tech & Gadgets</h3>
          <div className="bg-gray-700 p-2 rounded-lg"><Camera className="text-brand" size={20} /></div>
        </div>
        <div className="p-4 space-y-1 h-80 overflow-y-auto custom-scroll">
          {ESSENTIALS_DATA.filter(i => i.category === 'Tech').map(item => (
            <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg group transition-colors border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">${item.price}</p>
              </div>
              <button onClick={() => addToBag(item)} className="text-gray-300 hover:text-brand hover:bg-cyan-50 p-2 rounded-full transition-all"><Plus size={20} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="bg-gray-800 p-5 flex justify-between items-center">
          <h3 className="text-white font-header text-lg">Health & Sun</h3>
          <div className="bg-gray-700 p-2 rounded-lg"><Sun className="text-brand" size={20} /></div>
        </div>
        <div className="p-4 space-y-1 h-80 overflow-y-auto custom-scroll">
          {ESSENTIALS_DATA.filter(i => ['Health', 'Toiletries'].includes(i.category)).map(item => (
            <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg group transition-colors border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">${item.price}</p>
              </div>
              <button onClick={() => addToBag(item)} className="text-gray-300 hover:text-brand hover:bg-cyan-50 p-2 rounded-full transition-all"><Plus size={20} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="bg-gray-800 p-5 flex justify-between items-center">
          <h3 className="text-white font-header text-lg">Cruise Gear</h3>
          <div className="bg-gray-700 p-2 rounded-lg"><Anchor className="text-brand" size={20} /></div>
        </div>
        <div className="p-4 space-y-1 h-80 overflow-y-auto custom-scroll">
          {ESSENTIALS_DATA.filter(i => i.category === 'Gear').map(item => (
            <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg group transition-colors border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">${item.price}</p>
              </div>
              <button onClick={() => addToBag(item)} className="text-gray-300 hover:text-brand hover:bg-cyan-50 p-2 rounded-full transition-all"><Plus size={20} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <div className="mt-12 bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
       <h3 className="text-2xl font-header text-gray-800 mb-2">Something missing?</h3>
       <p className="text-gray-600 mb-6 max-w-lg mx-auto">We connect directly to Amazon's massive inventory so you can find exactly what you need.</p>
       <button onClick={() => window.open('https://www.amazon.com/travel', '_blank')} className="bg-transparent border-2 border-brand text-brand font-bold py-3 px-8 rounded-full hover:bg-brand hover:text-white transition-all flex items-center mx-auto">
         Browse Amazon Travel <ExternalLink size={16} className="ml-2"/>
       </button>
    </div>
  </div>
);
const MyBag = ({ myBag, setMyBag, removeFromBag, toggleCheck, estimatedTotal, handleBuy, setView }) => {
  if (myBag.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-slate-50">
        <div className="bg-white p-6 rounded-full mb-4 shadow-sm"><ShoppingBag size={48} className="text-gray-300" /></div>
        <h2 className="text-2xl font-header text-gray-900 mb-2">Your bag is empty</h2>
        <p className="text-gray-500 mb-6 max-w-sm">Start by visiting the Essentials Planner or the Style Mixer to add items.</p>
        <button onClick={() => setView('outfit')} className="text-brand font-bold hover:underline flex items-center">
          Go to Style Mixer <ArrowRight size={16} className="ml-1"/>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4 gap-4">
        <div>
          <h2 className="text-3xl font-header text-gray-900">My Packing Bag</h2>
          <p className="text-gray-600 mt-1">{myBag.length} Items Selected</p>
        </div>
        <div className="text-right bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full md:w-auto">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Estimated Total</p>
          <p className="text-3xl font-bold text-brand">${estimatedTotal}</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="max-h-[600px] overflow-y-auto custom-scroll">
          <ul className="divide-y divide-gray-100">
            {myBag.map((item) => (
              <li key={item.id} className={`p-4 md:p-6 transition-colors ${item.checked ? 'bg-gray-50/80' : 'bg-white'}`}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center flex-1 min-w-[200px]">
                    <button onClick={() => toggleCheck(item.id)} className="mr-4 text-gray-300 hover:text-brand focus:outline-none transition-colors">
                      {item.checked ? <CheckSquare className="text-brand" size={24} /> : <Square size={24} />}
                    </button>
                    <div>
                      <h4 className={`text-lg font-medium ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>{item.name}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-brand mt-1">{item.category || item.type || 'General'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                    <span className="font-bold text-gray-700 w-20 text-right">${item.price.toFixed(2)}</span>
                    <button onClick={() => handleBuy(item.name)} className="flex items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors">
                      Buy <ExternalLink size={14} className="ml-2" />
                    </button>
                    <button onClick={() => removeFromBag(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-4">
         <button onClick={() => setMyBag([])} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">Clear List</button>
         <button onClick={() => window.print()} className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium shadow-lg hover:shadow-xl transition-all">Print Checklist</button>
      </div>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToBag = (item) => {
    // Generate unique id for bag to allow multiples
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
    // Replace with your Affiliate Tag logic
    window.open(`https://www.amazon.com/s?k=${encodeURIComponent(itemName)}&tag=YOUR_TAG_HERE`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body text-gray-800 flex flex-col">
      <Header view={view} setView={setView} myBagCount={myBag.length} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <span className="font-header text-2xl tracking-wider text-white">CRUISY TRAVEL</span>
            <p className="mt-2 text-gray-400 text-sm max-w-xs">Your all-in-one cruise companion.</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-gray-400 text-sm">
             <span className="opacity-50">&copy; 2024 Cruisy Travel.</span>
          </div>
        </div>
      </footer>
    </div>
  );
      }
