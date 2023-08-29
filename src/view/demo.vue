<template>
    <div class="chat-container">
      <div class="message-list">
        <div v-for="(message, index) in messages" :key="index" class="message-item" :class="{ 'user-1': message.sender === 1, 'user-2': message.sender === 2 }">
          <div class="message-content" :class="message.type">
            <span v-if="message.type === 'text'">{{ newMessage.text }}</span>
            <img v-else-if="message.type === 'image'" :src="message.image" alt="Image">
            <audio v-else-if="message.type === 'voice'" :src="message.voice" controls></audio>
          </div>
        </div>
      </div>
      <div class="input-container">
        <div class="input-area">
          <input type="text" v-model="newMessage.text" @keyup.enter="sendMessage" placeholder="Type your message">
          <button @click="sendMessage">Send</button>
        </div>
        <div class="actions">
          <button @click="addMessage('text', 'Hello', 1)">Text</button>
          <button @click="addMessage('image', 'image-url', 1)">Image</button>
          <button @click="addMessage('voice', 'voice-url', 1)">Voice</button>
          <button @click="addMessage('emoji', '😊', 1)">Emoji</button>
          <button @click="addMessage('text', 'Hi', 2)">Text</button>
          <button @click="addMessage('image', 'image-url', 2)">Image</button>
          <button @click="addMessage('voice', 'voice-url', 2)">Voice</button>
          <button @click="addMessage('emoji', '😄', 2)">Emoji</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
        newMessage: {
          type: '',
          content: ''
        }
      }
    },
    methods: {
      sendMessage() {
        if (this.newMessage.type && this.newMessage.content) {
          this.addMessage(this.newMessage.type, this.newMessage.content, 1);
          this.newMessage.type = '';
          this.newMessage.content = '';
        }
      },
      addMessage(type, content, sender) {
        this.messages.push({
          sender: sender,
          type: type,
          content: content
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* 略过原有的样式 */
  
  .message-list {
    display: flex;
    flex-direction: column;
  }
  
  .message-item {
    display: flex;
    margin-bottom: 8px;
  }
  
  .message-item.user-1 .message-content {
    margin-left: auto;
  }
  
  .message-item.user-2 .message-content {
    margin-right: auto;
  }
  
  .message-content {
    display: flex;
    align-items: center;
  }
  
  .message-content.text {
    flex-grow: 1;
  }
  
  .message-content.text span {
    padding: 8px;
    border-radius: 4px;
    background-color: #eff7ff;
  }
  
  .message-content.image img {
    max-width: 100%;
    max-height: 200px;
  }
  
  .message-content.voice audio {
    margin-left: 8px;
  }
  </style>