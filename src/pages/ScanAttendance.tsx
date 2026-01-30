import { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode, Html5QrcodeScanType } from "html5-qrcode";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useOfflineAttendance } from "../hooks/useOfflineAttendance";

const ScanAttendance = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const scanAndLogAttendance = useMutation(api.attendance.scanAndLogAttendance);
  const { 
    isOnline, 
    logAttendanceOffline, 
    getTodayAttendanceOffline,
    isInitialized 
  } = useOfflineAttendance();

  const todayAttendance = useQuery(api.attendance.getTodayAttendance);

  useEffect(() => {
    if (!isScanning) return;

    const onScanSuccess = async (decodedText: string) => {
      console.log("Scanned QR:", decodedText);
      
      // Prevent duplicate scans
      if (lastScanned === decodedText) {
        return;
      }
      setLastScanned(decodedText);

      try {
        if (isOnline) {
          // Online: Use Convex mutation
          const result = await scanAndLogAttendance({ qrCodeData: decodedText });
          toast.success(`✅ Attendance logged for ${result.student.fullName}`);
        } else {
          // Offline: Parse QR and save locally
          let studentData;
          try {
            studentData = JSON.parse(decodedText);
          } catch {
            // If not JSON, treat as LRN
            toast.error("❌ Invalid QR code format for offline mode");
            return;
          }

          if (!studentData.fullName || !studentData.lrnNumber) {
            toast.error("❌ Incomplete student data in QR code");
            return;
          }

          await logAttendanceOffline({
            studentId: studentData.lrnNumber, // Use LRN as ID for offline
            fullName: studentData.fullName,
            gradeLevel: studentData.gradeLevel,
            strand: studentData.strand,
            section: studentData.section,
            lrnNumber: studentData.lrnNumber,
            scannedBy: "offline-user",
          });

          toast.success(`✅ Attendance saved offline for ${studentData.fullName}`);
        }
      } catch (error: any) {
        console.error("Scan error:", error);
        toast.error(error.message || "❌ Failed to log attendance");
      }

      // Reset after 2 seconds to allow new scans
      setTimeout(() => {
        setLastScanned(null);
      }, 2000);
    };

    const onScanFailure = (error: any) => {
      // Suppress frequent scan failures
    };

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        showTorchButtonIfSupported: true,
      },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((err) => console.error("Scanner clear error:", err));
    };
  }, [isScanning, lastScanned, scanAndLogAttendance, isOnline, logAttendanceOffline]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const html5QrCode = new Html5Qrcode("reader-upload");

    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      console.log("File QR:", decodedText);

      if (isOnline) {
        const result = await scanAndLogAttendance({ qrCodeData: decodedText });
        toast.success(`✅ Attendance logged for ${result.student.fullName}`);
      } else {
        let studentData;
        try {
          studentData = JSON.parse(decodedText);
        } catch {
          toast.error("❌ Invalid QR code format for offline mode");
          return;
        }

        if (!studentData.fullName || !studentData.lrnNumber) {
          toast.error("❌ Incomplete student data in QR code");
          return;
        }

        await logAttendanceOffline({
          studentId: studentData.lrnNumber,
          fullName: studentData.fullName,
          gradeLevel: studentData.gradeLevel,
          strand: studentData.strand,
          section: studentData.section,
          lrnNumber: studentData.lrnNumber,
          scannedBy: "offline-user",
        });

        toast.success(`✅ Attendance saved offline for ${studentData.fullName}`);
      }
    } catch (error: any) {
      console.error("File scan error:", error);
      toast.error(error.message || "❌ Could not read QR from image");
    } finally {
      // Clear the file input
      event.target.value = "";
    }
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
    setLastScanned(null);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b-2 border-black">
        <Link to="/dashboard" className="text-lg font-bold hover:underline">
          ← BACK TO DASHBOARD
        </Link>
        <div className="text-lg font-bold">SCAN ATTENDANCE</div>
        <div className={`px-3 py-1 text-sm font-bold ${
          isOnline ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}>
          {isOnline ? '🟢 ONLINE' : '🔴 OFFLINE'}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-4">QR SCANNER</h1>
            <p className="text-lg">
              {isOnline ? 'Scan QR codes to log attendance' : 'Working offline - data will sync when online'}
            </p>
          </div>

          {/* Scanner Controls */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={toggleScanning}
              className={`px-6 py-3 font-black transition-colors ${
                isScanning 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isScanning ? '⏸️ PAUSE SCANNER' : '▶️ START SCANNER'}
            </button>
          </div>

          {/* Camera Scanner */}
          {isScanning && (
            <div className="border-4 border-black p-4 mb-6">
              <div id="reader" className="w-full"></div>
            </div>
          )}

          {/* File Upload */}
          <div className="border-4 border-black p-6 mb-6">
            <h2 className="text-xl font-black mb-4">UPLOAD QR IMAGE</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div id="reader-upload" style={{ display: "none" }}></div>
          </div>

          {/* Today's Attendance Count */}
          <div className="border-4 border-black p-6">
            <h2 className="text-xl font-black mb-4">TODAY'S ATTENDANCE</h2>
            <div className="text-3xl font-black text-center">
              {isOnline ? (todayAttendance?.length || 0) : '---'} STUDENTS
            </div>
            <p className="text-center text-gray-600 mt-2">
              {isOnline ? 'Live count' : 'Offline mode - count unavailable'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScanAttendance;
