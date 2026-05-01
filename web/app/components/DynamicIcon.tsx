"use client";

import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Check if it's an emoji (simple check: if it's not alphanumeric or has multiple characters that aren't a Lucide name)
  const isLucideIcon = /^[A-Z][a-zA-Z0-9]+$/.test(name);
  
  if (!isLucideIcon) {
    return <span {...(props as any)}>{name}</span>;
  }

  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    return <span {...(props as any)}>{name}</span>;
  }

  return <IconComponent {...props} />;
}
