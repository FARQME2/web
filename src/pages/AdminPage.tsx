import { useState } from 'react';
import { Shield, Users, CheckCircle, XCircle, Clock, Server, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PendingUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  status: 'pending';
}

export function AdminPage() {
  const { isAdmin } = useAuth();
  const [pendingUsers] = useState<PendingUser[]>([
    {
      id: '3',
      username: 'NewUser1',
      email: 'newuser1@example.com',
      createdAt: new Date().toISOString(),
      status: 'pending',
    },
    {
      id: '4',
      username: 'NewUser2',
      email: 'newuser2@example.com',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'pending',
    },
  ]);

  const [containers] = useState([
    { name: 'Jellyfin', status: 'running', uptime: '7d 12h', cpu: '12%', memory: '1.2GB' },
    { name: 'Jellyseer', status: 'running', uptime: '7d 12h', cpu: '5%', memory: '512MB' },
    { name: 'Minecraft', status: 'running', uptime: '5d 8h', cpu: '45%', memory: '4GB' },
    { name: 'Website', status: 'running', uptime: '7d 12h', cpu: '3%', memory: '256MB' },
  ]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400">You do not have permission to view this page</p>
        </div>
      </div>
    );
  }

  const handleApprove = (userId: string) => {
    console.log('Approving user:', userId);
  };

  const handleReject = (userId: string) => {
    console.log('Rejecting user:', userId);
  };

  const handleContainerAction = (containerName: string, action: string) => {
    console.log(`${action} container:`, containerName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">
              Admin{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-300">Manage users and monitor system status</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Total Users</h3>
            </div>
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-sm text-gray-400 mt-1">2 pending approval</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Server className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Services</h3>
            </div>
            <p className="text-3xl font-bold text-white">4</p>
            <p className="text-sm text-gray-400 mt-1">All systems operational</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-pink-400" />
              <h3 className="text-lg font-semibold text-white">Uptime</h3>
            </div>
            <p className="text-3xl font-bold text-white">99.9%</p>
            <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Pending User Approvals
          </h2>

          {pendingUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{user.username}</h3>
                    <p className="text-gray-400 text-sm mb-2">{user.email}</p>
                    <p className="text-gray-500 text-xs">
                      Registered {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Server className="w-6 h-6 text-emerald-400" />
            Container Status
          </h2>

          <div className="space-y-4">
            {containers.map((container) => (
              <div
                key={container.name}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        container.status === 'running' ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                    />
                    <h3 className="text-xl font-semibold text-white">{container.name}</h3>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg">
                      {container.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleContainerAction(container.name, 'restart')}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition"
                    >
                      Restart
                    </button>
                    <button
                      onClick={() => handleContainerAction(container.name, 'update')}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-lg transition"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Uptime</p>
                    <p className="text-white font-semibold">{container.uptime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">CPU Usage</p>
                    <p className="text-white font-semibold">{container.cpu}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Memory</p>
                    <p className="text-white font-semibold">{container.memory}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
