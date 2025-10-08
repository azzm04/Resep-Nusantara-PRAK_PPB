// src/pages/AllRecipesPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import MakananRecipeGrid from '../components/makanan/RecipeGrid';
import MinumanRecipeGrid from '../components/minuman/RecipeGrid';
import Pagination from '../components/Pagination';
import DetailPage from './DetailPage';
import { Heart, Search } from 'lucide-react';

// Gabungkan semua resep menjadi satu array
const allMakanan = Object.values(ResepMakanan.resep).map(r => ({ ...r, type: 'makanan' }));
const allMinuman = Object.values(ResepMinuman.resep).map(r => ({ ...r, type: 'minuman' }));
const allRecipes = [...allMakanan, ...allMinuman];

export default function AllRecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('semua'); // 'semua', 'makanan', 'minuman'
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  
  const itemsPerPage = 6;

  // Simpan favorites ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  // Efek untuk memfilter resep berdasarkan tab aktif dan pencarian
  useEffect(() => {
    let recipes = [];
    
    if (showFavorites) {
      // Tampilkan hanya resep favorit
      recipes = allRecipes.filter(recipe => 
        favorites.some(fav => fav.id === recipe.id && fav.type === recipe.type)
      );
    } else {
      if (activeFilter === 'semua') {
        recipes = allRecipes;
      } else if (activeFilter === 'makanan') {
        recipes = allMakanan;
      } else {
        recipes = allMinuman;
      }
    }

    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      recipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    setFilteredRecipes(recipes);
    setCurrentPage(1); // Reset ke halaman 1 setiap kali filter berubah
  }, [searchQuery, activeFilter, favorites, showFavorites]);

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

  // Pilih komponen Grid yang sesuai
  const RecipeGridComponent = activeFilter === 'minuman' ? MinumanRecipeGrid : MakananRecipeGrid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {showFavorites ? 'Resep Favoritku' : 'Jelajahi Resep Nusantara'}
          </h1>
          <p className="text-gray-600">
            {showFavorites 
              ? `${filteredRecipes.length} resep favorit tersimpan`
              : `Temukan ${filteredRecipes.length} resep makanan dan minuman favoritmu`
            }
          </p>
        </div>

        {/* Tombol Favorites */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setShowFavorites(!showFavorites);
              setActiveFilter('semua');
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              showFavorites
                ? 'bg-red-500 text-white shadow-lg hover:bg-red-600'
                : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={showFavorites ? 'fill-current' : ''} size={20} />
            {showFavorites ? 'Lihat Semua Resep' : `Resep Favorit (${favorites.length})`}
          </button>
        </div>
        
        {/* Tombol Filter - hanya tampil jika tidak dalam mode favorites */}
        {!showFavorites && (
          <div className="flex justify-center gap-2 md:gap-4 mb-8">
            <button 
              onClick={() => setActiveFilter('semua')} 
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all ${
                activeFilter === 'semua' 
                  ? 'bg-slate-800 text-white shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua
            </button>
            <button 
              onClick={() => setActiveFilter('makanan')} 
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all ${
                activeFilter === 'makanan' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Makanan
            </button>
            <button 
              onClick={() => setActiveFilter('minuman')} 
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all ${
                activeFilter === 'minuman' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-white text-green-600 hover:bg-green-50'
              }`}
            >
              Minuman
            </button>
          </div>
        )}

        {/* Search Bar Inline */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari resep apa hari ini?"
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
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
            <RecipeGridComponent
              recipes={currentRecipes}
              onRecipeClick={(recipe) => setSelectedRecipe(recipe)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredRecipes.length}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {showFavorites 
                ? 'Belum ada resep favorit. Mulai tambahkan resep kesukaanmu!'
                : `Tidak ada resep yang ditemukan untuk "${searchQuery}"`
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}