import { motion } from 'framer-motion';

const TechStack = () => {
  const stack = [
    { name: 'React', category: 'Frontend' },
    { name: 'Vite', category: 'Build' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Prisma', category: 'Database' },
    { name: 'Vercel', category: 'Cloud' },
    { name: 'Tailwind', category: 'Styles' },
  ];

  return (
    <section className="py-24 bg-brand-ink text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-terra mb-6">The Lab Stack</h3>
            <p className="text-3xl font-bold tracking-tighter leading-tight">
              Architected with the most resilient <span className="font-serif italic font-normal text-brand-terra">modern frameworks.</span>
            </p>
          </div>

          <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-8">
            {stack.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl group hover:border-brand-terra transition-all"
              >
                <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-2">{item.category}</p>
                <p className="text-lg font-bold group-hover:text-brand-terra transition-colors">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
