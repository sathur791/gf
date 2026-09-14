import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type QuestionItem } from '../data/birthdayContent';
import { Heart, Sparkles } from 'lucide-react';

export const MemoryQuestion: React.FC = () => {
  const { questions } = birthdayContent;
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

  const handleSelect = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  return (
    <section className="w-full py-16 px-6 flex flex-col items-center relative">
      <div className="w-full max-w-lg space-y-12">
        {questions.map((q: QuestionItem, index: number) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = Boolean(userAnswer);
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="mint-blue-card p-6 sm:p-8 border border-[rgba(20,125,138,0.2)] text-center flex flex-col items-center"
            >
              {/* Question Eyebrow */}
              <div className="flex items-center gap-1.5 text-[10px] font-sans tracking-[0.25em] uppercase text-[#2C636D] mb-2 font-semibold">
                <Heart className="w-3.5 h-3.5 text-[#147D8A] opacity-80" />
                <span>{q.label}</span>
              </div>

              {/* Question Title */}
              <h3 className="text-xl sm:text-2xl font-serif text-[#083B4A] font-light mb-6">
                "{q.question}"
              </h3>

              {/* Options */}
              <div className="w-full flex flex-col gap-3 mb-4">
                {q.options.map((option, optIdx) => {
                  const isSelected = userAnswer === option;

                  return (
                    <motion.button
                      key={optIdx}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleSelect(q.id, option)}
                      className={`min-h-[46px] w-full px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-between border ${
                        isSelected
                          ? 'bg-[#CFEBDD]/70 border-[#147D8A] text-[#083B4A] font-medium shadow-sm ring-1 ring-[#75C9D0]/50'
                          : 'bg-white/80 border-[rgba(20,125,138,0.16)] text-[#083B4A]/85 hover:bg-white hover:border-[#147D8A]/40'
                      }`}
                    >
                      <span>{option}</span>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-transform ${
                          isSelected
                            ? 'border-[#083B4A] bg-[#083B4A] text-white scale-110'
                            : 'border-[rgba(20,125,138,0.3)]'
                        }`}
                      >
                        {isSelected && '✓'}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Gentle Feedback & Shimmer Reveal */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full mt-3 pt-3 border-t border-[rgba(20,125,138,0.12)] text-left"
                  >
                    {isCorrect ? (
                      <div className="p-4 rounded-xl bg-[#CFEBDD]/60 border border-[rgba(20,125,138,0.16)]">
                        <div className="flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase text-[#083B4A] font-semibold mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#147D8A]" />
                          <span>You remembered.</span>
                        </div>
                        <p className="font-handwriting text-2xl text-[#083B4A] leading-relaxed">
                          {q.feedbackCorrect}
                        </p>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-[#BFE8EA]/40 border border-[rgba(20,125,138,0.18)]">
                        <p className="font-handwriting text-xl text-[#083B4A]">
                          {q.feedbackWrong}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
