import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

const InsightDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch individual blog by slug
    // Mock data for now
    setBlog({
      title: 'The Future of AI in Web Development',
      content: `
        <p>Artificial Intelligence is no longer a buzzword; it's a fundamental shift in how we approach web development...</p>
        <h2>The Rise of AI-Driven Design</h2>
        <p>From generative UI to automated accessibility checks, AI is making design more inclusive and dynamic...</p>
      `,
      author: 'Admin',
      date: 'May 12, 2026',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
    });
  }, [slug]);

  if (!blog) return null;

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto pb-24">
      <Link to="/insights" className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 mb-12 transition-colors">
        <ArrowLeft size={18} /> Back to Insights
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-6 text-slate-400 mb-8">
          <span className="flex items-center gap-2"><Calendar size={16} /> {blog.date}</span>
          <span className="flex items-center gap-2"><User size={16} /> By {blog.author}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">{blog.title}</h1>
        
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-[500px] object-cover rounded-3xl mb-16 shadow-2xl shadow-indigo-500/10"
        />

        <div 
          className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </motion.div>
    </div>
  );
};

export default InsightDetail;
