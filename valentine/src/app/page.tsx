'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [checkedOption, setCheckedOption] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [photoTimer, setPhotoTimer] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const photos = [
    "0d6a2b70-f75a-4c0b-9769-1a0aa0494970.JPG",
    "8fe51694-2a5f-4a5c-abb7-1e6e7338ae80.JPG", 
    "IMG_5037.jpg",
    "IMG_5107.jpg",
    "IMG_5120.JPG",
    "IMG_5134.JPG",
    "IMG_5149.jpg",
    "IMG_5303.jpg",
    "IMG_5310.jpg"
  ];

  // Generate particles on client side only to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4
    }));
    setParticles(generatedParticles);
  }, []);

  const handleCheckboxChange = (option: string) => {
    setCheckedOption(option);
    setShowCelebration(true);
    
    // Sequence of animations
    setTimeout(() => {
      setShowForm(false);
    }, 500);
    
    setTimeout(() => {
      setShowMessage(true);
      setCountdown(10);
    }, 1000);
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && showMessage) {
      setTimeout(() => {
        setShowPhotos(true);
        setPhotoTimer(10);
      }, 500);
    }
  }, [countdown, showMessage]);

  // Photo timer effect
  useEffect(() => {
    if (photoTimer > 0) {
      const timer = setTimeout(() => {
        setPhotoTimer(photoTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (photoTimer === 0 && showPhotos) {
      setTimeout(() => {
        setShowPhotos(false);
        setShowFinalMessage(true);
      }, 500);
    }
  }, [photoTimer, showPhotos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden" style={{minHeight: '100vh', height: '100dvh'}}>
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          >
            <span className="text-pink-300 text-sm">✨</span>
          </div>
        ))}
      </div>

      {/* Celebration Hearts Background */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute animate-heartFloat opacity-20"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${(i * 0.1) % 3}s`,
                animationDuration: `${3 + (i % 2)}s`
              }}
            >
              <span className="text-pink-300 text-lg">💕</span>
            </div>
          ))}
        </div>
      )}

      {/* Main container - always centered */}
      <div className="min-h-screen flex items-center justify-center p-4" style={{minHeight: '100vh', height: '100dvh'}}>
        <div className="w-full max-w-lg mx-auto text-center">
          
          {/* Header - Always visible */}
          <div className="mb-12 animate-fadeInUp">
            <h1 className="text-7xl md:text-9xl font-dancing text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text mb-8 tracking-wide drop-shadow-2xl glow-text">
              Aaisha
            </h1>
            <div className="flex justify-center space-x-4">
              <span className="text-3xl animate-sparkle glow-emoji">💖</span>
              <span className="text-3xl animate-sparkle glow-emoji" style={{animationDelay: '0.5s'}}>✨</span>
              <span className="text-3xl animate-sparkle glow-emoji" style={{animationDelay: '1s'}}>💕</span>
            </div>
          </div>

          {/* Question Form */}
          {showForm && (
            <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <div className="bg-gradient-to-br from-white via-pink-50/30 to-rose-50/40 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border-2 border-pink-200/30 relative overflow-hidden glow-card">
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 text-pink-300 opacity-50 glow-emoji">✨</div>
                <div className="absolute top-4 right-4 text-pink-300 opacity-50 glow-emoji">✨</div>
                <div className="absolute bottom-4 left-4 text-pink-300 opacity-50 glow-emoji">💕</div>
                <div className="absolute bottom-4 right-4 text-pink-300 opacity-50 glow-emoji">💕</div>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-10 leading-relaxed flex items-center justify-center gap-3">
                  Will you be my Valentine? <span className="text-4xl">💝</span>
                </h2>
                
                {/* Beautiful Checkboxes - Side by side */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <label className="group block flex-1">
                    <div className={`relative flex items-center justify-center space-x-4 p-8 rounded-3xl bg-gradient-to-br from-pink-100/80 via-rose-50/60 to-pink-200/40 border-3 border-pink-300/40 cursor-pointer transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-pink-400/60 hover:bg-gradient-to-br hover:from-pink-200/90 hover:via-rose-100/70 hover:to-pink-300/50 backdrop-blur-sm glow-checkbox ${checkedOption === 'yes1' ? 'checkbox-selected' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <input
                        type="checkbox"
                        checked={checkedOption === 'yes1'}
                        onChange={() => handleCheckboxChange('yes1')}
                        className="w-7 h-7 text-violet-500 rounded-xl focus:ring-violet-300 focus:ring-4 border-2 border-pink-300 accent-violet-500"
                      />
                      <span className="text-xl font-bold text-pink-600 group-hover:text-pink-700 transition-colors relative z-10">
                        Yes! 💕
                      </span>
                    </div>
                  </label>
                  
                  <label className="group block flex-1">
                    <div className={`relative flex items-center justify-center space-x-4 p-8 rounded-3xl bg-gradient-to-br from-rose-100/80 via-pink-50/60 to-rose-200/40 border-3 border-rose-300/40 cursor-pointer transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-rose-400/60 hover:bg-gradient-to-br hover:from-rose-200/90 hover:via-pink-100/70 hover:to-rose-300/50 backdrop-blur-sm glow-checkbox ${checkedOption === 'yes2' ? 'checkbox-selected' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-200/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <input
                        type="checkbox"
                        checked={checkedOption === 'yes2'}
                        onChange={() => handleCheckboxChange('yes2')}
                        className="w-7 h-7 text-violet-500 rounded-xl focus:ring-violet-300 focus:ring-4 border-2 border-rose-300 accent-violet-500"
                      />
                      <span className="text-xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors relative z-10">
                        Of course Yes! 💖
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Love Message with Countdown */}
          {showMessage && (
            <div className="animate-fadeInScale mb-12">
              <div className="bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 text-pink-800 rounded-3xl p-10 shadow-2xl border-4 border-pink-300/40 backdrop-blur-sm glow-card">
                <div className="text-4xl mb-6 glow-emoji">💕✨💕</div>
                <h3 className="text-4xl md:text-5xl font-dancing font-bold mb-6 leading-relaxed glow-text">
                  HAPPY DANCE!!! 🥳 Te amo infinito y más allá mi princesa
                </h3>
                <div className="text-4xl mb-6 glow-emoji">💕✨💕</div>
                {countdown > 0 && (
                  <div className="text-3xl font-bold animate-pulse text-pink-700 glow-text">
                    {countdown}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Photo Memories - Dynamic popup animation */}
      {showPhotos && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-100/90 via-rose-100/90 to-pink-200/90 backdrop-blur-lg z-50 overflow-hidden">
          <div className="min-h-screen relative" style={{minHeight: '100vh', height: '100dvh'}}>
            <h3 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-pink-700 text-center animate-fadeInUp glow-text z-10">
              Our Beautiful Memories 📸💕
            </h3>
            
            
            {/* Sequential photo display - one by one */}
            {photos.map((photo, index) => {
              const positions = [
                { left: '5%', top: '20%' },
                { left: '35%', top: '18%' },
                { left: '65%', top: '25%' },
                { left: '10%', top: '45%' },
                { left: '40%', top: '42%' },
                { left: '70%', top: '50%' },
                { left: '15%', top: '70%' },
                { left: '45%', top: '68%' },
                { left: '75%', top: '75%' }
              ];
              const position = positions[index];
              
              return (
                <div
                  key={photo}
                  className="absolute animate-fadeInScale glow-photo"
                  style={{
                    left: position.left,
                    top: position.top,
                    animationDelay: `${index * 1}s`,
                    animationDuration: '1s',
                    zIndex: 20 + index,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="relative group overflow-hidden rounded-3xl shadow-2xl border-4 border-pink-300/50">
                    <Image
                      src={`/${photo}`}
                      alt={`Memory ${index + 1}`}
                      width={280}
                      height={280}
                      className="w-56 h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-400/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-white text-3xl animate-pulse glow-emoji">💕</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Floating hearts decoration */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 25 }, (_, i) => (
                <div
                  key={`floating-heart-${i}`}
                  className="absolute animate-float opacity-30"
                  style={{
                    left: `${(i * 11) % 100}%`,
                    top: `${(i * 7) % 100}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${4 + (i % 3)}s`
                  }}
                >
                  <span className="text-pink-400 text-lg">💕</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Final Love Message */}
      {showFinalMessage && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 backdrop-blur-lg z-50 flex items-center justify-center p-8">
          {/* Floating hearts background for final message */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={`final-heart-${i}`}
                className="absolute animate-float opacity-25"
                style={{
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 17) % 100}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${5 + (i % 2)}s`
                }}
              >
                <span className="text-pink-400 text-xl">💕</span>
              </div>
            ))}
          </div>
          
          <div className="text-center animate-fadeInScale glow-card bg-white/20 backdrop-blur-md rounded-3xl p-16 border-4 border-pink-300/50 shadow-2xl mr-8 mb-8 relative z-10">
            <div className="text-5xl mb-8 glow-emoji">💕✨💖✨💕</div>
            <h1 className="text-4xl md:text-6xl font-dancing font-bold text-pink-800 mb-8 leading-relaxed glow-text">
              I love you so much Aaisha,<br />
              I can't wait to see you
            </h1>
            <div className="text-5xl glow-emoji">💕✨💖✨💕</div>
          </div>
        </div>
      )}
    </div>
  );
}
