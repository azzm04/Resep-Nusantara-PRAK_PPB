// src/pages/FavoritesPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import DetailPage from './DetailPage';
import { Heart, ArrowLeft, Search } from 'lucide-react';
import PropTypes from 'prop-types';
FavoritesPage.propTypes = {
  onBack: PropTypes.func,
};
// Gabungkan semua resep
const allMakanan = Object.values(ResepMakanan.resep).map(r => ({ ...r, type: 'makanan' }));
const allMinuman = Object.values(ResepMinuman.resep).map(r => ({ ...r, type: 'minuman' }));
const allRecipes = [...allMakanan, ...allMinuman];

export default function FavoritesPage({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  
  const itemsPerPage = 3;

  // Update localStorage setiap kali favorites berubah
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  // Filter resep favorit
  useEffect(() => {
    let recipes = allRecipes.filter(recipe => 
      favorites.some(fav => fav.id === recipe.id && fav.type === recipe.type)
    );

    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      recipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    setFilteredRecipes(recipes);
    setCurrentPage(1);
  }, [searchQuery, favorites]);

  // Toggle favorite
  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === recipe.id && fav.type === recipe.type);
      if (isFavorite) {
        return prev.filter(fav => !(fav.id === recipe.id && fav.type === recipe.type));
      } else {
        return [...prev, { id: recipe.id, name: recipe.name, type: recipe.type }];
      }
    });
  };

  // Cek apakah resep adalah favorit
  const isFavorite = (recipe) => {
    return favorites.some(fav => fav.id === recipe.id && fav.type === recipe.type);
  };

  // Jika detail resep dipilih
  if (selectedRecipe) {
    return (
      <DetailPage
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        type={selectedRecipe.type}
      />
    );
  }

  // Logika Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header dengan tombol kembali */}
        <div className="mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Kembali</span>
            </button>
          )}
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Heart className="text-red-500 fill-current" size={32} />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Resep Favoritku
              </h1>
            </div>
            <p className="text-gray-600">
              {filteredRecipes.length} resep favorit tersimpan
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari resep favorit..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentRecipes.map((recipe, index) => (
                <RecipeCard
                  key={`${recipe.type}-${recipe.name}-${index}`}
                  recipe={recipe}
                  onClick={setSelectedRecipe}
                  isFavorite={isFavorite(recipe)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredRecipes.length}
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Heart className="mx-auto mb-4 text-gray-300" size={64} />
            <p className="text-gray-600 text-lg mb-2">
              {searchQuery 
                ? `Tidak ada resep favorit yang ditemukan untuk "${searchQuery}"`
                : 'Belum ada resep favorit'
              }
            </p>
            <p className="text-gray-500 text-sm">
              Mulai tambahkan resep kesukaanmu dengan menekan tombol ❤️
            </p>
          </div>
        )}
      </main>
    </div>
  );
}