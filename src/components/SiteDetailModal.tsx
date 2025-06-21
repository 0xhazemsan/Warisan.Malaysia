import React from 'react';
import { Clock, ExternalLink, Tag, X, MapPin } from 'lucide-react';

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
}

interface SiteDetailModalProps {
  site: CulturalSite;
  onClose: () => void;
}

const SiteDetailModal: React.FC<SiteDetailModalProps> = ({ site, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl relative overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <X size={24} />
        </button>
        <div className="max-h-[90vh] overflow-y-auto">
          <img src={site.image} alt={site.name} className="w-full h-64 object-cover" />
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{site.name}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{site.location}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <Clock className="mx-auto mb-2 text-yellow-500" />
                <h4 className="font-bold text-sm text-gray-800 dark:text-white">Opening Hours</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{site.openingHours || 'N/A'}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <Tag className="mx-auto mb-2 text-yellow-500" />
                <h4 className="font-bold text-sm text-gray-800 dark:text-white">Price</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{site.price || 'Varies'}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <ExternalLink className="mx-auto mb-2 text-yellow-500" />
                <h4 className="font-bold text-sm text-gray-800 dark:text-white">Website</h4>
                <a 
                  href={site.website || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-500 hover:underline"
                >
                  Visit Official Site
                </a>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{site.description}</p>

            <button
              onClick={() => window.open(site.mapUrl, '_blank')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              disabled={!site.mapUrl}
            >
              <MapPin size={20} />
              View on Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetailModal; 