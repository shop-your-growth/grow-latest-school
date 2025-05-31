'use client';

import { motion, LazyMotion, domAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle,
  DollarSign,
  Globe,
  GraduationCap,
  Lightbulb,
  Megaphone,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Zap
} from 'lucide-react';
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from 'react';

// Optimized Dynamic Imports for Better Performance
const FeatureCard = dynamic(() => import("./components/landing-page/FeatureCard"), {
  loading: () => <div className="w-full h-64 bg-white/5 rounded-3xl animate-pulse" />
});

const HeroCards = dynamic(() => import("./components/landing-page/HeroCards"), {
  loading: () => <div className="w-full h-96 bg-white/5 rounded-3xl animate-pulse" />
});

// Critical components loaded immediately
import Logo from "./components/landing-page/Logo";
import UltraFastLoader from "./components/landing-page/UltraFastLoader";
import { Badge } from "./components/landing-page/Badge";
import Button from "./components/landing-page/Button";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Memoized testimonials data for performance
  const testimonials = useMemo(() => [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal, Riverside Academy",
      content: "GROW YouR NEED has transformed how we manage our educational processes. The comprehensive analytics and user-friendly interface have made administration seamless.",
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Michael Chen",
      role: "IT Director, Metro School District",
      content: "The security features and scalability of this platform are outstanding. We've successfully onboarded over 5,000 users without any issues.",
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher, Lincoln High School",
      content: "As an educator, I appreciate how intuitive the teacher portal is. Managing my classes and tracking student progress has never been easier.",
      avatar: "/api/placeholder/64/64"
    }
  ], []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev: number) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Memoized features data for performance optimization
  const features = useMemo(() => [
    {
      title: "Admin Management",
      description: "Comprehensive system administration with advanced analytics and user management capabilities.",
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
      href: "/pages/admin"
    },
    {
      title: "Teacher Portal",
      description: "Intuitive course management, student tracking, and educational resource organization.",
      icon: GraduationCap,
      gradient: "from-blue-500 to-cyan-500",
      href: "/pages/teacher"
    },
    {
      title: "Student Dashboard",
      description: "Personalized learning experience with progress tracking and interactive coursework.",
      icon: BookOpen,
      gradient: "from-green-500 to-emerald-500",
      href: "/pages/student"
    },
    {
      title: "Parent Access",
      description: "Monitor your child's academic progress and stay connected with their educational journey.",
      icon: UserCheck,
      gradient: "from-orange-500 to-yellow-500",
      href: "/pages/parent"
    },
    {
      title: "Finance Management",
      description: "Complete financial oversight with revenue tracking and comprehensive reporting tools.",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500",
      href: "/pages/finance"
    },
    {
      title: "Marketing Hub",
      description: "Campaign management, lead tracking, and analytics for educational marketing success.",
      icon: Megaphone,
      gradient: "from-purple-500 to-violet-500",
      href: "/pages/marketing"
    }
  ], []);





  // Optimized testimonial rotation callback
  const handleTestimonialChange = useCallback((index: number) => {
    setActiveTestimonial(index);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-gradient-to-br from-[#112250] via-[#1a2d5a] to-[#2a3f6f] text-white overflow-hidden">
      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#112250]/90 via-[#112250]/95 to-[#112250]/90 backdrop-blur-2xl border-b border-[#E0B58F]/20 shadow-lg shadow-[#112250]/50"
      >
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0B58F]/50 to-transparent"></div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <Logo size="sm" showText={true} />
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { href: "/", label: "WHO.we.ARE" },
                { href: "/pages/features", label: "OuR.Features" },
                { href: "/pages/consultation", label: "Get a Free Consultation" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-[#D9CBC2] hover:text-[#F5F0E9] transition-all duration-300 rounded-lg group overflow-hidden"
                  >
                    {/* Background hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/10 to-[#3C507D]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Bottom border animation */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#E0B58F] to-[#F5F0E9] group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"
                    />

                    <span className="relative z-10 font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link href="/pages/login">
                <Button
                  size="sm"
                  leftIcon={<UserCheck className="w-4 h-4" />}
                  className="bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#D4A574] hover:to-[#C89A69] text-[#112250] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg border border-[#E0B58F]/30"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E0B58F' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center space-x-2"
                >
                  <Badge className="bg-[#E0B58F]/20 text-[#E0B58F] border-[#E0B58F]/30">
                    <Star className="w-3 h-3 mr-1" />
                    Educational SaaS Platform
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl lg:text-6xl font-black leading-tight tracking-tight"
                  style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                >
                  <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                    GROW
                  </span>
                  <motion.span
                    className="text-[#F5F0E9] italic font-light relative inline-block mx-2"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      textShadow: '0 0 20px rgba(245, 240, 233, 0.3)',
                      transform: 'skew(-8deg)'
                    }}
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(245, 240, 233, 0.3)',
                        '0 0 30px rgba(245, 240, 233, 0.5)',
                        '0 0 20px rgba(245, 240, 233, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    YouR
                  </motion.span>
                  <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                    NEED
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl text-[#D9CBC2] leading-relaxed max-w-lg"
                >
                  Comprehensive educational management system designed for schools, teachers, students, and parents.
                  Experience the future of education technology with AI-powered insights and seamless integration.
                </motion.p>

                {/* Enhanced Feature Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="flex flex-wrap gap-4 max-w-lg"
                >
                  {[
                    { icon: Zap, text: "Lightning Fast" },
                    { icon: Shield, text: "Secure & Reliable" },
                    { icon: Lightbulb, text: "AI-Powered" }
                  ].map((highlight, index) => {
                    const Icon = highlight.icon;
                    return (
                      <motion.div
                        key={highlight.text}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2"
                      >
                        <Icon className="w-4 h-4 text-[#E0B58F]" />
                        <span className="text-sm text-[#F5F0E9] font-medium">{highlight.text}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-row gap-3 items-start flex-wrap"
              >
                <Link href="/pages/login">
                  <Button
                    size="default"
                    leftIcon={<Rocket className="w-4 h-4" />}
                    className="bg-gradient-to-r from-[#E0B58F] to-[#D4A574] hover:from-[#D4A574] hover:to-[#C89A69] text-[#112250] font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 border border-[#E0B58F]/20"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/pages/features">
                  <Button
                    variant="outline"
                    size="default"
                    rightIcon={<Play className="w-4 h-4" />}
                    className="border-2 border-[#E0B58F]/40 text-[#E0B58F] hover:bg-[#E0B58F]/15 hover:border-[#E0B58F]/60 font-semibold text-sm px-5 py-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                    View Features
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative mt-6 lg:mt-0 order-first lg:order-last"
            >
              <div className="flex flex-col items-center">
                <HeroCards className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-center -mt-10"
                >
                  <h3 className="text-sm sm:text-base font-bold text-[#F5F0E9] leading-relaxed max-w-md mx-auto"
                      style={{
                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                        fontWeight: '600',
                        letterSpacing: '0.02em'
                      }}>
                    <span className="font-extrabold tracking-wide text-shadow-lg"
                          style={{
                            textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(245, 240, 233, 0.2)',
                            letterSpacing: '0.05em'
                          }}>
                      AI-Powered Education - Experience the future
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent font-bold italic block mt-4"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                      Of Learning with INTELLIGENTE SYSTEM
                    </span>
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#E0B58F]/10 to-[#F5F0E9]/5 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-[#F5F0E9]/10 to-[#E0B58F]/5 rounded-full blur-xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-xl border border-[#E0B58F]/30 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-[#E0B58F]" />
              <span className="text-[#E0B58F] font-semibold">Trusted Worldwide</span>
              <Sparkles className="w-5 h-5 text-[#E0B58F]" />
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-black text-[#F5F0E9] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                Empowering Education
              </span>
              <br />
              <span className="text-[#F5F0E9]">Across the Globe</span>
            </h2>
            <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto leading-relaxed">
              Join thousands of educational institutions worldwide who trust GROW YouR NEED
              to transform their learning environments with cutting-edge technology.
            </p>
          </motion.div>

          {/* Enhanced Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: Globe,
                number: "150+",
                label: "Countries Served",
                description: "Global reach across continents",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                number: "2M+",
                label: "Active Users",
                description: "Students, teachers, and staff",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: GraduationCap,
                number: "10K+",
                label: "Institutions",
                description: "Schools and universities",
                gradient: "from-purple-500 to-violet-500"
              },
              {
                icon: TrendingUp,
                number: "99.9%",
                label: "Uptime",
                description: "Reliable and secure platform",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E0B58F]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <motion.h3
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl lg:text-5xl font-black text-[#F5F0E9] mb-2"
                  >
                    {stat.number}
                  </motion.h3>

                  {/* Label */}
                  <h4 className="text-xl font-bold text-[#E0B58F] mb-2">{stat.label}</h4>

                  {/* Description */}
                  <p className="text-[#D9CBC2] text-sm">{stat.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F5F0E9] mb-6">
              Powerful Portals for Every Role
            </h2>
            <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto">
              Tailored experiences for administrators, teachers, students, parents, and staff members
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={feature.title} href={feature.href}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  gradient={feature.gradient}
                  delay={index * 0.1}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-xl border border-[#E0B58F]/30 rounded-full px-6 py-3 mb-8"
            >
              <Target className="w-5 h-5 text-[#E0B58F]" />
              <span className="text-[#E0B58F] font-semibold">Why Choose GROW YouR NEED</span>
              <Target className="w-5 h-5 text-[#E0B58F]" />
            </motion.div>

            <h3 className="text-4xl lg:text-6xl font-black text-[#F5F0E9] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#F5F0E9] to-[#E0B58F] bg-clip-text text-transparent">
                Trusted by Educational
              </span>
              <br />
              <span className="text-[#F5F0E9]">Leaders Worldwide</span>
            </h3>
            <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our comprehensive platform designed specifically
              for modern educational institutions and their unique challenges.
            </p>
          </motion.div>

          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Lightbulb,
                title: "AI-Powered Innovation",
                description: "Cutting-edge artificial intelligence to enhance learning experiences and administrative efficiency.",
                gradient: "from-yellow-500 to-orange-500",
                features: ["Smart Analytics", "Predictive Insights", "Automated Workflows"]
              },
              {
                icon: Zap,
                title: "Lightning Fast Performance",
                description: "Optimized for speed with cloud-native architecture ensuring instant response times.",
                gradient: "from-blue-500 to-purple-500",
                features: ["Sub-second Loading", "Real-time Updates", "Global CDN"]
              },
              {
                icon: CheckCircle,
                title: "Proven Success Rate",
                description: "98% customer satisfaction with measurable improvements in educational outcomes.",
                gradient: "from-green-500 to-emerald-500",
                features: ["Verified Results", "Case Studies", "ROI Tracking"]
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E0B58F]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4 group-hover:text-[#E0B58F] transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-[#D9CBC2] mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-[#D9CBC2]">
                        <div className="w-1.5 h-1.5 bg-[#E0B58F] rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Testimonials & Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-[#F5F0E9] mb-6">
              What Makes Us Different
            </h3>
            <p className="text-lg text-[#D9CBC2] max-w-2xl mx-auto">
              Discover the key advantages that set GROW YouR NEED apart from other educational platforms
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#112250]" />
              </div>
              <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4">Enterprise Security</h4>
              <p className="text-[#D9CBC2]">
                Bank-level encryption and security protocols to protect your educational data
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-[#112250]" />
              </div>
              <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4">Real-time Analytics</h4>
              <p className="text-[#D9CBC2]">
                Advanced insights and reporting to drive educational excellence and growth
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#112250]" />
              </div>
              <h4 className="text-2xl font-bold text-[#F5F0E9] mb-4">24/7 Support</h4>
              <p className="text-[#D9CBC2]">
                Dedicated support team ready to help your institution succeed
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#E0B58F]/20 to-[#F5F0E9]/20 backdrop-blur-2xl border border-[#E0B58F]/30 rounded-3xl p-12 text-center"
          >
            <h4 className="text-3xl font-bold text-[#F5F0E9] mb-6">
              Ready to Transform Your Educational Institution?
            </h4>
            <p className="text-xl text-[#D9CBC2] mb-8 max-w-2xl mx-auto">
              Join the future of education management with our comprehensive platform designed for modern learning environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pages/login">
                <Button
                  size="lg"
                  className="bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250] font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/pages/consultation">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#E0B58F]/30 text-[#E0B58F] hover:bg-[#E0B58F]/10 px-12 py-4 rounded-xl transition-all duration-300"
                >
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-[#F5F0E9] mb-6">
              What Our Users Say
            </h3>
            <p className="text-xl text-[#D9CBC2] max-w-3xl mx-auto">
              Real feedback from educators and administrators who trust GROW YouR NEED
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="mb-8">
                <p className="text-xl md:text-2xl text-[#F5F0E9] leading-relaxed mb-8">
                  &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#F5F0E9] rounded-full flex items-center justify-center">
                    <span className="text-[#112250] font-bold text-lg">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-[#F5F0E9] font-semibold text-lg">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-[#D9CBC2]">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-[#E0B58F] scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer Section */}
      <footer className="relative py-16 px-4 bg-gradient-to-br from-[#0f1f42] to-[#112250] border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <Logo size="sm" showText={true} />
              <p className="text-[#D9CBC2] leading-relaxed">
                Transforming education through innovative technology solutions designed for the modern learning environment.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Globe, label: "Global Reach" },
                  { icon: Shield, label: "Secure Platform" },
                  { icon: Zap, label: "Fast Performance" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="w-10 h-10 bg-[#E0B58F]/20 rounded-lg flex items-center justify-center group hover:bg-[#E0B58F]/30 transition-colors"
                      title={item.label}
                    >
                      <Icon className="w-5 h-5 text-[#E0B58F] group-hover:scale-110 transition-transform" />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-[#F5F0E9]">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/pages/features", label: "Features" },
                  { href: "/pages/consultation", label: "Get Consultation" },
                  { href: "/pages/login", label: "Sign In" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#D9CBC2] hover:text-[#E0B58F] transition-colors flex items-center space-x-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-[#F5F0E9]">Platform Features</h4>
              <ul className="space-y-3">
                {[
                  "Admin Management",
                  "Teacher Portal",
                  "Student Dashboard",
                  "Parent Access",
                  "Finance Management",
                  "Marketing Hub"
                ].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#E0B58F] flex-shrink-0" />
                    <span className="text-[#D9CBC2]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & CTA */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-[#F5F0E9]">Get Started Today</h4>
              <p className="text-[#D9CBC2]">
                Ready to transform your educational institution? Start your journey with GROW YouR NEED.
              </p>
              <Link href="/pages/consultation">
                <Button
                  size="sm"
                  className="w-full bg-[#E0B58F] hover:bg-[#E0B58F]/90 text-[#112250] font-semibold transition-all duration-300 hover:scale-105"
                >
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#D9CBC2] text-sm">
              © 2024 GROW YouR NEED. All rights reserved. Empowering education worldwide.
            </p>
            <div className="flex items-center space-x-6 text-sm text-[#D9CBC2]">
              <span className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-[#E0B58F]" />
                <span>Built for Excellence</span>
              </span>
              <span className="flex items-center space-x-1">
                <Lightbulb className="w-4 h-4 text-[#E0B58F]" />
                <span>AI-Powered</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Link href="/pages/consultation">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-gradient-to-br from-[#E0B58F] to-[#D4A574] rounded-full shadow-2xl flex items-center justify-center text-[#112250] hover:shadow-[#E0B58F]/25 transition-all duration-300 group"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.button>
        </Link>
      </motion.div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#112250] z-[9999] flex items-center justify-center">
          <div className="text-center">
            <Logo size="lg" showText={true} className="mb-8" />
            <UltraFastLoader
              size="lg"
              className="text-[#F5F0E9]"
            />
          </div>
        </div>
      )}
    </main>
    </LazyMotion>
  );
}
