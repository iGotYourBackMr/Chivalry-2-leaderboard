// Mock data for all three pages
const mockDataPages = {
    1: [
        { rank: 1, player: "AaronSplaron", elo: 2150, wins: 542, losses: 123, clan: "Elite" },
        { rank: 2, player: "CK Shiveringcow", elo: 1940, wins: 498, losses: 145, clan: "CK" },
        { rank: 3, player: "AsTre", elo: 1830, wins: 467, losses: 167, clan: "AST" },
        { rank: 4, player: "Sintrail", elo: 1750, wins: 445, losses: 178, clan: "KoR" },
        { rank: 5, player: "RiceHankCO", elo: 1680, wins: 423, losses: 189, clan: "RICE" },
        { rank: 6, player: "BKM Report", elo: 1620, wins: 410, losses: 195, clan: "BKM" },
        { rank: 7, player: "Kazperinooo", elo: 1580, wins: 389, losses: 201, clan: null },
        { rank: 8, player: "ARB Ragnar", elo: 1520, wins: 375, losses: 210, clan: "ARB" },
        { rank: 9, player: "venom", elo: 1490, wins: 362, losses: 218, clan: "VNM" },
        { rank: 10, player: "JavelinBro", elo: 1450, wins: 348, losses: 225, clan: null }
    ],
    2: [
        { rank: 11, player: "WarMaster", elo: 1420, wins: 335, losses: 232, clan: "WAR" },
        { rank: 12, player: "SwiftBlade", elo: 1390, wins: 322, losses: 240, clan: "SB" },
        { rank: 13, player: "KnightKing", elo: 1360, wins: 310, losses: 248, clan: "KK" },
        { rank: 14, player: "DragonSlayer", elo: 1330, wins: 298, losses: 255, clan: "DS" },
        { rank: 15, player: "ShadowBlade", elo: 1300, wins: 285, losses: 262, clan: "SHD" },
        { rank: 16, player: "StormBringer", elo: 1270, wins: 273, losses: 270, clan: "STM" },
        { rank: 17, player: "IronHeart", elo: 1240, wins: 262, losses: 278, clan: "IRN" },
        { rank: 18, player: "FrostBite", elo: 1210, wins: 250, losses: 285, clan: "FST" },
        { rank: 19, player: "FireLord", elo: 1180, wins: 238, losses: 292, clan: "FIR" },
        { rank: 20, player: "ThunderGod", elo: 1150, wins: 227, losses: 300, clan: "THD" }
    ],
    3: [
        { rank: 21, player: "BladeRunner", elo: 1120, wins: 215, losses: 308, clan: "BLD" },
        { rank: 22, player: "DarkKnight", elo: 1090, wins: 204, losses: 315, clan: "DRK" },
        { rank: 23, player: "MoonWalker", elo: 1060, wins: 192, losses: 322, clan: "MOON" },
        { rank: 24, player: "StarLord", elo: 1030, wins: 181, losses: 330, clan: "STAR" },
        { rank: 25, player: "SunWarrior", elo: 1000, wins: 170, losses: 338, clan: "SUN" },
        { rank: 26, player: "CloudStriker", elo: 970, wins: 159, losses: 345, clan: null },
        { rank: 27, player: "RainMaker", elo: 940, wins: 148, losses: 352, clan: "RAIN" },
        { rank: 28, player: "WindRider", elo: 910, wins: 138, losses: 360, clan: "WIND" },
        { rank: 29, player: "EarthShaker", elo: 880, wins: 127, losses: 368, clan: "ERTH" },
        { rank: 30, player: "LightBringer", elo: 850, wins: 117, losses: 375, clan: "LGHT" }
    ]
};

// Global state for pagination
let currentPage = 1;
let totalPages = 3;

// Function to get rank badge HTML
function getRankBadge(elo) {
    let badge;

    if (elo >= 2000) {
        badge = {
            icon: '⚔️',
            name: 'GRANDMASTER',
            color: '#ff4655',
            bgColor: 'rgba(255, 70, 85, 0.1)',
            borderColor: 'rgba(255, 70, 85, 0.3)'
        };
    } else if (elo >= 1800) {
        badge = {
            icon: '🗡️',
            name: 'MASTER',
            color: '#ff8c00',
            bgColor: 'rgba(255, 140, 0, 0.1)',
            borderColor: 'rgba(255, 140, 0, 0.3)'
        };
    } else if (elo >= 1600) {
        badge = {
            icon: '💎',
            name: 'DIAMOND',
            color: '#00ffff',
            bgColor: 'rgba(0, 255, 255, 0.1)',
            borderColor: 'rgba(0, 255, 255, 0.3)'
        };
    } else if (elo >= 1400) {
        badge = {
            icon: '🔷',
            name: 'PLATINUM',
            color: '#00ff9d',
            bgColor: 'rgba(0, 255, 157, 0.1)',
            borderColor: 'rgba(0, 255, 157, 0.3)'
        };
    } else if (elo >= 1200) {
        badge = {
            icon: '🏅',
            name: 'GOLD',
            color: '#ffd700',
            bgColor: 'rgba(255, 215, 0, 0.1)',
            borderColor: 'rgba(255, 215, 0, 0.3)'
        };
    } else if (elo >= 1000) {
        badge = {
            icon: '🥈',
            name: 'SILVER',
            color: '#c0c0c0',
            bgColor: 'rgba(192, 192, 192, 0.1)',
            borderColor: 'rgba(192, 192, 192, 0.3)'
        };
    } else {
        badge = {
            icon: '🥉',
            name: 'BRONZE',
            color: '#cd7f32',
            bgColor: 'rgba(205, 127, 50, 0.1)',
            borderColor: 'rgba(205, 127, 50, 0.3)'
        };
    }

    return `<span class="rank-badge" style="color: ${badge.color}; background: ${badge.bgColor}; border: 1px solid ${badge.borderColor}">
        ${badge.icon} ${badge.name}
    </span>`;
}

// Function to fetch paginated data
async function fetchLeaderboardData(page) {
    try {
        const response = await fetch(`http://localhost:5000/leaderboard?page=${page}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        // Return mock data for the specific page
        return {
            data: mockDataPages[page],
            total_pages: 3,
            current_page: page
        };
    }
}

// Function to populate the leaderboard
function populateLeaderboard(data) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Clear existing content
    
    data.forEach(entry => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        if (entry.rank <= 3) {
            row.classList.add(`rank-${entry.rank}`);
        }
        
        row.innerHTML = `
            <span class="col-rank">
                ${entry.rank <= 3 ? `
                    <svg class="trophy-icon" viewBox="0 0 24 24">
                        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                    </svg>
                ` : ''}
                ${entry.rank}
            </span>
            <div class="player-info">
                <a href="/player/${entry.player}" class="player-link">
                    <svg class="player-icon" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    ${entry.player}
                </a>
                ${getRankBadge(entry.elo)}
            </div>
            <span class="col-elo">${entry.elo}</span>
            <span class="col-wins">${entry.wins}</span>
            <span class="col-losses">${entry.losses}</span>
            <span class="col-clan">${entry.clan || '<span class="na">N/A</span>'}</span>
        `;
        
        leaderboardBody.appendChild(row);
    });

    // Update pagination controls
    updatePaginationControls();
}

// Function to update pagination controls
function updatePaginationControls() {
    const paginationContainer = document.getElementById('pagination-controls');
    let paginationHTML = `
        <button class="pagination-btn" onclick="changePage(1)" ${currentPage === 1 ? 'disabled' : ''}>
            First
        </button>
        <button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            Previous
        </button>
        <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
        <button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Next
        </button>
        <button class="pagination-btn" onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>
            Last
        </button>
    `;
    paginationContainer.innerHTML = paginationHTML;
}

// Function to change page
function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    
    // Use the mock data directly for instant page switching
    const response = {
        data: mockDataPages[page],
        total_pages: 3,
        current_page: page
    };
    
    totalPages = response.total_pages;
    populateLeaderboard(response.data);
}

// Initial load
function initializeLeaderboard() {
    const response = {
        data: mockDataPages[1],
        total_pages: 3,
        current_page: 1
    };
    totalPages = response.total_pages;
    currentPage = response.current_page;
    populateLeaderboard(response.data);
}

// Initialize when the page loads
window.addEventListener('load', initializeLeaderboard);
  