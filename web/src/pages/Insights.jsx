import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import api from '../lib/api';

const Insights = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      try {
        // const response = await api.get('/insights');
        // setBlogs(response.data);
        
        // Mock data for demonstration
        setBlogs([
          {
            id: '1',
            title: 'The Future of AI in Web Development',
            slug: 'future-of-ai',
            excerpt: 'How artificial intelligence is reshaping the way we build and interact with the web.',
            author: 'Admin',
            date: 'May 12, 2026',
            coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
          },
          {
            id: '2',
            title: 'Mastering Serverless Architecture',
            slug: 'mastering-serverless',
            excerpt: 'Deep dive into Vercel functions and Prisma for scalable applications.',
            author: 'Hajakif',
            date: 'May 10, 2026',
            coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
          }
        ]);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto pb-24">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="gradient-text">Insights</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Deep dives into technology, design, and the future of the digital landscape.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-3xl glass overflow-hidden flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-400 mb-8 line-clamp-2">
                  {blog.excerpt}
                </p>
                <Link 
                  to={`/insights/${blog.slug}`}
                  className="mt-auto flex items-center gap-2 text-indigo-400 font-semibold group/link"
                >
                  Read More <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Insights;
