// src/pages/Privacy.tsx

import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 space-y-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="text-muted-foreground text-center mb-10">
          Learn how HikeJo collects, uses, and protects your personal
          information.
        </p>

        {/* SECTION: Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            At HikeJo, we respect your privacy and are committed to protecting
            your personal data. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information.
          </p>
          <p className="text-muted-foreground">
            By accessing or using HikeJo, you agree to all terms of this Privacy
            Policy.
          </p>
        </section>

        {/* SECTION: Information We Collect */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>

          <div>
            <h3 className="text-xl font-medium">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
              <li>
                <strong>Adventurers:</strong> Name, email, contact info, and
                profile data.
              </li>
              <li>
                <strong>Companies:</strong> Company name, Company ID, business
                details, and documents.
              </li>
              <li>Payment details (handled by secure third parties).</li>
              <li>User communications with HikeJo.</li>
              <li>Trip reviews and ratings submitted by users.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              2.2 Non-Personal Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
              <li>Browser type and version</li>
              <li>Device and OS information</li>
              <li>IP address</li>
              <li>Website usage patterns</li>
              <li>Referral sources</li>
            </ul>
          </div>
        </section>

        {/* SECTION: Company Verification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Company Verification Data
          </h2>
          <p className="text-muted-foreground">
            To verify hiking providers, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Business registration, permits, certifications, and insurance
              info.
            </li>
            <li>
              Used solely for verification and issuing a unique Company ID.
            </li>
            <li>Documents are securely archived post-verification.</li>
          </ul>
          <p className="text-muted-foreground mt-2">
            <strong>Note:</strong> The Company ID is shown publicly as proof of
            verification.
          </p>
        </section>

        {/* SECTION: Use of Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To operate and improve our services</li>
            <li>To verify companies</li>
            <li>To facilitate trip bookings and communication</li>
            <li>To process payments</li>
            <li>To personalize your experience</li>
            <li>To analyze trends and optimize the platform</li>
            <li>To ensure security and comply with laws</li>
          </ul>
        </section>

        {/* SECTION: Data Sharing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Data Sharing and Disclosure
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Service Providers:</strong> For payment and data
              analytics.
            </li>
            <li>
              <strong>Platform Users:</strong> Limited info for communication
              and bookings.
            </li>
            <li>
              <strong>Legal Requirements:</strong> As mandated by law.
            </li>
          </ul>
          <p className="text-muted-foreground mt-2">
            We do <strong>not</strong> sell your personal information.
          </p>
        </section>

        {/* SECTION: Data Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Data Security</h2>
          <p className="text-muted-foreground">
            We apply strong security measures, but no system is 100% secure.
            Always use strong passwords and secure your account.
          </p>
        </section>

        {/* SECTION: Your Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request data deletion</li>
            <li>Restrict or object to processing</li>
            <li>Request data portability</li>
          </ul>
          <p className="text-muted-foreground mt-2">
            Contact us at:{" "}
            <a
              href="mailto:privacy@hikejo.com"
              className="text-primary hover:underline"
            >
              privacy@hikejo.com
            </a>
          </p>
        </section>

        {/* SECTION: Cookies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Cookies and Tracking Technologies
          </h2>
          <p className="text-muted-foreground">
            We use cookies to enhance your experience. You can control cookies
            in your browser settings.
          </p>
        </section>

        {/* SECTION: Children's Privacy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Children’s Privacy</h2>
          <p className="text-muted-foreground">
            We do not knowingly collect data from individuals under 18. If you
            become aware of such data being shared, please contact us.
          </p>
        </section>

        {/* SECTION: Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-muted-foreground">
            We may update this policy and post changes here. The last updated
            date will reflect the latest version.
          </p>
        </section>

        {/* SECTION: Contact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Contact Us</h2>
          <p className="text-muted-foreground">
            For any privacy-related concerns, contact us at{" "}
            <a
              href="mailto:privacy@hikejo.com"
              className="text-primary hover:underline"
            >
              privacy@hikejo.com
            </a>
            .
          </p>
        </section>

        {/* Footer Info */}
        <div className="flex justify-between items-center border-t pt-8">
          <p className="text-sm text-muted-foreground">
            Last updated: May 6, 2025
          </p>
          <a
            href="/terms"
            className="flex items-center text-primary hover:underline"
          >
            Terms & Conditions <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
