"use client";

import { useState, useEffect } from "react";

interface EmailDisplayProps {
  user: string;
  domain: string;
  className?: string;
  label?: React.ReactNode; // Optional label to show instead of the email address
}

export function EmailDisplay({ user, domain, className, label }: EmailDisplayProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Reconstruct email on the client side
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) {
    // Render a placeholder or nothing while hydrating to avoid mismatched content
    return <span className={className}>Click to reveal email</span>;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {label || email}
    </a>
  );
}
