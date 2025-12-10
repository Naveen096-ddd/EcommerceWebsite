import React, { useState } from 'react';
import { Box, IconButton, Paper, TextField, Button, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const LiveChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const initialBotMessage = {
    sender: 'bot',
    text: 'Hi there! 👋 I am here to help you... How can I assist you today?',
  };

  const handleOpenChat = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([initialBotMessage]);
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Thanks for your message! We will get back to you soon.' },
      ]);
    }, 1000);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1500,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {!open ? (
        <IconButton
          onClick={handleOpenChat} // Updated
          sx={{
            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(135deg, #4b0082, #1e90ff)',
              transform: 'scale(1.1)',
            },
            width: 65,
            height: 65,
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          <ChatIcon fontSize="large" />
        </IconButton>
      ) : (
        <Paper
          elevation={8}
          sx={{
            width: 320,
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            border: '1px solid #6a11cb',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'primary.main',
              background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
              color: '#fff',
              p: 1,
              fontWeight: 'bold',
            }}
          >
            <Typography variant="subtitle1">Live Chat</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              p: 1,
              overflowY: 'auto',
              background: 'linear-gradient(to bottom, #f0f4f8, #d9e2ec)',
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: 1,
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                }}
              >
                <Paper
                  sx={{
                    display: 'inline-block',
                    p: 1.2,
                    maxWidth: '80%',
                    bgcolor: msg.sender === 'user' ? 'linear-gradient(135deg, #43e97b, #38f9d7)' : '#fffae3',
                    color: msg.sender === 'user' ? '#141212ff' : '#333',
                    borderRadius: 2,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                >
                  {msg.text}
                </Paper>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', p: 1, bgcolor: '#f5f5f5' }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                  background: '#ad9b9bff',
                },
              }}
            />
            <Button
              onClick={handleSend}
              sx={{
                ml: 1,
                borderRadius: '25px',
                background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff4b2b, #ff416c)',
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default LiveChat;
