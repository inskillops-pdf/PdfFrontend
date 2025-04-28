import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: "How long does it take to complete the ChatGPT certification?",
      answer: "Our certification program is designed to be completed in 7 days, with bite-sized lessons that you can fit into your schedule. However, you can learn at your own pace, and you'll have lifetime access to the course materials."
    },
    {
      question: "Do I need technical skills to take this course?",
      answer: "No, our courses are designed for all skill levels. You don't need any coding experience or technical background to master ChatGPT and AI tools. The lessons are step-by-step and easy to follow."
    },
    {
      question: "What will I be able to do after completing the certification?",
      answer: "After completing the certification, you'll be able to create sophisticated AI bots, automate content creation, build custom chatbots, and implement AI solutions for various business needs. You'll have practical skills that you can apply immediately."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course for any reason, simply contact our support team within 30 days of purchase for a full refund."
    },
    {
      question: "Can I access the course on mobile devices?",
      answer: "Yes, our platform is fully responsive and works on all devices, including smartphones and tablets. You can learn on the go, whenever and wherever it's convenient for you."
    },
    {
      question: "Will I get a certificate after completing the course?",
      answer: "Yes, upon successful completion of the course and passing the final assessment, you'll receive an official AI Professionals University certificate that you can add to your LinkedIn profile and share with employers."
    },
    {
      question: "How is this different from other AI courses?",
      answer: "Our program focuses on practical, results-driven training with real-world applications. Instead of just theory, we provide templates, frameworks, and step-by-step guides to implement AI solutions immediately. We also offer ongoing support and community access."
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "There are no specific prerequisites. You just need a computer with internet access and a willingness to learn. Our courses start with the fundamentals and progressively move to more advanced concepts."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our AI certification program? Find answers to common questions below.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left font-semibold focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="mailto:support@aiprofessionals.com" 
            className="text-primary-600 font-medium hover:text-primary-700"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </div>
  );
} 