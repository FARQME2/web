import { useState } from 'react';
import { User, Mail, Calendar, Shield, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [profilePictureUrl, setProfilePictureUrl] = useState(user?.profilePictureUrl || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  if (!user) {
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    setSuccess('');

    try {
      await updateProfile({
        username,
        profilePictureUrl: profilePictureUrl || undefined,
      });
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setUsername(user.username);
    setProfilePictureUrl(user.profilePictureUrl || '');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                Profile
              </span>
            </h1>
            <p className="text-xl text-gray-300">Manage your account settings</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 mb-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Account Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="flex flex-col items-center mb-8">
              {profilePictureUrl && !isEditing ? (
                <img
                  src={profilePictureUrl}
                  alt={username}
                  className="w-24 h-24 rounded-full border-4 border-cyan-500 mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
              {isEditing && (
                <div className="w-full max-w-md">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    value={profilePictureUrl}
                    onChange={(e) => setProfilePictureUrl(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                ) : (
                  <p className="text-lg text-white">{user.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                </label>
                <p className="text-lg text-white">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Role
                  </div>
                </label>
                <div className="inline-flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      user.role === 'admin'
                        ? 'bg-pink-500/20 text-pink-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      user.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : user.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member Since
                  </div>
                </label>
                <p className="text-lg text-white">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {user.jellyfinUserId && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Jellyfin Integration
                  </label>
                  <p className="text-sm text-emerald-400">Connected</p>
                </div>
              )}
            </div>

            {success && (
              <div className="mt-6 p-3 bg-emerald-500/10 border border-emerald-500/50 rounded-lg text-emerald-400 text-sm">
                {success}
              </div>
            )}

            {isEditing && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 transition"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://jellyfin.pixelhaven.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-900/50 hover:bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 transition"
              >
                <h3 className="text-white font-semibold mb-1">Jellyfin</h3>
                <p className="text-sm text-gray-400">Access your media library</p>
              </a>
              <a
                href="https://jellyseer.pixelhaven.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-900/50 hover:bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 transition"
              >
                <h3 className="text-white font-semibold mb-1">Jellyseer</h3>
                <p className="text-sm text-gray-400">Request new content</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
