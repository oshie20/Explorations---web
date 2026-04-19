import { cn } from "@/lib/utils";

const icons = {
  home: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 9.99134V12.0833C2.5 14.8332 2.5 16.2081 3.35427 17.0624C4.20854 17.9167 5.58347 17.9167 8.33333 17.9167H11.6667C14.4165 17.9167 15.7914 17.9167 16.6457 17.0624C17.5 16.2081 17.5 14.8332 17.5 12.0833V9.99134C17.5 8.59025 17.5 7.88978 17.2034 7.28338C16.9068 6.67698 16.3539 6.2469 15.248 5.38676L13.5813 4.09046C11.8609 2.75238 11.0007 2.08334 10 2.08334C8.99925 2.08334 8.13908 2.75238 6.41868 4.09046L4.75201 5.38676C3.64611 6.2469 3.09316 6.67698 2.79658 7.28338C2.5 7.88978 2.5 8.59025 2.5 9.99134Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 14.1667H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bank: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M1.66667 7.1409C1.66667 6.14408 2.06865 5.53319 2.90053 5.07024L6.32489 3.16454C8.11925 2.16596 9.01642 1.66667 10 1.66667C10.9836 1.66667 11.8808 2.16596 13.6751 3.16454L17.0995 5.07024C17.9313 5.53319 18.3333 6.14409 18.3333 7.1409C18.3333 7.4112 18.3333 7.54635 18.3038 7.65745C18.1488 8.24121 17.6198 8.33334 17.1089 8.33334H2.89107C2.38023 8.33334 1.85127 8.2412 1.69618 7.65745C1.66667 7.54635 1.66667 7.4112 1.66667 7.1409Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.99658 5.83333H10.0041" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.33333 8.33333V15.4167M6.66667 8.33333V15.4167" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.3333 8.33333V15.4167M16.6667 8.33333V15.4167" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15.8333 15.4167H4.16667C2.78596 15.4167 1.66667 16.5359 1.66667 17.9167C1.66667 18.1468 1.85322 18.3333 2.08333 18.3333H17.9167C18.1468 18.3333 18.3333 18.1468 18.3333 17.9167C18.3333 16.5359 17.2141 15.4167 15.8333 15.4167Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  arrowLeftRight: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M16.6666 14.1667H3.33328" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.1667 11.6667C14.1667 11.6667 16.6666 13.5079 16.6666 14.1667C16.6666 14.8255 14.1666 16.6667 14.1666 16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.16661 5.83333H16.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.83327 3.33333C5.83327 3.33333 3.33329 5.17455 3.33328 5.83334C3.33327 6.49214 5.83328 8.33333 5.83328 8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  invoice: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M3.33333 15.5382V6.71189C3.33333 4.33355 3.33333 3.14438 4.06557 2.40553C4.7978 1.66667 5.97631 1.66667 8.33333 1.66667H11.6667C14.0237 1.66667 15.2022 1.66667 15.9344 2.40553C16.6667 3.14438 16.6667 4.33355 16.6667 6.71189V15.5382C16.6667 16.7979 16.6667 17.4278 16.2817 17.6757C15.6526 18.0809 14.6801 17.2312 14.1909 16.9228C13.7867 16.6678 13.5847 16.5404 13.3604 16.5331C13.1181 16.5251 12.9124 16.6473 12.4757 16.9228L10.8833 17.927C10.4537 18.1978 10.239 18.3333 10 18.3333C9.761 18.3333 9.54625 18.1978 9.11666 17.927L7.52427 16.9228C7.12012 16.6678 6.91805 16.5404 6.69377 16.5331C6.45143 16.5251 6.24577 16.6473 5.80906 16.9228C5.31996 17.2312 4.34739 18.0809 3.71829 17.6757C3.33333 17.4278 3.33333 16.7979 3.33333 15.5382Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.16667 9.16667H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6667 5.83333H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  building: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M13.3333 8.33334L15.1245 8.87068C16.2688 9.21401 16.841 9.38568 17.1705 9.82851C17.5 10.2713 17.5 10.8688 17.5 12.0634V18.3333" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6.66667 7.5H9.16667M6.66667 10.8333H9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 18.3333V15.8333C10 15.0477 10 14.6548 9.75592 14.4107C9.51183 14.1667 9.119 14.1667 8.33333 14.1667H7.5C6.71432 14.1667 6.32149 14.1667 6.07741 14.4107C5.83333 14.6548 5.83333 15.0477 5.83333 15.8333V18.3333" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M1.66667 18.3333H18.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2.5 18.3333V5.59769C2.5 3.5054 2.5 2.45925 3.15932 1.94019C3.81864 1.42113 4.78952 1.70295 6.73127 2.26658L10.8979 3.47601C12.0697 3.81613 12.6556 3.98619 12.9944 4.4497C13.3333 4.91322 13.3333 5.54453 13.3333 6.80713V18.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 3.33334V11.6667C2.5 14.0237 2.5 15.2022 3.23223 15.9344C3.96447 16.6667 5.14297 16.6667 7.5 16.6667H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 11.6667L7.70833 8.95834C8.24504 8.42159 8.51342 8.15328 8.82725 8.06473C9.04925 8.00213 9.28408 8.00213 9.50608 8.06473C9.81992 8.15328 10.0883 8.42159 10.625 8.95834C11.1618 9.49509 11.4301 9.76343 11.7439 9.85193C11.9659 9.91459 12.2008 9.91459 12.4228 9.85193C12.7366 9.76343 13.0049 9.49509 13.5417 8.95834L16.6667 5.83334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  file: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M6.66667 14.1667H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66667 10.8333H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.8333 2.08332V2.49999C10.8333 4.85701 10.8333 6.03552 11.5656 6.76776C12.2978 7.49999 13.4763 7.49999 15.8333 7.49999H16.25M16.6667 8.88074V11.6667C16.6667 14.8093 16.6667 16.3807 15.6903 17.357C14.7141 18.3333 13.1427 18.3333 10 18.3333C6.8573 18.3333 5.28596 18.3333 4.30964 17.357C3.33333 16.3807 3.33333 14.8093 3.33333 11.6667V7.87986C3.33333 5.17567 3.33333 3.82358 4.07172 2.90776C4.2209 2.72275 4.38942 2.55422 4.57444 2.40505C5.49026 1.66666 6.84235 1.66666 9.5465 1.66666C10.1345 1.66666 10.4284 1.66666 10.6977 1.76166C10.7537 1.78142 10.8085 1.80416 10.8621 1.82978C11.1197 1.95295 11.3275 2.16082 11.7432 2.57656L15.6903 6.52368C16.1721 7.0054 16.4129 7.24626 16.5398 7.55254C16.6667 7.85882 16.6667 8.19945 16.6667 8.88074Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M12.9167 10C12.9167 11.6108 11.6108 12.9167 10 12.9167C8.38917 12.9167 7.08333 11.6108 7.08333 10C7.08333 8.38918 8.38917 7.08334 10 7.08334C11.6108 7.08334 12.9167 8.38918 12.9167 10Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M17.5092 11.7471C17.9441 11.6298 18.1616 11.5712 18.2474 11.459C18.3333 11.3469 18.3333 11.1665 18.3333 10.8058V9.19435C18.3333 8.8336 18.3333 8.65318 18.2474 8.5411C18.1615 8.42893 17.9441 8.37026 17.5092 8.253C15.8838 7.81467 14.8666 6.11544 15.2861 4.50074C15.4014 4.05667 15.4591 3.83465 15.404 3.70442C15.3489 3.5742 15.1909 3.48446 14.8748 3.30498L13.4375 2.48896C13.1273 2.31284 12.9723 2.22478 12.8331 2.24353C12.6938 2.26228 12.5368 2.41896 12.2227 2.73229C11.0067 3.94541 8.99467 3.94536 7.77862 2.73221C7.46453 2.41887 7.30748 2.26221 7.16828 2.24345C7.02908 2.2247 6.87398 2.31276 6.56378 2.48887L5.12653 3.30491C4.81044 3.48437 4.65239 3.57411 4.59732 3.70431C4.54223 3.83451 4.59989 4.05657 4.71521 4.50068C5.13448 6.11543 4.11643 7.81471 2.49085 8.25301C2.05593 8.37026 1.83848 8.42893 1.75257 8.54101C1.66667 8.65318 1.66667 8.8336 1.66667 9.19435V10.8058C1.66667 11.1665 1.66667 11.3469 1.75257 11.459C1.83846 11.5712 2.05593 11.6298 2.49085 11.7471C4.11617 12.1854 5.1334 13.8847 4.71393 15.4993C4.59858 15.9434 4.54089 16.1654 4.59597 16.2957C4.65105 16.4259 4.8091 16.5157 5.12521 16.6951L6.56246 17.5112C6.87268 17.6873 7.02778 17.7753 7.167 17.7566C7.30622 17.7378 7.46323 17.5811 7.77726 17.2678C8.99392 16.0537 11.0073 16.0536 12.2241 17.2677C12.5381 17.5811 12.6951 17.7378 12.8343 17.7565C12.9735 17.7753 13.1287 17.6872 13.4388 17.5111L14.8761 16.695C15.1923 16.5156 15.3503 16.4258 15.4053 16.2956C15.4604 16.1653 15.4028 15.9433 15.2873 15.4993C14.8677 13.8847 15.8841 12.1855 17.5092 11.7471Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const navItems = [
  { label: "Dashboard", icon: "home", active: false },
  { label: "Accounts", icon: "bank", active: false, badge: "3" },
  { label: "Transactions", icon: "arrowLeftRight", active: false },
  { label: "Expenses", icon: "invoice", active: true },
  { label: "Outlets", icon: "building", active: false },
  { label: "Treasury", icon: "chart", active: false },
  { label: "Reports", icon: "file", active: false },
  { label: "Settings", icon: "settings", active: false },
] as const;

interface SidebarProps {
  /** When true, sidebar is rendered inside the mobile Vaul drawer (not the desktop rail). */
  embedded?: boolean;
  onClose?: () => void;
}

export function Sidebar({ embedded = false, onClose }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col bg-[#F9FBFC]",
        embedded ? "h-full min-h-0 w-full" : "min-h-0 h-full w-[224px] shrink-0",
      )}
    >
      <div className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 shrink-0">
        <img src="/logo.svg" alt="Stratus" className="h-8 lg:h-[32px] w-auto" />
        {embedded && (
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#808897] hover:bg-[#f4f5f8] -mr-1"
            aria-label="Close menu"
          >
            <img src="/x-close.svg" alt="" width="16" height="16" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 lg:px-5 py-4 lg:py-5 space-y-0.5 overflow-y-auto min-h-0">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={onClose}
            type="button"
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors group",
              item.active
                ? "bg-white text-[#272835] font-medium border border-[#E6E6E6] shadow-[0_0_12px_rgba(0,0,0,0.03),0_2px_2px_rgba(0,0,0,0.02)]"
                : "text-[#808897] hover:bg-[#f4f5f8] hover:text-[#272835]",
            )}
          >
            <div className="flex items-center gap-2.5">
              {icons[item.icon]}
              <span>{item.label}</span>
            </div>
            {"badge" in item && item.badge && (
              <span className="text-xs bg-[#EDEFF4] text-[#808897] rounded-full px-1.5 py-0.5 font-medium">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
