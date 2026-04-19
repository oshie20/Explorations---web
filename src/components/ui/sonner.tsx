import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "border-[#DFE1E6] bg-white text-[#272835] shadow-[0_10px_24px_rgba(13,13,18,0.12)]",
          title: "font-medium text-[#272835]",
          description: "text-[#6C7386]",
        },
      }}
    />
  );
}
