import { useCountUp } from "@/hooks/useCountUp";

interface ParsedValue {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
}

function parseValue(value: string): ParsedValue {
  // Match currency: $35,000.00 or $3,600
  const currencyMatch = value.match(/^\$?\s*([\d,]+(?:\.\d+)?)\s*$/);
  if (currencyMatch) {
    const numStr = currencyMatch[1].replace(/,/g, "");
    const hasDecimal = numStr.includes(".");
    const [, decPart] = numStr.split(".");
    return {
      prefix: value.startsWith("$") ? "$" : "",
      number: parseFloat(numStr) || 0,
      suffix: "",
      decimals: hasDecimal ? (decPart?.length ?? 0) : 0,
    };
  }

  // Match "17 requests" or "24 requests"
  const suffixMatch = value.match(/^([\d,]+)\s+(.+)$/);
  if (suffixMatch) {
    const numStr = suffixMatch[1].replace(/,/g, "");
    return {
      prefix: "",
      number: parseInt(numStr, 10) || 0,
      suffix: " " + suffixMatch[2],
      decimals: 0,
    };
  }

  // Plain number
  const numStr = value.replace(/,/g, "");
  const num = parseFloat(numStr) || 0;
  const hasDecimal = numStr.includes(".");
  const [, decPart] = numStr.split(".");
  return {
    prefix: "",
    number: num,
    suffix: "",
    decimals: hasDecimal ? (decPart?.length ?? 0) : 0,
  };
}

function formatNumber(
  value: number,
  decimals: number,
  addCommas = true
): string {
  if (decimals > 0) {
    const fixed = value.toFixed(decimals);
    if (addCommas) {
      const [intPart, decPart] = fixed.split(".");
      const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return decPart ? `${withCommas}.${decPart}` : withCommas;
    }
    return fixed;
  }
  // For integer targets, avoid early snapping: only reach the final integer at the very end.
  const intVal = Math.floor(value);
  if (addCommas) {
    return intVal.toLocaleString();
  }
  return String(intVal);
}

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedNumber({
  value,
  duration = 1500,
  className,
  style,
}: AnimatedNumberProps) {
  const parsed = parseValue(value);
  const { ref, value: animatedValue } = useCountUp(parsed.number, {
    duration,
    runOnce: true,
    threshold: 0.1,
  });

  const display = formatNumber(
    animatedValue,
    parsed.decimals,
    parsed.number >= 1000
  );

  return (
    <span ref={ref} className={className} style={style}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
}
