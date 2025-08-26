import { type ReactNode } from "react";

interface PageCardProps {
  title: string;
  children: ReactNode;
}

export const PageCard = ({ title, children }: PageCardProps) => {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
};
