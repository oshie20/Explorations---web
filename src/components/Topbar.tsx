import { SearchNormal1 } from "iconsax-react";
import { CURRENT_USER_AVATAR_SRC } from "@/lib/currentUser";

function NotificationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M15.8333 15V7.91667C15.8333 4.69501 13.2216 2.08333 9.99996 2.08333C6.7783 2.08333 4.16663 4.69501 4.16663 7.91667V15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.0833 15H2.91663" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.25 16.6667C11.25 17.357 10.6903 17.9167 10 17.9167M10 17.9167C9.30967 17.9167 8.75 17.357 8.75 16.6667M10 17.9167V16.6667" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function AskLyraIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 ${className ?? ""}`}>
      <path d="M15.8334 18.3333C15.8334 18.7936 15.4603 19.1667 15 19.1667C14.5398 19.1667 14.1667 18.7936 14.1667 18.3333C14.1667 17.8731 14.5398 17.5 15 17.5C15.4603 17.5 15.8334 17.8731 15.8334 18.3333Z" fill="currentColor" />
      <path d="M19.1667 15C19.1667 15.4602 18.7936 15.8333 18.3334 15.8333C17.8731 15.8333 17.5 15.4602 17.5 15C17.5 14.5398 17.8731 14.1667 18.3334 14.1667C18.7936 14.1667 19.1667 14.5398 19.1667 15Z" fill="currentColor" />
      <path d="M2.50004 5C2.50004 5.46024 2.12694 5.83333 1.66671 5.83333C1.20647 5.83333 0.833374 5.46024 0.833374 5C0.833374 4.53976 1.20647 4.16667 1.66671 4.16667C2.12694 4.16667 2.50004 4.53976 2.50004 5Z" fill="currentColor" />
      <path d="M5.83337 1.66667C5.83337 2.1269 5.46028 2.5 5.00004 2.5C4.5398 2.5 4.16671 2.1269 4.16671 1.66667C4.16671 1.20643 4.5398 0.833334 5.00004 0.833334C5.46028 0.833334 5.83337 1.20643 5.83337 1.66667Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10 5.40243L9.45654 7.64381C9.23929 8.53973 8.53977 9.23925 7.64385 9.4565L5.40247 10L7.64385 10.5435C8.53977 10.7608 9.23929 11.4603 9.45654 12.3562L10 14.5976L10.5435 12.3562C10.7608 11.4603 11.4603 10.7608 12.3562 10.5435L14.5976 10L12.3562 9.4565C11.4603 9.23925 10.7608 8.53973 10.5435 7.64381L10 5.40243ZM11.0877 4.1888C10.8112 3.04818 9.18893 3.04818 8.91234 4.1888L8.1513 7.32731C8.05255 7.73455 7.73459 8.05251 7.32735 8.15126L4.18884 8.9123C3.04822 9.18889 3.04822 10.8111 4.18884 11.0877L7.32735 11.8487C7.73459 11.9475 8.05255 12.2655 8.1513 12.6727L8.91234 15.8112C9.18893 16.9518 10.8112 16.9518 11.0877 15.8112L11.8488 12.6727C11.9475 12.2655 12.2655 11.9475 12.6727 11.8487L15.8112 11.0877C16.9519 10.8111 16.9519 9.18889 15.8112 8.9123L12.6727 8.15126C12.2655 8.05251 11.9475 7.73455 11.8488 7.32731L11.0877 4.1888Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.50389 18.5956C7.35905 18.9836 6.92705 19.1808 6.53898 19.036C4.02529 18.0978 2.00614 16.1501 0.974819 13.6857C0.814914 13.3036 0.995041 12.8642 1.37714 12.7043C1.75925 12.5444 2.19863 12.7245 2.35854 13.1066C3.23021 15.1895 4.93882 16.8377 7.0635 17.6307C7.45156 17.7755 7.64873 18.2075 7.50389 18.5956Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.5961 7.51731C18.2082 7.66245 17.776 7.46561 17.6309 7.07766C16.8316 4.94128 15.1643 3.2256 13.0578 2.36042C12.6747 2.20305 12.4916 1.76487 12.649 1.38171C12.8064 0.99856 13.2446 0.815527 13.6277 0.972899C16.1189 1.99611 18.0897 4.02331 19.0358 6.55205C19.1809 6.94001 18.9841 7.37216 18.5961 7.51731Z" fill="currentColor" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="h-16 lg:h-20 bg-[#F9FBFC] flex items-center justify-between shrink-0 px-4 sm:px-6 lg:px-[60px] lg:pr-[72px] gap-3">
      {/* Left: menu + search */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#272835] hover:bg-[#f4f5f8] shrink-0"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        <div className="relative flex items-center min-w-0 w-[250px] flex-none">
          <SearchNormal1
            size={15}
            color="#808897"
            className="absolute left-3 shrink-0"
          />
          <input
            type="text"
            placeholder="Search or jump to"
            className="w-full min-w-0 pl-8 pr-10 sm:pr-14 py-2 text-sm rounded-lg border border-[#EDEFF4] bg-white text-[#808897] placeholder-[#808897] focus:outline-none focus:border-[#3e50f7] transition-colors"
          />
          <div className="absolute right-2 hidden sm:flex items-center gap-0.5 text-[#808897]">
            <kbd className="text-[10px] border border-[#EDEFF4] rounded px-1 py-0.5 font-mono">
              ⌘
            </kbd>
            <kbd className="text-[10px] border border-[#EDEFF4] rounded px-1 py-0.5 font-mono">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Ask Lyra */}
        <button
          className="inline-flex items-center justify-center sm:justify-start gap-0 sm:gap-1.5 text-sm font-medium transition-opacity hover:opacity-85 w-11 sm:w-auto h-11 px-0 sm:px-4 bg-white"
          style={{ borderRadius: "12px", border: "1.5px solid rgba(122, 105, 255, 0.5)" }}
        >
          <AskLyraIcon className="text-[#7A69FF] shrink-0" />
          <span className="hidden sm:inline"
            style={{
              background: "linear-gradient(92deg, #7A69FF 0.31%, #3E85F7 101.63%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ask Lyra
          </span>
        </button>

        {/* Notifications */}
        <button className="relative w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white border border-[#EDEFF4] hover:bg-[#f4f5f8] transition-colors text-[#808897]" style={{ borderRadius: "12px" }}>
          <NotificationIcon />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#3e50f7] rounded-full" />
        </button>

        {/* Avatar */}
        <img
          src={CURRENT_USER_AVATAR_SRC}
          alt="User"
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
      </div>
    </header>
  );
}
