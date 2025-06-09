import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BASE_URL } from '@/lib/constant';
import { supabase } from '@/lib/supabase';
import { isValidEmail } from '@/lib/utils';
import { ArrowRight, CheckCircle, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isSuccessSend, setIsSuccessSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithEmail() {
    if (!userEmail.trim()) {
      toast.error('Email is required');
      return;
    }

    const isValid = isValidEmail(userEmail);
    if (!isValid) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: userEmail,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${BASE_URL}/dashboard`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Magic link sent to your email!');
      setIsSuccessSend(true);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSuccessSend && !isLoading) {
      signInWithEmail();
    }
  };

  const resetForm = () => {
    setIsSuccessSend(false);
    setUserEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-black/80 border-white/20 shadow-xl">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-xl font-semibold text-center text-black dark:text-white">
              {isSuccessSend ? 'Check Your Email' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              {isSuccessSend
                ? 'We sent a secure login link to your email'
                : 'Enter your email to receive a magic link'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isSuccessSend ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isLoading}
                      className="pl-10 h-12 bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white transition-all duration-200"
                    />
                  </div>
                </div>

                <Button
                  onClick={signInWithEmail}
                  disabled={isLoading || !userEmail.trim()}
                  className="w-full h-12 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Send Magic Link
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {`No password required. We'll send you a secure link to sign in.`}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-black dark:text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-black dark:text-white">Magic link sent!</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {`We've sent a secure login link to:`}
                    </p>
                    <p className="font-medium text-black dark:text-white bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-lg text-sm">
                      {userEmail}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-medium text-black dark:text-white">
                      {`What's next?`}
                    </h4>
                    <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          1
                        </span>
                        Check your email inbox
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          2
                        </span>
                        {`Click the "Sign In" button in the email`}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          3
                        </span>
                        {`You'll be automatically logged in`}
                      </li>
                    </ol>
                  </div>

                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="w-full h-12 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
                  >
                    Use Different Email
                  </Button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {`Didn't receive the email? Check your spam folder or try again.`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Secure authentication powered by Supabase
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
