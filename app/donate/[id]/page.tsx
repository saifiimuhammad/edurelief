"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Lock, CreditCard, User, MessageCircle } from 'lucide-react';
import { Database } from '@/lib/database';
import { StripeService } from '@/lib/stripe';

export default function DonatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  useEffect(() => {
    if (id) {
      loadStudentData();
    }
  }, [id]);

  const loadStudentData = async () => {
    setLoading(true);
    try {
      const studentData = await Database.getStudentById(id as string);
      if (studentData) {
        setStudent(studentData);
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setDonationAmount(amount.toString());
  };

  const handleCustomAmount = (value: string) => {
    setDonationAmount(value);
    setSelectedAmount(null);
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(donationAmount);
    if (!amount || amount < 5) {
      alert('Minimum donation amount is $5');
      return;
    }

    if (!donorEmail) {
      alert('Please enter your email address');
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const paymentIntent = await StripeService.createPaymentIntent(amount);
      
      // Simulate successful payment (in real app, this would go through Stripe)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Record donation
      await Database.addDonation({
        donorEmail,
        studentId: student.id,
        amount,
        message: message || undefined,
        paymentId: paymentIntent.id
      });

      // Redirect to success page
      router.push(`/donate/${id}/success?amount=${amount}&student=${encodeURIComponent(student.name)}`);
    } catch (error) {
      console.error('Donation error:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading donation page...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!student) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Student Not Found</h1>
            <p className="text-gray-600 mb-4">Unable to process donation.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const progressPercentage = Math.min((student.raisedAmount / student.targetAmount) * 100, 100);
  const remainingAmount = Math.max(student.targetAmount - student.raisedAmount, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Info */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-green-600" />
                    Support {student.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{student.name}</h3>
                    <p className="text-sm text-gray-600">
                      {student.course} at {student.university}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        ${student.raisedAmount.toLocaleString()} of ${student.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">
                        {progressPercentage.toFixed(0)}% funded
                      </span>
                      <span className="text-gray-600">
                        ${remainingAmount.toLocaleString()} to go
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Their Story</h4>
                    <p className="text-sm text-gray-700 line-clamp-4">
                      {student.story}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                    Make a Donation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonate} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Choose Amount
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {suggestedAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className={`py-3 ${selectedAmount === amount ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            onClick={() => handleAmountSelect(amount)}
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">$</span>
                        <Input
                          type="number"
                          placeholder="Custom amount"
                          min="5"
                          step="0.01"
                          value={donationAmount}
                          onChange={(e) => handleCustomAmount(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Minimum donation: $5
                      </p>
                    </div>

                    {/* Donor Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="h-4 w-4 inline mr-1" />
                        Your Email
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        For donation receipt and updates
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MessageCircle className="h-4 w-4 inline mr-1" />
                        Message to {student.name} (Optional)
                      </label>
                      <Textarea
                        placeholder="Share words of encouragement..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Donation Button */}
                    <Button
                      type="submit"
                      disabled={processing || !donationAmount || !donorEmail}
                      className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="h-5 w-5 mr-2" />
                          Donate ${donationAmount || '0'}
                        </>
                      )}
                    </Button>

                    {/* Security Note */}
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Lock className="h-4 w-4" />
                      <span>Secure payment processing via Stripe</span>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Impact Note */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Your Impact</h4>
                <p className="text-sm text-green-800">
                  100% of your donation goes directly to {student.name}'s education. 
                  You'll receive updates on their progress and achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}