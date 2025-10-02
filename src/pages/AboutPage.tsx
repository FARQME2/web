import { Gamepad2, Heart, Shield, Zap } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'Built by gamers, for gamers. We prioritize creating a welcoming space where everyone belongs.',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data stays private. We use industry-standard security practices to protect your information.',
    },
    {
      icon: Zap,
      title: 'Always Evolving',
      description: 'We continuously improve our services based on community feedback and emerging technologies.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-pink-600 rounded-3xl mb-6 transform hover:rotate-6 transition shadow-2xl">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                PixelHaven
              </span>
            </h1>
            <p className="text-xl text-gray-300">Where pixels meet passion</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-gray-700 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                PixelHaven began as a simple idea: create a unified hub where friends could game together,
                share media, and stay connected. What started as a personal project has grown into a thriving
                community of gamers, streamers, and content enthusiasts.
              </p>
              <p>
                We believe that the best gaming experiences happen when technology gets out of the way and
                lets people connect. That's why we've built PixelHaven to be intuitive, secure, and feature-rich,
                without sacrificing the personal touch that makes a community feel like home.
              </p>
              <p>
                From hosting game servers for Minecraft and Palworld to streaming movies through Jellyfin,
                PixelHaven is designed to be your one-stop destination for digital entertainment and community
                engagement.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Stand For</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Game Servers</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Minecraft server with custom plugins and worlds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Palworld multiplayer adventures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Cobblemon Pokemon experience</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Media Streaming</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Jellyfin media server for movies and shows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>Jellyseer for easy content requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-1">•</span>
                    <span>High-quality streaming with transcoding</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Want to be part of our community?
            </p>
            <a
              href="https://discord.gg/pixelhaven"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-pink-700 transition transform hover:scale-105 shadow-lg"
            >
              Join Our Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
