import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import "./Hero.css"; // We'll add custom animation here

const featureBadges = [
  {
    label: "Automated Reminders",
    phrase: "Never miss a follow-up",
    position: "top",
    pulse: true,
    color: "green",
  },
  {
    label: "Easy Online Booking",
    phrase: "Book in under 2 minutes",
    position: "right",
    color: "blue",
  },
  {
    label: "Secure Patient Data",
    phrase: "HIPAA-compliant system",
    position: "left",
    color: "purple",
  },
  {
    label: "No More Spreadsheets",
    phrase: "Everything in one place",
    position: "bottom",
    pulse: true,
    color: "orange",
  },
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-white to-secondary/20 py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-1 gap-28 lg:gap-12 justify-center items-center">
          {/* Left: Text & CTA */}
          <div className="space-y-8 animate-fade-in grid justify-center items-center text-center">
            <div className="space-y-4 grid justify-center items-center text-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                End Scheduling Chaos for Your Clinic
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Cliniqly replaces spreadsheets, WhatsApp, and missed
                appointments with one simple, secure system.
                <br />
                Book, remind, and manage every patient—no hassle, no confusion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg w-full sm:w-auto"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 mx-auto gap-6 text-sm justify-between max-w-lg text-gray-500 pt-2 flex-wrap">
              <div className="flex items-center flex-col gap-2">
                <span className="text-green-600 font-bold text-lg">+92%</span>
                <span className="text-nowrap">Patient Satisfaction</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <span className="text-green-600 font-bold text-lg">24/7</span>
                <span>Access</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <span className="text-green-600 font-bold text-lg">HIPAA</span>
                <span>Conscious</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <span className="text-green-600 font-bold text-lg">
                  No More
                </span>
                <span>Spreadsheets</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
