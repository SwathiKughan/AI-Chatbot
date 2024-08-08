"use client";
import React, { useState } from 'react';
import styles from './ChatInterface.module.css';

const predefinedPrompts = [
  { prompt: "Hi", response: "Hey there!"},
  { prompt: "Tell me about yourself.", response: "I am a dedicated professional with a background in [Your Field]. I hold a degree in [Your Degree] from [Your University] and have accumulated [Number] years of experience in [Relevant Industry/Field]. My career began with [Briefly Describe First Job/Internship], where I developed skills in [Skill 1] and [Skill 2]. Over the years, I've worked with [Notable Companies/Projects], focusing on [Specific Tasks/Responsibilities]. My passion lies in [Your Passion or Specialization], and I continuously seek to expand my knowledge in [Related Area]. Outside of work, I enjoy [Hobbies/Interests], which helps me stay balanced and motivated." },
  { prompt: "What are your strengths?", response: "One of my core strengths is my ability to [Strength 1, e.g., solve complex problems]. For example, in my previous role at [Company], I led a project that involved [Brief Description], which improved [Outcome]. Additionally, my strong communication skills allow me to effectively collaborate with diverse teams and stakeholders. I am also highly organized, which enables me to manage multiple tasks efficiently. My adaptability and willingness to learn new technologies or processes have consistently helped me contribute positively to my teams." },
  { prompt: "What are your weaknesses?", response: "A weakness I have identified is my tendency to [Weakness, e.g., overcommit to projects]. While this demonstrates my dedication, it sometimes leads to challenges in balancing priorities. To address this, I have started using [Specific Tools or Techniques, e.g., project management software] to better manage my workload and set realistic expectations. Additionally, I have been working on delegating tasks more effectively and seeking feedback from colleagues to ensure that I maintain a balanced approach." },
  { prompt: "Why do you want to work here?", response:"I am particularly drawn to [Company Name] because of its [Company's Strengths, e.g., innovative approach to technology and its commitment to professional development]. Your recent project on [Specific Project or Initiative] aligns closely with my own experience in [Related Area], and I am excited about the opportunity to contribute to such impactful work. Additionally, I admire the company culture and values, which emphasize [Values or Culture Aspects], and I am enthusiastic about the potential to grow within an organization that prioritizes [Specific Value or Goal]."},
  { prompt: "Where do you see yourself in 5 years?", response: "In five years, I envision myself in a [Desired Position or Role] at [Company Name], where I can leverage my expertise in [Relevant Skill or Field] to contribute to [Company's Goal or Project]. I aim to grow professionally by [Specific Goals, e.g., leading larger projects, expanding my skill set in new technologies], and to continue making a positive impact through [Specific Contributions]. I am committed to ongoing learning and development to ensure that I remain a valuable asset to the team."},
  { prompt: "Why should we hire you?", response:"You should consider hiring me because of my proven track record in [Specific Area or Skill], which directly aligns with the needs of this role. My experience with [Relevant Tools or Technologies] and my ability to [Key Competency, e.g., drive projects to completion] will allow me to contribute effectively from day one. Additionally, my strong [Soft Skill, e.g., problem-solving abilities] and [Another Soft Skill, e.g., team collaboration] make me well-suited for the dynamic environment at [Company Name]. I am eager to bring my [Unique Qualities] to your team and help achieve your [Company Goals]."},
  { prompt: "Can you describe a challenging situation and how you handled it?", response:"In my previous role at [Company], I encountered a challenging situation when [Briefly Describe Situation]. The issue was [Problem or Challenge], and it required [Specific Action or Solution]. I approached it by [Action Taken, e.g., assembling a cross-functional team, analyzing data]. Through this process, we were able to [Result or Outcome], which led to [Positive Impact, e.g., improved efficiency, cost savings]. This experience reinforced my skills in [Skill Developed] and taught me the importance of [Lesson Learned]."},
  { prompt: "What motivates you?", response:"I am motivated by the opportunity to tackle challenging problems and contribute to meaningful projects. The chance to see tangible results from my efforts, such as [Example of Outcome], drives me to continuously improve and seek out new opportunities for growth. Additionally, working with a team that values collaboration and innovation inspires me to push the boundaries of what we can achieve together. I also find motivation in [Personal or Professional Motivator, e.g., setting and achieving goals, receiving positive feedback]."},
  { prompt: "How do you handle stress and pressure?", response: "I handle stress and pressure by maintaining a structured approach to my work and prioritizing tasks effectively. I use tools like [Project Management Tools] to keep track of deadlines and break tasks into manageable steps. When faced with high-pressure situations, I focus on staying organized and calm, addressing urgent issues first while keeping an eye on long-term goals. Additionally, I practice stress-relief techniques such as [Technique, e.g., mindfulness, exercise] to ensure that I remain focused and resilient."},
  { prompt: "Describe your work style.", response: "My work style is collaborative and results-oriented. I believe in open communication and actively engage with team members to ensure that everyone is aligned with project goals. I prefer a structured approach to work, setting clear objectives and deadlines while remaining flexible to adapt to changing circumstances. I am detail-oriented and strive for high-quality results, but I also value efficiency and the ability to make quick decisions when needed. Balancing teamwork with individual accountability is key to my approach."}
];

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

const handleSend = async () => {
    if (!input) return;

    const matchedPrompt = predefinedPrompts.find(prompt => input.includes(prompt.prompt));
    let newMessages = [...messages, { text: `You: ${input}`, type: 'user' }];

    if (matchedPrompt) {
        newMessages.push({ text: `Bot: ${matchedPrompt.response}`, type: 'bot' });
    } else {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            const data = await response.json();
            newMessages.push({ text: `Bot: ${data.reply}`, type: 'bot' });
        } catch (error) {
            console.error('Error:', error);
            newMessages.push({ text: `Bot: Sorry, there was an error.`, type: 'bot' });
        }
    }

    setMessages(newMessages);
    setInput('');

    // Automatically save chat after each send
    try {
        await fetch('/api/saveChat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessages)
        });
    } catch (error) {
        console.error('Error saving chat:', error);
    }
};

  return (
      <div className={styles.container}>
          <h1 className={styles.title}>Interview Coach Chatbot</h1>
          <div className={styles.chatBox}>
              {messages.map((msg, index) => (
                  <div key={index} className={msg.type === 'user' ? styles.userMessage : styles.botMessage}>
                      {msg.text}
                  </div>
              ))}
          </div>
          <div className={styles.inputContainer}>
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className={styles.input}
              />
        <button onClick={handleSend} className={styles.sendButton}>Send</button>
      </div>
      </div>
  );
};

export default ChatInterface;