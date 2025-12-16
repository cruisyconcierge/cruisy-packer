import React, { useState, useMemo, useEffect } from 'react';
import { 
  Luggage, Sun, Shirt, ShoppingBag, Trash2, CheckSquare, 
  Square, Anchor, Camera, X, Plus, ArrowRight, User, Compass, Watch, Smartphone,
  Umbrella, Plane, Mountain, Snowflake, Star, Tent, Building, Download, Type,
  Maximize2, Mail, ArrowLeft, Instagram, Pin, Shuffle, Facebook
} from 'lucide-react';

// --- AFFILIATE CONFIGURATION ---
const AMAZON_TAG = 'cruisytravel-20'; 

// --- SAFETY HELPERS ---
const safeLocalStorage = {
  getItem: (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) { return fallback; }
  },
  setItem: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
};

// --- CONFIGURATION ---
const THEMES = {
  'Cruise': {
    bg: 'bg-blue-50',
    text: 'text-teal-900',
    border: 'border-[12px] border-teal-200 border-double',
    decoration: (
      <>
        <div className="absolute top-4 right-4 text-teal-800/10 pointer-events-none"><Anchor size={140} /></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-teal-100/40 to-transparent pointer-events-none"></div>
      </>
    ),
    vibes: 'Tropical Beach'
  },
  'Tropical': {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    border: 'border-[16px] border-orange-200 border-dashed',
    decoration: (
      <>
        <div className="absolute -top-10 -right-10 text-yellow-400/20 pointer-events-none"><Sun size={240} /></div>
        <div className="absolute bottom-4 right-4 text-orange-400/20 pointer-events-none"><Umbrella size={100} /></div>
      </>
    ),
    vibes: 'Tropical Beach'
  },
  'Ski Trip': {
    bg: 'bg-slate-50',
    text: 'text-slate-800',
    border: 'border-[10px] border-blue-100 rounded-none',
    decoration: (
      <>
        <div className="absolute top-4 left-4 text-blue-200/50 pointer-events-none"><Snowflake size={80} /></div>
        <div className="absolute bottom-8 right-8 text-blue-300/30 pointer-events-none"><Snowflake size={120} /></div>
      </>
    ),
    vibes: 'Cold Adventure'
  },
  'City Break': {
    bg: 'bg-zinc-100',
    text: 'text-zinc-900',
    border: 'border-[8px] border-zinc-800',
    decoration: (
      <>
        <div className="absolute bottom-0 w-full h-40 opacity-10 pointer-events-none bg-gradient-to-t from-zinc-500 to-transparent"></div>
        <div className="absolute top-4 right-4 text-zinc-300 pointer-events-none"><Building size={100} /></div>
      </>
    ),
    vibes: 'City Exploring'
  },
  'Desert': {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-[10px] border-amber-300 border-dotted',
    decoration: (
      <>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 text-amber-300/40 pointer-events-none"><Sun size={80} /></div>
      </>
    ),
    vibes: 'Airport Comfort'
  }
};

const STICKERS = [
  { id: 's1', content: '✈️', type: 'emoji' },
  { id: 's2', content: '🌴', type: 'emoji' },
  { id: 's4', content: '📸', type: 'emoji' },
  { id: 's5', content: '👙', type: 'emoji' },
  { id: 's6', content: '🕶️', type: 'emoji' },
  { id: 's9', content: '🛳️', type: 'emoji' },
  { id: 's10', content: '⚓', type: 'emoji' },
  { id: 'h1', content: '🎄', type: 'emoji' },
  { id: 'h2', content: '🎅', type: 'emoji' },
  { id: 'h3', content: '🦃', type: 'emoji' },
  { id: 'h4', content: '🎃', type: 'emoji' },
  { id: 'h5', content: '🎆', type: 'emoji' },
  { id: 't1', content: 'Passport Ready', type: 'text' },
  { id: 't2', content: 'Vacay Mode', type: 'text' },
  { id: 't3', content: 'Out of Office', type: 'text' },
];

const SCENIC_PHOTOS = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80', name: 'Swiss Alps' },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', name: 'Tropical Beach' },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?auto=format&fit=crop&w=400&q=80', name: 'Map & Camera' },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80', name: 'Blue Lake' },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80', name: 'Desert Road' },
  { id: 'p6', url: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=400&q=80', name: 'Cozy Cabin' },
  { id: 'p7', url: 'https://images.unsplash.com/photo-1512951670161-b3c66e49872d?auto=format&fit=crop&w=400&q=80', name: 'Poolside' },
  { id: 'p8', url: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=400&q=80', name: 'Beach Walk' },
];

const TRAVEL_VIBES = {
  'Airport Comfort': [
    { id: 'v_air_1', name: 'Travel Hoodie', price: 45.00, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_air_2', name: 'Compression Socks', price: 18.00, img: 'https://images.unsplash.com/photo-1582966772652-13b355bb9797?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_air_3', name: 'Slip-on Sneakers', price: 60.00, img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_air_4', name: 'Neck Pillow', price: 25.00, img: 'https://plus.unsplash.com/premium_photo-1675807914389-72c67dc39d42?auto=format&fit=crop&w=300&q=80' },
  ],
  'Tropical Beach': [
    { id: 'v_beach_1', name: 'Linen Cover-up', price: 35.00, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_beach_2', name: 'Quick-Dry Swimwear', price: 28.00, img: 'https://images.unsplash.com/photo-1566807810030-31cb3b27ea17?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_beach_3', name: 'Waterproof Sandals', price: 30.00, img: 'https://images.unsplash.com/photo-1603487742131-4160d6986ba2?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_beach_4', name: 'Polarized Shades', price: 15.99, img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80' },
  ],
  'City Exploring': [
    { id: 'v_city_1', name: 'Anti-Theft Bag', price: 40.00, img: 'https://images.unsplash.com/photo-1590874103328-3607bac568a5?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_city_2', name: 'Walking Shoes', price: 85.00, img: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_city_3', name: 'Rain Jacket', price: 55.00, img: 'https://images.unsplash.com/photo-1545593169-3d23b207eb87?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_city_4', name: 'Power Bank', price: 29.99, img: 'https://images.unsplash.com/photo-1609592424367-172579dfd97d?auto=format&fit=crop&w=300&q=80' },
  ],
  'Cold Adventure': [
    { id: 'v_cold_1', name: 'Thermal Layer', price: 40.00, img: 'https://images.unsplash.com/photo-1578589318274-0498eb107e36?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_cold_2', name: 'Wool Beanie', price: 22.00, img: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=300&q=80' },
    { id: 'v_cold_3', name: 'Puffer Jacket', price: 90.00, img: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=300&q=80' },
  ]
};

const ESSENTIALS_DATA = [
  { id: 'e1', name: 'Univ. Adapter', price: 19.99, img: 'https://images.unsplash.com/photo-1590248232938-1630b427b34e?auto=format&fit=crop&w=300&q=80' },
  { id: 'e2', name: 'Power Bank', price: 29.99, img: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?auto=format&fit=crop&w=300&q=80' },
  { id: 'e3', name: 'Packing Cubes', price: 24.99, img: 'https://images.unsplash.com/photo-1565538420183-f39c27937397?auto=format&fit=crop&w=300&q=80' },
  { id: 'e4', name: 'Waterproof Pouch', price: 9.99, img: 'https://images.unsplash.com/photo-1623998021450-85c29c644e0d?auto=format&fit=crop&w=300&q=80' },
  { id: 'e6', name: 'Sunscreen', price: 14.50, img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=300&q=80' },
  { id: 'e7', name: 'First Aid Kit', price: 15.00, img: 'https://images.unsplash.com/photo-1632613713312-0440375dc113?auto=format&fit=crop&w=300&q=80' },
];
// --- COMPONENTS ---

const Header = ({ view, setView, myBagCount }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        
        <div className="flex items-center cursor-pointer group" onClick={() => setView('home')}>
          <div className="bg-brand/10 p-2.5 rounded-xl mr-3 group-hover:bg-brand/20 transition-colors">
             <Compass className="text-brand" size={26} />
          </div>
          <span className="font-header text-2xl text-gray-800 tracking-wide group-hover:text-brand transition-colors">
            CRUISY <span className="text-brand">TRIP KIT</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button onClick={() => setView('planner')} className={`hidden md:flex px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'planner' ? 'bg-gray-100 text-brand' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Essentials</button>
          <button onClick={() => setView('styleboard')} className={`hidden md:flex px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'styleboard' ? 'bg-gray-100 text-brand' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>Style Board</button>
          <button onClick={() => setView('mybag')} className="flex items-center bg-gray-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-brand transition-all hover:-translate-y-0.5 active:scale-95">
            <ShoppingBag size={18} className="mr-2" />
            <span className="hidden sm:inline">Kit</span>
            {myBagCount > 0 && <span className="ml-2 bg-white text-gray-900 text-xs py-0.5 px-2 rounded-md font-extrabold">{myBagCount}</span>}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ setView }) => (
  <div className="relative overflow-hidden bg-white pt-24 pb-12">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50 translate-y-1/4 -translate-x-1/4"></div>

    <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
      <div className="inline-flex items-center bg-white border border-gray-100 rounded-full px-5 py-2 mb-8 shadow-sm">
         <Plane size={14} className="text-brand mr-2" />
         <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Universal Packing Tool</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-header text-gray-900 mb-8 leading-tight tracking-tight">
        Style Your <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-400">Next Getaway.</span>
      </h1>
      
      <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
        Don't just pack—curate. Build a visual style board of outfits, essentials, and travel gear for your upcoming voyage.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
        <button onClick={() => setView('styleboard')} className="flex items-center justify-center px-10 py-5 bg-brand text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand/20 hover:bg-cyan-600 hover:scale-105 transition-all">
          <Camera className="mr-2" /> Create Board
        </button>
        <button onClick={() => setView('planner')} className="flex items-center justify-center px-10 py-5 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
          <CheckSquare className="mr-2" /> View Essentials
        </button>
      </div>

      <div className="border-t border-gray-100 pt-12">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Inspiration Boards</p>
        <div className="flex justify-center gap-6 overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
           <div className="w-48 h-64 bg-orange-50 rounded-xl border-4 border-orange-100 p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-md">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300')] bg-cover rounded-lg opacity-80"></div>
           </div>
           <div className="w-48 h-64 bg-blue-50 rounded-xl border-4 border-blue-100 p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-md z-10">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300')] bg-cover rounded-lg opacity-80"></div>
           </div>
           <div className="w-48 h-64 bg-gray-100 rounded-xl border-4 border-gray-200 p-4 transform -rotate-1 hover:rotate-0 transition-transform duration-500 shadow-md">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?auto=format&fit=crop&w=300')] bg-cover rounded-lg opacity-80"></div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const StyleBoard = ({ addToBag, setView }) => {
  const [currentTheme, setCurrentTheme] = useState(() => safeLocalStorage.getItem('cruisyTheme_v3', 'Cruise'));
  const [boardItems, setBoardItems] = useState(() => safeLocalStorage.getItem('cruisyBoardItems_v3', []));
  const [activeTab, setActiveTab] = useState('Vibes');
  
  useEffect(() => {
    safeLocalStorage.setItem('cruisyTheme_v3', currentTheme);
    safeLocalStorage.setItem('cruisyBoardItems_v3', boardItems);
  }, [currentTheme, boardItems]);

  const theme = THEMES[currentTheme] || THEMES['Cruise'];
  const vibeItems = TRAVEL_VIBES[theme.vibes] || TRAVEL_VIBES['Airport Comfort'];

  const addToBoard = (item, type = 'product') => {
    const randomRotation = Math.floor(Math.random() * 6) - 3; 
    const initialSize = type === 'sticker' ? 'large' : 'small'; 
    const newItem = { ...item, boardId: Date.now() + Math.random(), type, size: initialSize, rotation: randomRotation };
    setBoardItems([...boardItems, newItem]);
    if (type === 'product') addToBag(item);
  };

  const removeFromBoard = (boardId) => setBoardItems(boardItems.filter(i => i.boardId !== boardId));

  const toggleSize = (boardId) => {
    setBoardItems(boardItems.map(item => {
      if (item.boardId === boardId && item.type !== 'sticker') {
        const nextSize = item.size === 'small' ? 'medium' : item.size === 'medium' ? 'large' : 'small';
        return { ...item, size: nextSize };
      }
      return item;
    }));
  };

  const moveItem = (index, direction) => {
    const newItems = [...boardItems];
    if (direction === 'left' && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === 'right' && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    }
    setBoardItems(newItems);
  };

  const shuffleLayout = () => {
    const shuffled = [...boardItems].sort(() => Math.random() - 0.5);
    const reRotated = shuffled.map(item => ({...item, rotation: Math.floor(Math.random() * 10) - 5}));
    setBoardItems(reRotated);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("My Cruisy Travel Getaway ✈️");
    if (platform === 'pinterest') window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${text}`, '_blank');
    if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    if (platform === 'mail') window.open(`mailto:?subject=My Cruisy Travel Getaway&body=${text} ${url}`, '_blank');
    if (platform === 'instagram') alert("To share on Instagram: \n1. Click 'Save / Print PDF' \n2. Save the image to your phone \n3. Post to Instagram!");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
         <button onClick={() => setView('home')} className="text-gray-500 font-bold text-sm flex items-center hover:text-brand"><ArrowLeft size={16} className="mr-1"/> Home</button>
         <span className="text-brand font-bold text-sm hidden md:inline">Style Board Creator</span>
         <button onClick={() => setView('mybag')} className="text-gray-500 font-bold text-sm flex items-center hover:text-brand">Bag <ArrowRight size={16} className="ml-1"/></button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-header text-lg text-gray-800 mb-4">1. Choose Theme</h3>
                <div className="grid grid-cols-2 gap-3">
                   {Object.keys(THEMES).map(t => (
                     <button key={t} onClick={() => setCurrentTheme(t)} className={`flex items-center p-3 rounded-xl border-2 transition-all ${currentTheme === t ? 'border-brand bg-cyan-50 text-brand' : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                       <span className="mr-2">{THEMES[t].icon}</span><span className="text-sm font-bold">{t}</span>
                     </button>
                   ))}
                </div>
             </div>

             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
                <h3 className="font-header text-lg text-gray-800 mb-4">2. Add Items</h3>
                <div className="flex border-b border-gray-100 mb-4 overflow-x-auto">
                  {['Vibes', 'Essentials', 'Photos', 'Stickers'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 pb-3 px-2 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === tab ? 'text-brand border-b-2 border-brand' : 'text-gray-400 hover:text-gray-600'}`}>{tab}</button>
                  ))}
                </div>
                <div className="overflow-y-auto flex-1 pr-2 space-y-3 custom-scroll">
                   {(activeTab === 'Vibes' ? vibeItems : activeTab === 'Essentials' ? ESSENTIALS_DATA : []).map(item => (
                     <div key={item.id} onClick={() => addToBoard(item, 'product')} className="flex items-center p-2 rounded-xl hover:bg-gray-50 cursor-pointer group border border-transparent hover:border-gray-100 transition-all">
                        <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover mr-3 shadow-sm" />
                        <div className="flex-1"><p className="font-bold text-sm text-gray-800">{item.name}</p><p className="text-xs text-gray-400">${item.price}</p></div>
                        <Plus size={18} className="text-gray-300 group-hover:text-brand"/>
                     </div>
                   ))}
                   {activeTab === 'Photos' && (
                     <div className="grid grid-cols-2 gap-3">
                        {SCENIC_PHOTOS.map(p => (
                          <div key={p.id} onClick={() => addToBoard({name: p.name, img: p.url}, 'photo')} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group hover:opacity-90">
                             <img src={p.url} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                          </div>
                        ))}
                     </div>
                   )}
                   {activeTab === 'Stickers' && (
                     <div className="grid grid-cols-3 gap-3">
                       {STICKERS.map(s => (
                         <button key={s.id} onClick={() => addToBoard({name: s.content}, 'sticker')} className={`h-20 rounded-xl bg-gray-50 flex items-center justify-center text-3xl hover:bg-gray-100 hover:scale-105 transition-all ${s.type === 'text' ? 'text-xs font-bold uppercase tracking-widest px-2 text-center bg-black text-white' : ''}`}>{s.content}</button>
                       ))}
                       <button onClick={() => addToBoard({name: 'Note'}, 'note')} className="h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-brand hover:text-brand"><Type size={20} className="mb-1"/><span className="text-xs font-bold">Note</span></button>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="lg:col-span-8 flex flex-col items-center order-1 lg:order-2">
             <div id="print-area" className={`w-full max-w-[600px] aspect-[3/4] ${theme.bg} ${theme.border} shadow-2xl relative overflow-hidden transition-all duration-500 p-8 flex flex-col`}>
                <div className="absolute inset-0 pointer-events-none z-0">{theme.decoration}</div>
                
                {/* BRANDING HEADER - CORRECTED */}
                <div className="text-center mb-8 z-10 relative">
                   <h2 className={`text-4xl md:text-5xl font-header ${theme.text} drop-shadow-sm leading-tight`}>
                     My Cruisy Travel Getaway
                   </h2>
                </div>

                <div className="flex-1 grid grid-cols-4 gap-4 content-start relative z-10 auto-rows-min">
                   {boardItems.map((item, index) => (
                     <div 
                        key={item.boardId} 
                        className={`relative group animate-in fade-in zoom-in duration-300 ${item.size === 'medium' ? 'col-span-2 row-span-2' : item.size === 'large' ? 'col-span-2 row-span-2' : 'col-span-1'}`}
                     >
                        <div className="absolute -top-2 -right-2 z-30 flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                           <button onClick={(e) => {e.stopPropagation(); moveItem(index, 'left');}} className="bg-white text-gray-600 rounded-full p-1 shadow-md hover:bg-gray-100"><ArrowLeft size={10}/></button>
                           <button onClick={(e) => {e.stopPropagation(); moveItem(index, 'right');}} className="bg-white text-gray-600 rounded-full p-1 shadow-md hover:bg-gray-100"><ArrowRight size={10}/></button>
                           {/* RESIZE BUTTON HIDDEN FOR STICKERS */}
                           {item.type !== 'sticker' && <button onClick={(e) => {e.stopPropagation(); toggleSize(item.boardId);}} className="bg-gray-800 text-white rounded-full p-1 shadow-md"><Maximize2 size={10}/></button>}
                           <button onClick={(e) => {e.stopPropagation(); removeFromBoard(item.boardId);}} className="bg-red-500 text-white rounded-full p-1 shadow-md"><X size={10}/></button>
                        </div>

                        {(item.type === 'product' || item.type === 'photo') && (
                          <div className={`relative w-full h-full bg-white p-2 shadow-md transform transition-transform overflow-hidden ${item.type === 'product' ? 'rounded-none' : 'rounded-none'}`} style={{transform: `rotate(${item.rotation}deg)`}}>
                             <img src={item.img} alt={item.name} className="w-full h-full object-cover border border-gray-100" />
                             {item.type === 'product' && <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-1 text-[10px] font-bold text-center truncate">{item.name}</div>}
                          </div>
                        )}
                        
                        {item.type === 'sticker' && (
                          <div className="flex justify-center items-center h-full w-full" style={{transform: `rotate(${item.rotation}deg)`}}>
                             <span className="text-6xl drop-shadow-md filter">{item.name}</span>
                          </div>
                        )}
                        
                        {item.type === 'note' && (
                          <div className="bg-white p-4 shadow-lg h-full relative" style={{transform: `rotate(${item.rotation}deg)`, background: 'linear-gradient(to bottom, #fff 0%, #fff 100%), linear-gradient(to bottom, #dbeafe 1px, transparent 1px)', backgroundSize: '100% 24px'}}>
                             <div className="absolute top-2 right-2 opacity-40"><Compass size={16} className="text-brand"/></div>
                             <textarea placeholder="Write here..." className="w-full h-full bg-transparent border-none text-sm text-gray-700 focus:ring-0 resize-none leading-[24px]" style={{fontFamily: '"Patrick Hand", cursive'}}/>
                          </div>
                        )}
                     </div>
                   ))}
                   {boardItems.length === 0 && <div className="col-span-4 h-64 flex flex-col items-center justify-center text-center opacity-30"><Camera size={48} className={theme.text}/><p className={`mt-2 font-bold ${theme.text}`}>Start Creating</p><p className="text-xs">Add items from the menu</p></div>}
                </div>
             </div>

             <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button onClick={shuffleLayout} className="flex items-center px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm"><Shuffle size={18} className="mr-2"/> Shuffle Layout</button>
                <button onClick={() => setBoardItems([])} className="px-6 py-3 rounded-xl text-gray-500 font-bold hover:text-red-500 transition-colors">Clear</button>
                <button onClick={() => window.print()} className="flex items-center px-8 py-3 rounded-xl bg-gray-900 text-white font-bold shadow-lg hover:bg-brand transition-all"><Download size={18} className="mr-2"/> Save / Print PDF</button>
                
                <div className="flex gap-2 ml-4 border-l border-gray-200 pl-4 items-center">
                   <span className="text-xs font-bold text-gray-400 mr-2">SHARE:</span>
                   <button onClick={() => handleShare('facebook')} className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"><Facebook size={16}/></button>
                   <button onClick={() => handleShare('pinterest')} className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"><Pin size={16}/></button>
                   <button onClick={() => handleShare('instagram')} className="p-2 bg-pink-600 text-white rounded-full hover:scale-110 transition-transform"><Instagram size={16}/></button>
                   <button onClick={() => handleShare('mail')} className="p-2 bg-gray-500 text-white rounded-full hover:scale-110 transition-transform"><Mail size={16}/></button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Planner = ({ addToBag, setView }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
    <div className="flex justify-between items-center mb-8">
       <button onClick={() => setView('home')} className="flex items-center text-gray-500 hover:text-brand font-bold"><ArrowLeft size={18} className="mr-2"/> Home</button>
       <button onClick={() => setView('styleboard')} className="flex items-center bg-white text-brand border border-brand px-4 py-2 rounded-lg font-bold hover:bg-brand hover:text-white transition-all">G
