import React, { useEffect, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './chatbot.css';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { IChatMessage, IMessage } from '../../types/message';
import { createConversation, createChat } from '../../services/backend';

const firstMessage: IChatMessage = {
  type: 'chat',
  message: 'Olá, seja bem-vinda. Se você está aqui conosco é porque tem interesse nas questões que envolvem conflitos familiares, e para poder te ajudar, me conte um pouco mais sobre você.',
  sentTime: new Date().toLocaleTimeString(),
  sender: "ChatGPT",
  direction: 'incoming'
};

function Chatbot() {
  const [messages, setMessages] = useState<IMessage[]>([firstMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [askQuestions, setAskQuestions] = useState(true);
  const [contextSummary, setContextSummary] = useState('');
  const [isCreatedConversation, setIsCreatedConversation] = useState(false);
  const [conversationIdentifier, setConversationIdentifier] = useState('');

  const initialQuestions = [
    'Qual a sua idade? (responda apenas com números):',
    'Você é casada?',
    'Você tem filhos menores de 18 anos?',
    'Você trabalha ou tem alguma fonte de renda?',
    'Agora podemos responder suas perguntas. Qual a sua dúvida?'
  ];

  useEffect(() => {
    setMessages([
      firstMessage,
      {
        type: 'chat',
        message: initialQuestions[0],
        sentTime: new Date().toLocaleTimeString(),
        sender: "ChatGPT",
        direction: 'incoming'
      }
    ]);
  }, []);

  const handleSend = async (message: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    const userMessage: IChatMessage = {
      type: 'chat',
      message,
      sentTime: new Date().toLocaleTimeString(),
      sender: "user",
      direction: 'outgoing',
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    if (askQuestions) {
      const newAnswers = [...userAnswers, message];
      setUserAnswers(newAnswers);
      const nextQuestionIndex = newAnswers.length;

      if (nextQuestionIndex < initialQuestions.length) {
        setTimeout(() => {
          setMessages(prevMessages => [...prevMessages, {
            type: 'chat',
            message: initialQuestions[nextQuestionIndex],
            sentTime: new Date().toLocaleTimeString(),
            sender: "ChatGPT",
            direction: 'incoming'
          }]);
          setIsTyping(false);
        }, 500);
      } else {
        setAskQuestions(false);
        summarizeAndSetContext(newAnswers, message);
        setIsTyping(false);
      }
    } else if (conversationIdentifier) {
      const chatResponse = await createChat(message, conversationIdentifier);
      if (chatResponse && chatResponse.resposta_gpt) {
        const botMessage: IChatMessage = {
          type: 'chat',
          message: chatResponse.resposta_gpt,
          sentTime: new Date().toLocaleTimeString(),
          sender: "ChatGPT",
          direction: 'incoming',
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
      setIsTyping(false);
    }
  };

  const summarizeAndSetContext = async (answers: string[], firstQuestion: string) => {
    const summary = `Tenho ${answers[0]} anos, ${answers[1].toLowerCase() === 'sim' ? 'sou casada' : 'não sou casada'}, ${answers[2].toLowerCase() === 'sim' ? 'tenho filhos menores de 18 anos' : 'não tenho filhos menores de 18 anos'}, ${answers[3].toLowerCase() === 'sim' ? 'e tenho uma fonte de renda' : 'e não tenho uma fonte de renda'}. ${firstQuestion}`;
    setContextSummary(summary);
    const cookieId = window.localStorage.getItem('cookieId') || '';
    const conversation = await createConversation(cookieId);
    console.log(conversation);
    console.log(conversation.id);
    if (conversation && conversation.id) {
      setConversationIdentifier(conversation.id);
      setIsCreatedConversation(true);
      const chatResponse = await createChat(summary, conversation.id);
      if (chatResponse && chatResponse.resposta_gpt) {
        const botMessage: IChatMessage = {
          type: 'chat',
          message: chatResponse.resposta_gpt,
          sentTime: new Date().toLocaleTimeString(),
          sender: "ChatGPT",
          direction: 'incoming',
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    }
  };

  return (
    <>
      <div className='header'>
        <h1>Clara</h1>
      </div>
      <div className="chatbot">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}
            >
              {messages.map((msg, i) => {
                const chatMsg = msg as IChatMessage;
                const isUserMessage = chatMsg.sender === 'user';
                return (
                  <div key={i} className={`message-row ${isUserMessage ? 'user' : 'bot'}`}>
                    <Avatar
                      src={isUserMessage ? "https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg" : "https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"}
                      name={isUserMessage ? 'User' : 'Zoe'}
                      className="message-avatar"
                    />
                    <Message
                      model={{
                        message: chatMsg.message,
                        sentTime: chatMsg.sentTime,
                        direction: chatMsg.direction,
                        position: chatMsg.sender === "ChatGPT" ? "normal" : "single",
                      }}
                    />
                  </div>
                );
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default Chatbot;
