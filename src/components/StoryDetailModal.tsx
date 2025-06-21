import React from 'react';
import { X, Clock } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  content: string; // Full content of the story
}

interface StoryDetailModalProps {
  story: Story | null;
  onClose: () => void;
}

const StoryDetailModal: React.FC<StoryDetailModalProps> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative">
          <img src={story.image} alt={story.title} className="w-full h-64 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full hover:scale-110 transition-transform"
          >
            <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-3xl font-bold text-white">{story.title}</h2>
            <div className="flex items-center mt-2 text-gray-200">
              <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-sm font-semibold mr-3">{story.category}</span>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{story.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 overflow-y-auto">
          <div 
            className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </div>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
           <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-yellow-400 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailModal; 