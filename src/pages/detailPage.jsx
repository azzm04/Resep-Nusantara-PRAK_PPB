// src/pages/DetailPage.jsx
import { ArrowLeft, ChefHat, BookOpen } from 'lucide-react';

export default function DetailPage({ recipe, onBack, type = 'makanan' }) {
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <p className="text-gray-600">Resep tidak ditemukan</p>
      </div>
    );
  }

  const bgColor = type === 'makanan' 
    ? 'from-blue-50 via-white to-indigo-50' 
    : 'from-green-50 via-white to-cyan-50';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} pb-20 md:pb-8`}>
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Kembali</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300">
            {recipe.image_url ? (
              <img 
                src={recipe.image_url} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat className="w-24 h-24 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {recipe.name}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Resep #{recipe.id}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Bahan-bahan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-start bg-blue-50 rounded-lg p-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <ChefHat className="w-6 h-6 mr-2 text-blue-600" />
            Cara Membuat
          </h2>
          <ol className="space-y-4">
            {recipe.steps && recipe.steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                  {index + 1}
                </span>
                <p className="text-gray-700 pt-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}