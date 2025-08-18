import { Fragment, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import questionsJson from "~/data/questions.json";
import { cn } from "~/utils/cn";

type TUser = {
  name: string;
};

type TQuestionOption = {
  id: number;
  title: string;
};

type TQuestion = {
  id: number;
  title: string;
  rightAnswer: number;
  options: TQuestionOption[];
};

type TQuiz = {
  id: number;
  date: Date;
  status: "pending" | "running" | "done";
  examinee: TUser;
  optionIds: number[];
  //
  questionIds: number[];
  questionIndex: number;
};

const getRandomQuestionIds = (count = 5) => {
  return questionsJson
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((q) => q.id);
};

export default function Quiz() {
  //

  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizzes = [], setQuizzes] = useLocalStorage<TQuiz[]>("quizzes", []);

  const quiz = useMemo(() => {
    const runningQuiz = quizzes.find((quiz) => {
      return quiz.status === "running" || quiz.status === "pending";
    });
    if (runningQuiz) return runningQuiz;
    const pendingQuiz: TQuiz = {
      id: Date.now(),
      date: new Date(),
      examinee: { name: "" },
      optionIds: [],
      status: "pending",
      questionIndex: 0,
      questionIds: getRandomQuestionIds(),
    };
    return pendingQuiz;
  }, [quizzes]);

  const questions = questionsJson.filter((question) => {
    return quiz.questionIds.includes(question.id);
  });

  const question = questions[quiz.questionIndex];

  const onStartQuiz = () => {
    const newQuiz: TQuiz = {
      id: Date.now(),
      date: new Date(),
      examinee: {
        name: name,
      },
      optionIds: [],
      status: "running",
      questionIndex: 0,
      questionIds: getRandomQuestionIds(),
    };
    setQuizzes([newQuiz, ...quizzes]);
  };

  const updateQuiz = (updatedQuiz: Partial<TQuiz>) => {
    setQuizzes((quizzes = []) => {
      return quizzes.map((item) => {
        if (item.id === quiz.id) {
          return {
            ...item,
            ...updatedQuiz,
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col h-[calc(100vh-5rem)] px-4">
      <div className="underline text-2xl font-bold text-center">Quiz Test</div>
      <div className="mt-8 flex-1 flex flex-col">
        {quiz.status === "pending" && (
          <div className="flex flex-col space-y-12">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
              className="w-full text-2xl p-4 text-center border-0 border-b-2 border-b-blue-500 outline-0"
            />
            <Button onClick={onStartQuiz}>Start Quiz</Button>
          </div>
        )}

        {/* Questions */}
        {quiz.status === "running" && (
          <Fragment>
            <div className="flex-1">
              <div className="text-3xl leading-normal">{question.title}</div>
              <ul className="grid grid-cols-2 gap-4 mt-8">
                {question.options.map((option, index) => {
                  return (
                    <li
                      key={index}
                      role="button"
                      className={cn(
                        "p-8 border  rounded-md flex gap-4 items-center cursor-pointer text-2xl",
                        answers[question.id] === option.id
                          ? "border-blue-400 bg-blue-500/5"
                          : "border-neutral-800 hover:border-neutral-500"
                      )}
                      onClick={() => {
                        setAnswers({
                          ...answers,
                          [question.id]: option.id,
                        });
                      }}
                    >
                      <div
                        className={cn(
                          "h-8 w-8 border-3 rounded-full flex items-center justify-center flex-none",
                          answers[question.id] === option.id
                            ? "border-blue-400"
                            : "border-blue-400/30"
                        )}
                      >
                        {answers[question.id] === option.id && (
                          <div className="bg-blue-400 h-4 w-4 rounded-full"></div>
                        )}
                      </div>
                      {option.title}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="h-4 bg-blue-500/5 rounded-full mt-4 relative">
              <div className="absolute right-0 bottom-full text-2xl font-bold">
                {questions.length}
              </div>
              <div
                className="h-4 w-1/4 bg-blue-500 rounded-full relative transition-all duration-500"
                style={{
                  width: `${((quiz.questionIndex + 1) / questions.length) * 100}%`,
                }}
              >
                <div className="absolute right-0 bottom-full text-2xl font-bold">
                  {quiz.questionIndex + 1}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <div>
                {quiz.questionIndex !== 0 && (
                  <Button
                    onClick={() => {
                      updateQuiz({
                        questionIndex: quiz.questionIndex - 1,
                      });
                    }}
                  >
                    Back
                  </Button>
                )}
              </div>
              {quiz.questionIndex < questions.length && (
                <Button
                  onClick={() => {
                    if (quiz.questionIndex === questions.length - 1) {
                      setResult(
                        Object.entries(answers).reduce<any>(
                          (acc, [questionId, optionId]) => {
                            const q = questions.find((v) => {
                              return v.id === +questionId;
                            });
                            return [
                              ...acc,
                              {
                                ...q,
                                optionId,
                                isRight: q?.rightAnswer == optionId,
                              },
                            ];
                          },
                          []
                        )
                      );
                      return;
                    }
                    updateQuiz({
                      questionIndex: quiz.questionIndex + 1,
                    });
                  }}
                >
                  {quiz.questionIndex === questions.length - 1
                    ? "Submit"
                    : "Next"}
                </Button>
              )}
            </div>
          </Fragment>
        )}

        {/* Result */}
        {quiz.status === "done" && (
          <div>
            {result.reduce((a, b: any) => a + (b.isRight ? 1 : 0), 0)}
            <pre>
              <code>{JSON.stringify(result, null, 1)}</code>
            </pre>
            <Button onClick={onStartQuiz}>Start Again</Button>
          </div>
        )}
      </div>
    </div>
  );
}
