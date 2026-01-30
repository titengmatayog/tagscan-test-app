import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b-2 border-black">
        <Link to="/" className="text-lg font-bold hover:underline">
          ← BACK TO HOME
        </Link>
        <div className="text-lg font-bold">ABOUT US</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-6">ABOUT TAGSCI QR-CATS</h1>
            <p className="text-xl leading-relaxed">
              A sophisticated attendance tracking system designed for modern educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-4 border-black p-8">
              <h2 className="text-3xl font-black mb-6">OUR MISSION</h2>
              <p className="text-lg leading-relaxed mb-4">
                To revolutionize student attendance tracking through innovative QR code technology, 
                ensuring accuracy, efficiency, and seamless integration with educational workflows.
              </p>
              <p className="text-lg leading-relaxed">
                We believe that precision in attendance tracking is fundamental to educational excellence 
                and institutional management.
              </p>
            </div>

            <div className="border-4 border-black p-8">
              <h2 className="text-3xl font-black mb-6">KEY FEATURES</h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  Real-time QR code scanning
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  Automated attendance logging
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  Comprehensive reporting system
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  Secure student data management
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  Mobile-responsive interface
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-4 border-black p-8">
            <h2 className="text-3xl font-black mb-6 text-center">SYSTEM SPECIFICATIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-black mb-4">TECHNOLOGY STACK</h3>
                <ul className="space-y-2">
                  <li>React.js Frontend</li>
                  <li>Convex Backend</li>
                  <li>HTML5 QR Scanner</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black mb-4">SUPPORTED DATA</h3>
                <ul className="space-y-2">
                  <li>Student Full Name</li>
                  <li>Grade Level</li>
                  <li>Academic Strand</li>
                  <li>Section Assignment</li>
                  <li>LRN Number</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black mb-4">SECURITY FEATURES</h3>
                <ul className="space-y-2">
                  <li>User Authentication</li>
                  <li>Duplicate Prevention</li>
                  <li>Data Encryption</li>
                  <li>Access Control</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-black mb-6">CRAFTED BY KYY</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">
              Developed with precision and attention to detail, TAGSCI QR-CATS represents 
              the future of educational technology. Where presence meets precision.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
