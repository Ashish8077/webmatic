import React from "react";

export function Header({ title }: { title: string }) {
  return (
    <div style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px" }}>
      <h2 style={{ margin: 0, color: "#333" }}>{title}</h2>
    </div>
  );
}
