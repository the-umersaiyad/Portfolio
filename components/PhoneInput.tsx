"use client";

import React from "react";

export function PhoneInput({ name, defaultValue, required }: { name: string, defaultValue?: string, required?: boolean }) {
  return (
    <input
      name={name}
      type="tel"
      defaultValue={defaultValue}
      required={required}
      maxLength={20}
      className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent transition-all"
      onInput={(e) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\-\s()]/g, '');
      }}
    />
  );
}
