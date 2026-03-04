import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { projects } = useData();
    const navigate = useNavigate();
    
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
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                                    {project.title}
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-300">
                                    {project.longDescription || project.description}
                                </p>
                            </div>
                            
                            {project.link && project.link.trim() !== '#' && (
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
                                >
                                    <ExternalLink size={18} className="mr-2" />
                                    Live Preview
                                </a>
                            )}
                        </div>

                        <div className="mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
                             <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Technologies Used</h2>
                             <div className="flex flex-wrap gap-3">
                                 {project.tools.map((tool, idx) => (
                                     <span key={idx} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium shadow-sm border border-slate-200 dark:border-slate-700">
                                         {tool}
                                     </span>
                                 ))}
                             </div>
                        </div>

                        {project.gallery && project.gallery.length > 0 && (
                            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white font-heading text-center">Project Gallery</h2>
                                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {project.gallery.map((imgUrl, idx) => (
                                        <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group break-inside-avoid">
                                            <img 
                                                src={imgUrl} 
                                                alt={`${project.title} screenshot ${idx + 1}`} 
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                                            />
                                            {/* Overlay for depth */}
                                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 pointer-events-none"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
