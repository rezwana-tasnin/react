import { Fragment, useState } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import questionsJson from "~/data/questions.json";
import { cn } from "~/utils/cn";

const questions = questionsJson.sort(() => Math.random() - 0.5).slice(0, 10);

export default function Quiz() {
  //
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("new");
  const [name, setName] = useState("");

  const [score, setScore] = useState(0);

  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = questions[index];

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col h-[calc(100vh-5rem)] px-4">
      <div className="underline text-2xl font-bold text-center">Quiz Test</div>
      <div className="mt-8 flex-1 flex flex-col">
        {status === "new" && (
          <div className="flex flex-col space-y-12">
            <input
              placeholder="Enter your name"
              className="w-full text-2xl p-4 text-center border-0 border-b-2 border-b-blue-500 outline-0"
            />
            <Button
              onClick={() => {
                setStatus("started");
              }}
            >
              Start Quiz
            </Button>
          </div>
        )}

        {/* Questions */}
        {status === "started" && (
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
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              >
                <div className="absolute right-0 bottom-full text-2xl font-bold">
                  {index + 1}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <div>
                {index !== 0 && (
                  <Button
                    onClick={() => {
                      setIndex(index - 1);
                    }}
                  >
                    Back
                  </Button>
                )}
              </div>
              {index < questions.length && (
                <Button
                  onClick={() => {
                    if (index === questions.length - 1) {
                      setStatus("done");
                      setScore(
                        Object.entries(answers).reduce(
                          (score, [questionId, optionId]) => {
                            const q = questions.find((v) => {
                              return v.id === +questionId;
                            });
                            return q?.rightAnswer == optionId
                              ? score + 1
                              : score;
                          },
                          0
                        )
                      );
                      return;
                    }
                    setIndex(index + 1);
                  }}
                >
                  {index === questions.length - 1 ? "Submit" : "Next"}
                </Button>
              )}
            </div>
          </Fragment>
        )}

        {/* Result */}
        {status === "done" && (
          <div>
            {score}
            <pre>
              <code>{JSON.stringify(answers, null, 1)}</code>
            </pre>
            <Button
              onClick={() => {
                setStatus("new");
                setIndex(0);
              }}
            >
              Start Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
