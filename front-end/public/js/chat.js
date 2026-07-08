/**
 * Kitanda - Chat WebSocket Integration
 */

class ChatClient {
    constructor() {
        this.socket = null;
        // CORREÇÃO 1: O token na API é guardado como 'access_token', não 'token'
        this.token = localStorage.getItem('access_token');
        this.chatMessagesContainer = null;
        this.chatInput = null;
        this.currentChatUserId = null;
        
        // UI Elements
        this.chatListContainer = document.getElementById('chat-list');
        this.chatMainArea = document.getElementById('chat-main');
        this.noChatSelectedArea = document.getElementById('no-chat-selected');
        this.chatCurrentUserLabel = document.getElementById('chat-current-user');
        
        // Input Elements
        this.msgInput = document.getElementById('msg-input');
        this.btnSend = document.getElementById('btn-send');
        this.searchInput = document.getElementById('search-users');
        
        if (this.token) {
            this.initWebSocket();
            this.loadConversas(); // Carregar histórico na sidebar
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        if (this.btnSend) {
            this.btnSend.addEventListener('click', () => this.handleSend());
        }
        
        if (this.msgInput) {
            this.msgInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSend();
            });
        }
        
        if (this.searchInput) {
            let searchTimeout = null;
            this.searchInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                clearTimeout(searchTimeout);
                
                if (val.length === 0) {
                    this.loadConversas(); // Volta à lista normal
                    return;
                }
                
                if (val.length < 2) return;

                searchTimeout = setTimeout(async () => {
                    if (this.chatListContainer) {
                        this.chatListContainer.innerHTML = '<div style="padding: 15px; color: #777; font-size: 13px; text-align: center;">A pesquisar...</div>';
                    }
                    try {
                        const res = await fetch(`${API_BASE_URL}/chat/buscar-utilizadores?q=${encodeURIComponent(val)}`, {
                            headers: { 'Authorization': `Bearer ${this.token}` }
                        });
                        
                        if (res.ok) {
                            const users = await res.json();
                            if (this.chatListContainer) {
                                this.chatListContainer.innerHTML = '';
                                if (users.length === 0) {
                                    this.chatListContainer.innerHTML = '<div style="padding: 15px; color: #777; font-size: 13px; text-align: center;">Nenhum utilizador encontrado.</div>';
                                    return;
                                }
                                
                                users.forEach(u => {
                                    const div = document.createElement('div');
                                    div.className = 'chat-item';
                                    div.innerHTML = `
                                        <strong>${this.escapeHTML(u.nome)}</strong>
                                        <div style="font-size: 12px; color: #888; margin-top: 5px;">${u.tipo === 'vendedor' ? 'Vendedor' : 'Comprador'}</div>
                                    `;
                                    div.onclick = () => {
                                        this.openChat(u.id, u.nome);
                                        this.searchInput.value = ''; // Limpa pesquisa
                                        this.loadConversas(); // Volta à lista normal
                                    };
                                    this.chatListContainer.appendChild(div);
                                });
                            }
                        }
                    } catch(err) {
                        console.error("Erro na pesquisa", err);
                    }
                }, 500);
            });
        }
    }

    handleSend() {
        if (!this.msgInput) return;
        const text = this.msgInput.value.trim();
        if (text) {
            this.sendMessage(text);
            this.msgInput.value = '';
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
            console.log('Chat WebSocket desconectado. Tentando reconectar em 5s...');
            setTimeout(() => this.initWebSocket(), 5000);
        };
    }

    async loadConversas() {
        if (!this.chatListContainer) return;

        try {
            const response = await fetch(`${API_BASE_URL}/chat/conversas`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });

            if (response.ok) {
                const conversas = await response.json();
                this.renderChatList(conversas);
            }
        } catch (error) {
            console.error("Erro ao carregar lista de conversas", error);
        }
    }

    renderChatList(conversas) {
        if (!this.chatListContainer) return;
        
        if (conversas.length === 0) {
            this.chatListContainer.innerHTML = '<div style="padding: 15px; color: #777; font-size: 13px; text-align: center;">Nenhuma conversa iniciada. Use a pesquisa.</div>';
            return;
        }

        this.chatListContainer.innerHTML = '';
        conversas.forEach(c => {
            const div = document.createElement('div');
            div.className = `chat-item ${this.currentChatUserId === c.utilizador_id ? 'active' : ''}`;
            div.style.position = 'relative';
            
            // Format time
            const timeStr = c.ultima_data ? new Date(c.ultima_data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
            
            // Unread badge
            const unreadBadge = c.nao_lidas > 0 ? `<div style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: var(--primary-color, #ff6b00); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">${c.nao_lidas}</div>` : '';

            // Truncate message
            let preview = c.ultima_mensagem || '';
            if (preview.length > 30) preview = preview.substring(0, 30) + '...';
            if (c.enviada_por_mim) preview = 'Tu: ' + preview;

            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong>${this.escapeHTML(c.nome)}</strong>
                    <span style="font-size: 11px; color: #999;">${timeStr}</span>
                </div>
                <div style="font-size: 12px; color: #666; margin-top: 5px; padding-right: 25px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${this.escapeHTML(preview)}
                </div>
                ${unreadBadge}
            `;
            
            div.onclick = () => {
                // Remove active class from all
                document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
                div.classList.add('active');
                
                this.openChat(c.utilizador_id, c.nome);
                
                // If it had unread, reload list to clear badge
                if (c.nao_lidas > 0) {
                    setTimeout(() => this.loadConversas(), 1000);
                }
            };
            this.chatListContainer.appendChild(div);
        });
    }

    handleIncomingMessage(message) {
        // Se a mensagem for da conversa atual (enviada ou recebida), renderiza na janela
        if (this.currentChatUserId === message.remetente_id || this.currentChatUserId === message.destinatario_id) {
            this.renderMessage(message);
        } else {
            // Se for de outra pessoa, notifica
            this.showToastNotification(message);
        }
        
        // Em qualquer caso, atualiza a sidebar para refletir a última mensagem e badges
        this.loadConversas();
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
        
        // Atualiza a UI Inline
        if (this.noChatSelectedArea) this.noChatSelectedArea.style.display = 'none';
        if (this.chatMainArea) this.chatMainArea.style.display = 'flex';
        if (this.chatCurrentUserLabel) this.chatCurrentUserLabel.innerText = userName;
        
        // Tenta encontrar o container de mensagens e input se não estiverem setados
        if (!this.chatMessagesContainer) {
            this.chatMessagesContainer = document.getElementById('chat-messages');
        }
        if (!this.chatInput) {
            this.chatInput = document.getElementById('msg-input');
        }

        if (this.chatMessagesContainer) {
            this.chatMessagesContainer.innerHTML = '<div style="text-align: center; color: #888; font-size: 13px; margin-top: 20px;">A carregar histórico...</div>';
        }

        // Carrega histórico
        try {
            const response = await fetch(`${API_BASE_URL}/chat/historico/${userId}`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            if (response.ok) {
                const history = await response.json();
                if (this.chatMessagesContainer) {
                    this.chatMessagesContainer.innerHTML = '';
                    if (history.length === 0) {
                        this.chatMessagesContainer.innerHTML = '<div style="text-align: center; color: #888; font-size: 13px; margin-top: 20px;">Esta é uma nova conversa. Diga olá!</div>';
                    } else {
                        history.forEach(msg => this.renderMessage(msg));
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao carregar histórico do chat", error);
            if (this.chatMessagesContainer) {
                this.chatMessagesContainer.innerHTML = '<div style="text-align: center; color: red; font-size: 13px; margin-top: 20px;">Erro ao carregar mensagens.</div>';
            }
        }
    }

    sendMessage(text) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            alert('Chat desconectado. Aguarde a reconexão.');
            return;
        }
        if (!this.currentChatUserId) return;

        const payload = {
            destinatario_id: this.currentChatUserId,
            conteudo: text
        };

        this.socket.send(JSON.stringify(payload));
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
        const toastId = 'toast-chat-' + Date.now();
        const notificationHtml = `
            <div id="${toastId}" style="position: fixed; top: 20px; right: 20px; background: white; border-left: 4px solid var(--primary-color, #ff6b00); box-shadow: 0 4px 12px rgba(0,0,0,0.15); padding: 15px; border-radius: 8px; z-index: 10000; display: flex; flex-direction: column; gap: 8px; min-width: 250px; font-family: sans-serif; animation: slideIn 0.3s ease-out;">
                <div style="font-weight: bold; color: #333;">Nova Mensagem</div>
                <div style="color: #666; font-size: 14px;">Você recebeu uma nova mensagem.</div>
                <div style="display: flex; gap: 10px; margin-top: 5px;">
                    <button id="btn-reply-${toastId}" style="background: var(--primary-color, #ff6b00); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Ver</button>
                    <button id="btn-close-${toastId}" style="background: transparent; color: #999; border: 1px solid #ccc; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Fechar</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', notificationHtml);

        const autoClose = setTimeout(() => {
            const el = document.getElementById(toastId);
            if(el) el.remove();
        }, 5000);

        document.getElementById(`btn-reply-${toastId}`).addEventListener('click', () => {
            clearTimeout(autoClose);
            document.getElementById(toastId).remove();
            
            // Abre o chat
            // Se estivermos na página de mensagens, o UI já está lá
            if (document.getElementById('chat-main')) {
                this.openChat(message.remetente_id, "Novo Utilizador");
                this.loadConversas(); // Recarrega para ter o nome real
            } else {
                // Se estiver noutra página, redireciona
                const isVendedor = window.location.pathname.includes('/painel_vendedor/');
                window.location.href = isVendedor ? 'mensagens.html' : '../painel_comprador/mensagens.html';
            }
        });

        document.getElementById(`btn-close-${toastId}`).addEventListener('click', () => {
            clearTimeout(autoClose);
            document.getElementById(toastId).remove();
        });
        
        // Adiciona um estilo inline para a animação se não existir
        if (!document.getElementById('chat-toast-style')) {
            const style = document.createElement('style');
            style.id = 'chat-toast-style';
            style.innerHTML = `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
            document.head.appendChild(style);
        }
    }
}

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
    window.chatClient = new ChatClient();
});
