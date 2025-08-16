let currentStep = 1;
let formData = {
    club: {},
    players: []
};
let playerCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize file upload
    const fileInput = document.getElementById('clubLogo');
    const uploadArea = document.getElementById('logoUploadArea');
    const preview = document.getElementById('logoPreview');
    
    fileInput.addEventListener('change', handleFileUpload);
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#1a1a1a';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#dee2e6';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#dee2e6';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileUpload();
        }
    });
    
    // Add initial players
    for (let i = 0; i < 6; i++) {
        addPlayer();
    }
});

function handleFileUpload() {
    const fileInput = document.getElementById('clubLogo');
    const preview = document.getElementById('logoPreview');
    const placeholder = document.querySelector('.upload-placeholder');
    
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
            formData.club.logoData = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep === 1) {
            collectClubData();
        } else if (currentStep === 2) {
            collectPlayersData();
        }
        
        if (currentStep < 3) {
            currentStep++;
            showStep(currentStep);
            
            if (currentStep === 3) {
                showConfirmation();
            }
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.progress-step').forEach(s => {
        s.classList.remove('active');
        if (parseInt(s.dataset.step) < step) {
            s.classList.add('completed');
        } else {
            s.classList.remove('completed');
        }
    });
    
    // Show current step
    document.querySelector(`[data-step="${step}"].step`).classList.add('active');
    document.querySelector(`[data-step="${step}"].progress-step`).classList.add('active');
}

function validateCurrentStep() {
    if (currentStep === 1) {
        const clubName = document.getElementById('clubName').value.trim();
        const ownerName = document.getElementById('ownerName').value.trim();
        const clubLogo = document.getElementById('clubLogo').files[0];
        
        if (!clubLogo) {
            alert('Por favor, carregue o logo do clube');
            return false;
        }
        
        if (!clubName) {
            alert('Por favor, preencha o nome do clube');
            return false;
        }
        
        if (!ownerName) {
            alert('Por favor, preencha o nome do dono/capitão');
            return false;
        }
        
        return true;
    }
    
    if (currentStep === 2) {
        const players = collectPlayersData();
        
        if (players.length < 6) {
            alert('É necessário ter pelo menos 6 jogadores');
            return false;
        }
        
        if (players.length > 10) {
            alert('Máximo de 10 jogadores permitido');
            return false;
        }
        
        // Check for captain
        const hasCaptain = players.some(p => p.captain);
        if (!hasCaptain) {
            alert('É necessário selecionar um capitão');
            return false;
        }
        
        // Validate each player
        for (let player of players) {
            if (!player.id.trim()) {
                alert(`ID do ${player.name || 'jogador'} é obrigatório`);
                return false;
            }
            
            if (!player.nick.trim()) {
                alert(`NICK do ${player.name || 'jogador'} é obrigatório`);
                return false;
            }
            
            if (player.positions.length === 0) {
                alert(`Selecione pelo menos uma posição para ${player.name || 'jogador'}`);
                return false;
            }
        }
        
        return true;
    }
    
    return true;
}

function collectClubData() {
    formData.club = {
        name: document.getElementById('clubName').value.trim(),
        owner: document.getElementById('ownerName').value.trim(),
        logoData: formData.club.logoData
    };
}

function collectPlayersData() {
    const players = [];
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach((card, index) => {
        const id = card.querySelector(`[name="playerId${index}"]`).value.trim();
        const nick = card.querySelector(`[name="playerNick${index}"]`).value.trim();
        const positions = [];
        const captain = card.querySelector(`[name="playerCaptain${index}"]`).checked;
        
        card.querySelectorAll('input[type="checkbox"]:not([name^="playerCaptain"]):checked').forEach(checkbox => {
            positions.push(checkbox.value);
        });
        
        if (id || nick) {
            players.push({
                id,
                nick,
                positions,
                captain
            });
        }
    });
    
    formData.players = players;
    return players;
}

function addPlayer() {
    if (playerCount >= 10) {
        alert('Máximo de 10 jogadores permitido');
        return;
    }
    
    const container = document.getElementById('playersContainer');
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-card';
    playerDiv.innerHTML = `
        <div class="player-header">
            <span class="player-number">Jogador ${playerCount + 1}</span>
            <button type="button" class="remove-player" onclick="removePlayer(this)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        <div class="player-fields">
            <div class="form-group">
                <label>ID *</label>
                <input type="text" name="playerId${playerCount}" required placeholder="ID do jogador">
            </div>
            
            <div class="form-group">
                <label>NICK *</label>
                <input type="text" name="playerNick${playerCount}" required placeholder="Nome no jogo">
            </div>
        </div>
        
        <div class="position-group">
            <label>Posições *</label>
            <div class="position-checkboxes">
                <div class="checkbox-group">
                    <input type="checkbox" id="gl${playerCount}" value="GL">
                    <label for="gl${playerCount}">GL</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="vl${playerCount}" value="VL">
                    <label for="vl${playerCount}">VL</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="pv${playerCount}" value="PV">
                    <label for="pv${playerCount}">PV</label>
                </div>
            </div>
        </div>
        
        <div class="captain-checkbox">
            <label>
                <input type="checkbox" name="playerCaptain${playerCount}" onchange="handleCaptainChange(this)">
                Capitão do time
            </label>
        </div>
    `;
    
    container.appendChild(playerDiv);
    playerCount++;
    updatePlayersCount();
    
    // Enable/disable add button
    const addBtn = document.getElementById('addPlayerBtn');
    if (playerCount >= 10) {
        addBtn.disabled = true;
        addBtn.style.opacity = '0.5';
    }
}

function removePlayer(button) {
    if (playerCount <= 6) {
        alert('Mínimo de 6 jogadores necessário');
        return;
    }
    
    const playerCard = button.closest('.player-card');
    playerCard.remove();
    playerCount--;
    updatePlayersCount();
    
    // Re-enable add button
    const addBtn = document.getElementById('addPlayerBtn');
    addBtn.disabled = false;
    addBtn.style.opacity = '1';
    
    // Update player numbers
    updatePlayerNumbers();
}

function updatePlayerNumbers() {
    const playerCards = document.querySelectorAll('.player-card');
    playerCards.forEach((card, index) => {
        card.querySelector('.player-number').textContent = `Jogador ${index + 1}`;
    });
}

function updatePlayersCount() {
    document.getElementById('playersCount').textContent = playerCount;
}

function handleCaptainChange(checkbox) {
    if (checkbox.checked) {
        // Uncheck other captain checkboxes
        document.querySelectorAll('input[name^="playerCaptain"]').forEach(cb => {
            if (cb !== checkbox) {
                cb.checked = false;
            }
        });
    }
}

function showConfirmation() {
    const confirmationDiv = document.getElementById('confirmationData');
    
    let html = `
        <div class="confirmation-section">
            <h3>Dados do Clube</h3>
            <div class="confirmation-item">
                <span>Logo:</span>
                <img src="${formData.club.logoData}" class="confirmation-logo" alt="Logo do clube">
            </div>
            <div class="confirmation-item">
                <span>Nome do Clube:</span>
                <span>${formData.club.name}</span>
            </div>
            <div class="confirmation-item">
                <span>Dono/Capitão:</span>
                <span>${formData.club.owner}</span>
            </div>
        </div>
        
        <div class="confirmation-section">
            <h3>Jogadores (${formData.players.length})</h3>
    `;
    
    formData.players.forEach((player, index) => {
        html += `
            <div class="confirmation-item">
                <span>Jogador ${index + 1}${player.captain ? ' (Capitão)' : ''}:</span>
                <span>${player.nick} - ID: ${player.id} - ${player.positions.join(', ')}</span>
            </div>
        `;
    });
    
    html += '</div>';
    confirmationDiv.innerHTML = html;
}

function submitForm() {
    // Show success modal
    const modal = document.getElementById('successModal');
    const overlay = document.getElementById('modalOverlay');
    
    modal.classList.add('show');
    overlay.classList.add('show');
}

function sendToWhatsApp() {
    // Prepare message
    let message = `*INSCRIÇÃO CPM - CAMPEONATO PAULISTA DE MAMOBALL*\n\n`;
    message += `*DADOS DO CLUBE:*\n`;
    message += `Nome: ${formData.club.name}\n`;
    message += `Dono/Capitão: ${formData.club.owner}\n\n`;
    message += `*JOGADORES (${formData.players.length}):*\n`;
    
    formData.players.forEach((player, index) => {
        message += `${index + 1}. ${player.nick}${player.captain ? ' (CAPITÃO)' : ''}\n`;
        message += `   ID: ${player.id}\n`;
        message += `   Posições: ${player.positions.join(', ')}\n\n`;
    });
    
    message += `📎 *LOGO DO CLUBE:*\n`;
    message += `O logo será enviado como imagem em seguida.\n\n`;
    message += `_Para finalizar a inscrição, envie esta mensagem junto com o logo do clube._`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "5511986724226";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Try to download the logo for manual sending
    if (formData.club.logoData) {
        const link = document.createElement('a');
        link.href = formData.club.logoData;
        link.download = `${formData.club.name.replace(/\s+/g, '_')}_logo.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show additional instruction
        setTimeout(() => {
            alert('O logo foi baixado automaticamente. Por favor, envie-o manualmente no WhatsApp junto com a mensagem.');
        }, 1000);
    }
    
    // Close modal and redirect to home
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}