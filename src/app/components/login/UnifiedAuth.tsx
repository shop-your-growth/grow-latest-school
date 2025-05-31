import { InputField } from '@/app/components/common/Input';
import OptimizedButton from '@/app/components/common/OptimizedButton';
import { PageLoader } from '@/app/components/landing-page/UltraFastLoader';
import { motion, Variants } from 'framer-motion';
import { Eye, EyeOff, Fingerprint, Lock, Mail, Scan, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { APP_NAME, ROLES } from '../constants';
import { useAuth } from './AuthContext';

const UnifiedAuthPage: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated, user: authUser, loading, error: authError } = useAuth();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if admin credentials are entered to hide role selection
  const isAdminCredentials = email === 'admin' && password === '123';

  useEffect(() => {
    if (isAuthenticated && authUser) {
      // Map roles to dashboard routes
      const roleRouteMap: { [key: string]: string } = {
        'Administrator': 'admin', // GROW YouR NEED service owner
        'Teacher': 'teacher',
        'Student': 'student',
        'Parent': 'parent',
        'Finance': 'finance',
        'Marketing': 'marketing'
      };

      const route = roleRouteMap[authUser.role] || authUser.role.toLowerCase();
      router.push(`/dashboard/${route}`);
    }
  }, [isAuthenticated, authUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if this is admin login (service owner) - no role selection needed
    const isAdminLogin = email === 'admin' && password === '123';

    if (!isAdminLogin && !selectedRole) {
      setError('Please select a role first');
      return;
    }

    setError(null);
    try {
      // Login with email and password only
      await login(email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  const handleBiometricAuth = async () => {
    if (!selectedRole) {
      setError('Please select a role first');
      return;
    }
    alert('Biometric authentication would be implemented here');
  };

  const handleFaceIdAuth = async () => {
    if (!selectedRole) {
      setError('Please select a role first');
      return;
    }
    alert('Face ID authentication would be implemented here');
  };

  const handleSocialLogin = async (provider: string) => {
    if (!selectedRole) {
      setError('Please select a role first');
      return;
    }
    alert(`${provider} login would be implemented here`);
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customProp: number) => {
      const i = typeof customProp === 'number' ? customProp : 0;
      return {
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
      };
    },
  };

  return (
    <React.Fragment>
      <PageLoader isLoading={loading || false} />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#112250] via-[#1a2d5a] to-[#2a3f6f] text-[#F5F0E9] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#E0B58F]/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#3C507D]/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-[#E0B58F]/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-[#F5F0E9]/5 rounded-full blur-lg"></div>
      </div>

      {/* Header */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link href="/" className="text-xl font-bold text-[#E0B58F] hover:opacity-80 transition-opacity">
          {APP_NAME}
        </Link>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-4xl"
      >
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Title */}
          <motion.div
            variants={itemVariants}
            custom={0}
            initial="hidden"
            animate="visible"
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E0B58F] to-[#F5F0E9]">
              Welcome Back
            </h1>
            <p className="text-[#D9CBC2] text-lg">
              {isAdminCredentials ? 'Admin access - sign in to continue' : 'Choose your role and sign in to continue'}
            </p>
          </motion.div>

          <div className={`grid ${isAdminCredentials ? 'grid-cols-1' : 'md:grid-cols-2'} gap-8`}>
            {/* Role Selection - Hidden for admin */}
            {!isAdminCredentials && (
              <motion.div
                variants={itemVariants}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-semibold mb-6 text-[#F5F0E9]">Select Your Role</h2>
                <div className="grid grid-cols-2 gap-4">
                  {ROLES.map((role) => {
                    const RoleIcon = role.icon;
                    const isSelected = selectedRole === role.name;
                    return (
                      <motion.div
                        key={role.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRole(role.name)}
                        className={`p-4 text-center cursor-pointer rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'bg-[#E0B58F]/20 border-[#E0B58F] shadow-lg'
                            : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        <RoleIcon size={32} className={`mx-auto mb-2 ${isSelected ? 'text-[#E0B58F]' : 'text-[#D9CBC2]'}`} />
                        <h3 className={`text-sm font-medium ${isSelected ? 'text-[#E0B58F]' : 'text-[#F5F0E9]'}`}>
                          {role.name}
                        </h3>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Login Form */}
            <motion.div
              variants={itemVariants}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-semibold mb-6 text-[#F5F0E9]">Sign In</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  id="email"
                  type={isAdminCredentials ? "text" : "email"}
                  label={isAdminCredentials ? "Username" : "Email Address"}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder={isAdminCredentials ? "admin" : "you@example.com"}
                  leftIcon={<Mail size={18} className="text-[#D9CBC2]" />}
                  required
                  className="bg-white/10 border-white/20 text-[#F5F0E9] placeholder-[#D9CBC2]/70 focus:border-[#E0B58F] focus:ring-[#E0B58F] rounded-xl"
                />

                <InputField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} className="text-[#D9CBC2]" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#D9CBC2] hover:text-[#E0B58F]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  required
                  className="bg-white/10 border-white/20 text-[#F5F0E9] placeholder-[#D9CBC2]/70 focus:border-[#E0B58F] focus:ring-[#E0B58F] rounded-xl"
                />

                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="rememberMe" className="flex items-center cursor-pointer text-[#D9CBC2]">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#E0B58F] bg-white/10 border-white/20 rounded focus:ring-[#E0B58F] mr-2"
                    />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="font-medium text-[#E0B58F] hover:text-[#F5F0E9]">
                    Forgot password?
                  </Link>
                </div>

                {(error || authError) && (
                  <p className="text-sm text-red-400 text-center">
                    {error || authError}
                  </p>
                )}

                <OptimizedButton
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#E0B58F] to-[#d3a57e] border-0 shadow-xl"
                  size="lg"
                  loading={loading}
                  variant="default"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </OptimizedButton>
              </form>

              {/* Alternative Authentication Methods */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white/10 text-[#D9CBC2] rounded-lg">Or continue with</span>
                  </div>
                </div>

                {/* Biometric & Face ID */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <OptimizedButton
                    variant="outline"
                    onClick={handleFaceIdAuth}
                    className="w-full rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-[#F5F0E9] flex items-center justify-center"
                  >
                    <Scan size={20} className="mr-2" />
                    Face ID
                  </OptimizedButton>
                  <OptimizedButton
                    variant="outline"
                    onClick={handleBiometricAuth}
                    className="w-full rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-[#F5F0E9] flex items-center justify-center"
                  >
                    <Fingerprint size={20} className="mr-2" />
                    Biometric
                  </OptimizedButton>
                </div>

                {/* Social Login */}
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    { icon: User, label: 'Facebook', color: '#1877F2' },
                    { icon: User, label: 'Twitter', color: '#1DA1F2' },
                    { icon: User, label: 'LinkedIn', color: '#0A66C2' },
                  ].map((provider) => (
                    <OptimizedButton
                      key={provider.label}
                      variant="outline"
                      onClick={() => handleSocialLogin(provider.label)}
                      className="w-full rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-[#F5F0E9] flex items-center justify-center"
                    >
                      <provider.icon size={20} />
                    </OptimizedButton>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-8 text-center text-sm text-[#D9CBC2]/70 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </motion.p>
      </div>
    </React.Fragment>
  );
};

export default UnifiedAuthPage;
export { UnifiedAuthPage };
