import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SignOutButton } from '../SignOutButton';
import { useOfflineAttendance } from '../hooks/useOfflineAttendance';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const user = useQuery(api.auth.loggedInUser);
  const todayAttendance = useQuery(api.attendance.getTodayAttendance);
  const { isOnline, pendingSyncCount, getTodayAttendanceOffline } = useOfflineAttendance();
  const [localTodayCount, setLocalTodayCount] = useState(0);

  useEffect(() => {
    const loadLocalAttendance = async () => {
      const localAttendance = await getTodayAttendanceOffline();
      setLocalTodayCount(localAttendance.length);
    };
    
    loadLocalAttendance();
    
    // Refresh local count every 5 seconds
    const interval = setInterval(loadLocalAttendance, 5000);
    return () => clearInterval(interval);
  }, [getTodayAttendanceOffline]);

  // Use local count when offline, server count when online
  const displayCount = isOnline ? (todayAttendance?.length || 0) : localTodayCount;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b-2 border-black">
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold">TAGSCI QR-CATS</div>
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs font-bold">
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.email}</span>
          {pendingSyncCount > 0 && (
            <span className="text-xs bg-yellow-200 px-2 py-1 rounded font-bold">
              {pendingSyncCount} pending sync
            </span>
          )}
          <SignOutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">DASHBOARD</h1>
          <p className="text-lg">Choose an action to manage attendance</p>
          <p className="text-sm mt-2 font-bold">
            Today's Attendance: {displayCount} students
            {!isOnline && localTodayCount > 0 && (
              <span className="text-orange-600 ml-2">(offline data)</span>
            )}
          </p>
          {!isOnline && (
            <p className="text-sm text-orange-600 mt-1">
              Working offline - data will sync when connection is restored
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          {/* Scan Attendance */}
          <Link 
            to="/scan"
            className="group border-4 border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-2xl font-black mb-2">SCAN ATTENDANCE</h2>
              <p className="text-sm">Use camera to scan student QR codes</p>
              {!isOnline && (
                <p className="text-xs mt-2 text-orange-600 group-hover:text-orange-200">
                  Works offline
                </p>
              )}
            </div>
          </Link>

          {/* Generate QR IDs */}
          <Link 
            to="/generate"
            className={`group border-4 border-black p-8 transition-colors ${
              isOnline 
                ? 'hover:bg-black hover:text-white' 
                : 'opacity-50 cursor-not-allowed bg-gray-100'
            }`}
            onClick={(e) => {
              if (!isOnline) {
                e.preventDefault();
              }
            }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h2 className="text-2xl font-black mb-2">GENERATE QR IDS</h2>
              <p className="text-sm">Create QR codes for new students</p>
              {!isOnline && (
                <p className="text-xs mt-2 text-red-600">
                  Requires internet connection
                </p>
              )}
            </div>
          </Link>

          {/* See Logs */}
          <Link 
            to="/logs"
            className="group border-4 border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-black mb-2">SEE LOGS</h2>
              <p className="text-sm">View attendance records and reports</p>
              {!isOnline && (
                <p className="text-xs mt-2 text-orange-600 group-hover:text-orange-200">
                  Shows local data when offline
                </p>
              )}
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
