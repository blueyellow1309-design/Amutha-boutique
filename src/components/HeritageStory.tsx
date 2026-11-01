import React from 'react';
import { WEAVE_HERITAGE_STORIES, BOUTIQUE_INFO } from '../data/sarees';

export const HeritageStory: React.FC = () => {
  return (
    <section id="heritage" className="py-16 bg-[#FBF7F0] border-t border-[#C79A1E]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest text-[#C79A1E] uppercase">
            Generations of Craftsmanship
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141210] mt-2">
            The Living Art of <span className="italic font-medium text-[#C79A1E]">Chettinad Weaving</span>
          </h2>
          <p className="text-[#141210]/70 text-sm sm:text-base mt-3">
            At {BOUTIQUE_INFO.name}, every saree preserves the legendary handloom heritage of Karaikudi taluk. We work directly with artisan families on traditional wooden pit looms.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {WEAVE_HERITAGE_STORIES.map((story, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-[#C79A1E]/30 shadow-sm flex flex-col group hover:shadow-md transition-shadow"
            >
              <div className="h-52 overflow-hidden bg-[#FAF5E9]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#996515] font-semibold">
                    {story.subtitle}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#141210] mt-1">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#141210]/70 mt-3 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C79A1E]/15 flex items-center justify-between text-xs text-[#141210]/60">
                  <span>Kanadukathan, Sivaganga</span>
                  <span className="text-[#996515] font-medium">100% Pit Loom</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Weaver Quote / Heritage Proof Banner */}
        <div className="mt-14 bg-[#141210] text-[#FAF5E9] rounded-2xl p-8 sm:p-10 border border-[#C79A1E]/40 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <p className="text-[#E3B93C] uppercase tracking-widest text-xs font-semibold">Authenticity Guarantee</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-white">
              No machine replicas. Just the genuine feel of pure combed cotton.
            </h3>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Machine made polyesters mimic patterns, but nothing rivals the breathable coolness of handspun cotton during warm South Indian celebrations. Every saree you purchase directly sustains handloom weaving families in Kanadukathan and Karaikudi.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="font-serif text-2xl font-bold text-[#E3B93C] tabular-nums">100%</span>
              <p className="text-[11px] text-white/70 mt-0.5">Pure Handloom Cotton</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="font-serif text-2xl font-bold text-[#E3B93C] tabular-nums">630103</span>
              <p className="text-[11px] text-white/70 mt-0.5">Kanadukathan Pincode</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
