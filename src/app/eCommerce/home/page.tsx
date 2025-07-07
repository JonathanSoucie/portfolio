'use client';

import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
}

const mockProducts: Record<string, Product[]> = {
  'VAN GOGH': [
    {
      id: 1,
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      price: "From $24.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
    },
    {
      id: 2,
      title: "Sunflowers",
      artist: "Vincent van Gogh",
      price: "From $19.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/800px-Vincent_Willem_van_Gogh_127.jpg"
    },
    {
      id: 3,
      title: "The Bedroom",
      artist: "Vincent van Gogh",
      price: "From $22.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/330px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg"
    },
    {
      id: 4,
      title: "Irises",
      artist: "Vincent van Gogh",
      price: "From $26.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Irises-Vincent_van_Gogh.jpg/1280px-Irises-Vincent_van_Gogh.jpg"
    },
    {
      id: 5,
      title: "Café Terrace at Night",
      artist: "Vincent van Gogh",
      price: "From $23.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Vincent_van_Gogh_%281853-1890%29_Caf%C3%A9terras_bij_nacht_%28place_du_Forum%29_Kr%C3%B6ller-M%C3%BCller_Museum_Otterlo_23-8-2016_13-35-40.JPG/330px-Vincent_van_Gogh_%281853-1890%29_Caf%C3%A9terras_bij_nacht_%28place_du_Forum%29_Kr%C3%B6ller-M%C3%BCller_Museum_Otterlo_23-8-2016_13-35-40.JPG"
    },
    {
      id: 6,
      title: "Almond Blossoms",
      artist: "Vincent van Gogh",
      price: "From $21.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg"
    }
  ],
  'MONET': [
    {
      id: 7,
      title: "Water Lilies",
      artist: "Claude Monet",
      price: "From $25.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Claude_Monet_-_The_Water_Lilies_-_Setting_Sun_-_Google_Art_Project.jpg/500px-Claude_Monet_-_The_Water_Lilies_-_Setting_Sun_-_Google_Art_Project.jpg"
    },
    {
      id: 8,
      title: "Impression, Sunrise",
      artist: "Claude Monet",
      price: "From $28.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg"
    },
    {
      id: 9,
      title: "Rouen Cathedral",
      artist: "Claude Monet",
      price: "From $24.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/RouenCathedral_Monet_1894.jpg/250px-RouenCathedral_Monet_1894.jpg"
    },
    {
      id: 10,
      title: "Poplar Trees",
      artist: "Claude Monet",
      price: "From $22.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/1891_Monet_The_four_trees_anagoria.JPG/250px-1891_Monet_The_four_trees_anagoria.JPG"
    }
  ],
  'PICASSO': [
    {
      id: 11,
      title: "Guernica",
      artist: "Pablo Picasso",
      price: "From $29.99",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/PicassoGuernica.jpg/1280px-PicassoGuernica.jpg"
    },
    {
      id: 12,
      title: "The Old Guitarist",
      artist: "Pablo Picasso",
      price: "From $24.99",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Old_guitarist_chicago.jpg/330px-Old_guitarist_chicago.jpg"
    },
    {
      id: 13,
      title: "Les Demoiselles d'Avignon",
      artist: "Pablo Picasso",
      price: "From $27.99",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/800px-Les_Demoiselles_d%27Avignon.jpg"
    },
    {
      id: 14,
      title: "Girl with a Mandolin",
      artist: "Pablo Picasso",
      price: "From $23.99",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/250px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg"
    }
  ],
  'DA VINCI': [
    {
      id: 15,
      title: "The Last Supper",
      artist: "Leonardo da Vinci",
      price: "From $32.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg/1280px-Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg"
    },
    {
      id: 16,
      title: "Vitruvian Man",
      artist: "Leonardo da Vinci",
      price: "From $26.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/800px-Da_Vinci_Vitruve_Luc_Viatour.jpg"
    },
    {
      id: 17,
      title: "Lady with an Ermine",
      artist: "Leonardo da Vinci",
      price: "From $28.99",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/800px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg"
    }
  ]
};

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => (
    <div className="product-card" onClick={onClick}>
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-image"
        loading="lazy"
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-artist">{product.artist}</p>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  );
  
  const ProductGrid: React.FC<{ products: Product[]; onProductClick: (id: number) => void }> = ({ products, onProductClick }) => (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onProductClick(product.id)}
        />
      ))}
    </div>
  );
  
  const ArtistSection: React.FC<{ 
    title: string; 
    products: Product[]; 
    onProductClick: (id: number) => void;
  }> = ({ title, products, onProductClick }) => (
    <div className="artist-section">
      <div className="px-8">
        <h2>{title}</h2>
      </div>
      <ProductGrid products={products} onProductClick={onProductClick} />
    </div>
  );

  const SearchResults: React.FC<{ 
    results: Product[]; 
    query: string; 
    onProductClick: (id: number) => void;
    onClearSearch: () => void;
  }> = ({ results, query, onProductClick, onClearSearch }) => (
    <div className="py-12">
      <div className="px-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Search Results for "{query}" ({results.length} found)
          </h2>
          <button
            onClick={onClearSearch}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X size={16} />
            Clear Search
          </button>
        </div>
        {results.length === 0 && (
          <p className="text-gray-600 text-lg">
            No artworks found matching your search. Try searching for artist names, artwork titles, or keywords.
          </p>
        )}
      </div>
      {results.length > 0 && (
        <ProductGrid products={results} onProductClick={onProductClick} />
      )}
    </div>
  );
  
  export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    // Flatten all products for searching
    const allProducts = useMemo(() => {
      return Object.values(mockProducts).flat();
    }, []);

    // Filter products based on search query
    const searchResults = useMemo(() => {
      if (!searchQuery.trim()) return [];
      
      const query = searchQuery.toLowerCase();
      return allProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.artist.toLowerCase().includes(query)
      );
    }, [searchQuery, allProducts]);
  
    const handleSearch = () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
      }
    };

    const handleClearSearch = () => {
      setSearchQuery('');
      setIsSearching(false);
    };
  
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      
      // If user clears the input, also clear the search results
      if (!value.trim()) {
        setIsSearching(false);
      }
    };
  
    const handleProductClick = (productId: number) => {
      router.push(`/eCommerce/productPage?id=${productId}`);
    };
  
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-section relative min-h-[60vh] flex items-center justify-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" 
            alt="Van Gogh's Starry Night" 
            className="hero-bg"
          />
          <div className="relative z-10 text-center px-8 max-w-4xl">
            <h1 className="mb-6 text-white drop-shadow-lg">Art Depot</h1>
            <p className="text-xl mb-8 text-white drop-shadow-md max-w-2xl mx-auto">
              Museum-quality reproductions of the world's greatest artworks, crafted to elevate your home.
            </p>
            
            <div className="search-container">
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
              <button type="button" onClick={handleSearch} className="search-button">
                <Search size={18} className="text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* Content Section */}
        {isSearching ? (
          <SearchResults 
            results={searchResults} 
            query={searchQuery} 
            onProductClick={handleProductClick}
            onClearSearch={handleClearSearch}
          />
        ) : (
          /* Featured Artists */
          <div className="py-12">
            {Object.entries(mockProducts).map(([artistName, products]) => (
              <ArtistSection 
                key={artistName} 
                title={artistName} 
                products={products} 
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }