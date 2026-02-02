interface BarProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

const Bar = ({ isDarkMode, toggleTheme }: BarProps) => {
  return (
    <div className="blur-card h-full sticky top-0">
        <div className="flex items-center gap-2 mb-20">
            <img src="../sun.png" alt="Logo" className="w-20 h-20" />
            <h1 className="text-3xl font-bold">
                Skyline
            </h1>
        </div>
        <div>
            <div className="flex items-center gap-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input className="sr-only peer" type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <div
            className="w-20 h-11 rounded-full bg-linear-to-r from-yellow-300 to-orange-400 peer-checked:from-cyan-700 peer-checked:to-blue-900 transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-9 after:w-9 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-9 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"
          ></div>
        </label>
          </div> 
        </div>
    </div>
  );
};

export default Bar;