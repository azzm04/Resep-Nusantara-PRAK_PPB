// src/components/makanan/RecipeGrid.jsx
import { ChefHat, Heart } from 'lucide-react';
import PropTypes from 'prop-types';

RecipeGrid.propTypes = {
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func,
  favorites: PropTypes.array,
  onToggleFavorite: PropTypes.func,
  isFavorite: PropTypes.func,
};

export default function RecipeGrid({ 
  recipes, 
  onRecipeClick,
  onToggleFavorite, 
  isFavorite 
}) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Tidak ada resep tersedia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id || index}
          onClick={() => onRecipeClick && onRecipeClick(recipe)}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        >
          {/* Recipe Image */}
          <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
            {recipe.image_url ? (
              <img 
                src={recipe.image_url} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Favorite Button */}
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(recipe);
                }}
                className={`absolute top-3 left-3 p-2 rounded-full transition-all duration-300 z-10 ${
                  isFavorite && isFavorite(recipe)
                    ? 'bg-red-500 text-white shadow-lg scale-110'
                    : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
                aria-label={isFavorite && isFavorite(recipe) ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              >
                <Heart
                  size={20}
                  className={isFavorite && isFavorite(recipe) ? 'fill-current' : ''}
                />
              </button>
            )}
            
            {/* ID Badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-gray-700">#{recipe.id}</span>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
              {recipe.name}
            </h3>

            {/* Info Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                {recipe.ingredients?.length || 0} Bahan
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                {recipe.steps?.length || 0} Langkah
              </span>
            </div>

            {/* View Button */}
            <button 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={(e) => {
                e.stopPropagation();
                onRecipeClick && onRecipeClick(recipe);
              }}
            >
              Lihat Resep
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}