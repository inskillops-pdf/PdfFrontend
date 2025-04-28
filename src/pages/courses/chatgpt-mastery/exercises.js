import { useState } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';

export default function ChatGPTExercises() {
  const [completedExercises, setCompletedExercises] = useState([]);
  
  const toggleComplete = (id) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(exId => exId !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const exercises = [
    {
      id: 1,
      module: 1,
      title: 'First Contact with ChatGPT',
      description: 'Learn to navigate the ChatGPT interface and explore its basic capabilities',
      tasks: [
        "Create a ChatGPT account if you haven't already",
        'Start a new conversation with ChatGPT',
        'Ask ChatGPT to introduce itself and explain what it can do',
        'Ask at least 5 different types of questions to test its capabilities',
        'Try to identify one strength and one limitation of ChatGPT based on your interaction'
      ],
      difficulty: 'Beginner',
      estimatedTime: '15 minutes'
    },
    {
      id: 2,
      module: 2,
      title: 'Basic Prompt Engineering',
      description: 'Practice crafting clear and effective prompts',
      tasks: [
        'Write a basic prompt asking ChatGPT to explain a concept of your choice',
        'Revise your prompt to be more specific about the details you want',
        'Add instructions about the format you want the response in (e.g., bullet points, numbered list)',
        'Include a request for examples in your prompt',
        'Compare the responses from each iteration of your prompts'
      ],
      difficulty: 'Beginner',
      estimatedTime: '20 minutes'
    },
    {
      id: 3,
      module: 2,
      title: 'Prompt Templates',
      description: 'Create and test reusable prompt templates for common tasks',
      tasks: [
        'Create a template for generating social media content (with placeholders for topic, audience, and tone)',
        'Test your template with at least 3 different sets of variables',
        'Refine your template based on the results',
        'Create a second template for another task of your choice',
        'Save your templates in a document for future use'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '30 minutes'
    },
    {
      id: 4,
      module: 3,
      title: 'Role-Based Prompting',
      description: 'Learn how to leverage role assignment in your prompts',
      tasks: [
        'Create a prompt that assigns ChatGPT a specific role (e.g., "Act as a marketing expert")',
        'Ask the same question with at least 3 different role assignments',
        'Compare how the responses differ based on the assigned role',
        'Identify which roles are most effective for different types of tasks',
        'Create a complex prompt that assigns multiple sequential roles'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '25 minutes'
    },
    {
      id: 5,
      module: 3,
      title: 'Chain-of-Thought Reasoning',
      description: 'Use advanced prompting to solve complex problems step by step',
      tasks: [
        'Select a complex problem in your field',
        'Create a prompt that instructs ChatGPT to think through the problem step by step',
        'Compare the response to a simple prompt asking for a solution directly',
        'Refine your chain-of-thought prompt to be more effective',
        'Try the technique on a different type of problem'
      ],
      difficulty: 'Advanced',
      estimatedTime: '35 minutes'
    },
    {
      id: 6,
      module: 4,
      title: 'Content Creation: Blog Post',
      description: 'Create a complete blog post with ChatGPT assistance',
      tasks: [
        'Generate a list of blog topic ideas using ChatGPT',
        'Create an outline for your chosen topic',
        'Generate sections of the blog post based on your outline',
        'Use ChatGPT to help edit and refine the content',
        'Ask ChatGPT to suggest a compelling title and meta description'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '45 minutes'
    },
    {
      id: 7,
      module: 5,
      title: 'Customer Service Automation',
      description: 'Design a customer service workflow using ChatGPT',
      tasks: [
        'Identify 5 common customer service scenarios in your business',
        'Create template responses for each scenario',
        'Design a decision tree for handling customer inquiries',
        'Test your templates with sample customer queries',
        'Refine your templates based on the results'
      ],
      difficulty: 'Advanced',
      estimatedTime: '50 minutes'
    },
    {
      id: 8,
      module: 6,
      title: 'Code Assistance Practice',
      description: 'Learn to use ChatGPT for coding tasks',
      tasks: [
        'Ask ChatGPT to generate a simple code snippet in a language of your choice',
        'Request an explanation of how the code works',
        'Provide a buggy code sample and ask ChatGPT to debug it',
        'Have ChatGPT help refactor a piece of code to be more efficient',
        'Use ChatGPT to generate unit tests for your code'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '40 minutes'
    },
    {
      id: 9,
      module: 7,
      title: 'Custom GPT Creation',
      description: 'Design and build a specialized GPT for a specific task',
      tasks: [
        'Identify a specific use case for a custom GPT',
        "Write detailed instructions for your GPT's behavior and purpose",
        'Create knowledge files with relevant information for your GPT',
        'Test your GPT with various prompts and scenarios',
        'Refine your GPT based on test results'
      ],
      difficulty: 'Advanced',
      estimatedTime: '60 minutes'
    },
    {
      id: 10,
      module: 8,
      title: 'Business Workflow Integration',
      description: 'Design a complete workflow integrating ChatGPT into your business processes',
      tasks: [
        'Identify a business process that could benefit from AI assistance',
        'Map out the current workflow and identify integration points',
        'Design prompts for each integration point',
        'Create a documentation guide for team members',
        'Develop metrics to measure the effectiveness of the integration'
      ],
      difficulty: 'Advanced',
      estimatedTime: '75 minutes'
    }
  ];

  return (
    <Layout title="Practical Exercises | ChatGPT Mastery Course">
      <div className="bg-primary-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Practical Exercises</h1>
              <p className="text-xl text-gray-600">
                Apply your knowledge with hands-on exercises for each module
              </p>
            </div>
            <div>
              <Link href="/courses/chatgpt-mastery-course" className="btn-primary py-2 px-6">
                Back to Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Module {exercise.module}
                      </span>
                      <span className="inline-block ml-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {exercise.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {exercise.estimatedTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{exercise.title}</h3>
                  <p className="text-gray-600 mb-4">{exercise.description}</p>
                  
                  <h4 className="font-semibold mb-2">Tasks:</h4>
                  <ul className="space-y-2 mb-6">
                    {exercise.tasks.map((task, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-primary-100 text-primary-800 rounded-full text-xs font-medium mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-between items-center">
                    <button
                      className={`flex items-center text-sm font-medium ${
                        completedExercises.includes(exercise.id)
                          ? 'text-green-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => toggleComplete(exercise.id)}
                    >
                      <div className={`w-5 h-5 mr-2 rounded border flex items-center justify-center ${
                        completedExercises.includes(exercise.id)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}>
                        {completedExercises.includes(exercise.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      {completedExercises.includes(exercise.id) ? 'Completed' : 'Mark Complete'}
                    </button>
                    
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Hints
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Exercise Submission</h2>
            <p className="text-gray-600 mb-6">
              Want feedback on your exercises? Submit your work to receive personalized guidance from our instructors.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <label htmlFor="exercise" className="block text-gray-700 font-medium mb-2">Select Exercise</label>
                <select 
                  id="exercise" 
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Choose an exercise...</option>
                  {exercises.map(ex => (
                    <option key={ex.id} value={ex.id}>
                      {ex.id}. {ex.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="submission" className="block text-gray-700 font-medium mb-2">Your Solution</label>
                <textarea 
                  id="submission" 
                  rows="6" 
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe your solution or paste your prompts/responses here..."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="challenges" className="block text-gray-700 font-medium mb-2">Challenges Faced</label>
                <textarea 
                  id="challenges" 
                  rows="3" 
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What challenges did you encounter? Any specific questions for the instructor?"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button className="btn-primary py-2 px-6">
                  Submit Exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 