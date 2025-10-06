// src/pages/MinumanPage.jsx
import { useState, useEffect } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import DetailPage from './DetailPage';

export default function MinumanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const itemsPerPage = 6;

  const allMinuman = Object.values(ResepMinuman.resep);

  useEffect(() => {
    const filter = () => {
      if (searchQuery.trim() === '') {
        setFilteredRecipes(allMinuman);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allMinuman.filter(recipe =>
          recipe.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredRecipes(filtered);
      }
      setCurrentPage(1);
    };
    filter();
  }, [searchQuery]);

  // Jika detail recipe dipilih
  if (selectedRecipe) {
    return (
      <DetailPage 
        recipe={selectedRecipe} 
        onBack={() => setSelectedRecipe(null)}
        type="minuman"
      />
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Resep Minuman Nusantara
          </h1>
          <p className="text-gray-600">
            Jelajahi {filteredRecipes.length} resep minuman tradisional Indonesia
          </p>
        </div>

        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Cari resep minuman..."
        />

        {filteredRecipes.length > 0 ? (
          <>
            <RecipeGrid 
              recipes={currentRecipes}
              onRecipeClick={(recipe) => setSelectedRecipe(recipe)}
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
              Tidak ada resep yang ditemukan untuk "{searchQuery}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}