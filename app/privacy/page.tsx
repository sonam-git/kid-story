'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header - Only show if logged in */}
      {user && <Header />}

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">ImagiKids</p>
            <p className="text-sm text-gray-500 mt-2">
              Effective Date: January 10, 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700">
            <p className="text-lg leading-relaxed">
              ImagiKids (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is a kid-focused bedtime story application created by a parent for parents. 
              ImagiKids allows parents and guardians to create personalized stories and images for their children using artificial intelligence.
            </p>

            <p className="text-lg leading-relaxed">
              We care deeply about children&apos;s privacy and are committed to protecting it. This Privacy Policy explains what 
              information we collect, how we use it, and the rights parents have regarding their child&apos;s data.
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Who ImagiKids Is For</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ImagiKids is designed for children ages 3–8, but accounts and story creation must be handled by parents or legal guardians.</li>
                <li><strong>Children are not permitted to create accounts on their own.</strong></li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect only the minimum information needed to operate the app.</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Parent/guardian account information (such as email)</li>
                <li>Story prompts entered by parents</li>
                <li>Character names and story descriptions</li>
                <li>AI-generated stories and images</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">What We Do NOT Collect</h3>
              <ul className="space-y-2 ml-4 mb-4">
                <li>❌ Real names of children (not required)</li>
                <li>❌ Phone numbers</li>
                <li>❌ Home addresses</li>
                <li>❌ Precise location data</li>
                <li>❌ Social media information</li>
                <li>❌ Audio, video, or live communication data</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-yellow-800">
                  <strong>⚠️ Please do not enter real personal information about your child into story prompts.</strong>
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Children&apos;s Privacy (COPPA Compliance)</h2>
              <p className="mb-3">ImagiKids complies with the Children&apos;s Online Privacy Protection Act (COPPA).</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We do not knowingly collect personal information directly from children.</li>
                <li>All content is created under parental supervision.</li>
                <li>Parents control all stored content and can delete it at any time.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. How AI Is Used</h2>
              <p className="mb-3">ImagiKids uses artificial intelligence to create stories and images:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>OpenAI is used to generate stories from prompts.</li>
                <li>Replicate is used to generate images.</li>
                <li>Prompts are processed only to generate the requested content and are not used to identify users.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Data Storage & Security</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Stories and images are stored in a database so registered users can access them later.</li>
                <li>Users may permanently delete any story or image at any time.</li>
                <li>Once deleted, content is removed permanently from our database.</li>
                <li>We use reasonable technical and organizational measures to protect stored data.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Third-Party Services</h2>
              <p className="mb-3">ImagiKids uses trusted third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                <li><strong>MongoDB</strong> – database storage</li>
                <li><strong>Cloudinary</strong> – image storage</li>
                <li><strong>OpenAI</strong> – AI story generation</li>
                <li><strong>Replicate</strong> – AI image generation</li>
              </ul>
              <p>These services follow industry-standard security practices.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Data Access & Deletion (Parent Rights)</h2>
              <p className="mb-3">Parents have full control over their content:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>View all created stories and images</li>
                <li>Delete content permanently at any time</li>
                <li>Request account deletion</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. No Ads & No Social Features</h2>
              <p className="mb-3">To protect children:</p>
              <ul className="space-y-2 ml-4">
                <li>✅ No advertisements</li>
                <li>✅ No chat between users</li>
                <li>✅ No public profiles</li>
                <li>✅ No social sharing by default</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Updates will be posted in the app or on our website.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Us</h2>
              <p>If you have any questions or requests:</p>
              <p className="mt-2">
                📧 Email:{' '}
                <a
                  href="mailto:sherpa.sjs@gmail.com"
                  className="text-purple-600 hover:text-purple-800 font-semibold underline"
                >
                  sherpa.sjs@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
