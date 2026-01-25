/**
 * Heritage Chatbot - AI Guide for Ubuntu Heritage Foundation
 * A premium, animated chatbot experience matching the Afro-maximalist aesthetic.
 */

class HeritageChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [
            {
                role: 'assistant',
                content: 'Sawubona! I am your Heritage Guide. How can I help you explore the rich legacy of African royalty today?'
            }
        ];

        this.knowledgeBase = {
            'mission': 'Our mission is to preserve and honor the rich cultural legacy of African kingdoms through education, preservation, and community empowerment.',
            'founder': 'We are proud partners with The Mzilikazi Royal Foundation, carrying forward the vision of unity and strength.',
            'volunteer': 'You can become a Heritage Guardian! We have roles for Story Keepers, Cultural Artists, Ambassadors, and Youth Mentors. Check the "Volunteer" section above.',
            'donate': 'Your contributions help us establish learning centers, fund workshops, and preserve oral histories. Every gift makes a difference!',
            'kingdoms': 'We celebrate the majesty of many kingdoms, including the Zulu, Ndebele, Swazi, and more across the continent.',
            'foundation': 'The Mzilikazi Royal Foundation is named after King Mzilikazi kaMashobane, founder of the Matabele nation.',
            'hello': 'Sawubona! I am honored to speak with you. How can I assist you in your journey?',
            'hi': 'Greetings! I am your guide to African heritage. What would you like to know?',
            'thanks': 'It is my pleasure. Stay rooted in your heritage!',
            'thank you': 'You are most welcome. Unity is our strength.',
            'who are you': 'I am the Heritage Storykeeper, a digital guardian of our ancestors\' wisdom and the Foundation\'s mission.'
        };

        this.init();
    }

    init() {
        this.createElements();
        this.bindEvents();
        this.renderMessages();
    }

    createElements() {
        // Chat Toggle Button
        const toggle = document.createElement('div');
        toggle.className = 'chat-toggle magnetic';
        toggle.id = 'chatToggle';
        toggle.innerHTML = `
            <div class="toggle-icon">
                <img src="assets/ubuntu_logo-removebg.png" alt="Chat Logo">
            </div>
            <div class="toggle-pulse"></div>
            <div class="toggle-tooltip">Chat with Heritage Guide</div>
        `;
        document.body.appendChild(toggle);

        // Chat Window
        const window = document.createElement('div');
        window.className = 'chat-window';
        window.id = 'chatWindow';
        window.innerHTML = `
            <div class="chat-header">
                <div class="header-info">
                    <div class="header-avatar"><i class="ph-duotone ph-lion"></i></div>
                    <div class="header-text">
                        <h3>Heritage Storykeeper</h3>
                        <span class="status-online">Online • Royal Guide</span>
                    </div>
                </div>
                <button class="chat-close" id="chatClose"><i class="ph ph-x"></i></button>
            </div>
            <div class="chat-body" id="chatBody">
                <div class="chat-adinkra-bg"></div>
            </div>
            <form class="chat-footer" id="chatForm">
                <input type="text" id="chatInput" placeholder="Ask about our heritage..." autocomplete="off">
                <button type="submit" class="chat-send">
                    <i class="ph-duotone ph-paper-plane-tilt"></i>
                </button>
            </form>
        `;
        document.body.appendChild(window);

        this.toggleBtn = toggle;
        this.window = window;
        this.chatBody = document.getElementById('chatBody');
        this.chatInput = document.getElementById('chatInput');
        this.chatForm = document.getElementById('chatForm');
    }

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        document.getElementById('chatClose').addEventListener('click', () => this.toggleChat());

        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSendMessage();
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.toggleChat();
        });

        // Magnetic effect for toggle (if GSAP is available)
        if (window.gsap) {
            this.toggleBtn.addEventListener('mousemove', (e) => {
                const rect = this.toggleBtn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(this.toggleBtn, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.3
                });
            });
            this.toggleBtn.addEventListener('mouseleave', () => {
                gsap.to(this.toggleBtn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
            });
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.window.classList.add('active');
            this.toggleBtn.classList.add('hidden');
            this.chatInput.focus();

            // GSAP Animation
            if (window.gsap) {
                gsap.fromTo(this.window,
                    { opacity: 0, y: 50, scale: 0.9, rotate: -2 },
                    { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)' }
                );
            }
        } else {
            if (window.gsap) {
                gsap.to(this.window, {
                    opacity: 0, y: 50, scale: 0.9, rotate: 2, duration: 0.4, ease: 'power2.in',
                    onComplete: () => {
                        this.window.classList.remove('active');
                        this.toggleBtn.classList.remove('hidden');
                    }
                });
            } else {
                this.window.classList.remove('active');
                this.toggleBtn.classList.remove('hidden');
            }
        }
    }

    handleSendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        this.chatInput.value = '';

        // Typing indicator
        this.showTypingIndicator();

        // Process response
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.getResponse(text);
            this.addMessage('assistant', response);
        }, 1200 + Math.random() * 1000);
    }

    getResponse(text) {
        const lowerText = text.toLowerCase();

        for (const key in this.knowledgeBase) {
            if (lowerText.includes(key)) {
                return this.knowledgeBase[key];
            }
        }

        return "That is a profound question. Our heritage is vast and deep. I would suggest exploring our Story section or contacting our team for more detailed historical accounts.";
    }

    addMessage(role, content) {
        this.messages.push({ role, content });
        this.renderMessage(role, content);
        this.scrollToBottom();
    }

    renderMessages() {
        this.chatBody.innerHTML = '<div class="chat-adinkra-bg"></div>';
        this.messages.forEach(msg => this.renderMessage(msg.role, msg.content));
    }

    renderMessage(role, content) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message message-${role}`;
        msgDiv.innerHTML = `
            <div class="message-content">
                ${content}
                <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        `;
        this.chatBody.appendChild(msgDiv);

        // GSAP Animation for message
        if (window.gsap) {
            gsap.from(msgDiv, {
                opacity: 0,
                x: role === 'user' ? 20 : -20,
                y: 10,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message message-assistant typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        this.chatBody.appendChild(indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure styles and GSAP are ready
    setTimeout(() => {
        window.heritageChat = new HeritageChatbot();
    }, 1000);
});
