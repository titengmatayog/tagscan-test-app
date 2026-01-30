import { Link } from 'react-router-dom';

export default function ConcernsPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b-2 border-black">
        <Link to="/" className="text-lg font-bold hover:underline">
          ← BACK TO HOME
        </Link>
        <div className="text-lg font-bold">CONCERNS</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-6">CONCERNS & SUPPORT</h1>
            <p className="text-xl leading-relaxed">
              We're here to help with any issues or questions about TAGSCI QR-CATS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Common Issues */}
            <div className="border-4 border-black p-8">
              <h2 className="text-3xl font-black mb-6">COMMON ISSUES</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black mb-2">QR Code Not Scanning</h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Ensure camera permissions are enabled</li>
                    <li>• Check lighting conditions</li>
                    <li>• Hold device steady and at proper distance</li>
                    <li>• Clean camera lens</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-black mb-2">Duplicate Attendance Error</h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Student already marked present today</li>
                    <li>• Check attendance logs to verify</li>
                    <li>• Contact administrator if error persists</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-black mb-2">Student Not Found</h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Verify QR code is generated correctly</li>
                    <li>• Check if student is registered in system</li>
                    <li>• Ensure LRN number is accurate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-4 border-black p-8">
              <h2 className="text-3xl font-black mb-6">CONTACT SUPPORT</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black mb-2">Technical Support</h3>
                  <p className="text-sm mb-2">For system issues and technical problems:</p>
                  <p className="font-bold">klydegonzales08@gmail.com</p>
                </div>

                <div>
                  <h3 className="text-xl font-black mb-2">Administrative Support</h3>
                  <p className="text-sm mb-2">For account and access issues:</p>
                  <p className="font-bold">admin@tagsci-qrcats.edu</p>
                </div>

                <div>
                  <h3 className="text-xl font-black mb-2">General Inquiries</h3>
                  <p className="text-sm mb-2">For general questions and feedback:</p>
                  <p className="font-bold">info@tagsci-qrcats.edu</p>
                </div>

                <div>
                  <h3 className="text-xl font-black mb-2">Emergency Contact</h3>
                  <p className="text-sm mb-2">For urgent system issues:</p>
                  <p className="font-bold">+63 XXX XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 border-4 border-black p-8">
            <h2 className="text-3xl font-black mb-6 text-center">FREQUENTLY ASKED QUESTIONS</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black mb-2">How do I generate a QR code for a new student?</h3>
                <p className="text-sm">Navigate to the Dashboard, click "Generate QR IDs", fill in all required student information, and click "Generate QR". The QR code can then be downloaded and printed.</p>
              </div>

              <div>
                <h3 className="text-xl font-black mb-2">Can I scan multiple students at once?</h3>
                <p className="text-sm">No, the system is designed to scan one QR code at a time to ensure accuracy. Each scan is processed individually and logged separately.</p>
              </div>

              <div>
                <h3 className="text-xl font-black mb-2">How do I view attendance for a specific date or class?</h3>
                <p className="text-sm">Go to "See Logs" from the Dashboard. Use the filter options to select specific dates, grade levels, strands, or sections to view targeted attendance records.</p>
              </div>

              <div>
                <h3 className="text-xl font-black mb-2">What happens if a student loses their QR code?</h3>
                <p className="text-sm">A new QR code can be generated using the same student information. The system will recognize the student by their LRN number.</p>
              </div>

              <div>
                <h3 className="text-xl font-black mb-2">Is the system secure?</h3>
                <p className="text-sm">Yes, the system includes user authentication, prevents duplicate entries, and securely stores all student data with proper access controls.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="border-4 border-black p-8">
              <h2 className="text-2xl font-black mb-4">SYSTEM STATUS</h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-bold">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <p className="text-sm mt-2">Last updated: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
