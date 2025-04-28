import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import Layout from '../components/Layout';
import CheckoutForm from '../components/CheckoutForm';
import { getStripe } from '../lib/stripe';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Checkout() {
  const router = useRouter();
  const { plan } = router.query;
  const [user, loading] = useAuthState(auth);
  const [planDetails, setPlanDetails] = useState(null);
  
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(`/checkout?plan=${plan}`)}`);
    }
  }, [user, loading, router, plan]);

  useEffect(() => {
    if (plan) {
      // Set the plan details based on the selected plan
      switch (plan) {
        case 'basic':
          setPlanDetails({
            id: 'basic',
            name: 'Basic',
            price: 470,
            discount: 0,
            totalPrice: 470,
            isAnnual: true
          });
          break;
        case 'pro':
          setPlanDetails({
            id: 'pro',
            name: 'Pro',
            price: 950,
            discount: 0,
            totalPrice: 950,
            isAnnual: true
          });
          break;
        case 'enterprise':
          setPlanDetails({
            id: 'enterprise',
            name: 'Enterprise',
            price: 1900,
            discount: 0,
            totalPrice: 1900,
            isAnnual: true
          });
          break;
        default:
          // Redirect to pricing page if no valid plan is selected
          router.push('/pricing');
      }
    }
  }, [plan, router]);

  if (loading || !user || !planDetails) {
    return (
      <Layout title="Checkout - AI Professionals University">
        <div className="container-custom py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout - AI Professionals University">
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-center mb-8">Complete Your Purchase</h1>
          
          <Elements stripe={getStripe()}>
            <CheckoutForm planDetails={planDetails} />
          </Elements>
        </div>
      </div>
    </Layout>
  );
} 