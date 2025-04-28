import Image from 'next/image';
import Layout from '../components/Layout';

export default function About() {
  // Team members data
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former AI Research Lead at Google with 15+ years of experience in machine learning and natural language processing. PhD in Computer Science from Stanford.',
      image: '/images/team-1.jpg'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Learning Officer',
      bio: 'Educational technology expert with a background in curriculum development. Passionate about making complex AI concepts accessible to everyone.',
      image: '/images/team-2.jpg'
    },
    {
      name: 'Jamie Wilson',
      role: 'Lead AI Instructor',
      bio: 'AI consultant for Fortune 500 companies and startup advisor. Specializes in practical AI applications for business growth and automation.',
      image: '/images/team-3.jpg'
    },
    {
      name: 'David Park',
      role: 'Head of Student Success',
      bio: 'Former education director with expertise in online learning platforms. Dedicated to ensuring every student achieves their AI career goals.',
      image: '/images/team-4.jpg'
    }
  ];

  return (
    <Layout title="About Us - AI Professionals University">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl mb-8">
              To democratize AI education and empower professionals to leverage artificial intelligence
              in meaningful, ethical, and profitable ways.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                AI Professionals University was founded in 2021 by Dr. Sarah Chen, who recognized a significant gap in AI education: 
                while there were plenty of theoretical courses available, few focused on practical, results-driven applications 
                that professionals could immediately implement in their careers or businesses.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Drawing on her extensive experience in both AI research and industry applications, 
                Dr. Chen assembled a team of experts who shared her vision of making advanced AI tools 
                and techniques accessible to professionals from all backgrounds.
              </p>
              <p className="text-lg text-gray-700">
                Today, AI Professionals University has helped over 50,000 students across 120+ countries 
                master AI tools and transform their careers, businesses, and lives.
              </p>
            </div>
            <div className="relative h-96 md:h-full">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/about-image.jpg"
                  alt="AI Professionals University Campus"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at AI Professionals University.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Practical Excellence</h3>
              <p className="text-gray-600">
                We believe in learning by doing. Our courses prioritize practical skills and real-world applications 
                over theoretical knowledge alone.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Inclusive Innovation</h3>
              <p className="text-gray-600">
                We're committed to making AI accessible to everyone, regardless of technical background. 
                Our curriculum is designed to meet learners where they are.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Ethical Leadership</h3>
              <p className="text-gray-600">
                We promote responsible AI use through all our programs, emphasizing ethical considerations 
                and the positive impact AI can have when deployed thoughtfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of AI experts, educators, and entrepreneurs are dedicated to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our AI Revolution</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Be part of a growing community of professionals who are harnessing the power of AI to transform their careers and businesses.
          </p>
          <a href="/signup" className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg inline-block">
            Get Started Today
          </a>
        </div>
      </section>
    </Layout>
  );
} 