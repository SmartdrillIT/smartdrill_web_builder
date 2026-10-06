import type { ReactNode } from "react";

interface ProcessCardProps {
  icon: ReactNode;
  step: string;
  title: string;
  desc: string;
}

export default function ProcessCard({ icon, step, title, desc }: ProcessCardProps) {
  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">
      <div className="flex justify-between items-start mb-12">
        {icon}
        <span className="text-2xl font-black text-zinc-300">{step}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-zinc-900">{title}</h3>
      <p className="text-zinc-500 font-medium">{desc}</p>
    </div>
  );
}
