import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOfflineAttendance } from '../hooks/useOfflineAttendance';
import { LocalAttendanceEntry } from '../services/database';

export default function ViewLogs() {
  const [filters, setFilters] = useState({
    date: '',
    gradeLevel: '',
    strand: '',
    section: '',
  });

  const { isOnline, getTodayAttendanceOffline } = useOfflineAttendance();
  const [localLogs, setLocalLogs] = useState<LocalAttendanceEntry[]>([]);
  
  const attendanceLogs = useQuery(
    api.attendance.getAttendanceByDate, 
    filters.date ? { date: filters.date } : "skip"
  );
  const todayAttendance = useQuery(api.attendance.getTodayAttendance);

  const gradeLevels = ['Grade 11', 'Grade 12'];
  const strands = ['STEM', 'HUMSS', 'ABM', 'GAS', 'TVL'];
  const sections = ['Titanium', 'Zirconium', 'Chromium', 'Platinum', 'Palladium'];

  useEffect(() => {
    const loadLocalLogs = async () => {
      if (!isOnline) {
        const logs = await getTodayAttendanceOffline();
        setLocalLogs(logs);
      }
    };
    
    loadLocalLogs();
  }, [isOnline, getTodayAttendanceOffline]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      gradeLevel: '',
      strand: '',
      section: '',
    });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Use local logs when offline, server logs when online
  const displayLogs = isOnline ? attendanceLogs : localLogs;
  const todayCount = isOnline ? (todayAttendance?.length || 0) : localLogs.length;

  // Filter local logs if offline
  const filteredLocalLogs = !isOnline && localLogs ? localLogs.filter(log => {
    if (filters.gradeLevel && log.gradeLevel !== filters.gradeLevel) return false;
    if (filters.strand && log.strand !== filters.strand) return false;
    if (filters.section && log.section !== filters.section) return false;
    if (filters.date && log.date !== filters.date) return false;
    return true;
  }) : [];

  const finalDisplayLogs = isOnline ? displayLogs : filteredLocalLogs;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b-2 border-black">
        <Link to="/dashboard" className="text-lg font-bold hover:underline">
          ← BACK TO DASHBOARD
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold">ATTENDANCE LOGS</div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs font-bold">
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-4">ATTENDANCE RECORDS</h1>
            <p className="text-lg">View and filter attendance logs</p>
            <p className="text-sm mt-2 font-bold">
              Today's Total: {todayCount} students present
              {!isOnline && (
                <span className="text-orange-600 ml-2">(offline data)</span>
              )}
            </p>
            {!isOnline && (
              <p className="text-sm text-orange-600 mt-1">
                Showing local data - will sync when connection is restored
              </p>
            )}
          </div>

          {/* Filters */}
          <div className="border-4 border-black p-6 mb-8">
            <h2 className="text-2xl font-black mb-4">FILTERS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold mb-2">DATE</label>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">GRADE LEVEL</label>
                <select
                  name="gradeLevel"
                  value={filters.gradeLevel}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">All Grades</option>
                  {gradeLevels.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">STRAND</label>
                <select
                  name="strand"
                  value={filters.strand}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">All Strands</option>
                  {strands.map(strand => (
                    <option key={strand} value={strand}>{strand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">SECTION</label>
                <select
                  name="section"
                  value={filters.section}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">All Sections</option>
                  {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors font-bold"
            >
              CLEAR FILTERS
            </button>
          </div>

          {/* Attendance Table */}
          <div className="border-4 border-black">
            <div className="bg-black text-white p-4">
              <h2 className="text-xl font-black">
                ATTENDANCE RECORDS ({finalDisplayLogs?.length || 0} entries)
                {!isOnline && <span className="text-yellow-300 ml-2">[OFFLINE MODE]</span>}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-black">
                  <tr>
                    <th className="text-left p-4 font-black">NAME</th>
                    <th className="text-left p-4 font-black">GRADE</th>
                    <th className="text-left p-4 font-black">STRAND</th>
                    <th className="text-left p-4 font-black">SECTION</th>
                    <th className="text-left p-4 font-black">LRN</th>
                    <th className="text-left p-4 font-black">DATE</th>
                    <th className="text-left p-4 font-black">TIME</th>
                    {!isOnline && <th className="text-left p-4 font-black">STATUS</th>}
                  </tr>
                </thead>
                <tbody>
                  {finalDisplayLogs && finalDisplayLogs.length > 0 ? (
                    finalDisplayLogs.map((log: any, index: number) => (
                      <tr key={('_id' in log ? log._id : log.id) || index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="p-4 font-bold">{log.fullName}</td>
                        <td className="p-4">{log.gradeLevel}</td>
                        <td className="p-4">{log.strand}</td>
                        <td className="p-4">{log.section}</td>
                        <td className="p-4">{log.lrnNumber}</td>
                        <td className="p-4">{formatDate(log.date)}</td>
                        <td className="p-4">{formatTimestamp(log.timestamp)}</td>
                        {!isOnline && (
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              'synced' in log && log.synced 
                                ? 'bg-green-200 text-green-800' 
                                : 'bg-yellow-200 text-yellow-800'
                            }`}>
                              {'synced' in log && log.synced ? 'SYNCED' : 'PENDING'}
                            </span>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={!isOnline ? 8 : 7} className="p-8 text-center text-gray-500">
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
