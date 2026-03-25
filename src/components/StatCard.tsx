import type { ReactNode } from "react";
import { AnimatedNumber } from "./AnimatedNumber";

const iconProps = { width: 20, height: 20, fill: "none" as const, stroke: "currentColor", strokeWidth: 1.5 };

function Clock01Icon() {
  return (
    <svg {...iconProps} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39759 1.66667 1.66663 5.39763 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6.66667V10L11.6667 11.6667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Loading01Icon() {
  return (
    <svg {...iconProps} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.3346 1.66667H5.66576C4.45096 1.66667 3.38514 2.48726 3.33646 3.66963C3.2752 5.15733 4.32149 6.14519 5.42041 7.07259C6.94063 8.3555 7.70075 8.997 7.78047 9.809C7.79295 9.93609 7.79295 10.0639 7.78047 10.191C7.70075 11.003 6.94064 11.6445 5.42041 12.9274C4.29122 13.8803 3.27204 14.7663 3.33646 16.3303C3.38514 17.5128 4.45096 18.3333 5.66576 18.3333H14.3346C15.5494 18.3333 16.6152 17.5128 16.6639 16.3303C16.7026 15.389 16.3538 14.4517 15.6128 13.8C15.275 13.5028 14.9242 13.2179 14.58 12.9274C13.0597 11.6445 12.2996 11.003 12.2199 10.191C12.2074 10.0639 12.2074 9.93609 12.2199 9.809C12.2996 8.997 13.0597 8.3555 14.58 7.07259C15.6973 6.12965 16.7275 5.21508 16.6639 3.66963C16.6152 2.48726 15.5494 1.66667 14.3346 1.66667Z" />
      <path d="M7.5 18.0317C7.5 17.6635 7.5 17.4793 7.573 17.3184C7.58459 17.2928 7.59749 17.2678 7.61166 17.2436C7.70084 17.0908 7.85176 16.983 8.1536 16.7673C8.99208 16.1684 9.41125 15.8689 9.88767 15.8371C9.9625 15.8321 10.0375 15.8321 10.1123 15.8371C10.5887 15.8689 11.0079 16.1684 11.8464 16.7673C12.1483 16.983 12.2992 17.0908 12.3883 17.2436C12.4025 17.2678 12.4154 17.2928 12.427 17.3184C12.5 17.4793 12.5 17.6635 12.5 18.0317V18.3333H7.5V18.0317Z" strokeLinecap="round" />
    </svg>
  );
}

function CheckmarkCircle02Icon() {
  return (
    <svg {...iconProps} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6023 5.39765 18.3333 10 18.3333C14.6024 18.3333 18.3334 14.6023 18.3334 10Z" />
      <path d="M6.66669 10.4167L8.75002 12.5L13.3334 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoneySendCircleIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6667 1.83337C11.1282 1.72406 10.5707 1.66667 9.99999 1.66667C5.39761 1.66667 1.66666 5.39763 1.66666 10C1.66666 14.6023 5.39761 18.3333 9.99999 18.3333C14.6023 18.3333 18.3333 14.6023 18.3333 10C18.3333 9.42925 18.2759 8.87184 18.1667 8.33334" strokeLinecap="round" />
      <path d="M10 7.50001C9.07951 7.50001 8.33334 8.05965 8.33334 8.75001C8.33334 9.44034 9.07951 10 10 10C10.9205 10 11.6667 10.5597 11.6667 11.25C11.6667 11.9403 10.9205 12.5 10 12.5M10 7.50001C10.7257 7.50001 11.343 7.84784 11.5718 8.33334M10 7.50001V6.66667M10 12.5C9.27434 12.5 8.65701 12.1522 8.42818 11.6667M10 12.5V13.3333" strokeLinecap="round" />
      <path d="M14.165 5.83496L17.645 2.35312M18.3317 5.40016L18.2332 2.82391C18.2332 2.21671 17.8707 1.83839 17.2103 1.79067L14.6069 1.66829" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const StatCardIcons = {
  clock01: Clock01Icon,
  loading01: Loading01Icon,
  checkmarkCircle02: CheckmarkCircle02Icon,
  moneySendCircle: MoneySendCircleIcon,
};

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 sm:p-5 flex flex-col gap-6 sm:gap-8 flex-1 min-w-0" style={{ border: "1px solid #EDEFF4", borderRadius: "16px", boxShadow: "0 2px 2px rgba(0,0,0,0.02)" }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#F8F8F9", color: "#353849" }}>
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[#808897]" style={{ fontSize: "14px", fontWeight: 500 }}>{label}</p>
        <p className="font-medium text-[#272835] tracking-tight" style={{ fontSize: "18px" }}>
          <AnimatedNumber value={value} duration={2000} />
        </p>
      </div>
    </div>
  );
}
