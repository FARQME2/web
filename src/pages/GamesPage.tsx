import { useState, useEffect } from 'react';
import { Server, Users, Clock, MapPin, ExternalLink } from 'lucide-react';

interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  version?: string;
  motd?: string;
}

export function GamesPage() {
  const [minecraftStatus, setMinecraftStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMinecraftStatus({
        online: true,
        players: 7,
        maxPlayers: 20,
        version: '1.20.4',
        motd: 'Welcome to PixelHaven MC!',
      });
      setLoading(false);
    }, 1000);
  }, []);

  const servers = [
    {
      name: 'Minecraft',
      description: 'Survival server with custom plugins, economy, and community builds',
      ip: 'mc.pixelhaven.com',
      status: minecraftStatus,
      gradient: 'from-emerald-500 to-teal-600',
      features: ['Custom Plugins', 'Economy System', 'Land Claims', 'BlueMap'],
      mapUrl: 'https://map.pixelhaven.com',
    },
    {
      name: 'Palworld',
      description: 'Multiplayer adventure server for catching and battling Pals',
      ip: 'Coming Soon',
      status: null,
      gradient: 'from-blue-500 to-cyan-600',
      features: ['PvE Focus', 'Community Bases', 'Scheduled Events'],
      comingSoon: true,
    },
    {
      name: 'Cobblemon',
      description: 'Pokemon-inspired Minecraft experience with quests and gyms',
      ip: 'Coming Soon',
      status: null,
      gradient: 'from-orange-500 to-red-600',
      features: ['Pokemon Mod', 'Gym Battles', 'Trading System'],
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Game{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Servers
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Join our gaming community and start your adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {servers.map((server) => (
            <div
              key={server.name}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${server.gradient} rounded-xl flex items-center justify-center`}
                    >
                      <Server className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">{server.name}</h2>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{server.description}</p>
                </div>
                {server.status && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      server.status.online
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {server.status.online ? 'Online' : 'Offline'}
                  </div>
                )}
                {server.comingSoon && (
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                    Coming Soon
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-mono">{server.ip}</span>
                  {!server.comingSoon && (
                    <button
                      onClick={() => navigator.clipboard.writeText(server.ip)}
                      className="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
                    >
                      Copy IP
                    </button>
                  )}
                </div>

                {server.status && (
                  <>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span>
                        {server.status.players} / {server.status.maxPlayers} players online
                      </span>
                    </div>
                    {server.status.version && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span>Version {server.status.version}</span>
                      </div>
                    )}
                  </>
                )}

                {loading && server.name === 'Minecraft' && (
                  <div className="text-gray-400 text-sm">Loading server status...</div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {server.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {server.mapUrl && (
                <a
                  href={server.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${server.gradient} text-white font-semibold rounded-xl hover:opacity-90 transition`}
                >
                  View Live Map
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">How to Connect</h2>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Launch the game and navigate to multiplayer</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Click "Add Server" and paste the server IP address</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>Join the server and start playing with the community!</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
