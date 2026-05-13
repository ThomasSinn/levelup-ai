import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IC_QUESTIONS, MANAGER_QUESTIONS, calculateScore, getTierFromScore } from "@/lib/quizData";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

export default function Quiz() {
  const urlParams = new URLSearchParams(window.location.search);
  const userType = urlParams.get("type") || "ic";
  const navigate = useNavigate();

  const questions = userType === "ic" ? IC_QUESTIONS : MANAGER_QUESTIONS;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const hasAnswer = answers[q?.id] !== undefined && (!q?.multi || answers[q?.id]?.length > 0);

  const handleSingle = (value) => {
    setAnswers(prev => ({ ...prev, [q.id]: value }));
  };

  const handleMulti = (value) => {
    setAnswers(prev => {
      const current = prev[q.id] || [];
      return {
        ...prev,
        [q.id]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      };
    });
  };

  const goNext = () => {
    if (isLast) {
      handleSubmit();
    } else {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  };

  const goBack = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const score = calculateScore(answers, userType);
    const tier = getTierFromScore(score);

    const assessment = await base44.entities.UserAssessment.create({
      user_type: userType,
      answers,
      tier,
      score,
      completed: false
    });

    navigate(`/results/${assessment.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border glass sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={goBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <QuizProgress current={current} total={questions.length} userType={userType} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Question number */}
              <div className="text-muted-foreground text-sm font-medium mb-3">
                Question {current + 1} of {questions.length}
              </div>

              {/* Emoji + Question */}
              <div className="flex items-start gap-4 mb-8">
                <span className="text-4xl">{q.emoji}</span>
                <h2 className="font-space text-2xl md:text-3xl font-bold text-foreground leading-tight pt-1">
                  {q.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <QuizOption
                    key={i}
                    label={opt.label}
                    selected={
                      q.multi
                        ? (answers[q.id] || []).includes(opt.value)
                        : answers[q.id] === opt.value
                    }
                    onSelect={() => q.multi ? handleMulti(opt.value) : handleSingle(opt.value)}
                    multi={q.multi}
                    index={i}
                  />
                ))}
              </div>

              {q.multi && (
                <p className="text-muted-foreground text-sm mt-4">Select all that apply</p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <motion.button
              onClick={goNext}
              disabled={!hasAnswer || submitting}
              whileHover={hasAnswer ? { scale: 1.03 } : {}}
              whileTap={hasAnswer ? { scale: 0.97 } : {}}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-space font-semibold transition-all ${
                hasAnswer
                  ? "bg-primary text-primary-foreground glow-purple cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : isLast ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  See My Results
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}