import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Utils
import { formatCurrency, formatDate, generateSummaryStats } from '../utils/api';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatToggleButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1c478a;
    transform: scale(1.05);
  }
`;

const ChatboxContainer = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  span {
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageBubble = styled(motion.div)`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 5px;
  
  ${props => props.isUser ? `
    background-color: var(--primary-color);
    color: var(--white);
    align-self: flex-end;
    border-bottom-right-radius: 5px;
  ` : `
    background-color: var(--light-gray);
    color: var(--text-color);
    align-self: flex-start;
    border-bottom-left-radius: 5px;
  `}
`;

const ChatInputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid var(--medium-gray);
  display: flex;
  gap: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid var(--medium-gray);
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(26, 95, 180, 0.1);
  }
`;

const SendButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #1c478a;
  }
  
  &:disabled {
    background-color: var(--medium-gray);
    cursor: not-allowed;
  }
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const SuggestionButton = styled.button`
  background-color: rgba(26, 95, 180, 0.1);
  border: 1px solid rgba(26, 95, 180, 0.2);
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(26, 95, 180, 0.2);
  }
`;

const Chatbot = ({ grantsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What is the largest grant?",
    "How much total savings?",
    "Which agency saved the most?",
    "What is $FDA token?",
    "How many grants are monitored?"
  ]);
  
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // When messages update, scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Initial message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "👋 Hello! I'm the First Doge Agent ($FDA) assistant. I can help you with questions about government grants and savings. What would you like to know?",
          isUser: false
        }
      ]);
    }
  }, [isOpen, messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Process and generate response
    const response = generateResponse(input, grantsData);
    setInput('');
    
    // Add bot response with a slight delay to mimic typing
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, response]);
    }, 600);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question) => {
    setInput(question);
    // Add user message
    const userMessage = { text: question, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Process and generate response
    const response = generateResponse(question, grantsData);
    
    // Add bot response with a slight delay to mimic typing
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, response]);
    }, 600);
  };
  
  // Animation variants
  const chatboxVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatboxContainer
            variants={chatboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ChatHeader>
              <ChatTitle>
                <span>🐕</span> $FDA Assistant
              </ChatTitle>
              <CloseButton onClick={toggleChat}>✕</CloseButton>
            </ChatHeader>
            
            <ChatMessagesContainer>
              {messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  isUser={message.isUser}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {message.text}
                </MessageBubble>
              ))}
              <div ref={messagesEndRef} />
            </ChatMessagesContainer>
            
            {messages.length === 1 && (
              <SuggestedQuestions>
                {suggestedQuestions.map((question, index) => (
                  <SuggestionButton 
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </SuggestionButton>
                ))}
              </SuggestedQuestions>
            )}
            
            <ChatInputContainer>
              <ChatInput
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <SendButton onClick={handleSendMessage} disabled={input.trim() === ''}>
                ➤
              </SendButton>
            </ChatInputContainer>
          </ChatboxContainer>
        )}
      </AnimatePresence>
      
      <ChatToggleButton onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </ChatToggleButton>
    </ChatbotContainer>
  );
};

// Function to generate responses based on user input and DOGE API data
const generateResponse = (userInput, grantsData) => {
  const input = userInput.toLowerCase();
  
  // Default response if we can't understand the question
  let response = {
    text: "I'm not sure I understand that question. Please ask something about government grants, savings, or the $FDA token.",
    isUser: false
  };
  
  // Check if we have grantsData to work with
  if (!grantsData || !grantsData.grants) {
    return {
      text: "I'm sorry, but I don't have access to the grants data at the moment. Please try again later.",
      isUser: false
    };
  }
  
  // Calculate stats
  const stats = generateSummaryStats(grantsData);
  
  // Check for questions about largest grant
  if (input.includes('largest grant') || input.includes('biggest grant')) {
    const largestGrant = grantsData.grants[0]; // Already sorted by value desc
    response = {
      text: `The largest grant is ${formatCurrency(largestGrant.value)} to ${largestGrant.recipient} from ${largestGrant.agency}, dated ${formatDate(largestGrant.date)}.`,
      isUser: false
    };
  }
  
  // Check for questions about total savings
  else if (input.includes('total savings') || input.includes('how much saved')) {
    response = {
      text: `The total identified savings across all monitored grants is ${formatCurrency(stats.totalSavings)}, which represents ${stats.savingsPercentage} of the total grant value.`,
      isUser: false
    };
  }
  
  // Check for questions about which agency saved the most
  else if (input.includes('agency saved') || input.includes('which agency')) {
    // Group by agency and calculate savings
    const agencySavings = {};
    grantsData.grants.forEach(grant => {
      if (!grant.agency) return;
      
      if (!agencySavings[grant.agency]) {
        agencySavings[grant.agency] = 0;
      }
      agencySavings[grant.agency] += grant.savings || 0;
    });
    
    // Find agency with most savings
    let topAgency = '';
    let topSavings = 0;
    
    Object.entries(agencySavings).forEach(([agency, savings]) => {
      if (savings > topSavings) {
        topAgency = agency;
        topSavings = savings;
      }
    });
    
    response = {
      text: `${topAgency} has achieved the highest savings of ${formatCurrency(topSavings)} across their grant programs.`,
      isUser: false
    };
  }
  
  // Check for questions about $FDA token
  else if (input.includes('$fda') || input.includes('fda token') || input.includes('token')) {
    response = {
      text: `The $FDA token is the governance token for the First Doge Agent platform. It allows holders to vote on transparency initiatives, propose new oversight mechanisms, and access premium features. The total supply is 1 billion tokens, with 60% allocated for public distribution.`,
      isUser: false
    };
  }
  
  // Check for questions about number of grants
  else if (input.includes('how many grants') || input.includes('number of grants') || input.includes('grants monitored')) {
    const totalGrants = grantsData.meta.total_results;
    response = {
      text: `We are currently monitoring ${totalGrants.toLocaleString()} government grants with a total value of ${formatCurrency(stats.totalValue)}.`,
      isUser: false
    };
  }
  
  // Check for greetings
  else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    response = {
      text: `Hello! I'm the First Doge Agent assistant. I can answer questions about government grants and savings. How can I help you today?`,
      isUser: false
    };
  }
  
  // Check for questions about specific recipients
  else if (input.includes('recipient') || grantsData.grants.some(grant => 
    grant.recipient && input.includes(grant.recipient.toLowerCase()))) {
    
    // Find if a specific recipient is mentioned
    const mentionedRecipient = grantsData.grants.find(grant => 
      grant.recipient && input.includes(grant.recipient.toLowerCase())
    );
    
    if (mentionedRecipient) {
      // Get all grants to this recipient
      const recipientGrants = grantsData.grants.filter(grant => 
        grant.recipient === mentionedRecipient.recipient
      );
      
      const totalValue = recipientGrants.reduce((sum, grant) => sum + (grant.value || 0), 0);
      const totalSavings = recipientGrants.reduce((sum, grant) => sum + (grant.savings || 0), 0);
      
      response = {
        text: `${mentionedRecipient.recipient} has received ${recipientGrants.length} grants with a total value of ${formatCurrency(totalValue)}. The identified savings from these grants is ${formatCurrency(totalSavings)}.`,
        isUser: false
      };
    } else {
      // List top recipients
      const topRecipients = [...new Set(grantsData.grants.map(grant => grant.recipient))]
        .slice(0, 3);
      
      response = {
        text: `Some of the top grant recipients include: ${topRecipients.join(', ')}. You can ask me about specific recipients for more details.`,
        isUser: false
      };
    }
  }
  
  return response;
};

export default Chatbot;