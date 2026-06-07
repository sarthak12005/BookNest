import React, { useState, useEffect } from 'react';
import { useUser } from '../context/useUser';
import { updateProfile } from '../lib/api';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Info, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  BookOpen, 
  Heart, 
  ShoppingBag, 
  Globe, 
  X, 
  UserCheck 
} from 'lucide-react';
import toast from 'react-hot-toast';

const PRESET_AVATARS = [
  { name: 'Gentle Reader', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Intellectual Scholar', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Creative Thinker', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Avid Explorer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Nature Lover', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Passionate Creator', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80' },
];

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Sync form state when user changes
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setUsername(user.username || '');
      setBio(user.bio || '');
      setProfilePic(user.profilePic || '');
    }
  }, [user]);

  const handlePresetSelect = (url) => {
    setProfilePic(url);
    setCustomAvatarUrl('');
  };

  const handleCustomAvatarApply = () => {
    if (customAvatarUrl.trim()) {
      setProfilePic(customAvatarUrl.trim());
      toast.success('Custom avatar URL preview applied!');
    } else {
      toast.error('Please enter a valid URL');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error('Full name is required');
    if (!username.trim()) return toast.error('Username is required');

    setSaving(true);
    try {
      const updatedUser = await updateProfile({
        fullName: fullName.trim(),
        username: username.trim().toLowerCase(),
        bio: bio.trim(),
        profilePic: profilePic.trim()
      });

      if (updatedUser) {
        setUser(updatedUser);
        setIsEditing(false);
      }
    } catch (err) {
      // API error toaster triggered in api.js
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 py-10 px-4 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ─── BREADCRUMB / TITLE ─── */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">My Profile</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your digital sanctuary and preferences</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Edit3 size={15} />
              Edit Profile
            </button>
          )}
        </div>

        {/* ─── PROFILE OVERVIEW BANNER CARD ─── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.04)] p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          {/* Decorative Gradient Blob */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Profile Picture Frame */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-slate-100 overflow-hidden shadow-md bg-slate-50 flex items-center justify-center">
              {profilePic ? (
                <img 
                  src={profilePic} 
                  alt={fullName} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=250';
                  }}
                />
              ) : (
                <span className="text-blue-600 font-bold text-3xl">
                  {username?.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Edit Icon Overlay */}
            {isEditing && (
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Change Profile Picture"
              >
                <Camera size={16} />
              </button>
            )}
          </div>

          {/* User Text Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-2.5 justify-center md:justify-start">
              <h2 className="text-2xl font-bold text-slate-800">{fullName || 'BookNest Reader'}</h2>
              <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-0.5 rounded-full text-[11px] font-bold self-center tracking-wide uppercase">
                {user?.role?.name || 'Reader'}
              </span>
            </div>
            <p className="text-slate-400 font-medium text-sm">
              @{username || 'username'} <span className="mx-1.5">•</span> {user?.email}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
              {bio ? bio : "This reader hasn't added a biography yet. Write a few sentences to share your literary tastes!"}
            </p>
          </div>
        </div>

        {/* ─── EDIT PROFILE FORM ─── */}
        {isEditing && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.04)] p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Edit3 size={18} className="text-blue-500" />
              Update Account Details
            </h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="e.g. sarthak_reader"
                  />
                </div>

              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Biography
                </label>
                <textarea
                  rows={4}
                  maxLength={200}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-150 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="Tell us about yourself, your favorite genres, books or reading habits..."
                />
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Describe yourself in brief</span>
                  <span>{bio.length}/200 characters</span>
                </div>
              </div>

              {/* Save & Cancel Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 active:scale-95 cursor-pointer min-w-[100px]"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── STATS GRID ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.02)] p-6 text-center hover:scale-[1.02] transition-all">
            <BookOpen size={24} className="mx-auto text-blue-500 mb-3" />
            <div className="text-2xl font-bold text-slate-800">{user?.purchasedBooks?.length || 0}</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Purchased Books</div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.02)] p-6 text-center hover:scale-[1.02] transition-all">
            <Heart size={24} className="mx-auto text-rose-500 mb-3" />
            <div className="text-2xl font-bold text-slate-800">{user?.wishlist?.length || 0}</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Wishlist Favorites</div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.02)] p-6 text-center hover:scale-[1.02] transition-all">
            <ShoppingBag size={24} className="mx-auto text-amber-500 mb-3" />
            <div className="text-2xl font-bold text-slate-800">{user?.cart?.items?.length || 0}</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Cart Items</div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.02)] p-6 text-center hover:scale-[1.02] transition-all">
            <UserCheck size={24} className="mx-auto text-emerald-500 mb-3" />
            <div className="text-2xl font-bold text-slate-800">Active</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Account Status</div>
          </div>
        </div>

        {/* ─── DETAILED INFORMATION GROUPS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Account Information Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.04)] p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2.5">
              <Info size={18} className="text-slate-500" />
              Account Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <UserIcon size={14} /> Full Name
                </span>
                <span className="text-slate-700 text-sm font-semibold">{fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Globe size={14} /> Username
                </span>
                <span className="text-slate-700 text-sm font-semibold">@{username}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </span>
                <span className="text-slate-700 text-sm font-semibold">{user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Calendar size={14} /> Member Since
                </span>
                <span className="text-slate-700 text-sm font-semibold">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Security & Verification Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(37,99,235,0.04)] p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-slate-500" />
              Security & Verification
            </h3>
            
            <div className="space-y-6">
              
              {/* Account Status Badge Row */}
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm font-medium">Verified Reader</span>
                {user?.isVerified ? (
                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-xs font-bold">
                    <AlertCircle size={14} />
                    Pending
                  </span>
                )}
              </div>

              {/* Login Security Info */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex gap-3 text-slate-600">
                  <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Security Notice</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your password is encrypted. You can modify your email or request role updates by contacting support.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ─── PRESET AVATAR CHOOSER MODAL ─── */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-[fadeSlide_0.2s_ease]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-800">Select Profile Picture</h4>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Presets Grid */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Preset Avatars
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_AVATARS.map((avatar, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetSelect(avatar.url)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 active:scale-95 mx-auto ${
                        profilePic === avatar.url ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-150'
                      }`}
                      title={avatar.name}
                    >
                      <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                      {profilePic === avatar.url && (
                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                          <div className="bg-blue-600 text-white rounded-full p-0.5">
                            <CheckCircle size={12} fill="white" className="text-blue-600" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom URL Input */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Or Paste Custom Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="flex-1 bg-slate-50 border border-slate-150 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:bg-white focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleCustomAvatarApply}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer hover:shadow-md transition-shadow active:scale-95 shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAvatarModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:shadow-md transition-all active:scale-95"
              >
                Done Selection
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
