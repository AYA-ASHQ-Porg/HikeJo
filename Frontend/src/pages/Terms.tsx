// src/pages/Terms.tsx

import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 space-y-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground text-center mb-10">
          Please read these terms carefully before using HikeJo.
        </p>

        {/* Section 1: Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to HikeJo. These Terms & Conditions govern your use of our
            website and services. By accessing or using HikeJo, you agree to be
            bound by these Terms. If you do not agree, please do not use our
            platform.
          </p>
        </section>

        {/* Section 2: Definitions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>HikeJo:</strong> The platform and services offered at
              hikejo.com.
            </li>
            <li>
              <strong>User:</strong> Anyone who accesses or uses HikeJo.
            </li>
            <li>
              <strong>Adventurer:</strong> A user seeking hiking experiences.
            </li>
            <li>
              <strong>Company:</strong> A verified provider with a unique HikeJo
              Company ID.
            </li>
            <li>
              <strong>Trip:</strong> A hiking activity offered on the platform.
            </li>
            <li>
              <strong>Ticket:</strong> Confirmation of a booked trip.
            </li>
          </ul>
        </section>

        {/* Section 3: Company Verification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Company Verification Process
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Companies must request verification directly from HikeJo.</li>
            <li>
              We review documents such as business registration and permits.
            </li>
            <li>
              Verified businesses are issued a unique, non-transferable Company
              ID.
            </li>
            <li>
              Use of false credentials will result in account suspension and
              possible legal action.
            </li>
          </ul>
          <p className="text-muted-foreground mt-2">
            <strong>Note:</strong> This process ensures safety and credibility
            on our platform.
          </p>
        </section>

        {/* Section 4: User Accounts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Adventurers can register with a valid email address.</li>
            <li>
              Companies must complete the verification process before
              registering.
            </li>
            <li>
              Users are responsible for keeping their account credentials
              secure.
            </li>
            <li>All information provided must be accurate and up to date.</li>
          </ul>
        </section>

        {/* Section 5: Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Services</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Companies list hiking trips on the platform.</li>
            <li>Adventurers browse and book trips.</li>
            <li>Users can rate and review trips they participated in.</li>
          </ul>
          <p className="text-muted-foreground mt-2">
            HikeJo acts as an intermediary and is not responsible for trip
            delivery.
          </p>
        </section>

        {/* Section 6: Trip Booking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Trip Booking and Ticket Policies
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Booking:</strong> Trips must be booked at least 5 days in
              advance.
            </li>
            <li>
              <strong>Tickets:</strong> Issued by the company no later than 5
              days before the trip.
            </li>
            <li>
              <strong>Editing:</strong> Trips cannot be modified or deleted
              within 5 days of the trip date.
            </li>
            <li>
              <strong>Late Bookings:</strong> Must be arranged outside the
              platform directly with the company.
            </li>
          </ul>
        </section>

        {/* Section 7: Fees */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Fees and Payments</h2>
          <p className="text-muted-foreground">
            HikeJo may charge service fees, which are shown before checkout.
            Companies are responsible for their pricing.
          </p>
        </section>

        {/* Section 8: Intellectual Property */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Intellectual Property</h2>
          <p className="text-muted-foreground">
            HikeJo’s name, logo, content, and design are protected. You may not
            copy, modify, or reuse our content without permission.
          </p>
        </section>

        {/* Section 9: Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Limitation of Liability</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>We are not liable for service quality from companies.</li>
            <li>We do not guarantee trip safety or accuracy of listings.</li>
            <li>Participation is at your own risk.</li>
            <li>We are not responsible for external ticketing services.</li>
          </ul>
        </section>

        {/* Section 10: Termination */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Termination</h2>
          <p className="text-muted-foreground">
            We may suspend or terminate accounts at our discretion if terms are
            violated or abuse is detected.
          </p>
        </section>

        {/* Section 11: Changes to Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We may modify these Terms at any time. Updates will be posted on
            this page. Continued use of HikeJo means acceptance of updated
            terms.
          </p>
        </section>

        {/* Section 12: Governing Law */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms are governed by the laws of Jordan.
          </p>
        </section>

        {/* Section 13: Contact Us */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Contact Us</h2>
          <p className="text-muted-foreground">
            For questions or concerns, contact us at{" "}
            <a
              href="mailto:legal@hikejo.com"
              className="text-primary hover:underline"
            >
              legal@hikejo.com
            </a>
            .
          </p>
        </section>

        {/* Footer */}
        <div className="flex justify-between items-center border-t pt-8">
          <p className="text-sm text-muted-foreground">
            Last updated: May 18, 2025
          </p>
          <a
            href="/privacy"
            className="flex items-center text-primary hover:underline"
          >
            Privacy Policy <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
