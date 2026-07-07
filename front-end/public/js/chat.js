/**
 * Kitanda - Chat WebSocket Integration
 */

class ChatClient {
    constructor() {
        this.socket = null;
        this.token = localStorage.getItem('token');
        this.chatModal = null;
        this.chatMessagesContainer = null;
        this.chatInput = null;
        this.currentChatUserId = null;
        
        if (this.token) {
            this.initWebSocket();
        }
    }

    initWebSocket() {
        // Assume API_BASE_URL contains http://, replace with ws://
        const wsUrl = API_BASE_URL.replace(/^http/, 'ws') + `/chat/ws?token=${this.token}`;
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log('Chat WebSocket conectado.');
        };

        this.socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                this.handleIncomingMessage(message);
            } catch (e) {
                console.error("Erro ao processar mensagem do chat:", e);
            }
        };

        this.socket.onclose = () => {
            console.log('Chat WebSocket desconectado. Tentando reconectar...');
            setTimeout(() => this.initWebSocket(), 5000);
        };
    }

    handleIncomingMessage(message) {
        // Se o chat com este utilizador estiver aberto, mostra a mensagem
        if (this.currentChatUserId === message.remetente_id || this.currentChatUserId === message.destinatario_id) {
            this.renderMessage(message);
        } else {
            // Caso contrário, mostra uma notificação toast
            this.showToastNotification(message);
        }
    }

    renderMessage(message) {
        if (!this.chatMessagesContainer) return;
        
        const isMine = message.remetente_id === this.getCurrentUserId();
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${isMine ? 'mine' : 'theirs'}`;
        
        msgDiv.innerHTML = `
            <div class="msg-content">${this.escapeHTML(message.conteudo)}</div>
            <div class="msg-time">${new Date(message.criado_em).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        
        this.chatMessagesContainer.appendChild(msgDiv);
        this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
    }

    async openChat(userId, userName) {
        this.currentChatUserId = userId;
        this.createChatUI(userName);
        
        // Load history
        try {
            const response = await fetch(`${API_BASE_URL}/chat/historico/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (response.ok) {
                const history = await response.json();
                this.chatMessagesContainer.innerHTML = '';
                history.forEach(msg => this.renderMessage(msg));
            }
        } catch (error) {
            console.error("Erro ao carregar histórico do chat", error);
        }
    }

    sendMessage(text) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            alert('Chat desconectado. Tente novamente mais tarde.');
            return;
        }

        const payload = {
            destinatario_id: this.currentChatUserId,
            conteudo: text
        };

        this.socket.send(JSON.stringify(payload));
    }

    createChatUI(userName) {
        if (document.getElementById('kitanda-chat-modal')) {
            document.getElementById('kitanda-chat-modal').style.display = 'flex';
            document.getElementById('chat-header-name').innerText = userName;
            return;
        }

        const modalHtml = `
            <div id="kitanda-chat-modal" class="chat-modal">
                <div class="chat-header">
                    <h3 id="chat-header-name">${userName}</h3>
                    <button class="close-chat" onclick="document.getElementById('kitanda-chat-modal').style.display='none'">&times;</button>
                </div>
                <div class="chat-messages" id="chat-messages-container"></div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Escreva uma mensagem...">
                    <button id="chat-send-btn">Enviar</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        this.chatModal = document.getElementById('kitanda-chat-modal');
        this.chatMessagesContainer = document.getElementById('chat-messages-container');
        this.chatInput = document.getElementById('chat-input');
        
        document.getElementById('chat-send-btn').addEventListener('click', () => {
            const text = this.chatInput.value.trim();
            if (text) {
                this.sendMessage(text);
                this.chatInput.value = '';
            }
        });

        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = this.chatInput.value.trim();
                if (text) {
                    this.sendMessage(text);
                    this.chatInput.value = '';
                }
            }
        });

        // Add some basic styles dynamically
        if (!document.getElementById('chat-styles')) {
            const style = document.createElement('style');
            style.id = 'chat-styles';
            style.textContent = `
                .chat-modal { position: fixed; bottom: 20px; right: 20px; width: 350px; height: 450px; background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); display: flex; flex-direction: column; z-index: 9999; font-family: var(--font-main, sans-serif); border: 1px solid #eaeaea; }
                .chat-header { background: var(--primary-color, #1a73e8); color: white; padding: 15px; border-radius: 12px 12px 0 0; display: flex; justify-content: space-between; align-items: center; }
                .chat-header h3 { margin: 0; font-size: 16px; }
                .close-chat { background: none; border: none; color: white; font-size: 24px; cursor: pointer; }
                .chat-messages { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #f9f9f9; }
                .chat-message { max-width: 80%; padding: 10px 14px; border-radius: 18px; position: relative; font-size: 14px; }
                .chat-message.mine { align-self: flex-end; background: var(--primary-color, #1a73e8); color: white; border-bottom-right-radius: 4px; }
                .chat-message.theirs { align-self: flex-start; background: #e0e0e0; color: #333; border-bottom-left-radius: 4px; }
                .msg-time { font-size: 10px; margin-top: 4px; opacity: 0.7; text-align: right; }
                .chat-input-area { padding: 15px; border-top: 1px solid #eaeaea; display: flex; gap: 10px; background: white; border-radius: 0 0 12px 12px; }
                .chat-input-area input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; }
                .chat-input-area button { background: var(--primary-color, #1a73e8); color: white; border: none; padding: 10px 15px; border-radius: 20px; cursor: pointer; }
            `;
            document.head.appendChild(style);
        }
    }

    getCurrentUserId() {
        if (!this.token) return null;
        try {
            const payload = JSON.parse(atob(this.token.split('.')[1]));
            return parseInt(payload.sub);
        } catch (e) {
            return null;
        }
    }

    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    showToastNotification(message) {
        // Criar um elemento customizado para a notificação
        const toastId = 'toast-' + Date.now();
        const notificationHtml = `
            <div id="${toastId}" style="position: fixed; top: 20px; right: 20px; background: white; border-left: 4px solid var(--primary-color, #1a73e8); box-shadow: 0 4px 12px rgba(0,0,0,0.15); padding: 15px; border-radius: 8px; z-index: 10000; display: flex; flex-direction: column; gap: 8px; min-width: 250px; font-family: sans-serif; animation: slideIn 0.3s ease-out;">
                <div style="font-weight: bold; color: #333;">Nova Mensagem</div>
                <div style="color: #666; font-size: 14px;">Você recebeu uma mensagem.</div>
                <div style="display: flex; gap: 10px; margin-top: 5px;">
                    <button id="btn-reply-${toastId}" style="background: var(--primary-color, #1a73e8); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Responder no Chat</button>
                    <button id="btn-close-${toastId}" style="background: transparent; color: #999; border: 1px solid #ccc; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Fechar</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', notificationHtml);

        // Remover toast após 5 segundos se não for clicado
        const autoClose = setTimeout(() => {
            const el = document.getElementById(toastId);
            if(el) el.remove();
        }, 5000);

        // Lidar com clique em Responder
        document.getElementById(`btn-reply-${toastId}`).addEventListener('click', () => {
            clearTimeout(autoClose);
            document.getElementById(toastId).remove();
            
            // Abre o popup do chat com o remetente da mensagem
            // Idealmente faríamos um fetch do nome do remetente. Aqui usamos genérico "Utilizador".
            this.openChat(message.remetente_id, "Utilizador " + message.remetente_id);
        });

        // Lidar com clique em Fechar
        document.getElementById(`btn-close-${toastId}`).addEventListener('click', () => {
            clearTimeout(autoClose);
            document.getElementById(toastId).remove();
        });
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    window.chatClient = new ChatClient();
});
