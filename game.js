class CheesePizzaGame {
    constructor() {
        this.totalTB = 0;
        this.goalTB = 10;
        this.pizzasCollected = 0;
        this.gameWon = false;
        this.pizzaTiles = [];
        this.tileSize = 1; // Each pizza tile is 1 TB
        this.init();
    }

    init() {
        this.render();
    }

    collectPizza() {
        if (this.gameWon) {
            this.showMessage('🏆 Game already won! Reset to play again.', 'info');
            return;
        }

        this.totalTB += this.tileSize;
        this.pizzasCollected++;
        this.updateUI();
        this.createEmojiPop();
        this.showPizzaTile();

        if (this.totalTB >= this.goalTB) {
            this.win();
        }
    }

    showPizzaTile() {
        const board = document.getElementById('gameBoard');
        const randomIndex = Math.floor(Math.random() * this.pizzaTiles.length);
        const tile = this.pizzaTiles[randomIndex];
        
        if (tile) {
            tile.textContent = '🍕';
            tile.style.opacity = '1';
            
            // Remove pizza after a short delay
            setTimeout(() => {
                tile.textContent = '';
                tile.style.opacity = '0.5';
            }, 500);
        }
    }

    createEmojiPop() {
        const emoji = '🍕';
        const pop = document.createElement('div');
        pop.className = 'emoji-pop';
        pop.textContent = emoji;
        pop.style.left = Math.random() * window.innerWidth + 'px';
        pop.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(pop);

        setTimeout(() => pop.remove(), 1000);
    }

    updateUI() {
        document.getElementById('totalTB').textContent = this.totalTB;
        document.getElementById('pizzasCount').textContent = this.pizzasCollected;
        
        const percentage = Math.min((this.totalTB / this.goalTB) * 100, 100);
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = percentage + '%';
        progressFill.textContent = Math.floor(percentage) + '%';
    }

    showMessage(text, type = 'info') {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = 'message ' + type;

        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 2000);
    }

    win() {
        this.gameWon = true;
        document.getElementById('gameOverScreen').style.display = 'block';
        this.showMessage('🎉 Congratulations! You won! 🎉', 'success');
    }

    render() {
        const board = document.getElementById('gameBoard');
        board.innerHTML = '';
        this.pizzaTiles = [];

        // Create 16 tiles (4x4 grid)
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.className = 'empty-tile';
            tile.style.opacity = '0.5';
            tile.style.transition = 'all 0.3s ease';
            tile.addEventListener('click', () => this.collectPizza());
            board.appendChild(tile);
            this.pizzaTiles.push(tile);
        }

        this.updateUI();
        this.showPizzaTile();
    }

    reset() {
        this.totalTB = 0;
        this.pizzasCollected = 0;
        this.gameWon = false;
        document.getElementById('gameOverScreen').style.display = 'none';
        this.render();
        this.showMessage('Game reset! Start collecting pizza! 🍕', 'info');
    }
}

// Initialize game when page loads
const game = new CheesePizzaGame();