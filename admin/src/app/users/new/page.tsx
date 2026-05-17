// app/users/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, status: "active", color: "green" }),
    });
    router.push("/users");
  };

  return (
    <form className="flex flex-col gap-4 max-w-md mx-auto py-6" onSubmit={handleSubmit}>
      <input
        placeholder="Имя"
        className="p-2 rounded bg-gray-800 text-white"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        type="email"
        className="p-2 rounded bg-gray-800 text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" type="submit">
        Создать пользователя
      </button>
    </form>
  );
}
