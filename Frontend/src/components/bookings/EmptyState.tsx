
import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 border border-dashed border-border rounded-lg">
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default EmptyState;
