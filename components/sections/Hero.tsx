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
        <div className="grid lg:grid-cols-2 gap-28 lg:gap-12 items-center">
          {/* Left: Text & CTA */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
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
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm justify-between max-w-lg text-gray-500 pt-2 flex-wrap">
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
          {/* Right: Image with floating feature badges */}
          <div className="relative h-full animate-slide-up flex justify-center items-center">
            <div className="relative h-full">
              <Image
                src="https://images.unsplash.com/photo-1485841890310-6a055c88698a?auto=format&fit=crop&w=600&h=600&q=80"
                alt="Doctor with patient"
                width={500}
                height={500}
                className="w-full h-full max-w-md rounded-2xl shadow-2xl border border-gray-100 object-cover"
              />
              {/* 4 prominent feature badges */}
              {/* Desktop: absolute around image */}
              <div className="hidden md:block">
                {featureBadges.map((badge) => {
                  let style = {};
                  if (badge.position === "top")
                    style = {
                      left: "50%",
                      top: "-32px",
                      transform: "translateX(-50%)",
                    };
                  if (badge.position === "bottom")
                    style = {
                      left: "50%",
                      bottom: "-32px",
                      transform: "translateX(-50%)",
                    };
                  if (badge.position === "left")
                    style = {
                      left: "-32px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    };
                  if (badge.position === "right")
                    style = {
                      right: "-32px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    };

                  const colorClasses: Record<string, string> = {
                    green: "bg-green-100",
                    blue: "bg-blue-100",
                    purple: "bg-purple-100",
                    orange: "bg-orange-100",
                  };

                  const iconColorClasses: Record<string, string> = {
                    green: "bg-green-500",
                    blue: "bg-blue-500",
                    purple: "bg-purple-500",
                    orange: "bg-orange-500",
                  };

                  return (
                    <div
                      key={badge.label}
                      className={`absolute feature-badge prominent-badge${
                        badge.pulse ? "" : ""
                      }`}
                      style={{
                        ...style,
                        zIndex: 20,
                        minWidth: 140,
                        textAlign: "center",
                        pointerEvents: "auto",
                      }}
                      tabIndex={0}
                      title={badge.label}
                    >
                      <div
                        className={`w-6 h-6 ${
                          colorClasses[badge.color]
                        } rounded-full animate-pulse-slow flex items-center justify-center mb-2`}
                      >
                        <div
                          className={`w-3 h-3 ${
                            iconColorClasses[badge.color]
                          } rounded-full`}
                        ></div>
                      </div>
                      <div className="text-sm">{badge.label}</div>
                      <span className="text-xs badge-phrase">
                        {badge.phrase}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Mobile: badges stacked below image */}
              <div className="hidden absolute left-1/2 top-full mt-6 w-full max-w-xs -translate-x-1/2 z-20">
                <div className="grid grid-cols-2 gap-2">
                  {featureBadges.map((badge) => {
                    const colorClasses: Record<string, string> = {
                      green: "bg-green-100",
                      blue: "bg-blue-100",
                      purple: "bg-purple-100",
                      orange: "bg-orange-100",
                    };

                    const iconColorClasses: Record<string, string> = {
                      green: "bg-green-500",
                      blue: "bg-blue-500",
                      purple: "bg-purple-500",
                      orange: "bg-orange-500",
                    };

                    return (
                      <div
                        key={badge.label}
                        className={`feature-badge prominent-badge text-xs py-2 px-3 mb-1${
                          badge.pulse ? " pulse-badge" : ""
                        }`}
                        tabIndex={0}
                        title={badge.label}
                      >
                        <div
                          className={`w-4 h-4 ${
                            colorClasses[badge.color]
                          } rounded-full flex items-center justify-center mb-1 mx-auto`}
                        >
                          <div
                            className={`w-2 h-2 ${
                              iconColorClasses[badge.color]
                            } rounded-full`}
                          ></div>
                        </div>
                        <div className="text-sm">{badge.label}</div>
                        <span className="text-xs badge-phrase">
                          {badge.phrase}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
