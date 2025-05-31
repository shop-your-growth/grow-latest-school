'use client';

import { motion, LazyMotion, domAnimation } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Mail,
  Star,
  Target,
  Users,
  Zap
} from 'lucide-react';
import Link from "next/link";
import { useState, useMemo, useCallback } from 'react';

// Import components
import Logo from "../../components/landing-page/Logo";
import Button from "../../components/landing-page/Button";
import { Badge } from "../../components/landing-page/Badge";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    students: '',
    challenges: '',
    timeline: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Optimized form handlers with useCallback
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  }, []);

  // Memoized consultation benefits for performance
  const consultationBenefits = useMemo(() => [
    {
      icon: Target,
      title: 'Personalized Assessment',
      description: 'We analyze your specific needs and challenges to create a tailored solution.'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Get insights from our education technology specialists with years of experience.'
    },
    {
      icon: Zap,
      title: 'Implementation Roadmap',
      description: 'Receive a clear plan for implementing our solutions in your institution.'
    },
    {
      icon: CheckCircle,
      title: 'ROI Analysis',
      description: 'Understand the potential return on investment and cost savings.'
    }
  ], []);

  // Memoized consultation process for performance
  const consultationProcess = useMemo(() => [
    {
      step: '01',
      title: 'Initial Discussion',
      description: 'We start with understanding your current challenges and goals.',
      duration: '15 minutes'
    },
    {
      step: '02',
      title: 'Needs Assessment',
      description: 'Deep dive into your specific requirements and institutional needs.',
      duration: '20 minutes'
    },
    {
      step: '03',
      title: 'Solution Presentation',
      description: 'Customized demonstration of features relevant to your use case.',
      duration: '20 minutes'
    },
    {
      step: '04',
      title: 'Implementation Planning',
      description: 'Discuss timeline, training, and next steps for your institution.',
      duration: '15 minutes'
    }
  ], []);

  if (isSubmitted) {
    return (
      <LazyMotion features={domAnimation}>
        <main className="min-h-screen bg-gradient-to-br from-[#112250] via-[#1e3a5f] to-[#2a4a6b] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center max-w-2xl"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-[#112250]" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-[#F5F0E9] mb-6">
            Thank You for Your Interest!
          </h1>

          <p className="text-xl text-[#D9CBC2] mb-8 leading-relaxed">
            We've received your consultation request. Our education technology specialist will contact you within 24 hours to schedule your free consultation.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-[#E0B58F]">
              <Mail className="w-5 h-5" />
              <span>Confirmation email sent to {formData.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-[#E0B58F]">
              <Clock className="w-5 h-5" />
              <span>Expected response time: Within 24 hours</span>
            </div>
          </div>

          <Link href="/">
            <Button className="bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250] px-8 py-3">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </main>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-gradient-to-br from-[#112250] via-[#1e3a5f] to-[#2a4a6b]">
      {/* Navigation */}
      <nav className="relative z-50 bg-[#112250]/90 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo size="sm" showText={true} />
            </Link>

            <div className="flex items-center space-x-4 md:space-x-8">
              <Link href="/" className="text-[#D9CBC2] hover:text-[#F5F0E9] transition-colors text-sm md:text-base">
                WHO.we.ARE
              </Link>
              <Link href="/pages/features" className="text-[#D9CBC2] hover:text-[#F5F0E9] transition-colors text-sm md:text-base">
                OuR.Features
              </Link>
              <Link href="/pages/consultation" className="text-[#E0B58F] font-semibold text-sm md:text-base">
                Get Consultation
              </Link>
            </div>

            <Link href="/pages/features">
              <Button size="sm" className="bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250]">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E0B58F' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <Badge className="bg-[#E0B58F]/20 text-[#E0B58F] border-[#E0B58F]/30">
                  <Star className="w-3 h-3 mr-1" />
                  Free Expert Consultation
                </Badge>

                <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                    Get Your Free
                  </span>
                  <br />
                  <span className="text-[#F5F0E9]">Education Technology</span>
                  <br />
                  <span className="text-[#E0B58F] italic font-light" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    Consultation
                  </span>
                </h1>

                <p className="text-xl text-[#D9CBC2] leading-relaxed">
                  Discover how GROW YouR NEED can transform your educational institution.
                  Get personalized insights and a custom implementation plan from our experts.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {consultationBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-10 h-10 bg-[#E0B58F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#E0B58F]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#F5F0E9] mb-1">{benefit.title}</h3>
                        <p className="text-sm text-[#D9CBC2]">{benefit.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Content - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-[#F5F0E9] mb-6">Schedule Your Free Consultation</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#F5F0E9] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F5F0E9] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#F5F0E9] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F5F0E9] mb-2">
                        Organization *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                        placeholder="School/Institution name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#F5F0E9] mb-2">
                        Your Role *
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-[#F5F0E9] focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                      >
                        <option value="">Select your role</option>
                        <option value="administrator">Administrator</option>
                        <option value="principal">Principal</option>
                        <option value="teacher">Teacher</option>
                        <option value="it-manager">IT Manager</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F5F0E9] mb-2">
                        Number of Students
                      </label>
                      <select
                        name="students"
                        value={formData.students}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-[#F5F0E9] focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all"
                      >
                        <option value="">Select range</option>
                        <option value="1-100">1-100 students</option>
                        <option value="101-500">101-500 students</option>
                        <option value="501-1000">501-1000 students</option>
                        <option value="1000+">1000+ students</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F0E9] mb-2">
                      Current Challenges
                    </label>
                    <textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-[#F5F0E9] placeholder-[#D9CBC2]/60 focus:outline-none focus:ring-2 focus:ring-[#E0B58F] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your current challenges and what you're looking to improve..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250] font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-[#112250]/30 border-t-[#112250] rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Schedule Free Consultation</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E9] mb-6">
              What to Expect in Your Consultation
            </h2>
            <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto">
              Our 70-minute consultation is designed to understand your needs and show you exactly how
              GROW YouR NEED can benefit your institution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultationProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#112250]">{step.step}</span>
                </div>

                <h3 className="text-xl font-bold text-[#F5F0E9] mb-3">{step.title}</h3>
                <p className="text-[#D9CBC2] mb-4">{step.description}</p>

                <div className="flex items-center justify-center space-x-1 text-sm text-[#E0B58F]">
                  <Clock className="w-4 h-4" />
                  <span>{step.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E9] mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Is the consultation really free?",
                answer: "Yes, absolutely! Our consultation is completely free with no obligations. We believe in demonstrating value before asking for any commitment."
              },
              {
                question: "How long does the consultation take?",
                answer: "The consultation typically takes 60-70 minutes. This gives us enough time to understand your needs and provide meaningful insights."
              },
              {
                question: "What should I prepare for the consultation?",
                answer: "Come with your current challenges, goals, and any questions about educational technology. We'll handle the rest!"
              },
              {
                question: "Can multiple team members join the consultation?",
                answer: "Absolutely! We encourage key stakeholders to join. The more perspectives we have, the better we can tailor our recommendations."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-[#F5F0E9] mb-3">{faq.question}</h3>
                <p className="text-[#D9CBC2]">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </LazyMotion>
  );
}
