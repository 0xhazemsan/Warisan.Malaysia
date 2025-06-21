import React, { useState, useEffect } from 'react';
import { MapPin, Book, Compass, Star, Clock, Globe, Heart, Search, Instagram, Phone } from 'lucide-react';
import Auth from './components/Auth';
import SiteDetailModal from './components/SiteDetailModal';
import StoryDetailModal from './components/StoryDetailModal';

interface CulturalSite {
  id: number;
  name: string;
  location: string;
  category: string;
  description: string;
  image: string;
  heritage: string;
  visitInfo: string;
  openingHours?: string;
  website?: string;
  price?: string;
  mapUrl?: string;
  timestamp: string;
}

interface Story {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  content: string;
}

interface User {
  username: string;
  favorites?: number[];
}

interface Comment {
  siteId: number;
  username: string;
  text: string;
  timestamp: string;
}

// =================================================================================
// HERITAGE SITES COMPONENT
// =================================================================================
const HeritageSitesSection = ({
  sites,
  activeSection,
  isAuthenticated,
  user,
  comments,
  handleToggleFavorite,
  handleAddComment,
  setSelectedSite,
}: {
  sites: CulturalSite[];
  activeSection: string;
  isAuthenticated: boolean;
  user: User | null;
  comments: Comment[];
  handleToggleFavorite: (siteId: number) => void;
  handleAddComment: (siteId: number, text: string) => void;
  setSelectedSite: (site: CulturalSite | null) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { id: 'all', name: 'All Sites', icon: Globe },
    { id: 'Architecture', name: 'Architecture', icon: MapPin },
    { id: 'Religious', name: 'Religious', icon: Heart },
    { id: 'Historical', name: 'Historical', icon: Book },
    { id: 'Modern', name: 'Modern', icon: Star },
    { id: 'Colonial', name: 'Colonial', icon: Compass },
  ];

  const locations = ['all', ...Array.from(new Set(sites.map((site) => site.location)))];

  const filteredSites = sites.filter((site) => {
    const categoryMatch = selectedCategory === 'all' || site.category === selectedCategory;
    const searchMatch =
      search.trim() === '' ||
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.description.toLowerCase().includes(search.toLowerCase()) ||
      site.location.toLowerCase().includes(search.toLowerCase());
    const locationMatch = selectedLocation === 'all' || site.location === selectedLocation;
    return categoryMatch && searchMatch && locationMatch;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {activeSection === 'favorites' ? 'My Favorite Sites' : "Malaysia's Cultural Heritage"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {activeSection === 'favorites'
              ? 'A collection of your most cherished cultural locations.'
              : 'Explore our diverse cultural landscape through interactive digital experiences.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search sites by name, location, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-3 text-base bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 focus:border-yellow-400 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-md"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full md:w-auto px-6 py-3 text-base bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 focus:border-yellow-400 focus:outline-none text-gray-900 dark:text-gray-100 shadow-md appearance-none"
            >
              <option value="all">All Locations</option>
              {locations.filter((l) => l !== 'all').map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-400 to-red-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Sites Grid */}
        {filteredSites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSites.map((site) => (
              <div key={site.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {site.category}
                    </span>
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={() => handleToggleFavorite(site.id)}
                      className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full z-10"
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          user?.favorites?.includes(site.id) ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'
                        }`}
                      />
                    </button>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 transition-colors">
                    {site.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{site.location}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{site.description}</p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Heritage:</strong> {site.heritage}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <strong>Visit Info:</strong> {site.visitInfo}
                    </p>
                    <button
                      onClick={() => setSelectedSite(site)}
                      className="w-full bg-gradient-to-r from-yellow-400 to-red-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Virtually
                    </button>
                  </div>
                  {/* Comments Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">Comments</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {comments.filter((c) => c.siteId === site.id).map((comment, index) => (
                        <div key={index} className="text-sm">
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong className="text-gray-700 dark:text-gray-300">{comment.username}</strong>: {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    {isAuthenticated && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const target = e.target as typeof e.target & { comment: { value: string } };
                          handleAddComment(site.id, target.comment.value);
                          target.comment.value = '';
                        }}
                        className="mt-3 flex gap-2"
                      >
                        <input
                          type="text"
                          name="comment"
                          placeholder="Add a comment..."
                          className="flex-grow px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                        <button type="submit" className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                          Post
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {search || selectedLocation !== 'all' ? 'No sites found' : 'No Favorites Yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {search || selectedLocation !== 'all'
                ? `Your filter criteria did not match any sites.`
                : 'Click the heart icon on any site to add it to your favorites!'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedSite, setSelectedSite] = useState<CulturalSite | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAllStories, setShowAllStories] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleToggleFavorite = (siteId: number) => {
    if (!isAuthenticated || !user) return;

    setUser(currentUser => {
      if (!currentUser) return null;

      const newFavorites = currentUser.favorites?.includes(siteId)
        ? currentUser.favorites.filter((id) => id !== siteId)
        : [...(currentUser.favorites || []), siteId];
      
      const updatedUser = { ...currentUser, favorites: newFavorites };

      // Update the active user session in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update the master list of users in localStorage immutably
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedStoredUsers = storedUsers.map((u: User) => 
        u.username === updatedUser.username ? { ...u, favorites: newFavorites } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedStoredUsers));

      return updatedUser;
    });
  };

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const culturalSites: CulturalSite[] = [
    {
      id: 1,
      name: "George Town UNESCO World Heritage Site",
      location: "Penang",
      category: "Architecture",
      description: "A living testament to Malaysia's multicultural heritage with colonial architecture, Chinese shophouses, and Indian temples.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/93/54/36/caption.jpg?w=1200&h=-1&s=1",
      heritage: "UNESCO World Heritage Site since 2008",
      visitInfo: "Open daily, guided tours available",
      openingHours: "9:00 AM - 5:00 PM",
      website: "https://www.georgetownheritage.com",
      price: "Free (some attractions may have fees)",
      mapUrl: "https://maps.app.goo.gl/2iCtWUmMjCZzExTDA",
      timestamp: ""
    },
    {
      id: 2,
      name: "Petronas Twin Towers",
      location: "Kuala Lumpur",
      category: "Modern",
      description: "Iconic symbol of modern Malaysia, showcasing the nation's architectural prowess and cultural fusion.",
      image: "https://eticket.petronastwintowers.com.my/pettvo.png",
      heritage: "Architectural marvel representing Malaysia's progress",
      visitInfo: "Skybridge and observation deck open to visitors",
      openingHours: "10:00 AM - 6:00 PM (Closed Mondays)",
      website: "https://www.petronastwintowers.com.my",
      price: "From RM35 (Malaysian) / RM98 (Non-Malaysian)",
      mapUrl: "https://maps.app.goo.gl/J39FvZv8q4UQkiFX9",
      timestamp: ""
    },
    {
      id: 3,
      name: "Batu Caves",
      location: "Selangor",
      category: "Religious",
      description: "Sacred Hindu temple complex in limestone caves, featuring the world's tallest statue of Lord Murugan.",
      image: "https://images.unsplash.com/photo-1574218705727-e4196d72bfb5?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heritage: "Over 400 million years old limestone formation",
      visitInfo: "Open daily, 272 steps to main temple cave",
      openingHours: "6:00 AM - 9:00 PM",
      website: "https://www.batucaves.org",
      price: "Free entry (tours from RM10 - RM50)",
      mapUrl: "https://www.google.com/maps/place/Batu+Caves/@3.2374599,101.6813484,17z/data=!3m1!4b1!4m6!3m5!1s0x31cc470c8949a805:0xf2bfebb2b36f9ef9!8m2!3d3.2378844!4d101.6840385!16zL20vMHN5cDk?entry=ttu",
      timestamp: ""
    },
    {
      id: 4,
      name: "Malacca Historic City",
      location: "Melaka",
      category: "Historical",
      description: "Ancient trading port showcasing Portuguese, Dutch, and British colonial influences alongside Malay heritage.",
      image: "https://publicholidays.com.my/wp-content/uploads/2016/10/Malaysia_MelakaHeritageDay_Output.jpg",
      heritage: "UNESCO World Heritage Site",
      visitInfo: "Historic walking trail, museums, and cultural sites",
      openingHours: "Varies by site",
      website: "https://www.malaccatourism.com",
      price: "Varies",
      mapUrl: "https://maps.app.goo.gl/Rbdcv4QXANh8yhgT7",
      timestamp: ""
    },
    {
      id: 6,
      name: "Sultan Abdul Samad Building",
      location: "Kuala Lumpur",
      category: "Colonial",
      description: "Victorian-era architecture with Moorish influences, representing Malaysia's colonial history and independence.",
      image: "https://explore.rehlat.ae/static/media/searchdestination/thingstodo/images/kuala_lumpur/sultan_abdul_samad_building/pexels-phearak-chamrien-13030033.webp",
      heritage: "Built in 1897, witness to Malaysian independence",
      visitInfo: "Exterior viewing, guided historical tours available",
      openingHours: "24/7 (Exterior)",
      website: "https://www.kuala-lumpur.ws/attractions/sultan-abdul-samad-building.htm",
      price: "Free",
      mapUrl: "https://maps.app.goo.gl/GcWAYShyQJULxrSq6",
      timestamp: ""
    },
    {
      id: 7,
      name: "Kek Lok Si Temple",
      location: "Penang",
      category: "Religious",
      description: "One of the largest Chinese temple complexes in Southeast Asia, featuring a towering pagoda and a giant statue of Kuan Yin.",
      image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/7089/images/647c4e-62-dca-e12d-4c3f2cff0261_Cover_Photo.png",
      heritage: "A major pilgrimage center for Buddhists since 1890.",
      visitInfo: "Open daily, dress respectfully.",
      openingHours: "8:30 AM - 5:30 PM",
      website: "https://kekloksitemple.com",
      price: "Free entry (attractions from RM2)",
      mapUrl: "https://maps.app.goo.gl/UKpTeMxHAwXwnKD99",
      timestamp: ""
    },
    {
      id: 9,
      name: "Istana Budaya",
      location: "Kuala Lumpur",
      category: "Modern",
      description: "Malaysia's main venue for theatre, music, and opera, with unique architecture inspired by a traditional Malay kite.",
      image: "https://www.visitselangor.com/wp-content/uploads/Istana-Budaya.jpg",
      heritage: "A symbol of Malaysia's commitment to the performing arts.",
      visitInfo: "Check official website for performance schedules.",
      openingHours: "Varies by show",
      website: "https://www.istanabudaya.gov.my",
      price: "Varies by performance",
      mapUrl: "https://maps.app.goo.gl/T442DzBkmZsiUohUA",
      timestamp: ""
    },
    {
      id: 10,
      name: "A Famosa",
      location: "Melaka",
      category: "Colonial",
      description: "The remains of a 16th-century Portuguese fortress. The Porta de Santiago gatehouse is the only part that still stands.",
      image: "https://mkzjm.cdn.setuix.net/resources/blog/a-famosa-st-paul-hill/st.-pauls-church-in-melaka_muhammad-azreen-1-1170x878.jpg",
      heritage: "One of the oldest surviving European architectural remains in Asia.",
      visitInfo: "Open to the public, part of the Malacca historic trail.",
      openingHours: "24/7",
      website: "https://www.malacca.ws/attractions/a-famosa-fort.htm",
      price: "Free (nearby attractions may have fees)",
      mapUrl: "https://www.google.com/maps/place/A+Famosa/@2.1917988,102.0979325,12z/data=!4m10!1m2!2m1!1sA+Famosa!3m6!1s0x31d1f1e0a3a7681d:0xc2e4da7ca10e63b5!8m2!3d2.1917988!4d102.2503678!15sCghBIEZhbW9zYVoKIghhIGZhbW9zYZIBCGZvcnRyZXNzqgE8CgovbS8wNjV5MDU2EAEyHhABIhp18TNVAg8mhZ23fQGHSreHkCs53OjpZaKVhDIMEAIiCGEgZmFtb3Nh4AEA!16zL20vMGRneWZj?entry=ttu",
      timestamp: ""
    },
    {
      id: 12,
      name: "Langkawi Sky Bridge",
      location: "Langkawi",
      category: "Modern",
      description: "A stunning 125-metre curved pedestrian bridge offering breathtaking views of the Andaman Sea.",
      image: "https://images.unsplash.com/photo-1727884873350-0c6016db8a74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heritage: "An engineering marvel and an icon of modern tourism.",
      visitInfo: "Accessible via the Langkawi Cable Car.",
      openingHours: "10:00 AM - 7:00 PM",
      website: "https://panoramalangkawi.com/skybridge/",
      price: "From RM43 (Malaysian) / RM85 (Non-Malaysian)",
      mapUrl: "https://www.google.com/maps/place/Langkawi+Sky+Bridge/@6.3865686,99.6619881,3a,78.9y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIChqoH8qwE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAC9h4noeOlt1YYpXAjZxlAFZnRXJ1KomEfGFUnAs2j3X53wytwvkb4p1UkKc0JSkhIf3uyXJxfAzKb3wmO1h-TmBkS0R8_2W0gVvdEIym8ptjB-ZpTyUnYV_mwtZN-Wdv8c7Fu4ap-1T3A%3D%3Dw129-h86-k-no!7i1024!8i682!4m7!3m6!1s0x304c76c41c936fc3:0x36f2796db82629c3!8m2!3d6.3865686!4d99.6619881!10e5!16s%2Fm%2F06w9chd?entry=ttu",
      timestamp: ""
    },
    {
      id: 14,
      name: "Cheong Fatt Tze Mansion (Blue Mansion)",
      location: "Penang",
      category: "Historical",
      description: "An iconic, indigo-blue mansion built in the 19th century, showcasing a blend of Chinese and European architectural styles.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/9c/78/6b/the-mansion-at-dusk.jpg?w=900&h=500&s=1",
      heritage: "An award-winning example of architectural conservation.",
      visitInfo: "Guided tours available daily; also operates as a boutique hotel.",
      openingHours: "11:00 AM, 2:00 PM, 3:30 PM (Tour times)",
      website: "https://www.cheongfatttzemansion.com",
      price: "From RM25 (Malaysian) / RM50 (Non-Malaysian)",
      mapUrl: "https://maps.app.goo.gl/nXB63HETBbHXNBit7",
      timestamp: ""
    },
    {
      id: 15,
      name: "Islamic Arts Museum Malaysia",
      location: "Kuala Lumpur",
      category: "Religious",
      description: "The largest museum of Islamic art in Southeast Asia, housing more than seven thousand artifacts from across the Islamic world.",
      image: "https://www.chenhuijing.com/assets/images/posts/iamm/iamm-1280.jpg",
      heritage: "A premier institution for Islamic art and culture.",
      visitInfo: "Open daily; features a restaurant and a museum shop.",
      openingHours: "10:00 AM - 6:00 PM",
      website: "https://www.iamm.org.my",
      price: "From RM20 (Malaysian) / RM40 (Non-Malaysian)",
      mapUrl: "https://maps.app.goo.gl/RoZadJySp6rE64qn9",
      timestamp: ""
    },
    {
      id: 16,
      name: "Taman Negara National Park",
      location: "Pahang",
      category: "Natural",
      description: "One of the world's oldest deciduous rainforests, estimated to be 130 million years old.",
      image: "https://www.malaysia.travel/webroot/articles/peekintomalaysia/1140083d6.png",
      heritage: "Ancient Rainforest Ecosystem",
      visitInfo: "Accessible via guided tours and jungle trekking.",
      openingHours: "Varies by park office",
      website: "https://www.tamannegara.asia/",
      price: "From RM5 (Malaysian) / RM50 (Non-Malaysian)",
      mapUrl: "https://www.google.com/maps/place/Taman+Negara+National+Park/@4.5107361,102.3212693,12z/data=!4m10!1m2!2m1!1sTaman+Negara+National+Park!3m6!1s0x31c998d0f6ff698f:0x90e95a62c2d14f87!8m2!3d4.3851313!4d102.4004233!15sChpUYW1hbiBOZWdhcmEgTmF0aW9uYWwgUGFya5IBDW5hdGlvbmFsX3BhcmuqAU0KCS9tLzAzMXZiOBABMh4QASIaqt9yCy4A4n85IrgjnXsBZH8-arlyMqTDE8wyHhACIhp0YW1hbiBuZWdhcmEgbmF0aW9uYWwgcGFya-ABAA!16s%2Fg%2F11b66l1kxm?entry=ttu",
      timestamp: ""
    },
    {
      id: 17,
      name: "Gunung Mulu National Park",
      location: "Sarawak",
      category: "Natural",
      description: "A UNESCO World Heritage site famous for its massive caves and distinctive karst formations.",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Pinnacles_at_Mulu_2.jpg",
      heritage: "Significant for its biodiversity and geological features.",
      visitInfo: "Accessible by flight; various caving and trekking tours available.",
      openingHours: "Varies by tour",
      website: "https://mulu.park.org.my",
      price: "From RM30 (Malaysian) / RM150 (Non-Malaysian)",
      mapUrl: "https://maps.app.goo.gl/r6kUj9qb1VWUPcR1A",
      timestamp: ""
    }
  ];

  const stories: Story[] = [
    {
      id: 1,
      title: "The Legend of Mahsuri",
      category: "Folklore",
      excerpt: "Discover the tragic tale of Langkawi's legendary princess and the seven-generation curse that shaped the island's destiny.",
      image: "https://img.atlasobscura.com/Mps8D0vBFsx4SdGP81xgSR0qiC_klSEx8P-CmTyGnOg/rt:fit/w:1200/q:80/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85MGI0/YTBlMS1mYzcyLTRl/M2QtOTgzYy1hMTNk/NzM5YzI1MzAwZTMx/MWI1MTE4YTFiYjE5/ODVfSU1HXzQxODYu/anBlZw.jpg",
      readTime: "7 min read",
      content: `
        <h3 class="text-2xl font-bold mt-6 mb-4">The Legend of Mahsuri</h3>
        <p class="mb-4">The story of Mahsuri is one of Langkawi's most famous and tragic legends, a poignant tale of beauty, jealousy, and a curse that is said to have cast a shadow over the island for seven generations. Mahsuri was a maiden of extraordinary beauty, born in the late 18th century. Her grace and charm were known throughout the island, and she eventually married a warrior named Wan Darus, the brother of the village chief.</p>
        <p class="mb-4">When Wan Darus was called away to fight in a war against the Siamese, Mahsuri was left alone. During this time, she befriended a young storyteller and traveler named Deramang. Their friendship, however, became the subject of vicious gossip, fueled by the chief's wife, Wan Mahora, who was consumed by jealousy over Mahsuri's beauty and popularity.</p>
        <h4 class="text-xl font-bold mt-6 mb-2">Betrayal and a Dying Curse</h4>
        <p class="mb-4">Wan Mahora spread rumors that Mahsuri was unfaithful to her husband. The village elders, without a fair trial, quickly condemned her for adultery. Mahsuri pleaded her innocence, but her cries fell on deaf ears. She was tied to a tree and, according to legend, none of the traditional executioner's keris (daggers) could harm her. Mahsuri, in her despair, revealed that only her family's ceremonial keris could end her life.</p>
        <p class="mb-4">When she was stabbed, it is said that white blood flowed from her wound, a definitive sign of her innocence. With her last breath, Mahsuri uttered a curse upon the island of Langkawi, condemning it to seven generations of hardship and misfortune. "There shall be no peace or prosperity on this island for seven generations," she declared.</p>
        <h4 class="text-xl font-bold mt-6 mb-2">The Aftermath and Legacy</h4>
        <p>Shortly after her death, Langkawi was indeed plunged into a period of great suffering, including a devastating Siamese invasion. For years, the island remained a desolate backwater, its fields barren and its people impoverished. It was only in the late 20th century, after the seven generations had passed, that Langkawi began to transform. The lifting of the curse is often credited with the island's subsequent boom in development and tourism, turning it into the tropical paradise it is today. Mahsuri's Tomb, Makam Mahsuri, now stands as a memorial complex, reminding visitors of the legend that continues to shape the island's identity.</p>
      `
    },
    {
      id: 2,
      title: "Peranakan Heritage",
      category: "Culture",
      excerpt: "Explore the unique Straits Chinese culture that blends Chinese traditions with local Malay influences in architecture, cuisine, and customs.",
      image: "https://silverkris.singaporeair.com/wp-content/uploads/2023/12/Pinang-Peranakan-Museum_Penang_1080w.jpg",
      readTime: "8 min read",
      content: `
        <h3 class="text-2xl font-bold mt-6 mb-4">Peranakan Heritage: A Fusion of Cultures</h3>
        <p class="mb-4">The Peranakan, also known as the Baba-Nyonya, represent one of Malaysia's most fascinating and unique cultural tapestries. They are the descendants of early Chinese immigrants who settled in the bustling ports of the Malay Archipelago—primarily Malacca, Penang, and Singapore—between the 15th and 17th centuries. Over time, they assimilated with the local Malay culture, creating a vibrant fusion that is distinct and captivating.</p>
        <h4 class="text-xl font-bold mt-6 mb-2">A Blend in Every Aspect of Life</h4>
        <p class="mb-4">This unique cultural synthesis is evident in almost every facet of Peranakan life. Their language, known as Baba Malay (or Peranakan Patois), is a creole language that combines Hokkien Chinese with Malay. While it is seldom spoken today, it remains a testament to their blended ancestry.</p>
        <p class="mb-4">Perhaps the most famous expression of their culture is the Nyonya cuisine. It masterfully combines Chinese cooking techniques and ingredients with the spices and flavors of Malay and Indonesian cooking. Dishes like 'laksa' (a spicy noodle soup) and 'ayam pongteh' (a chicken and potato stew) are beloved throughout Malaysia for their complex and delicious flavors.</p>
        <h4 class="text-xl font-bold mt-6 mb-2">Architecture and Artistry</h4>
        <p class="mb-4">The architectural style of the Peranakan is equally distinctive. The colorful and ornate shophouses found in the historic districts of George Town and Malacca are iconic examples. These buildings often feature Chinese-style carved-wood panels, English-style windows, and Dutch-style tiles, all harmoniously integrated.</p>
        <p>The artistry of the Nyonyas is most beautifully expressed in their traditional attire, the 'Nyonya kebaya'. This exquisite, embroidered blouse, often paired with a batik sarong, is a symbol of their refined tastes. Beaded slippers, known as 'kasut manek', are another example of their intricate craftsmanship. The Peranakan culture, with its rich history and vibrant traditions, is a living example of Malaysia's multicultural identity.</p>
      `
    },
    {
      id: 3,
      title: "Traditional Batik Art",
      category: "Arts",
      excerpt: "Journey through the intricate world of Malaysian batik, from ancient techniques to contemporary artistic expressions.",
      image: "https://kalawear.com/cdn/shop/articles/Malaysian_batik_Costume.webp?v=1727249871",
      readTime: "6 min read",
      content: `
        <h3 class="text-2xl font-bold mt-6 mb-4">The Art of Malaysian Batik</h3>
        <p class="mb-4">Batik is an ancient and revered art form that involves using wax to create intricate patterns on fabric, which is then dyed. While batik is found in many parts of the world, Malaysian batik is particularly renowned for its vibrant colors, detailed craftsmanship, and distinctive motifs, which often draw inspiration from the country's rich flora and fauna.</p>
        <h4 class="text-xl font-bold mt-6 mb-2">The Meticulous Process</h4>
        <p class="mb-4">There are two primary techniques for creating Malaysian batik: 'batik tulis' (hand-drawn batik) and 'batik cap' (block-printed batik). 'Batik tulis' is the more traditional and labor-intensive method. An artist uses a small, pen-like copper tool called a 'canting' to apply hot liquid wax directly onto the fabric. The wax acts as a resist, preventing the dye from penetrating the covered areas. The fabric is then dyed, and the process of waxing and dyeing can be repeated multiple times to create complex, multi-layered designs with a rich palette of colors.</p>
        <p class="mb-4">'Batik cap', on the other hand, uses a copper block or 'cap' that has been carved with a design. The block is dipped in hot wax and then stamped onto the fabric. This method is faster and allows for the creation of more uniform patterns, making it a popular choice for commercial production.</p>
        <h4 class="text-xl font-bold mt-6 mb-2">From Tradition to Modern Art</h4>
        <p>Originally used for sarongs and traditional garments, batik has evolved significantly over the years. Today, it is not only a cherished traditional craft but also a dynamic medium for contemporary artists and fashion designers. Malaysian batik can now be seen in everything from high fashion to home decor, showcasing its versatility and enduring appeal. The art of batik is a proud part of Malaysia's cultural heritage, a beautiful testament to the country's artistic soul.</p>
      `
    }
  ];

  const NavBar = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-xl transition-colors ${
              isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}>Warisan Malaysia</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: 'home', name: 'Home' },
              { id: 'heritage', name: 'Heritage Sites' },
              { id: 'stories', name: 'Stories' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`font-medium transition-colors hover:text-yellow-400 ${
                  isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                } ${activeSection === item.id ? 'text-yellow-400' : ''}`}
              >
                {item.name}
              </button>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => setActiveSection('favorites')}
                className={`font-medium transition-colors hover:text-yellow-400 ${
                  isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                } ${activeSection === 'favorites' ? 'text-yellow-400' : ''}`}
              >
                My Favorites
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {dark ? "☀️" : "🌙"}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">Welcome, {user?.username}</span>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setUser(null);
                    localStorage.removeItem('user');
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-red-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-gradient-to-r from-yellow-400 to-red-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowAuth(true)}
                  className="border-2 border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1920")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Malaysia's
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent block">
              Digital Heritage
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Preserving our rich cultural tapestry for future generations while creating immersive experiences 
            for Visit Malaysia 2026 and beyond.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={() => setActiveSection('heritage')}
            className="bg-gradient-to-r from-yellow-400 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Explore Heritage Sites
          </button>
          <button 
            onClick={() => setActiveSection('stories')}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Discover Stories
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '13', label: 'Featured Sites' },
            { number: '6', label: 'Site Categories' },
            { number: '3', label: 'Cultural Stories' },
            { number: '2026', label: 'Visit Malaysia' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-red-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </section>
  );

  const StoriesSection = () => (
    <section id="stories" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">Cultural Stories</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Immerse yourself in the rich tapestry of Malaysian folklore, traditions, and cultural narratives that have shaped our nation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAllStories ? stories : stories.slice(0, 3)).map((story) => (
            <div key={story.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <img src={story.image} alt={story.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{story.category}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {story.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{story.excerpt}</p>
                <button 
                  onClick={() => setSelectedStory(story)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-red-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Read Story
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowAllStories(!showAllStories)}
            className="bg-transparent border-2 border-yellow-500 text-yellow-500 font-semibold py-3 px-8 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
          >
            {showAllStories ? 'Show Less Stories' : 'Explore All Stories'}
          </button>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <img className="h-10 w-auto" src="https://img.icons8.com/fluency/48/lotus.png" alt="Warisan Malaysia logo" />
              <span className="ml-3 text-2xl font-bold">Warisan Malaysia</span>
            </div>
            <p className="text-gray-400 text-base">
              Preserving our past, inspiring our future. A journey through Malaysia's cultural preservation and tourism innovation.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="https://www.instagram.com/0x7azem" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="tel:+601139127016" className="text-gray-400 hover:text-white">
              <span className="sr-only">Phone</span>
              <Phone className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-4 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024 Warisan Malaysia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  const handleAddComment = (siteId: number, text: string) => {
    if (!user) return;

    const newComment: Comment = {
      siteId,
      username: user.username,
      text,
      timestamp: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {showAuth && (
        <Auth
          onAuthSuccess={(authedUser) => {
            setIsAuthenticated(true);
            setUser(authedUser);
            localStorage.setItem('user', JSON.stringify(authedUser));
            setShowAuth(false);
          }}
          onClose={() => setShowAuth(false)}
        />
      )}
      <NavBar />
      
      {activeSection === 'home' && (
        <>
          <HeroSection />
          <HeritageSitesSection
            sites={culturalSites}
            activeSection={activeSection}
            isAuthenticated={isAuthenticated}
            user={user}
            comments={comments}
            handleToggleFavorite={handleToggleFavorite}
            handleAddComment={handleAddComment}
            setSelectedSite={setSelectedSite}
          />
          <StoriesSection />
        </>
      )}
      
      {activeSection === 'heritage' && (
        <HeritageSitesSection
          sites={culturalSites}
          activeSection={activeSection}
          isAuthenticated={isAuthenticated}
          user={user}
          comments={comments}
          handleToggleFavorite={handleToggleFavorite}
          handleAddComment={handleAddComment}
          setSelectedSite={setSelectedSite}
        />
      )}
      {activeSection === 'stories' && <StoriesSection />}
      {activeSection === 'favorites' && isAuthenticated && (
        <HeritageSitesSection
          sites={culturalSites.filter(site => user?.favorites?.includes(site.id))}
          activeSection={activeSection}
          isAuthenticated={isAuthenticated}
          user={user}
          comments={comments}
          handleToggleFavorite={handleToggleFavorite}
          handleAddComment={handleAddComment}
          setSelectedSite={setSelectedSite}
        />
      )}
      
      <Footer />
      {selectedSite && (
        <SiteDetailModal 
          site={selectedSite}
          onClose={() => setSelectedSite(null)} 
        />
      )}
      {selectedStory && (
        <StoryDetailModal 
          story={selectedStory}
          onClose={() => setSelectedStory(null)} 
        />
      )}
    </div>
  );
}

export default App;