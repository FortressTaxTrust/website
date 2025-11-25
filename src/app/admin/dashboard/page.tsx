import { Users, FileText, BarChart2 } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <Users size={32} className="text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-500 text-sm">1,245 active users</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <FileText size={32} className="text-green-500" />
          <div>
            <h2 className="text-xl font-semibold">Reports</h2>
            <p className="text-gray-500 text-sm">87 reports generated</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
          <BarChart2 size={32} className="text-purple-500" />
          <div>
            <h2 className="text-xl font-semibold">Analytics</h2>
            <p className="text-gray-500 text-sm">Dashboard overview</p>
          </div>
        </div>
      </div>

      {/* Dummy table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
              { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
              { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
            ].map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
