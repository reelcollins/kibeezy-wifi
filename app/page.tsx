"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Invest } from "@/components/common"; // Adjust the path as needed
import { Spinner } from "@/components/common"; // Assuming Spinner is in the same path
import { Packages } from "@/components/common"; // Import PaymentPackages component
import { Overview } from "@/components/common";

function Page() {
  const { user, error, isLoading } = useUser();

  const loginBackgroundStyle: React.CSSProperties = {
    backgroundImage: "url('https://kibeezy.s3.eu-north-1.amazonaws.com/Untitled+(4).png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner md />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <header className="flex justify-between items-center bg-black text-white px-6 py-2 shadow-xl rounded-lg">
          <h1 className="text-md">
            Welcome, {user.name}!
          </h1>
          <button
            onClick={() => (window.location.href = "/api/auth/logout")}
            className="px-4 py-2 bg-gray-800 hover:bg-red-700 font-bold rounded"
          >
            Logout
          </button>
        </header>

        {/* Main Content Section */}
        <main className="max-w-screen-xl mx-auto p-4 space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="lg:order-1">
            <Overview />
          </div>
          <div className="lg:order-2">
            <Invest />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* Image Section */}
      <section
        style={loginBackgroundStyle}
        className="flex flex-col items-center justify-center text-white text-center space-y-6 lg:min-h-screen"
      >
        
        <button
          onClick={() => (window.location.href = "/api/auth/login")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 font-bold rounded"
        >
          Login
        </button>
      </section>

      {/* Packages Section */}
      <section className="flex flex-col justify-center items-center p-8 lg:p-16 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <Packages />
        </div>
      </section>
    </div>
  );
}

export default Page;
