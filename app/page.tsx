"use client";

import { motion } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  FaPhone, 
  FaUserMd, 
  FaStethoscope, 
  FaFileMedical, 
  FaWaveSquare,
  FaAssistiveListeningSystems
} from "react-icons/fa";
import { IoMdPulse } from "react-icons/io";
import { DemoVideoSection } from "./_components/DemoVideoSection";

export default function Home() {
  const doctors = [
    { specialty: "Cardiologist", voice: "Dr. Reynolds", accent: "British", img: "doctor1.png" },
    { specialty: "Pediatrician", voice: "Dr. Chen", accent: "American", img: "doctor2.png" },
    { specialty: "Neurologist", voice: "Dr. Kapoor", accent: "Indian", img: "doctor3.png" },
    { specialty: "General Practitioner", voice: "Dr. Müller", accent: "German", img: "doctor4.png" }
  ];

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Animated call status bar */}
      <div className="w-full bg-blue-600 py-2 px-4 lg:px-16 flex justify-center">
        <motion.div 
          className="flex items-center text-white text-sm"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <IoMdPulse className="mr-2" />
          <span>AI Doctors currently available for live calls</span>
        </motion.div>
      </div>

      <Navbar />

      <div className="px-4 lg:px-16 py-10 md:py-20 w-full max-w-7xl">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-3 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full"
          >
            <div className="relative flex items-center">
              <FaPhone className="text-blue-600 dark:text-blue-400" />
              <motion.span
                className="absolute -top-1 -right-1 flex h-3 w-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </motion.span>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              LIVE VOICE CONSULTATION
            </span>
          </motion.div>

          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-gray-800 md:text-5xl lg:text-6xl dark:text-white">
            {"Speak directly with an".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent"
            >
              AI Medical Specialist
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-2xl py-6 text-center text-lg font-normal text-gray-600 dark:text-gray-300"
          >
            Natural voice conversation with AI doctors powered by{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              AssemblyAI and PlayHT
            </span>. 
            Each call generates a comprehensive medical report for your records.
          </motion.p>

          <Link href={"/call"}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="relative z-10"
            >
              <Button className="h-14 px-8 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-lg transition-all hover:scale-105 group">
                <span className="mr-3">Start Voice Call</span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaPhone className="group-hover:animate-pulse" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>

          {/* Doctor selection cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 w-full max-w-4xl"
          >
            <h3 className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
              Available AI Specialists:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
                        {/* <FaUserMd className="text-blue-600 text-3xl" /> */}
                        <img className="rounded-full w-18 h-18" src={doctor.img} alt="" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white dark:border-gray-800">
                        <FaWaveSquare className="text-xs text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="font-bold text-gray-800 dark:text-white">{doctor.voice}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{doctor.specialty}</p>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                        {doctor.accent} accent
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                        Online
                      </span>
                    </div>
                    <Button className="mt-4 w-full rounded-full" size="sm">
                      <FaPhone className="mr-2" />
                      Call Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      <DemoVideoSection/>


        {/* Technology + Report section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-24 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="lg:px-16">
            <div className="flex  items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg mr-3">
                <FaAssistiveListeningSystems className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Powered by Leading Voice AI</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our real-time voice pipeline combines:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-1 rounded-full mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  <strong>AssemblyAI</strong> for ultra-accurate speech-to-text
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-1 rounded-full mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  <strong>PlayHT</strong> for natural doctor voices via Vapi.ai
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-1 rounded-full mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  <strong>Real-time</strong> streaming with no perceptible latency
                </span>
              </li>
            </ul>
          </div>



          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-blue-600 px-4 py-3 flex items-center">
              <FaFileMedical className="text-white mr-2" />
              <h3 className="text-white font-semibold">Post-Call Medical Report</h3>
            </div>
            <div className="p-5">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Session ID:</span>
                  <span className="font-mono">MED{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Symptoms Discussed:</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2 text-sm">
                    Chest discomfort, shortness of breath during exertion
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Recommendations:</h4>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2 text-sm">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Schedule ECG within 48 hours</li>
                      <li>Monitor blood pressure twice daily</li>
                      <li>Follow up if symptoms worsen</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full" variant="outline">
                <FaStethoscope className="mr-2" />
                View Full Report
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex w-full max-w-7xl items-center justify-between px-16 py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <FaUserMd className="text-xl" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          MediVoice AI
        </h1>
      </div>
      {!user ? (
        <div className="flex gap-4">
          <Link href="/sign-in">
            <Button variant="outline" className="rounded-full px-6 border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <Link href='/dashboard' className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            {/* <FaFileMedical className="inline mr-1" /> */}
            Dashboard
          </Link>
          <UserButton appearance={{
            elements: {
              avatarBox: "size-10 border-2 border-blue-500",
            }
          }} />
        </div>
      )}
    </nav>
  );
};