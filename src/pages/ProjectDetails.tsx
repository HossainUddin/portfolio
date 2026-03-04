import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ExternalLink, X, ZoomIn } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { projects } = useData();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const project = projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Project Not Found</h2>
                        <button onClick={() => navigate('/')} className="text-primary hover:underline">
                            Return to Home
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Navbar />
            <div className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center text-slate-600 dark:text-slate-400 hover:text-primary mb-8 transition-colors font-medium"
                >
                    <ArrowLeft className="mr-2" size={20} />
                    Back to Portfolio
                </button>
                
                <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-700">
                    {/* Hero Image Section */}
                    <div className="w-full relative group bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-8 md:p-16 overflow-hidden">
                        {/* Blurred background image for premium effect */}
                        <div 
                           className="absolute inset-0 opacity-30 dark:opacity-50 blur-3xl scale-125"
                           style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        />
                        
                        {/* Main foreground image */}
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="relative z-10 max-h-[60vh] w-auto object-contain drop-shadow-2xl rounded-xl transition-transform duration-700 group-hover:scale-105" 
                        />
                        
                        <div className="absolute top-6 left-6 z-20">
                             <span className="bg-primary/90 backdrop-blur-md text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                 {project.category}
                             </span>
                        </div>
                    </div>
                    
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 mb-12">
                            {/* Left Column: Title & Description */}
                            <div className="lg:w-2/3">
                                <h1 className="text-4xl md:text-6xl font-bold font-heading text-slate-900 dark:text-white mb-6 leading-tight">
                                    {project.title}
                                </h1>
                                <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-300">
                                    <p className="whitespace-pre-wrap leading-relaxed">
                                        {project.longDescription || project.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Right Column: Meta Info & Links */}
                            <div className="lg:w-1/3 flex flex-col gap-8">
                                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 w-full shadow-sm">
                                     <h3 className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-4">Technologies Used</h3>
                                     <div className="flex flex-wrap gap-2">
                                         {project.tools.map((tool, idx) => (
                                             <span key={idx} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 text-sm rounded-lg font-medium border border-slate-200 dark:border-slate-700 shadow-sm transition-colors hover:border-primary/50">
                                                 {tool}
                                             </span>
                                         ))}
                                     </div>
                                </div>

                                {project.link && project.link.trim() !== '#' && (
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center justify-center bg-gradient-to-r from-primary to-purple-600 text-white font-bold px-8 py-5 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 w-full"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                        <span className="relative flex items-center z-10 text-lg">
                                            <ExternalLink size={20} className="mr-3" />
                                            Visit Live Project
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Redesigned Gallery Section */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="mt-16 pt-16 border-t border-slate-100 dark:border-slate-800">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading inline-block relative">
                                        Project Gallery
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 -z-10 translate-y-2 rounded-full"></div>
                                    </h2>
                                    <p className="text-slate-500 mt-4">Click any image to view in full screen</p>
                                </div>
                                
                                {/* Masonry Layout for Gallery */}
                                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {project.gallery.map((imgUrl, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setSelectedImage(imgUrl)}
                                            className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group break-inside-avoid cursor-zoom-in transition-all duration-300"
                                        >
                                            <img 
                                                src={imgUrl} 
                                                alt={`${project.title} screenshot ${idx + 1}`} 
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                                            />
                                            {/* Interactive Overlay */}
                                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100">
                                                    <ZoomIn className="text-white w-6 h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <Footer />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <X size={24} />
                        </button>
                        
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={selectedImage}
                            alt="Fullscreen view"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
