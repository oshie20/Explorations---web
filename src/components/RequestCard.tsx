import { Add, More } from "iconsax-react";
import { AnimatedNumber } from "./AnimatedNumber";

interface RequestCardProps {
  title: string;
  submitted: { count: number; amount: string };
  pending: { count: number; amount: string };
  overdue: { count: number; amount: string };
  total: { count: number; amount: string };
}

export function RequestCard({
  title,
  submitted,
  pending,
  overdue,
  total,
}: RequestCardProps) {
  return (
    <div className="bg-white border border-[#EDEFF4] flex-1 min-w-0" style={{ borderRadius: "16px", boxShadow: "0 2px 2px rgba(0,0,0,0.02)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[#EDEFF4]">
        <h3 className="text-base font-semibold text-[#272835]">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#EDEFF4] hover:bg-[#f4f5f8] transition-colors">
            <Add size={16} color="#808897" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#EDEFF4] hover:bg-[#f4f5f8] transition-colors">
            <More size={16} color="#808897" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 sm:px-5 py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#808897]">Submitted</p>
          <p className="text-lg font-bold text-[#272835]">
            <AnimatedNumber value={String(submitted.count)} duration={2000} />
          </p>
          <p className="text-sm text-[#808897] font-medium">
            <AnimatedNumber value={submitted.amount} duration={2000} />
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#808897]">Pending approval</p>
          <p className="text-lg font-bold text-[#272835]">
            <AnimatedNumber value={String(pending.count)} duration={2000} />
          </p>
          <p className="text-sm text-[#808897] font-medium">
            <AnimatedNumber value={pending.amount} duration={2000} />
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#808897]">Overdue</p>
          <p className="text-lg font-bold text-[#272835]">
            <AnimatedNumber value={String(overdue.count)} duration={2000} />
          </p>
          <p className="text-sm text-[#808897] font-medium">
            <AnimatedNumber value={overdue.amount} duration={2000} />
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 sm:mx-5 border-t border-[#EDEFF4]" />

      {/* Footer */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-[#808897]" style={{ fontSize: "14px" }}>Total requests</p>
          <div className="flex items-center gap-2 text-[#272835] font-medium" style={{ fontSize: "16px" }}>
            <span>
              <AnimatedNumber value={`${total.count} requests`} duration={2000} />
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EDEFF4] inline-block" />
            <span>
              <AnimatedNumber value={total.amount} duration={2000} />
            </span>
          </div>
        </div>
        <button className="text-sm font-medium text-[#3e50f7] hover:text-[#6573f9] transition-colors">
          View
        </button>
      </div>
    </div>
  );
}
