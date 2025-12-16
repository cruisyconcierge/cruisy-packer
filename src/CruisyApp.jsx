import React, { useState, useMemo, useRef } from 'react';
import { 
  Luggage, Sun, Shirt, ShoppingBag, Trash2, CheckSquare, 
  Square, ExternalLink, RotateCcw, Anchor, Camera, Menu, 
  X, Plus, ArrowRight, Smile, User, Map, Compass, Watch, Smartphone,
  Umbrella, Coffee, Plane, Mountain, Snowflake, Utensils,
  Star, Heart, Cloud, Music, Tent, Trees, Building, Download, Share2, Type
} from 'lucide-react';

// --- CONFIGURATION ---

const THEMES = {
  'Cruise': {
    bg: 'bg-gradient-to-br from-blue-100 via-white to-teal-50',
    accent: 'bg-teal-500',
    text: 'text-teal-900',
    icon: <Anchor size={20}/>,
    vibes: 'Tropical Beach'
  },
  'Tropical': {
    bg: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50',
    accent: 'bg-orange-400',
    text: 'text-orange-900',
    icon: <Sun size={20}/>,
    vibes: 'Tropical Beach'
  },
  'Ski Trip': {
    bg: 'bg-gradient-to-b from-blue-50 to-white',
    accent: 'bg-blue-600',
    text: 'text-blue-900',
    icon: <Snowflake size={20}/>,
    vibes: 'Cold Adventure'
  },
  'City Break': {
    bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
    accent: 'bg-purple-600',
    text: 'text-gray-900',
    icon: <Building size={20}/>,
    vibes: 'City Exploring'
  },
  'Desert': {
    bg: 'bg-gradient-to-tr from-amber-100 to-orange-100',
    accent: 'bg-amber-600',
    text: 'text-amber-900',
    icon: <Tent size={20}/>,
    vibes: 'Airport Comfort' // Placeholder
  }
};

const STICKERS = [
  { id: 's1', content: '✈️', type: 'emoji' },
  { id: 's2', content: '🌴', type: 'emoji' },
  { id: 's3', content: '🥥', type: 'emoji' },
  { id: 's4', content: '📸', type: 'emoji' },
  { id: 's5', content: '👙', type: 'emoji' },
  { id: 's6', content: '🕶️', type: 'emoji' },
  { id: 's7', content: '❄️', type: 'emoji' },
  { id: 's8', content: '🏔️', type: 'emoji' },
  { id: 's9', content: '🛳️', type: 'emoji' },
  { id: 's10', content: '⚓', type: 'emoji' },
  { id: 's11', content: 'Passport Ready', type: 'text' },
  { id: 's12', content: 'Vacay Mode', type: 'text' },
];

const TRAVEL_VIBES = {
  'Airport Comfort': [
    { id: 'v_air_1', name: 'Travel Hoodie', price: 45.00, category: 'Top', icon: <Shirt size={24}/> },
    { id: 'v_air_2', name: 'Compression Socks', price: 18.00, category: 'Accessory', icon: <Anchor size={24}/> },
    { id: 'v_air_3', name: 'Slip-on Sneakers', price: 60.00, category: 'Shoes', icon: <ArrowRight size={24}/> },
    { id: 'v_air_4', name: 'Neck Pillow', price: 25.00, category: 'Gear', icon: <User size={24}/> },
  ],
  'Tropical Beach': [
    { id: 'v_beach_1', name: 'Linen Cover-up', price: 35.00, category: 'Top', icon: <Sun size={24}/> },
    { id: 'v_beach_2', name: 'Quick-Dry Swimwear', price: 28.00, category: 'Swim', icon: <Umbrella size={24}/> },
    { id: 'v_beach_3', name: 'Waterproof Sandals', price: 30.00, category: 'Shoes', icon: <Anchor size={24}/> },
    { id: 'v_beach_4', name: 'Polarized Shades', price: 15.99, category: 'Accessory', icon: <Sun size={24}/> },
  ],
  'City Exploring': [
    { id: 'v_city_1', name: 'Anti-Theft Bag', price: 40.00, category: 'Gear', icon: <ShoppingBag size={24}/> },
    { id: 'v_city_2', name: 'Walking Shoes', price: 85.00, category: 'Shoes', icon: <ArrowRight size={24}/> },
    { id: 'v_city_3', name: 'Rain Jacket', price: 55.00, category: 'Outerwear', icon: <Umbrella size={24}/> },
    { id: 'v_city_4', name: 'Power Bank', price: 29.99, category: 'Tech', icon: <Smartphone size={24}/> },
  ],
  'Cold Adventure': [
    { id: 'v_cold_1', name: 'Thermal Layer', price: 40.00, category: 'Layer', icon: <Snowflake size={24}/> },
    { id: 'v_cold_2', name: 'Wool Beanie', price: 22.00, category: 'Accessory', icon: <Sun size={24}/> },
    { id: 'v_cold_3', name: 'Puffer Jacket', price: 90.00, category: 'Outerwear', icon: <Mountain size={24}/> },
  ]
};

const ESSENTIALS_DATA = [
  { id: 'e1', name: 'Univ. Adapter', price: 19.99, category: 'Tech', icon: <Smartphone size={20}/> },
  { id: 'e2', name: 'Power Bank', price: 29.99, category: 'Tech', icon: <Watch size={20}/> },
  { id: 'e3', name: 'Packing Cubes', price: 24.99, category: 'Gear', icon: <Luggage size={20}/> },
  { id: 'e4', name: 'Waterproof Pouch', price: 9.99, category: 'Gear', icon: <Umbrella size={20}/> },
  { id: 'e6', name: 'Sunscreen', price: 14.50, category: 'Toiletries', icon: <Sun size={20}/> },
  { id: 'e7', name: 'First Aid Kit', price: 15.00, category: 'Health', icon: <Plus size={20}/> },
];
// --- COMPONENTS ---

const Header = ({ view, setView, myBagCount }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        
        {/* LOGO */}
        <div className="flex items-center cursor-pointer group" onClick={() => setView('home')}>
          <div className="bg-brand/10 p-2.5 rounded-xl mr-3 group-hover:bg-brand/20 transition-colors">
             <Compass className="text-brand" size={26} />
          </div>
          <span className="font-header text-2xl text-gray-800 tracking-wide group-hover:text-brand transition-colors">
            CRUISY <span className="text-brand">TRIP KIT</span>
          </span>
        </div>
        
        {/* NAV */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={() => setView('planner')} 
            className={`hidden md:flex px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'planner' ? 'bg-gray-100 text-brand' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Essentials
          </button>
          <button 
            onClick={() => setView('styleboard')} 
            className={`hidden md:flex px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'styleboard' ? 'bg-gray-100 text-brand' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Style Board
          </button>
          
          {/* BAG BUTTON */}
          <button 
            onClick={() => setView('mybag')} 
            className="flex items-center bg-gray-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-brand transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <ShoppingBag size={18} className="mr-2" />
            <span className="hidden sm:inline">Kit</span>
            {myBagCount > 0 && (
               <span className="ml-2 bg-white text-gray-900 text-xs py-0.5 px-2 rounded-md font-extrabold">
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
  <div className="relative overflow-hidden bg-white py-24">
    {/* Decorative Blobs */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50 translate-y-1/4 -translate-x-1/4"></div>

    <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
      <div className="inline-flex items-center bg-white border border-gray-100 rounded-full px-5 py-2 mb-8 shadow-sm">
         <Plane size={14} className="text-brand mr-2" />
         <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Plan • Pack • Go</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-header text-gray-900 mb-8 leading-tight tracking-tight">
        Curate Your <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-400">Perfect Trip.</span>
      </h1>
      
      <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
        Build a visual packing board for your next adventure. Mix and match outfits, essentials, and travel gear in our new interactive studio.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={() => setView('styleboard')} 
          className="flex items-center justify-center px-10 py-5 bg-brand text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand/20 hover:bg-cyan-600 hover:scale-105 transition-all"
        >
          <Camera className="mr-2" /> Create Board
        </button>
        <button 
          onClick={() => setView('planner')} 
          className="flex items-center justify-center px-10 py-5 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <CheckSquare className="mr-2" /> View Essentials
        </button>
      </div>
    </div>
  </div>
);
const StyleBoard = ({ addToBag }) => {
  const [currentTheme, setCurrentTheme] = useState('Cruise');
  const [boardItems, setBoardItems] = useState([]);
  const [activeTab, setActiveTab] = useState('Vibes'); // Vibes, Essentials, Stickers
  
  const theme = THEMES[currentTheme];
  const vibeItems = TRAVEL_VIBES[theme.vibes] || TRAVEL_VIBES['Airport Comfort'];

  // Add Item to Visual Board
  const addToBoard = (item, type = 'product') => {
    const newItem = {
      ...item,
      boardId: Date.now(),
      type
    };
    setBoardItems([...boardItems, newItem]);
    
    // Also add to shopping bag if it's a product
    if (type === 'product') {
      addToBag(item);
    }
  };

  const removeFromBoard = (boardId) => {
    setBoardItems(boardItems.filter(i => i.boardId !== boardId));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CREATOR TOOLS */}
          <div className="lg:col-span-4 space-y-6">
             
             {/* THEME SELECTOR */}
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-header text-lg text-gray-800 mb-4">1. Choose Theme</h3>
                <div className="grid grid-cols-2 gap-3">
                   {Object.keys(THEMES).map(t => (
                     <button
                       key={t}
                       onClick={() => { setCurrentTheme(t); setBoardItems([]); }} // Clear board on theme switch? Optional.
                       className={`flex items-center p-3 rounded-xl border-2 transition-all ${currentTheme === t ? 'border-brand bg-cyan-50 text-brand' : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                     >
                       <span className="mr-2">{THEMES[t].icon}</span>
                       <span className="text-sm font-bold">{t}</span>
                     </button>
                   ))}
                </div>
             </div>

             {/* PALETTE */}
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
                <h3 className="font-header text-lg text-gray-800 mb-4">2. Add Items</h3>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-100 mb-4">
                  {['Vibes', 'Essentials', 'Stickers'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 pb-3 text-sm font-bold transition-colors ${activeTab === tab ? 'text-brand border-b-2 border-brand' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto flex-1 pr-2 space-y-3 custom-scroll">
                   {/* VIBES TAB */}
                   {activeTab === 'Vibes' && vibeItems.map(item => (
                     <div key={item.id} onClick={() => addToBoard(item, 'product')} className="flex items-center p-2 rounded-xl hover:bg-gray-50 cursor-pointer group border border-transparent hover:border-gray-100 transition-all">
                        <div className="bg-gray-100 p-3 rounded-lg text-gray-500 group-hover:text-brand mr-3">{item.icon}</div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-400">${item.price}</p>
                        </div>
                        <Plus size={18} className="text-gray-300 group-hover:text-brand"/>
                     </div>
                   ))}

                   {/* ESSENTIALS TAB */}
                   {activeTab === 'Essentials' && ESSENTIALS_DATA.map(item => (
                     <div key={item.id} onClick={() => addToBoard(item, 'product')} className="flex items-center p-2 rounded-xl hover:bg-gray-50 cursor-pointer group border border-transparent hover:border-gray-100 transition-all">
                        <div className="bg-gray-100 p-3 rounded-lg text-gray-500 group-hover:text-brand mr-3">{item.icon}</div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-400">${item.price}</p>
                        </div>
                        <Plus size={18} className="text-gray-300 group-hover:text-brand"/>
                     </div>
                   ))}

                   {/* STICKERS TAB */}
                   {activeTab === 'Stickers' && (
                     <div className="grid grid-cols-3 gap-3">
                       {STICKERS.map(s => (
                         <button 
                           key={s.id} 
                           onClick={() => addToBoard({name: s.content}, 'sticker')}
                           className={`h-20 rounded-xl bg-gray-50 flex items-center justify-center text-3xl hover:bg-gray-100 hover:scale-105 transition-all ${s.type === 'text' ? 'text-xs font-bold uppercase tracking-widest px-2 text-center bg-black text-white' : ''}`}
                         >
                           {s.content}
                         </button>
                       ))}
                       <button onClick={() => addToBoard({name: 'Note'}, 'note')} className="h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-brand hover:text-brand">
                          <Type size={20} className="mb-1"/>
                          <span className="text-xs font-bold">Add Note</span>
                       </button>
                     </div>
                   )}
                </div>
             </div>
          </div>

          {/* RIGHT: THE BOARD CANVAS */}
          <div className="lg:col-span-8 flex flex-col items-center">
             
             {/* Canvas Container (Pinterest Ratio 2:3 approx) */}
             <div id="print-area" className={`w-full max-w-[600px] aspect-[3/4] ${theme.bg} rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500 p-8 flex flex-col`}>
                
                {/* Board Header */}
                <div className="text-center mb-8 z-10">
                   <span className={`inline-block px-4 py-1 rounded-full bg-white/50 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-2 ${theme.text} shadow-sm`}>
                     Cruisy Trip Kit
                   </span>
                   <h2 className={`text-4xl font-header ${theme.text} drop-shadow-sm`}>{currentTheme} Vibe</h2>
                </div>

                {/* Items Grid (Masonry-ish layout) */}
                <div className="flex-1 grid grid-cols-3 gap-4 content-start relative z-10">
                   {boardItems.map((item, idx) => (
                     <div key={item.boardId} className="relative group animate-in fade-in zoom-in duration-300">
                        {/* Remove Button */}
                        <button 
                          onClick={() => removeFromBoard(item.boardId)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
                        >
                          <X size={12}/>
                        </button>

                        {/* Content Render */}
                        {item.type === 'product' && (
                          <div className="bg-white p-3 rounded-2xl shadow-sm border border-white/50 flex flex-col items-center text-center transform hover:rotate-2 transition-transform">
                             <div className={`p-3 rounded-full mb-2 ${theme.accent} text-white`}>
                               {item.icon || <Star size={16}/>}
                             </div>
                             <span className="text-xs font-bold text-gray-700 leading-tight">{item.name}</span>
                          </div>
                        )}

                        {item.type === 'sticker' && (
                          <div className="flex justify-center items-center h-full transform hover:scale-110 transition-transform">
                             <span className="text-5xl drop-shadow-md filter">{item.name}</span>
                          </div>
                        )}

                        {item.type === 'note' && (
                          <div className="bg-yellow-200 p-3 rounded-tl-xl rounded-br-xl shadow-md rotate-[-2deg] hover:rotate-0 transition-transform">
                             <textarea 
                               placeholder="Type note..." 
                               className="w-full bg-transparent border-none text-xs font-handwriting text-yellow-900 focus:ring-0 resize-none h-16 placeholder-yellow-700/50"
                             />
                          </div>
                        )}
                     </div>
                   ))}
                   
                   {boardItems.length === 0 && (
                     <div className="col-span-3 h-64 flex flex-col items-center justify-center text-center opacity-30">
                        <Camera size={48} className={theme.text}/>
                        <p className={`mt-2 font-bold ${theme.text}`}>Board Empty</p>
                        <p className="text-xs">Add items from the left</p>
                     </div>
                   )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-black/5 flex justify-between items-end opacity-60">
                   <div className="flex items-center">
                      <div className={`p-1.5 rounded-full ${theme.accent} text-white mr-2`}>
                        <Compass size={16}/>
                      </div>
                      <span className={`text-xs font-bold ${theme.text}`}>Generated by Cruisy Travel</span>
                   </div>
                   <span className="text-[10px] font-mono">cruisytravel.com</span>
                </div>
             </div>

             {/* Actions */}
             <div className="mt-8 flex space-x-4">
                <button 
                  onClick={() => setBoardItems([])}
                  className="px-6 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-200 transition-colors"
                >
                  Clear Board
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center px-8 py-3 rounded-xl bg-gray-900 text-white font-bold shadow-lg hover:bg-brand transition-all"
                >
                  <Download size={18} className="mr-2"/> Save / Print PDF
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
    {/* Planner content remains mostly same but using new ESSENTIALS_DATA */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-header text-gray-900 mb-4">Essentials List</h2>
      <p className="text-lg text-gray-500">Quick-add the basics to your shopping bag.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {ESSENTIALS_DATA.map(item => (
         <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between group hover:border-brand border border-transparent transition-all">
            <div className="flex items-center">
               <div className="bg-gray-100 p-3 rounded-xl mr-4 text-gray-500 group-hover:text-brand">{item.icon}</div>
               <div>
                 <p className="font-bold text-gray-800">{item.name}</p>
                 <p className="text-xs text-gray-400">${item.price}</p>
               </div>
            </div>
            <button onClick={() => addToBag(item)} className="p-2 bg-gray-50 rounded-full hover:bg-brand hover:text-white transition-all"><Plus size={18}/></button>
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
         <button onClick={() => setView('planner')} className="text-sm font-bold text-brand hover:underline">+ Add Essentials</button>
      </div>
      {myBag.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
           <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4"/>
           <p className="text-gray-500">Empty Bag.</p>
           <button onClick={() => setView('styleboard')} className="mt-4 font-bold text-brand">Create a Board</button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
           <div className="p-6 bg-gray-50 flex justify-between items-center border-b border-gray-100">
              <span className="font-bold text-gray-500 text-xs uppercase">{myBag.length} Items</span>
              <span className="font-header text-2xl text-gray-900">${estimatedTotal}</span>
           </div>
           <div className="divide-y divide-gray-50">
             {myBag.map(item => (
               <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center">
                     <button onClick={() => toggleCheck(item.id)} className={`mr-4 ${item.checked ? 'text-brand' : 'text-gray-300'}`}>{item.checked ? <CheckSquare size={24}/> : <Square size={24}/>}</button>
                     <span className={`font-medium ${item.checked ? 'line-through text-gray-300' : 'text-gray-800'}`}>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={() => handleBuy(item.name)} className="px-3 py-1.5 bg-brand text-white text-xs font-bold rounded-lg hover:bg-cyan-600">Amazon</button>
                     <button onClick={() => removeFromBag(item.id)} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                  </div>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('home'); 
  const [myBag, setMyBag] = useState([]);

  const addToBag = (item) => {
    const bagItem = { ...item, id: item.id + '_' + Date.now(), checked: false };
    setMyBag([...myBag, bagItem]);
  };

  const removeFromBag = (id) => setMyBag(myBag.filter(i => i.id !== id));
  const toggleCheck = (id) => setMyBag(myBag.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  const estimatedTotal = useMemo(() => myBag.reduce((acc, curr) => acc + curr.price, 0).toFixed(2), [myBag]);

  const handleBuy = (itemName) => {
    window.open(`https://www.amazon.com/s?k=${encodeURIComponent(itemName)}&tag=YOUR_TAG_HERE`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-body text-gray-800 flex flex-col">
      {/* Hide header on print to allow board to be printed cleanly */}
      <div className="print:hidden">
        <Header view={view} setView={setView} myBagCount={myBag.length} />
      </div>
      
      <div className="flex-grow">
        {view === 'home' && <Hero setView={setView} />}
        {view === 'planner' && <Planner addToBag={addToBag} />}
        {view === 'styleboard' && (
          <StyleBoard addToBag={addToBag} />
        )}
        {view === 'mybag' && (
          <MyBag 
            myBag={myBag} setMyBag={setMyBag} removeFromBag={removeFromBag}
            toggleCheck={toggleCheck} estimatedTotal={estimatedTotal}
            handleBuy={handleBuy} setView={setView}
          />
        )}
      </div>
      
      <div className="print:hidden">
        <footer className="bg-gray-50 border-t border-gray-100 py-12 text-center text-gray-400 text-sm">
           &copy; 2024 Cruisy Travel.
        </footer>
      </div>

      {/* PRINT STYLES - Force background colors when printing */}
      <style>{`
        @media print {
          @page { margin: 0; size: auto; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-area { 
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            margin: 0; border-radius: 0; z-index: 9999; 
          }
          /* Hide everything else */
          body > *:not(.flex-grow) { display: none; }
          .flex-grow > *:not(:has(#print-area)) { display: none; }
        }
      `}</style>
    </div>
  );
}
