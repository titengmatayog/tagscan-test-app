import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b-2 border-black">
        <div className="text-lg font-bold">CRAFTED BY KYY</div>
        <div className="flex gap-6">
          <Link 
            to="/about" 
            className="px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors font-bold"
          >
            ABOUT US
          </Link>
          <Link 
            to="/concerns" 
            className="px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors font-bold"
          >
            CONCERNS
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight">
            TAGSCI QR-CATS
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-wide">
            TAGSCI QR Code Attendance Tracking System
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            "A new sophisticated way to track student attendance for such a sophisticated institution."
          </p>
          
          <Link 
            to="/login"
            className="inline-block px-16 py-6 bg-black text-white text-2xl font-black hover:bg-gray-800 transition-colors border-4 border-black"
          >
            START
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6">
        <div className="text-lg font-bold">
          Where presence meet precision.
        </div>
      </footer>
    </div>
  );
}
