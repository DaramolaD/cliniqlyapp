import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const beforeProblems = [
  {
    title: "Double bookings and no-shows",
    description: "Messy calendars lead to scheduling conflicts and lost revenue",
    iconColor: "red"
  },
  {
    title: "Manual reminder chaos",
    description: "Spending hours on WhatsApp and phone calls just to confirm appointments",
    iconColor: "red"
  },
  {
    title: "Unprofessional experience",
    description: "Google Forms and spreadsheets make you look outdated to patients",
    iconColor: "red"
  }
];

const afterSolutions = [
  {
    title: "Automated scheduling that just works",
    description: "Real-time availability, instant confirmations, and zero conflicts",
    iconColor: "green"
  },
  {
    title: "Smart reminders reduce no-shows by 40%",
    description: "Automatic SMS and email reminders sent at the perfect time",
    iconColor: "green"
  },
  {
    title: "Look professional, feel organized",
    description: "Beautiful booking pages that patients love to use",
    iconColor: "green"
  }
];

const stats = [
  {
    value: "40%",
    label: "reduction in no-shows"
  },
  {
    value: "3x",
    label: "more patients managed"
  },
  {
    value: "10min",
    label: "average booking time"
  }
];

const ProblemSolution = () => {
  const renderProblemItem = (item: typeof beforeProblems[0]) => (
    <div key={item.title} className="flex items-start space-x-3">
      <div className={`min-w-6 h-6 bg-${item.iconColor}-100 rounded-full flex items-center justify-center mt-1`}>
        <div className={`min-w-3 h-3 bg-${item.iconColor}-500 rounded-full`}></div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{item.title}</h4>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );

  const renderSolutionItem = (item: typeof afterSolutions[0]) => (
    <div key={item.title} className="flex items-start space-x-3">
      <div className={`min-w-6 h-6 bg-${item.iconColor}-100 rounded-full flex items-center justify-center mt-1`}>
        <div className={`min-w-3 h-3 bg-${item.iconColor}-500 rounded-full`}></div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{item.title}</h4>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );

  const renderStatItem = (item: typeof stats[0]) => (
    <div key={item.label}>
      <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
      <div className="text-gray-600">{item.label}</div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <AlertCircle className="w-4 h-4 mr-2" />
            Problem Solved
          </div>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            We get it. Scheduling shouldn't be this hard.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            You became a healthcare professional to help people, not to juggle spreadsheets and chase down appointment confirmations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center px-2 md:px-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Before Cliniqly</h3>
              <div className="space-y-4">
                {beforeProblems.map(renderProblemItem)}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">After Cliniqly</h3>
              <div className="space-y-4">
                {afterSolutions.map(renderSolutionItem)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {stats.map(renderStatItem)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
