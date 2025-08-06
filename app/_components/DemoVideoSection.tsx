"use client"
import { motion } from "motion/react"
import { Play, Volume2, Mic, MessageCircle } from "lucide-react"
import { useState } from "react"

export function DemoVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="w-full max-w-7xl mx-auto  px-4 py-20 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
        >
          <Play className="w-4 h-4" />
          See AI Medical Voice Agent in Action
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4"
        >
          Watch How Our AI Provides Medical Guidance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
        >
          Experience a real conversation between a patient and our AI medical voice agent. See how natural and helpful
          the interaction can be.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
            {/* Video placeholder - you can replace with actual video */}
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="AI Medical Voice Agent Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl"
              />
            </div>

            {/* Play overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-white/90 hover:bg-white text-blue-600 rounded-full p-6 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Play className="w-8 h-8 ml-1" />
                </button>
              </div>
            )}

            {/* Live indicators */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE DEMO
              </div>
            </div>
          </div>

          {/* Audio visualization */}
          <div className="mt-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-center gap-3 mb-3">
              <Volume2 className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Audio Waveform</span>
            </div>
            <div className="flex items-center gap-1 h-8">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-500 rounded-full animate-pulse"
                  style={{
                    width: "3px",
                    height: `${Math.random() * 100 + 20}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Conversation Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Sample Conversation</h3>

          {/* Patient message */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl rounded-tl-sm p-4">
                <p className="text-slate-700 dark:text-slate-300">
                  "I've been having chest pain and shortness of breath for the past two days. Should I be concerned?"
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">Patient • 2:34 PM</span>
            </div>
          </div>

          {/* AI response */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl rounded-tl-sm p-4">
                <p className="text-slate-700 dark:text-slate-300">
                  "I understand your concern about chest pain and shortness of breath. These symptoms can be serious and
                  require immediate attention. Based on what you've described, I recommend seeking emergency medical
                  care right away. Would you like me to help you find the nearest emergency room or call emergency
                  services?"
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                AI Medical Assistant • 2:34 PM
              </span>
            </div>
          </div>

          {/* Follow-up */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl rounded-tl-sm p-4">
                <p className="text-slate-700 dark:text-slate-300">
                  "I'm also scheduling a follow-up consultation with a cardiologist for you. Your session ID is
                  #MV2024-001 for reference."
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                AI Medical Assistant • 2:35 PM
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is a demonstration. Our AI provides guidance but always recommends
              professional medical care for serious symptoms.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
