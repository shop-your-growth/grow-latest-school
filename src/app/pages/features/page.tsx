'use client';

import { motion, LazyMotion, domAnimation } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  DollarSign,
  GraduationCap,
  Heart,
  Megaphone,
  MessageSquare,
  Monitor,
  PieChart,
  Shield,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Zap
} from 'lucide-react';
import Link from "next/link";
import { useState, useMemo, useCallback } from 'react';

// Import components
import Logo from "../../components/landing-page/Logo";
import Button from "../../components/landing-page/Button";
import { Badge } from "../../components/landing-page/Badge";

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Memoized feature categories for performance
  const featureCategories = useMemo(() => [
    { id: 'all', label: 'All Features', icon: Star },
    { id: 'admin', label: 'Admin Management', icon: Shield },
    { id: 'teacher', label: 'Teacher Portal', icon: GraduationCap },
    { id: 'student', label: 'Student Dashboard', icon: BookOpen },
    { id: 'parent', label: 'Parent Access', icon: UserCheck },
    { id: 'finance', label: 'Finance Management', icon: DollarSign },
    { id: 'marketing', label: 'Marketing Hub', icon: Megaphone }
  ], []);

  // Memoized features data for performance optimization
  const features = useMemo(() => [
    // Admin Features
    {
      category: 'admin',
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive insights with real-time data visualization, performance metrics, and predictive analytics.',
      icon: BarChart3,
      gradient: 'from-blue-500 to-cyan-500',
      benefits: ['Real-time reporting', 'Custom dashboards', 'Data export', 'Predictive insights']
    },
    {
      category: 'admin',
      title: 'User Management System',
      description: 'Complete control over user roles, permissions, and access levels with advanced security features.',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      benefits: ['Role-based access', 'Bulk operations', 'Security monitoring', 'Audit trails']
    },
    {
      category: 'admin',
      title: 'System Monitoring',
      description: 'Monitor system health, performance metrics, and receive alerts for critical issues.',
      icon: Monitor,
      gradient: 'from-green-500 to-emerald-500',
      benefits: ['Performance tracking', 'Alert system', 'Resource monitoring', 'Uptime reports']
    },

    // Teacher Features
    {
      category: 'teacher',
      title: 'Interactive Course Builder',
      description: 'Create engaging courses with multimedia content, quizzes, and interactive elements.',
      icon: BookOpen,
      gradient: 'from-orange-500 to-red-500',
      benefits: ['Drag-drop builder', 'Multimedia support', 'Quiz creation', 'Progress tracking']
    },
    {
      category: 'teacher',
      title: 'AI-Powered Grading',
      description: 'Automated grading system with AI assistance for faster and more accurate assessments.',
      icon: Brain,
      gradient: 'from-indigo-500 to-purple-500',
      benefits: ['Auto-grading', 'AI feedback', 'Rubric creation', 'Grade analytics']
    },
    {
      category: 'teacher',
      title: 'Virtual Classroom',
      description: 'Conduct live classes with video conferencing, screen sharing, and interactive tools.',
      icon: Video,
      gradient: 'from-teal-500 to-blue-500',
      benefits: ['HD video calls', 'Screen sharing', 'Interactive whiteboard', 'Recording']
    },

    // Student Features
    {
      category: 'student',
      title: 'Personalized Learning Path',
      description: 'AI-driven learning recommendations tailored to individual student needs and progress.',
      icon: Target,
      gradient: 'from-pink-500 to-rose-500',
      benefits: ['Adaptive learning', 'Personal recommendations', 'Skill assessment', 'Progress tracking']
    },
    {
      category: 'student',
      title: 'Interactive Study Tools',
      description: 'Comprehensive study materials with flashcards, practice tests, and collaborative features.',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
      benefits: ['Digital flashcards', 'Practice tests', 'Study groups', 'Note sharing']
    },
    {
      category: 'student',
      title: 'Progress Analytics',
      description: 'Detailed insights into learning progress with performance metrics and improvement suggestions.',
      icon: TrendingUp,
      gradient: 'from-cyan-500 to-blue-500',
      benefits: ['Performance metrics', 'Learning analytics', 'Goal tracking', 'Improvement tips']
    },

    // Parent Features
    {
      category: 'parent',
      title: 'Real-time Progress Monitoring',
      description: 'Stay updated with your child\'s academic progress through detailed reports and notifications.',
      icon: Heart,
      gradient: 'from-red-500 to-pink-500',
      benefits: ['Progress reports', 'Grade notifications', 'Attendance tracking', 'Behavior updates']
    },
    {
      category: 'parent',
      title: 'Communication Hub',
      description: 'Direct communication with teachers and school administration through secure messaging.',
      icon: MessageSquare,
      gradient: 'from-green-500 to-teal-500',
      benefits: ['Teacher messaging', 'School announcements', 'Event notifications', 'Meeting scheduling']
    },

    // Finance Features
    {
      category: 'finance',
      title: 'Automated Billing System',
      description: 'Streamlined billing and payment processing with automated invoicing and payment tracking.',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-green-500',
      benefits: ['Auto invoicing', 'Payment tracking', 'Financial reports', 'Tax management']
    },
    {
      category: 'finance',
      title: 'Financial Analytics',
      description: 'Comprehensive financial reporting with revenue tracking and budget management tools.',
      icon: PieChart,
      gradient: 'from-blue-500 to-indigo-500',
      benefits: ['Revenue analytics', 'Budget tracking', 'Expense management', 'Financial forecasting']
    },

    // Marketing Features
    {
      category: 'marketing',
      title: 'Campaign Management',
      description: 'Create and manage marketing campaigns with advanced targeting and analytics.',
      icon: Megaphone,
      gradient: 'from-purple-500 to-violet-500',
      benefits: ['Campaign creation', 'Audience targeting', 'Performance tracking', 'A/B testing']
    },
    {
      category: 'marketing',
      title: 'Lead Management',
      description: 'Track and nurture leads through the enrollment process with automated workflows.',
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
      benefits: ['Lead tracking', 'Automated workflows', 'Conversion analytics', 'CRM integration']
    }
  ], []);

  // Optimized filtering with useMemo for performance
  const filteredFeatures = useMemo(() =>
    activeCategory === 'all'
      ? features
      : features.filter(feature => feature.category === activeCategory),
    [activeCategory, features]
  );

  // Optimized category change handler
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

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
              <Link href="/pages/features" className="text-[#E0B58F] font-semibold text-sm md:text-base">
                OuR.Features
              </Link>
              <Link href="/pages/consultation" className="text-[#D9CBC2] hover:text-[#F5F0E9] transition-colors text-sm md:text-base">
                Get Consultation
              </Link>
            </div>

            <Link href="/pages/consultation">
              <Button size="sm" className="bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250]">
                Get Started
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#E0B58F]/20 text-[#E0B58F] border-[#E0B58F]/30 mb-6">
              <Star className="w-3 h-3 mr-1" />
              Comprehensive Feature Suite
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                Powerful Features for
              </span>
              <br />
              <span className="text-[#F5F0E9]">Modern Education</span>
            </h1>

            <p className="text-xl text-[#D9CBC2] leading-relaxed max-w-3xl mx-auto">
              Discover our comprehensive suite of features designed to transform educational management
              and enhance learning experiences for all stakeholders.
            </p>
          </motion.div>

          {/* Feature Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {featureCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-[#E0B58F] text-[#112250] shadow-lg'
                      : 'bg-white/5 text-[#D9CBC2] hover:bg-white/10 hover:text-[#F5F0E9]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={`${feature.category}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  {/* Feature Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Feature Content */}
                  <h3 className="text-2xl font-bold text-[#F5F0E9] mb-4 group-hover:text-[#E0B58F] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-[#D9CBC2] leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-[#D9CBC2]">
                        <CheckCircle className="w-4 h-4 text-[#E0B58F] flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E0B58F]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-2xl border border-[#E0B58F]/30 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F0E9] mb-6">
              Ready to Transform Your Educational Institution?
            </h2>
            <p className="text-xl text-[#D9CBC2] mb-8 max-w-2xl mx-auto">
              Experience the power of our comprehensive feature suite. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pages/consultation">
                <Button
                  size="lg"
                  className="bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250] font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#E0B58F]/30 text-[#E0B58F] hover:bg-[#E0B58F]/10 px-12 py-4 rounded-xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    </LazyMotion>
  );
}
