import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, Globe } from 'lucide-react';

interface CountrySelectorProps {
  onSelectCountry: (country: string) => void;
}

const COUNTRIES = [
  { name: 'United States', code: 'US', region: 'North America', status: 'Complex', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { name: 'United Arab Emirates', code: 'AE', region: 'Middle East', status: 'Crypto-Friendly', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { name: 'Singapore', code: 'SG', region: 'Asia', status: 'Regulated', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { name: 'Switzerland', code: 'CH', region: 'Europe', status: 'Crypto Valley', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { name: 'Hong Kong', code: 'HK', region: 'Asia', status: 'Emerging Hub', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { name: 'United Kingdom', code: 'GB', region: 'Europe', status: 'Strict', color: 'text-slate-300', bg: 'bg-slate-400/10' },
  { name: 'El Salvador', code: 'SV', region: 'Latin America', status: 'Legal Tender', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { name: 'Malta', code: 'MT', region: 'Europe', status: 'Blockchain Island', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { name: 'European Union (MiCA)', code: 'EU', region: 'Europe', status: 'Comprehensive', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'Japan', code: 'JP', region: 'Asia', status: 'Strict', color: 'text-slate-300', bg: 'bg-slate-400/10' },
  { name: 'South Korea', code: 'KR', region: 'Asia', status: 'Strict', color: 'text-slate-300', bg: 'bg-slate-400/10' },
  { name: 'Germany', code: 'DE', region: 'Europe', status: 'Tax-Friendly', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelectCountry }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectCountry(searchTerm.trim());
    }
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 animate-[fadeIn_0.3s_ease-out]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <Globe size={32} className="text-indigo-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-4">
            Select Jurisdiction
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Choose a country to access specific regulatory frameworks, licensing requirements, and compliance guidelines.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleCustomSearch} className="relative max-w-2xl mx-auto mb-12 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity"></div>
          <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
            <Search size={20} className="ml-4 text-slate-500" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a country or region (e.g., 'Brazil', 'Canada')..."
              className="w-full bg-transparent border-none py-4 px-4 text-slate-200 placeholder-slate-500 focus:ring-0 text-base"
            />
            {searchTerm && filteredCountries.length === 0 && (
              <button 
                type="submit"
                className="mr-2 px-4 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg text-sm font-medium transition-colors"
              >
                Analyze
              </button>
            )}
          </div>
        </form>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              onClick={() => onSelectCountry(country.name)}
              className="group relative flex flex-col p-5 bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] text-left hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
                     {country.code}
                   </div>
                   <div>
                     <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{country.name}</h3>
                     <span className="text-xs text-slate-500">{country.region}</span>
                   </div>
                </div>
                <div className={`text-[10px] px-2 py-1 rounded border border-current opacity-80 ${country.color} ${country.bg}`}>
                  {country.status}
                </div>
              </div>
              
              <div className="mt-auto flex items-center justify-between text-xs text-slate-500 group-hover:text-indigo-400 transition-colors">
                 <span>View Regulations</span>
                 <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">Jurisdiction not listed in presets.</p>
            <button 
              onClick={(e) => handleCustomSearch(e as any)}
              className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4"
            >
              Start specific analysis for "{searchTerm}"
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CountrySelector;