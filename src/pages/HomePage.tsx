import { Film, Gamepad2, Users, ExternalLink } from 'lucide-react';

export function HomePage() {
  const features = [
    {
      icon: Gamepad2,
      title: 'Game Servers',
      description: 'Join our Minecraft, Palworld, and Cobblemon communities',
      gradient: 'from-emerald-500 to-teal-600',
      link: '/games',
    },
    {
      icon: Film,
      title: 'Media Library',
      description: 'Stream movies and shows through Jellyfin, request content via Jellyseer',
      gradient: 'from-cyan-500 to-blue-600',
      link: 'https://jellyfin.pixelhaven.com',
      external: true,
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow gamers on our Discord server',
      gradient: 'from-pink-500 to-rose-600',
      link: 'https://discord.gg/pixelhaven',
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />

        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-pink-600 rounded-3xl mb-6 transform hover:rotate-6 transition shadow-2xl">
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                PixelHaven
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your all-in-one community hub for gaming, streaming, and connecting with friends
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://jellyfin.pixelhaven.com"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
              >
                Watch Now
              </a>
              <a
                href="https://discord.gg/pixelhaven"
                className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-semibold rounded-xl hover:bg-gray-700 transition transform hover:scale-105 shadow-lg"
              >
                Join Discord
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <a
                key={feature.title}
                href={feature.link}
                target={feature.external ? '_blank' : undefined}
                rel={feature.external ? 'noopener noreferrer' : undefined}
                className="group relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition transform hover:scale-105 hover:shadow-2xl"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 transform group-hover:rotate-6 transition`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  {feature.title}
                  {feature.external && <ExternalLink className="w-4 h-4 text-gray-400" />}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">What is PixelHaven?</h2>
              <p className="text-gray-300 leading-relaxed">
                PixelHaven is a private community platform where friends come together to game, stream media,
                and build lasting connections. From hosting game servers to sharing movies and shows,
                we create a space that feels like home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
