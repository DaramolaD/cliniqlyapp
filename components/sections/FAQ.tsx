
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What if I already use Google Calendar?",
      answer: "Perfect! Cliniqly syncs seamlessly with Google Calendar. Your existing appointments stay put, and new bookings through Cliniqly automatically appear in your Google Calendar. You get the best of both worlds - your familiar calendar interface plus powerful booking automation."
    },
    {
      question: "Can I customize reminder times?",
      answer: "Absolutely. You can set reminders for 24 hours, 2 hours, 30 minutes, or any custom time that works for your practice. You can also customize the message content and choose between SMS, email, or both."
    },
    {
      question: "Is my patient data secure?",
      answer: "Yes. We take security seriously with enterprise-grade encryption, secure data centers, and HIPAA-conscious design principles. We only store appointment information and contact details - no sensitive medical records."
    },
    {
      question: "How quickly can I get started?",
      answer: "Most practitioners are up and running in under 15 minutes. Simply sign up, customize your booking page, set your availability, and share your booking link. No technical skills required."
    },
    {
      question: "What if my patients aren't tech-savvy?",
      answer: "Our booking page is designed to be incredibly simple - even easier than using WhatsApp. Patients just click your link, pick a time, and enter their details. We've tested it with users of all ages and tech levels."
    },
    {
      question: "Can I try it before committing?",
      answer: "Of course! Start with our free plan or take advantage of our 14-day free trial on paid plans. No credit card required to get started, and you can cancel anytime if it's not right for you."
    },
    {
      question: "What happens if I need to cancel or reschedule?",
      answer: "Both you and your patients can easily reschedule or cancel appointments. Patients get a simple link to reschedule, and you have full control from your dashboard. All changes are automatically synced and notifications are sent."
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes! Professional and Clinic plan users get priority email support with responses within 4 hours during business days. Clinic plan users also get access to phone support and a dedicated success manager."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about Cliniqly. Can&apos;t find the answer you&apos;re looking for? 
            <a href="#" className="text-primary hover:underline ml-1">Chat with our team</a>.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-base md:text-lg font-medium text-gray-900 mr-2">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you make the switch to smarter scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Schedule a Demo
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
