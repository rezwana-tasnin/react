import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import friendsjson from "~/data/friends.json";

function useQueryNameKey() {
  const [key, setKey] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = (params.get("name") || "").toLowerCase().trim();
    setKey(n);
  }, []);
  return key;
}

// Candle Cake with mic-blow detection
function CandleCake({ onBlown }) {
  const [listening, setListening] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [showHappyText, setShowHappyText] = useState(false);

  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  // CandleCake-এ onBlown function modify করা যাবে:
  const handleBlown = () => {
    setCandlesOut(true);
    onBlown(); // confetti
    // playSound();
    setShowHappyText(true);
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current = stream;
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyserRef.current = analyser;
      source.connect(analyser);
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      setListening(true);
      loop();
    } catch (e) {
      console.error("Mic permission denied or error:", e);
      alert("Microphone permission lagbe to blow out the candles ✨");
    }
  };

  const stopMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) audioRef.current.getTracks().forEach((t) => t.stop());
    if (audioCtxRef.current) audioCtxRef.current.close();
    analyserRef.current = null;
    dataArrayRef.current = null;
    setListening(false);
  };

  useEffect(() => () => stopMic(), []);

  const loop = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
    let sumSquares = 0;
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const v = (dataArrayRef.current[i] - 128) / 128;
      sumSquares += v * v;
    }
    const rms = Math.sqrt(sumSquares / dataArrayRef.current.length);

    if (rms > 0.1 && !candlesOut) {
      handleBlown();
      stopMic();
    }
    rafRef.current = requestAnimationFrame(loop);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Cake */}
      <div className="relative select-none">
        <div className="text-9xl md:text-10xl">🎂</div>
        {/* Candles */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative w-3 h-8 bg-yellow-200 rounded-sm border border-yellow-300"
            >
              {!candlesOut && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: "radial-gradient(circle, #ffd166, #ff6b6b)",
                  }}
                  animate={{ y: [0, -2, 0], scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!candlesOut ? (
          <button
            onClick={startMic}
            disabled={listening}
            className="px-4 py-2 rounded-xl bg-pink-500 text-white shadow hover:opacity-90 disabled:opacity-60"
          >
            {listening ? "Listening… blow now!" : "Enable Mic & Blow to off"}
          </button>
        ) : (
          <div className="text-green-700 font-semibold">Candles off! 🥳</div>
        )}
      </div>
    </div>
  );
}

export default function BirthdayCard() {
  const nameKey = useQueryNameKey();
  const friend = friendsjson.find((v) => v.name.toLowerCase() === nameKey);

  // Audio
  const clapAudio = useRef(new Audio("/sounds/clap.mp3"));
  const happyAudio = useRef(new Audio("/sounds/happybirthday.mp3"));

  const playSound = () => {
    clapAudio.current.play();
    happyAudio.current.play();
  };

  const [page, setPage] = useState(1);

  const isFirstPage = page === 1;
  const isSecondPage = page === 2;

  const togglePage = () => {
    setPage((page) => (page === 1 ? 2 : 1));
  };

  const [burst, setBurst] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);

  const confettiDims = useMemo(
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    []
  );

  if (!friend) {
    return (
      <div className="flex h-screen items-center justify-center bg-pink-200">
        <h1 className="text-2xl font-bold text-white px-6 text-center">
          🎂 No friend found!
        </h1>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex flex-col items-center justify-center text-center p-6">
      <Confetti
        width={confettiDims.width}
        height={confettiDims.height}
        numberOfPieces={burst ? 800 : 100}
        recycle={!burst}
      />

      {/* Floating hearts */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-red-500 text-2xl"
          initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
          animate={{ y: -120, opacity: 0 }}
          transition={{
            duration: 47 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Floating balloons */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute text-4xl"
          style={{ left: `${Math.random() * 90}%` }}
          initial={{ y: "100vh" }}
          animate={{ y: -150, opacity: 0 }}
          transition={{
            duration: 50 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 8,
          }}
        >
          🎈
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-10 w-[92%] md:w-[560px] flex flex-col items-center gap-4"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <img
          src={`/images/${isFirstPage ? friend.imgs[0] : friend.imgs[1]}`}
          alt={isFirstPage ? friend.name : friend.nickname}
          className="w-44 h-44 object-cover rounded-full border-4 border-pink-400 shadow-lg"
        />

        {isFirstPage && (
          <div>
            <h1 className="text-3xl font-extrabold text-pink-600">
              Happy Birthday {friend.name}! 🎉
            </h1>
          </div>
        )}

        {isFirstPage && (
          <Fragment>
            {!boxOpen ? (
              <Fragment>
                {/* Ribon Box */}

                <div
                  className="mt-16 animate-bounce cursor-pointer bg-pink-300 w-48 h-48 rounded-lg shadow-xl flex items-center justify-center relative"
                  onClick={() => {
                    setBoxOpen(true);
                    setBurst(true);
                    setTimeout(() => setBurst(false), 1500);
                  }}
                  // whileHover={{ scale: 1.05 }}
                >
                  {/* Ribbon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-red-500"></div>
                  <div className="absolute top-1/2 left-0 w-full h-2 bg-red-500"></div>
                  {/* Bow */}
                  <div className="absolute -top-6 flex gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                <p className="font-bold text-pink-600">Click to Open 🎁</p>
              </Fragment>
            ) : (
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative bg-[#fffbea] text-gray-800 font-medium px-6 py-4 w-[320px] h-64 rounded-md shadow-lg border border-yellow-300 mt-8"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(white, white 24px, #fcd34d 25px)",
                }}
              >
                {/* Flower decoration top-left */}
                <div>
                  {" "}
                  {burst && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 3, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                      className=" text-6xl text-center items-center justify-center text-pink-400"
                    >
                      🌸 🌼
                    </motion.div>
                  )}
                </div>
                <div className="absolute -top-4 -left-4 text-pink-400 text-2xl animate-bounce">
                  🌸
                </div>
                {/* Flower decoration top-right */}
                <div className="absolute -top-4 -right-4 text-pink-400 text-2xl animate-bounce delay-200">
                  🌼
                </div>
                <p className="text-left leading-7">
                  🎉 Happy Birthday dear friend, 🌸 May your life be full of
                  joy. 💫 Shine bright always! 🎂 Celebrate your day!
                </p>
                <p className="text-right text-sm text-gray-600 mt-4 italic">
                  – From Mastura
                </p>
              </motion.div>
            )}
          </Fragment>
        )}

        {/* Gift Box + Letter Note */}
        {isSecondPage && (
  <Fragment>
    <div className="relative flex flex-col items-center mt-4">
      <div className="mt-4">
        <CandleCake onBlown={() => setBurst(true)} />
      </div>
    </div>

    {/* Burst Happy Birthday letters to center */}
    
  </Fragment>
)}

        <button
          onClick={togglePage}
          className="mt-2 px-6 py-2 rounded-2xl bg-purple-600 text-white shadow hover:opacity-90"
        >
          {isFirstPage ? "Next" : "Back"}
        </button>
      </motion.div>
    </div>
  );
}
