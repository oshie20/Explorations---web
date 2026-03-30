
function Add01Icon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M10.0009 4.16669V15.835" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.835 10.0017H4.16663" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="10" cy="5" r="1.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="15" r="1.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FilterLinesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

import { useEffect, useState } from "react";
import { StatCard, StatCardIcons } from "@/components/StatCard";
import { RequestCard } from "@/components/RequestCard";
import { PendingTable } from "@/components/PendingTable";
import { NewExpenseFlow } from "../components/NewExpenseFlow";
import type { ExpenseDraftData } from "../components/NewExpenseFlow";

export function ExpenseOverview() {
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const [drafts, setDrafts] = useState<ExpenseDraftData[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<ExpenseDraftData | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("expense-drafts");
      if (!raw) return;
      const parsed = JSON.parse(raw) as ExpenseDraftData[];
      if (Array.isArray(parsed)) setDrafts(parsed);
    } catch {
      // Ignore malformed persisted draft payloads.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("expense-drafts", JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    if (!showSavedToast) return;
    const timer = window.setTimeout(() => setShowSavedToast(false), 2600);
    return () => window.clearTimeout(timer);
  }, [showSavedToast]);

  function handleSaveDraft(draft: ExpenseDraftData) {
    setDrafts((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === draft.id);
      if (existingIdx === -1) return [draft, ...prev];
      const next = [...prev];
      next[existingIdx] = draft;
      return next.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    });
    setSelectedDraft(null);
    setShowSavedToast(true);
    setNewExpenseOpen(false);
  }

  function handleOpenDraft(draft: ExpenseDraftData) {
    setSelectedDraft(draft);
    setNewExpenseOpen(true);
  }

  const statCards = [
    { icon: <StatCardIcons.moneySendCircle />, label: "Total Spend", value: "$35,000.00" },
    { icon: <StatCardIcons.checkmarkCircle02 />, label: "Approved (Unpaid)", value: "$8,420.00" },
    { icon: <StatCardIcons.loading01 />, label: "Pending approval", value: "17 requests" },
    { icon: <StatCardIcons.clock01 />, label: "Overdue", value: "24 requests" },
  ];

  const requestCards = [
    {
      title: "Expense requests",
      submitted: { count: 27, amount: "$3,600" },
      pending: { count: 11, amount: "$2,450" },
      overdue: { count: 20, amount: "$1,970" },
      total: { count: 58, amount: "$8,020" },
    },
    {
      title: "Reimbursement requests",
      submitted: { count: 14, amount: "$2,850" },
      pending: { count: 6, amount: "$2,850" },
      overdue: { count: 4, amount: "$2,850" },
      total: { count: 24, amount: "$8,420" },
    },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col mx-2 sm:mx-4 lg:mx-0 lg:mr-3" style={{ background: "white", border: "1px solid #EDEFF4", borderRadius: "24px 24px 0 0", overflow: "hidden" }}>
      <div className="flex-1 min-h-0 overflow-y-auto w-full">
      <div className="px-4 sm:px-6 lg:px-[60px] py-4 sm:py-6 lg:py-7 flex flex-col" style={{ gap: "24px" }}>
        {/* Page heading + actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg sm:text-[22px] font-semibold text-[#272835] tracking-tight">
            Expense Overview
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-4 h-10 text-sm font-medium border border-[#EDEFF4] rounded-lg text-[#272835] hover:bg-[#f4f5f8] transition-colors">
              <FilterLinesIcon />
              Filters
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDraft(null);
                setNewExpenseOpen(true);
              }}
              className="inline-flex items-center gap-1.5 text-white font-medium transition-opacity hover:opacity-90"
              style={{ height: "40px", padding: "0 18px", fontSize: "14px", cursor: "pointer", borderRadius: "12px", border: "1px solid #6573F9", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(355deg, #625AFF 3.89%, #645CFF 95.37%)", boxShadow: "none" }}
            >
              <Add01Icon />
              Add expense
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:opacity-90 transition-opacity" style={{ background: "#272835" }}>
              <DotsVerticalIcon />
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
          {statCards.map((card, i) => (
            <div key={card.label} className="reveal-card" style={{ animationDelay: `${i * 120}ms` }}>
              <StatCard icon={card.icon} label={card.label} value={card.value} />
            </div>
          ))}
        </div>

        {/* Request cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "24px" }}>
          {requestCards.map((card, j) => (
            <div key={card.title} className="reveal-card" style={{ animationDelay: `${(statCards.length + j) * 120}ms` }}>
              <RequestCard {...card} />
            </div>
          ))}
        </div>

        {/* Pending requests table */}
        <div className="reveal-card" style={{ animationDelay: `${(statCards.length + requestCards.length) * 120}ms` }}>
          <PendingTable draftItems={drafts} onOpenDraft={handleOpenDraft} />
        </div>
      </div>
      </div>
      <NewExpenseFlow
        open={newExpenseOpen}
        initialDraft={selectedDraft}
        onClose={() => {
          setSelectedDraft(null);
          setNewExpenseOpen(false);
        }}
        onSaveDraft={handleSaveDraft}
      />
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-[320] rounded-[12px] border border-[#DFE1E6] bg-white px-4 py-3 text-sm font-medium text-[#272835] shadow-[0_10px_24px_rgba(13,13,18,0.12)]">
          Expense saved to drafts
        </div>
      )}
    </div>
  );
}
