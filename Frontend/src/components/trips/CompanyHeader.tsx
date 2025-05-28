
import { Building } from "lucide-react";
import { Link } from "react-router-dom";

interface CompanyHeaderProps {
  companyName: string | null;
  companyId?: string | null;
  isCompanyView?: boolean;
}

const CompanyHeader = ({ companyName, companyId, isCompanyView = false }: CompanyHeaderProps) => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        {companyId && (
          <div className="flex items-center gap-3 mb-2">
            <Link to="/companies" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
              ← Back to Companies
            </Link>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Building size={40} className="text-primary-foreground" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">
            {companyName || (isCompanyView ? "My Company" : "Company")} Dashboard
          </h1>
        </div>
        <p className="text-primary-foreground/80 mt-2 ml-10">
          {companyId 
            ? `Explore the adventures offered by ${companyName || 'this company'}`
            : isCompanyView 
            ? "Manage your hiking adventures and track bookings" 
            : "View all available hiking adventures"}
        </p>
      </div>
    </section>
  );
};

export default CompanyHeader;
