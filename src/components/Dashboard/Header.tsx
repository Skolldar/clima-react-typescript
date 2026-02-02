import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { SearchType } from "../../types/types-index";
import { countries } from "../../data/countries";
import Alert from "../Alert/Alert";

type HeaderProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

type GeoItem = {
  name: string;
  state?: string;
  country: string; // country code
}

const Header = ({ fetchWeather }: HeaderProps) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<GeoItem[]>([]);
    const [open, setOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const skipFetchRef = useRef<boolean>(false);
    const timerRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [error, setError] = useState("");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
      return;
    }

    if (!query) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      setOpen(false);
      return;
    }

    if (timerRef.current) window.clearTimeout(timerRef.current);
    
    timerRef.current = window.setTimeout(async () => {
      const appId = import.meta.env.VITE_API_KEY;
      try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          query
        )}&limit=5&appid=${appId}`;
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          const items: GeoItem[] = data.map((d) => ({
            name: d.name,
            state: d.state,
            country: d.country
          }));
          setSuggestions(items);
          setHighlightedIndex(-1);
          setOpen(items.length > 0);
        } else {
          setSuggestions([]);
          setHighlightedIndex(-1);
          setOpen(false);
        }
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to fetch location suggestions.");
        setSuggestions([]);
        setHighlightedIndex(-1);
        setOpen(false);
      }
    }, 300);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [query]);

  const handleSelect = (item: GeoItem) => {
    fetchWeather({ city: item.name, country: item.country });
    const countryName = countries.find(c => c.code === item.country)?.name ?? item.country;
    skipFetchRef.current = true;
    setQuery(`${item.name}${item.state ? `, ${item.state}` : ""}, ${countryName}`);
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!suggestions.length) return;
      setOpen(true);
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!suggestions.length) return;
      setOpen(true);
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelect(suggestions[highlightedIndex]);
      } else {
        handleSearch();
      }
    }  
  };

  const handleSearch = () => {
    if (!query) return;
    const parts = query.split(",").map(p => p.trim()).filter(Boolean);
    const city = parts[0];
    let countryCode = "";
    if (parts.length > 1) {
      const last = parts[parts.length - 1];
      const matched = countries.find(c => c.name.toLowerCase() === last.toLowerCase() || c.code.toLowerCase() === last.toLowerCase());
      if (matched) {
        countryCode = matched.code;
      } else {
        const stateMatch = suggestions.find(s => s.state && s.state.toLowerCase() === last.toLowerCase());
        if (stateMatch) countryCode = stateMatch.country;
      }
    }
    fetchWeather({ city, country: countryCode });
    setOpen(false);
  };

  return (
    <div>
      <header className="grid lg:grid-cols-2  grid-cols-1 items-start lg:gap-10 gap-5 mb-8">
              {error && <Alert>{error}</Alert>}
        <div className="relative" ref={containerRef}>
          <div className="flex items-center relative">
            <input
              className="w-full px-4 py-2 rounded-lg border border-slate-300 backdrop-blur-xl bg-white/70 text-primary shadow-md"
              placeholder="e.g. Madrid, Spain"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if (suggestions.length) setOpen(true); }}
              onKeyDown={handleKeyDown}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg cursor-pointer"
              onClick={handleSearch}
              aria-label="Search"
            >
              <FaSearch size={20} className="text-primary" />
            </button>
          </div>

          {open && suggestions.length > 0 && (
            <ul className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-md max-h-60 overflow-auto">
              {suggestions.map((s, idx) => {
                const countryName = countries.find(c => c.code === s.country)?.name ?? s.country;
                const label = `${s.name}${s.state ? `, ${s.state}` : ""}, ${countryName}`;
                return (
                  <li
                    key={`${s.name}-${s.country}-${idx}`}
                    className={`px-3 py-2 cursor-pointer text-xl text-primary ${idx === highlightedIndex ? 'bg-slate-100' : 'hover:bg-slate-100'}`}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onMouseLeave={() => setHighlightedIndex(-1)}
                    onClick={() => handleSelect(s)}
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;