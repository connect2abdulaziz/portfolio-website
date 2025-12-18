"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaExclamationTriangle,
  FaCheck,
  FaUser,
  FaLock,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formState, setFormState] = useState("idle"); // idle, loading, success, error
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(message.length);
  }, [message]);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setFormState("loading");

    if (!isValidEmail(senderEmail)) {
      setError("Please enter a valid email address.");
      setFormState("error");
      return;
    }
    
    if (message.length === 0) {
      setError("Message cannot be empty.");
      setFormState("error");
      return;
    }
    
    if (message.length > 50000) {
      setError("Message cannot exceed 50000 characters.");
      setFormState("error");
      return;
    }

    const formData = { senderName: name, senderEmail, message };
    
    try {
      const { error: responseError } = await sendEmail(formData);

      if (responseError) {
        toast.error(responseError);
        setFormState("error");
        return;
      }

      setName("");
      setSenderEmail("");
      setMessage("");
      setCharacterCount(0);
      setFormState("success");
      toast.success("Email sent successfully!");
      
      // Reset form state after showing success
      setTimeout(() => {
        setFormState("idle");
      }, 3000);
    } catch (err) {
      console.error("Error sending email:", err);
      setFormState("error");
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative mb-20 sm:mb-28 w-full max-w-[95%] lg:max-w-7xl mx-auto px-4"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <SectionHeading>Let's Work Together</SectionHeading>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
        </p>
      </div>

      {/* Split Layout Container */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Left Side - Contact Info Card */}
        <div className="relative flex flex-col">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#016782]/20 rounded-3xl -z-10"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#016782]/20 rounded-3xl -z-10"></div>
          
          <div className="relative flex-1 flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-[#016782]/30 shadow-xl overflow-hidden">
            {/* Accent Bar */}
            <div className="h-2 bg-[#016782]"></div>
            
            <div className="p-8 lg:p-10 flex-1 flex flex-col">
              {/* Main Heading */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                  Get In Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Let's discuss your next project and bring your ideas to life.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 mb-6 flex-1">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#016782]/10 dark:bg-[#016782]/20 flex items-center justify-center shrink-0 group-hover:bg-[#016782]/20 dark:group-hover:bg-[#016782]/30 transition-colors">
                    <FaEnvelope className="text-xl text-[#016782]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <a 
                      href="mailto:connect2abdulaziz@gmail.com"
                      className="text-gray-800 dark:text-white font-medium hover:text-[#016782] dark:hover:text-[#016782] transition-colors break-all"
                    >
                      connect2abdulaziz@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#016782]/10 dark:bg-[#016782]/20 flex items-center justify-center shrink-0 group-hover:bg-[#016782]/20 dark:group-hover:bg-[#016782]/30 transition-colors">
                    <FaMapMarkerAlt className="text-xl text-[#016782]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                    <p className="text-gray-800 dark:text-white font-medium">
                      Available Remotely
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#016782]/10 dark:bg-[#016782]/20 flex items-center justify-center shrink-0 group-hover:bg-[#016782]/20 dark:group-hover:bg-[#016782]/30 transition-colors">
                    <FaClock className="text-xl text-[#016782]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Response Time</p>
                    <p className="text-gray-800 dark:text-white font-medium">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">Connect With Me</p>
                <div className="flex gap-3">
                  {[
                    { icon: <FaLinkedin />, url: "https://linkedin.com/in/connect2abdulaziz", label: "LinkedIn" },
                    { icon: <FaGithub />, url: "https://github.com/connect2abdulaziz", label: "GitHub" },
                    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 rounded-xl bg-[#016782]/10 dark:bg-[#016782]/20 hover:bg-[#016782] dark:hover:bg-[#016782] flex items-center justify-center text-[#016782] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="relative flex flex-col">
          {/* Decorative Elements */}
          <div className="absolute top-8 -right-4 w-20 h-20 bg-[#016782]/5 rounded-full -z-10"></div>
          <div className="absolute bottom-16 -left-4 w-16 h-16 bg-[#016782]/5 rounded-full -z-10"></div>
          
          <div className="relative flex-1 flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-[#016782]/30 shadow-xl overflow-hidden">
            {/* Accent Bar */}
            <div className="h-2 bg-[#016782]"></div>

            {/* Success Overlay */}
            <AnimatePresence>
              {formState === "success" && (
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="w-20 h-20 bg-[#016782]/10 dark:bg-[#016782]/20 rounded-full flex items-center justify-center mb-5">
                    <FaCheck className="text-3xl text-[#016782]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center px-4">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form 
              className="p-8 lg:p-10 flex-1 flex flex-col"
              onSubmit={handleSubmit}
            >
              {/* Form Header */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                  Send a Message
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Form Fields Container */}
              <div className="flex-1">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name Input */}
                <div className="relative group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <FaUser />
                    </div>
                    <input
                      id="name"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#016782] dark:focus:border-[#016782] transition-all"
                      name="name"
                      type="text"
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Email *
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <FaEnvelope />
                    </div>
                    <input
                      id="email"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#016782] dark:focus:border-[#016782] transition-all"
                      name="senderEmail"
                      type="email"
                      required
                      maxLength={500}
                      value={senderEmail}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        setError("");
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="relative mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                    <FaPaperPlane />
                  </div>
                  <textarea
                    id="message"
                    className="w-full h-32 pl-11 pr-4 pt-4 pb-10 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#016782] dark:focus:border-[#016782] transition-all resize-none"
                    name="message"
                    required
                    maxLength={50000}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setError("");
                    }}
                  />
                  
                  {/* Character Count */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <div className="w-20 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div 
                        className="h-full bg-[#016782] transition-all"
                        style={{ width: `${Math.min((characterCount / 50000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span>{characterCount}</span>
                  </div>
                </div>
              </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 flex items-center gap-3 text-red-700 dark:text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaExclamationTriangle className="text-lg shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <SubmitBtn />

              {/* Privacy Note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <FaLock className="text-[#016782]" />
                <span>Your information is secure and will never be shared</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}