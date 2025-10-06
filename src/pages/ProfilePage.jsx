import { User, Mail, MapPin, Calendar, Award, Heart, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const userData = {
    name: "Azzam Syaiful Islam",
    email: "azzamsyaifull@gmail.com",
    location: "semarang, Indonesia",
    joinDate: "Januari 2020",
    bio: "Pecinta makanan lokal dan internasional. Saya suka bereksperimen dengan resep baru dan berbagi pengalaman kuliner saya.",
    stats: {
      recipesViewed: 156,
      favoriteRecipes: 24,
      achievements: 8
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-blue-100 to-purple-200 flex justify-center items-start pt-16 pb-20">
      <div className="max-w-4xl w-full mx-auto px-4 md:px-8">
        
        {/* Profile Card */}
        <div className="relative backdrop-blur-lg bg-white/30 border border-white/40 rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Header */}
          <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          {/* Info Section */}
          <div className="px-6 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20">
              <div className="flex items-end gap-4">
                <div className="w-36 h-36 rounded-full border-4 border-white bg-gradient-to-tr from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
                <div className="pb-2">
                  <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow-sm">
                    {userData.name}
                  </h1>
                  <p className="text-gray-700">Food Enthusiast</p>
                </div>
              </div>
              <button className="mt-6 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <p className="text-gray-800 mt-6 mb-8 leading-relaxed text-justify">
              {userData.bio}
            </p>

            {/* Info List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>{userData.location}</span>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>Bergabung {userData.joinDate}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 border-t border-white/50 pt-6">
              {[
                { icon: <BookOpen className="w-6 h-6 text-indigo-600" />, value: userData.stats.recipesViewed, label: "Resep Dilihat" },
                { icon: <Heart className="w-6 h-6 text-pink-500" />, value: userData.stats.favoriteRecipes, label: "Favorit" },
                { icon: <Award className="w-6 h-6 text-yellow-500" />, value: userData.stats.achievements, label: "Pencapaian" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-3xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Pencapaian
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Pemula", icon: "🌟", desc: "Lihat 10 resep" },
              { name: "Explorer", icon: "🗺️", desc: "Lihat 50 resep" },
              { name: "Chef", icon: "👨‍🍳", desc: "Lihat 100 resep" },
              { name: "Foodie", icon: "🍜", desc: "Simpan 20 favorit" }
            ].map((achv, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl text-center bg-gradient-to-br from-white/60 to-purple-50 hover:from-purple-100 hover:to-white/70 border border-white/50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-2">{achv.icon}</div>
                <p className="font-semibold text-gray-900">{achv.name}</p>
                <p className="text-xs text-gray-600 mt-1">{achv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
