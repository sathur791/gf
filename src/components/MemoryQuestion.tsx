import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type QuestionItem } from '../data/birthdayContent';
import { Sparkles, HelpCircle } from 'lucide-react';

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
    <section className="w-full py-20 sm:py-24 px-6 flex flex-col items-center relative select-none">
      {/* Soft atmospheric starlight backdrop giving it a distinct whispered feel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[36rem] h-[36rem] rounded-full bg-radial from-[#8ED4D6]/14 via-[#DDF3E9]/8 to-transparent blur-3xl" />
      </div>

      <div className="w-full max-w-lg space-y-14 relative z-10">
        {questions.map((q: QuestionItem) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = Boolean(userAnswer);
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-9 rounded-[2rem] bg-gradient-to-b from-[#FFFDF8]/95 to-[#FAF6ED]/95 border border-[#8ED4D6]/35 shadow-[0_18px_45px_rgba(7,63,77,0.14)] text-center flex flex-col items-center relative overflow-hidden"
            >
              {/* Question Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-1.5 text-[11px] font-sans tracking-[0.22em] uppercase text-[#147C8A] mb-3 font-semibold"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#0B6075]" />
                <span>{q.label}</span>
              </motion.div>

              {/* Beat 1: Question Title Appears and Holds */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-2xl sm:text-3xl font-serif text-[#0B6075] font-light mb-8 leading-snug"
              >
                "{q.question}"
              </motion.h3>

              {/* Beat 2: Options Cascade in Staggered After Beat 1 */}
              <div className="w-full flex flex-col gap-3 mb-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = userAnswer === option;

                  return (
                    <motion.button
                      key={optIdx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.45 + optIdx * 0.12 }}
                      whileHover={{ scale: 1.015, y: -1 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleSelect(q.id, option)}
                      className={`min-h-[50px] w-full px-5 py-3.5 rounded-xl text-left text-sm font-sans transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#DDF3E9] border-[#0B6075] text-[#073F4D] font-semibold shadow-md ring-2 ring-[#8ED4D6]/60'
                          : 'bg-white border-[#0B6075]/18 text-[#073F4D] hover:border-[#0B6075]/40 hover:bg-[#FAF6ED] shadow-xs'
                      }`}
                    >
                      <span className="leading-snug pr-3">{option}</span>
                      <span
                        className={`w-6 h-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-[#0B6075] bg-[#0B6075] text-white scale-110 shadow-xs'
                            : 'border-[#0B6075]/30 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Real Payoff: Transformed Feedback Card */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full mt-4 pt-4 border-t border-[#0B6075]/12 text-left"
                  >
                    {isCorrect ? (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#DDF3E9]/90 border border-[#147C8A]/30 shadow-xs">
                        <div className="flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase text-[#0B6075] font-bold mb-1.5">
                          <Sparkles className="w-4 h-4 text-[#0B6075]" />
                          <span>You remembered.</span>
                        </div>
                        <p className="font-handwriting text-2xl sm:text-3xl text-[#0B6075] leading-relaxed">
                          {q.feedbackCorrect}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-[#FAF6ED] border border-[#0B6075]/20 shadow-xs">
                        <p className="font-handwriting text-2xl text-[#0B6075]">
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

export default MemoryQuestion;
