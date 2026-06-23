// --- FIFA World Cup 2026 Live Predictor Logic ---

// 1. Team Database
const TEAMS = [
    // Group A
    { id: 'MEX', apiId: 1, name: 'Mexico', group: 'A', flag: 'mx', rating: 83 },
    { id: 'KOR', apiId: 3, name: 'South Korea', group: 'A', flag: 'kr', rating: 81 },
    { id: 'RSA', apiId: 2, name: 'South Africa', group: 'A', flag: 'za', rating: 73 },
    { id: 'CZE', apiId: 4, name: 'Czech Republic', group: 'A', flag: 'cz', rating: 78 },
    
    // Group B
    { id: 'CAN', apiId: 5, name: 'Canada', group: 'B', flag: 'ca', rating: 77 },
    { id: 'SUI', apiId: 8, name: 'Switzerland', group: 'B', flag: 'ch', rating: 82 },
    { id: 'QAT', apiId: 7, name: 'Qatar', group: 'B', flag: 'qa', rating: 75 },
    { id: 'BIH', apiId: 6, name: 'Bosnia & Herz.', group: 'B', flag: 'ba', rating: 72 },
    
    // Group C
    { id: 'BRA', apiId: 9, name: 'Brazil', group: 'C', flag: 'br', rating: 89 },
    { id: 'MAR', apiId: 10, name: 'Morocco', group: 'C', flag: 'ma', rating: 85 },
    { id: 'HAI', apiId: 11, name: 'Haiti', group: 'C', flag: 'ht', rating: 65 },
    { id: 'SCO', apiId: 12, name: 'Scotland', group: 'C', flag: 'gb-sct', rating: 77 },
    
    // Group D
    { id: 'USA', apiId: 13, name: 'United States', group: 'D', flag: 'us', rating: 84 },
    { id: 'PAR', apiId: 14, name: 'Paraguay', group: 'D', flag: 'py', rating: 74 },
    { id: 'AUS', apiId: 15, name: 'Australia', group: 'D', flag: 'au', rating: 78 },
    { id: 'TUR', apiId: 16, name: 'Turkey', group: 'D', flag: 'tr', rating: 80 },
    
    // Group E
    { id: 'GER', apiId: 17, name: 'Germany', group: 'E', flag: 'de', rating: 86 },
    { id: 'CUW', apiId: 18, name: 'Curaçao', group: 'E', flag: 'cw', rating: 63 },
    { id: 'CIV', apiId: 19, name: 'Ivory Coast', group: 'E', flag: 'ci', rating: 78 },
    { id: 'ECU', apiId: 20, name: 'Ecuador', group: 'E', flag: 'ec', rating: 79 },
    
    // Group F
    { id: 'NED', apiId: 21, name: 'Netherlands', group: 'F', flag: 'nl', rating: 86 },
    { id: 'JPN', apiId: 22, name: 'Japan', group: 'F', flag: 'jp', rating: 82 },
    { id: 'SWE', apiId: 23, name: 'Sweden', group: 'F', flag: 'se', rating: 79 },
    { id: 'TUN', apiId: 24, name: 'Tunisia', group: 'F', flag: 'tn', rating: 74 },
    
    // Group G
    { id: 'BEL', apiId: 25, name: 'Belgium', group: 'G', flag: 'be', rating: 86 },
    { id: 'EGY', apiId: 26, name: 'Egypt', group: 'G', flag: 'eg', rating: 78 },
    { id: 'IRN', apiId: 27, name: 'Iran', group: 'G', flag: 'ir', rating: 79 },
    { id: 'NZL', apiId: 28, name: 'New Zealand', group: 'G', flag: 'nz', rating: 62 },
    
    // Group H
    { id: 'ESP', apiId: 29, name: 'Spain', group: 'H', flag: 'es', rating: 88 },
    { id: 'CPV', apiId: 30, name: 'Cape Verde', group: 'H', flag: 'cv', rating: 71 },
    { id: 'KSA', apiId: 31, name: 'Saudi Arabia', group: 'H', flag: 'sa', rating: 73 },
    { id: 'URU', apiId: 32, name: 'Uruguay', group: 'H', flag: 'uy', rating: 84 },
    
    // Group I
    { id: 'FRA', apiId: 33, name: 'France', group: 'I', flag: 'fr', rating: 90 },
    { id: 'SEN', apiId: 34, name: 'Senegal', group: 'I', flag: 'sn', rating: 80 },
    { id: 'IRQ', apiId: 35, name: 'Iraq', group: 'I', flag: 'iq', rating: 72 },
    { id: 'NOR', apiId: 36, name: 'Norway', group: 'I', flag: 'no', rating: 78 },
    
    // Group J
    { id: 'ARG', apiId: 37, name: 'Argentina', group: 'J', flag: 'ar', rating: 91 },
    { id: 'ALG', apiId: 38, name: 'Algeria', group: 'J', flag: 'dz', rating: 76 },
    { id: 'AUT', apiId: 39, name: 'Austria', group: 'J', flag: 'at', rating: 80 },
    { id: 'JOR', apiId: 40, name: 'Jordan', group: 'J', flag: 'jo', rating: 70 },
    
    // Group K
    { id: 'POR', apiId: 41, name: 'Portugal', group: 'K', flag: 'pt', rating: 87 },
    { id: 'COD', apiId: 42, name: 'DR Congo', group: 'K', flag: 'cd', rating: 72 },
    { id: 'UZB', apiId: 43, name: 'Uzbekistan', group: 'K', flag: 'uz', rating: 73 },
    { id: 'COL', apiId: 44, name: 'Colombia', group: 'K', flag: 'co', rating: 83 },
    
    // Group L
    { id: 'ENG', apiId: 45, name: 'England', group: 'L', flag: 'gb-eng', rating: 88 },
    { id: 'CRO', apiId: 46, name: 'Croatia', group: 'L', flag: 'hr', rating: 83 },
    { id: 'GHA', apiId: 47, name: 'Ghana', group: 'L', flag: 'gh', rating: 74 },
    { id: 'PAN', apiId: 48, name: 'Panama', group: 'L', flag: 'pa', rating: 76 }
];

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// State object
let state = {
    groupMatches: [],   // Array of 72 group stage matches: { id, homeTeam, awayTeam, score1, score2, finished, group }
    groupStandings: {}, // Map of Group letter -> Array of team objects (sorted 1 to 4)
    wildcards: [],      // Array of 8 qualified third place team objects
    knockouts: {},      // Map of Match ID -> match state { team1, team2, winner, loser, score1, score2 }
    activeTabs: {}      // Map of Group letter -> 'standings' | 'matches'
};

// Knockout Match Configurations
const MATCH_CONFIGS = {
    // Round of 32
    73: { round: 'R32', side: 'left', team1Src: { type: 'group-runner-up', group: 'A' }, team2Src: { type: 'group-runner-up', group: 'B' }, dest: { matchId: 90, slot: 'team1' }, venue: 'Los Angeles', date: 'June 28' },
    74: { round: 'R32', side: 'left', team1Src: { type: 'group-winner', group: 'E' }, team2Src: { type: 'wildcard', index: 0, eligibleGroups: ['A', 'B', 'C', 'D', 'F'] }, dest: { matchId: 89, slot: 'team1' }, venue: 'Boston', date: 'June 29' },
    75: { round: 'R32', side: 'left', team1Src: { type: 'group-winner', group: 'F' }, team2Src: { type: 'group-runner-up', group: 'C' }, dest: { matchId: 90, slot: 'team2' }, venue: 'Monterrey', date: 'June 29' },
    76: { round: 'R32', side: 'right', team1Src: { type: 'group-winner', group: 'C' }, team2Src: { type: 'group-runner-up', group: 'F' }, dest: { matchId: 91, slot: 'team1' }, venue: 'Houston', date: 'June 29' },
    77: { round: 'R32', side: 'left', team1Src: { type: 'group-winner', group: 'I' }, team2Src: { type: 'wildcard', index: 1, eligibleGroups: ['C', 'D', 'F', 'G', 'H'] }, dest: { matchId: 89, slot: 'team2' }, venue: 'New York', date: 'June 30' },
    78: { round: 'R32', side: 'right', team1Src: { type: 'group-runner-up', group: 'E' }, team2Src: { type: 'group-runner-up', group: 'I' }, dest: { matchId: 91, slot: 'team2' }, venue: 'Dallas', date: 'June 30' },
    79: { round: 'R32', side: 'right', team1Src: { type: 'group-winner', group: 'A' }, team2Src: { type: 'wildcard', index: 2, eligibleGroups: ['C', 'E', 'F', 'H', 'I'] }, dest: { matchId: 92, slot: 'team1' }, venue: 'Mexico City', date: 'June 30' },
    80: { round: 'R32', side: 'right', team1Src: { type: 'group-winner', group: 'L' }, team2Src: { type: 'wildcard', index: 3, eligibleGroups: ['E', 'H', 'I', 'J', 'K'] }, dest: { matchId: 92, slot: 'team2' }, venue: 'Philadelphia', date: 'July 1' },
    81: { round: 'R32', side: 'left', team1Src: { type: 'group-winner', group: 'D' }, team2Src: { type: 'wildcard', index: 4, eligibleGroups: ['B', 'E', 'F', 'I', 'J'] }, dest: { matchId: 94, slot: 'team1' }, venue: 'Atlanta', date: 'July 1' },
    82: { round: 'R32', side: 'left', team1Src: { type: 'group-winner', group: 'G' }, team2Src: { type: 'wildcard', index: 5, eligibleGroups: ['A', 'E', 'H', 'I', 'J'] }, dest: { matchId: 94, slot: 'team2' }, venue: 'San Francisco', date: 'July 1' },
    83: { round: 'R32', side: 'left', team1Src: { type: 'group-runner-up', group: 'K' }, team2Src: { type: 'group-runner-up', group: 'L' }, dest: { matchId: 93, slot: 'team1' }, venue: 'Seattle', date: 'July 2' },
    84: { round: 'R32', side: 'left', team1Src: { type: 'group-winner', group: 'H' }, team2Src: { type: 'group-runner-up', group: 'J' }, dest: { matchId: 93, slot: 'team2' }, venue: 'Toronto', date: 'July 2' },
    85: { round: 'R32', side: 'right', team1Src: { type: 'group-winner', group: 'B' }, team2Src: { type: 'wildcard', index: 6, eligibleGroups: ['E', 'F', 'G', 'I', 'J'] }, dest: { matchId: 96, slot: 'team1' }, venue: 'Los Angeles', date: 'July 2' },
    86: { round: 'R32', side: 'right', team1Src: { type: 'group-winner', group: 'J' }, team2Src: { type: 'group-runner-up', group: 'H' }, dest: { matchId: 95, slot: 'team1' }, venue: 'Kansas City', date: 'July 3' },
    87: { round: 'R32', side: 'right', team1Src: { type: 'group-winner', group: 'K' }, team2Src: { type: 'wildcard', index: 7, eligibleGroups: ['D', 'E', 'I', 'J', 'L'] }, dest: { matchId: 96, slot: 'team2' }, venue: 'Miami', date: 'July 3' },
    88: { round: 'R32', side: 'right', team1Src: { type: 'group-runner-up', group: 'D' }, team2Src: { type: 'group-runner-up', group: 'G' }, dest: { matchId: 95, slot: 'team2' }, venue: 'Dallas', date: 'July 3' },

    // Round of 16
    89: { round: 'R16', side: 'left', team1Src: { type: 'match-winner', matchId: 74 }, team2Src: { type: 'match-winner', matchId: 77 }, dest: { matchId: 97, slot: 'team1' }, venue: 'Philadelphia', date: 'July 4' },
    90: { round: 'R16', side: 'left', team1Src: { type: 'match-winner', matchId: 73 }, team2Src: { type: 'match-winner', matchId: 75 }, dest: { matchId: 97, slot: 'team2' }, venue: 'Houston', date: 'July 4' },
    91: { round: 'R16', side: 'right', team1Src: { type: 'match-winner', matchId: 76 }, team2Src: { type: 'match-winner', matchId: 78 }, dest: { matchId: 99, slot: 'team1' }, venue: 'New York', date: 'July 5' },
    92: { round: 'R16', side: 'right', team1Src: { type: 'match-winner', matchId: 79 }, team2Src: { type: 'match-winner', matchId: 80 }, dest: { matchId: 99, slot: 'team2' }, venue: 'Mexico City', date: 'July 5' },
    93: { round: 'R16', side: 'left', team1Src: { type: 'match-winner', matchId: 83 }, team2Src: { type: 'match-winner', matchId: 84 }, dest: { matchId: 98, slot: 'team1' }, venue: 'Dallas', date: 'July 6' },
    94: { round: 'R16', side: 'left', team1Src: { type: 'match-winner', matchId: 81 }, team2Src: { type: 'match-winner', matchId: 82 }, dest: { matchId: 98, slot: 'team2' }, venue: 'Seattle', date: 'July 6' },
    95: { round: 'R16', side: 'right', team1Src: { type: 'match-winner', matchId: 86 }, team2Src: { type: 'match-winner', matchId: 88 }, dest: { matchId: 100, slot: 'team1' }, venue: 'Atlanta', date: 'July 7' },
    96: { round: 'R16', side: 'right', team1Src: { type: 'match-winner', matchId: 85 }, team2Src: { type: 'match-winner', matchId: 87 }, dest: { matchId: 100, slot: 'team2' }, venue: 'Vancouver', date: 'July 7' },

    // Quarterfinals
    97: { round: 'QF', side: 'left', team1Src: { type: 'match-winner', matchId: 89 }, team2Src: { type: 'match-winner', matchId: 90 }, dest: { matchId: 101, slot: 'team1' }, venue: 'Boston', date: 'July 9' },
    98: { round: 'QF', side: 'left', team1Src: { type: 'match-winner', matchId: 93 }, team2Src: { type: 'match-winner', matchId: 94 }, dest: { matchId: 101, slot: 'team2' }, venue: 'Los Angeles', date: 'July 10' },
    99: { round: 'QF', side: 'right', team1Src: { type: 'match-winner', matchId: 91 }, team2Src: { type: 'match-winner', matchId: 92 }, dest: { matchId: 102, slot: 'team1' }, venue: 'Miami', date: 'July 11' },
    100: { round: 'QF', side: 'right', team1Src: { type: 'match-winner', matchId: 95 }, team2Src: { type: 'match-winner', matchId: 96 }, dest: { matchId: 102, slot: 'team2' }, venue: 'Kansas City', date: 'July 11' },

    // Semifinals
    101: { round: 'SF', side: 'left', team1Src: { type: 'match-winner', matchId: 97 }, team2Src: { type: 'match-winner', matchId: 98 }, dest: { matchId: 104, slot: 'team1', loserMatchId: 103, loserSlot: 'team1' }, venue: 'Dallas', date: 'July 14' },
    102: { round: 'SF', side: 'right', team1Src: { type: 'match-winner', matchId: 99 }, team2Src: { type: 'match-winner', matchId: 100 }, dest: { matchId: 104, slot: 'team2', loserMatchId: 103, loserSlot: 'team2' }, venue: 'Atlanta', date: 'July 15' },

    // Final & Third Place
    103: { round: '3rd', side: 'center', team1Src: { type: 'match-loser', matchId: 101 }, team2Src: { type: 'match-loser', matchId: 102 }, dest: null, venue: 'Miami', date: 'July 18' },
    104: { round: 'Final', side: 'center', team1Src: { type: 'match-winner', matchId: 101 }, team2Src: { type: 'match-winner', matchId: 102 }, dest: null, venue: 'New York', date: 'July 19' }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
});

function initApp() {
    // 1. Initialize empty group matches
    initGroupMatches();
    
    // 2. Initialize default knockout structures
    GROUPS.forEach(g => {
        state.activeTabs[g] = 'standings';
    });
    
    Object.keys(MATCH_CONFIGS).forEach(matchId => {
        state.knockouts[matchId] = {
            id: parseInt(matchId),
            team1: null,
            team2: null,
            winner: null,
            loser: null,
            score1: null,
            score2: null,
            finished: false
        };
    });

    // 3. Load from local prediction storage
    const savedState = localStorage.getItem('wc_2026_predictor_state');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            if (parsed.groupMatches && parsed.knockouts) {
                state.groupMatches = parsed.groupMatches;
                state.knockouts = parsed.knockouts;
            }
        } catch (e) {
            console.error("Failed to parse prediction cache. Reverting.", e);
        }
    }

    // 4. Load Live API Data (Stale-While-Revalidate pattern)
    const liveCache = localStorage.getItem('wc_2026_live_cache');
    if (liveCache) {
        try {
            mergeLiveData(JSON.parse(liveCache));
            setLiveIndicator('connected', 'Live Cached');
        } catch (e) {
            setLiveIndicator('offline', 'Prediction Mode');
        }
    } else {
        setLiveIndicator('offline', 'Prediction Mode');
    }

    // Trigger background live fetch
    fetchLiveTournamentData();

    // 5. Build state and render
    recalculateAllGroups();
    calculateWildcards();
    populateRound32();
    renderGroupStage();
    renderKnockoutBracket();
    checkChampion();
}

// Generate the 72 group stage matches sequentially
function initGroupMatches() {
    state.groupMatches = [];
    let matchId = 1;

    GROUPS.forEach(gLetter => {
        const groupTeams = TEAMS.filter(t => t.group === gLetter);
        
        // Matchups structure
        const pairings = [
            { home: groupTeams[0], away: groupTeams[1] },
            { home: groupTeams[2], away: groupTeams[3] },
            { home: groupTeams[0], away: groupTeams[2] },
            { home: groupTeams[1], away: groupTeams[3] },
            { home: groupTeams[0], away: groupTeams[3] },
            { home: groupTeams[1], away: groupTeams[2] }
        ];

        pairings.forEach(pair => {
            state.groupMatches.push({
                id: matchId++,
                homeTeam: pair.home,
                awayTeam: pair.away,
                score1: null,
                score2: null,
                finished: false,
                group: gLetter
            });
        });
    });
}

function setLiveIndicator(status, text) {
    const indicator = document.getElementById('live-indicator');
    const statusText = document.getElementById('live-status-text');
    if (!indicator || !statusText) return;

    indicator.className = 'live-indicator ' + status;
    statusText.textContent = text;
}

// Fetch live scores from Github / API
async function fetchLiveTournamentData() {
    setLiveIndicator('syncing', 'Syncing Live...');
    try {
        const response = await fetch('https://worldcup26.ir/get/games');
        if (!response.ok) throw new Error('API server error');
        
        const data = await response.json();
        if (data && data.games) {
            localStorage.setItem('wc_2026_live_cache', JSON.stringify(data.games));
            mergeLiveData(data.games);
            setLiveIndicator('connected', 'Live Connected');
            
            // Re-render
            recalculateAllGroups();
            calculateWildcards();
            populateRound32();
            renderGroupStage();
            renderKnockoutBracket();
            checkChampion();
        } else {
            throw new Error('Invalid JSON structure');
        }
    } catch (e) {
        console.warn("Live API fetch failed. Using cached predictions.", e);
        // If caching is empty, show prediction status
        const liveCache = localStorage.getItem('wc_2026_live_cache');
        if (liveCache) {
            setLiveIndicator('connected', 'Live (Cached)');
        } else {
            setLiveIndicator('offline', 'Predictions Mode');
        }
    }
}

// Merge live API match data into local state
function mergeLiveData(gamesArray) {
    gamesArray.forEach(game => {
        const isFinished = game.finished === 'TRUE';
        
        if (game.type === 'group') {
            // Find group match
            const homeId = parseInt(game.home_team_id);
            const awayId = parseInt(game.away_team_id);

            const localMatch = state.groupMatches.find(m => 
                (m.homeTeam.apiId === homeId && m.awayTeam.apiId === awayId) ||
                (m.homeTeam.apiId === awayId && m.awayTeam.apiId === homeId)
            );

            if (localMatch) {
                // If the game in API is finished, we lock it with real scores
                if (isFinished) {
                    if (localMatch.homeTeam.apiId === homeId) {
                        localMatch.score1 = parseInt(game.home_score);
                        localMatch.score2 = parseInt(game.away_score);
                    } else {
                        localMatch.score1 = parseInt(game.away_score);
                        localMatch.score2 = parseInt(game.home_score);
                    }
                    localMatch.finished = true;
                }
            }
        } else {
            // Knockout match
            const mId = parseInt(game.id);
            const localKnockout = state.knockouts[mId];
            if (localKnockout && isFinished) {
                // Map team ids to our TEAMS
                const homeId = parseInt(game.home_team_id);
                const awayId = parseInt(game.away_team_id);
                
                const team1Obj = TEAMS.find(t => t.apiId === homeId);
                const team2Obj = TEAMS.find(t => t.apiId === awayId);

                if (team1Obj && team2Obj) {
                    localKnockout.team1 = team1Obj;
                    localKnockout.team2 = team2Obj;
                    localKnockout.score1 = parseInt(game.home_score);
                    localKnockout.score2 = parseInt(game.away_score);
                    localKnockout.finished = true;
                    
                    if (localKnockout.score1 > localKnockout.score2) {
                        localKnockout.winner = team1Obj;
                        localKnockout.loser = team2Obj;
                    } else {
                        localKnockout.winner = team2Obj;
                        localKnockout.loser = team1Obj;
                    }
                }
            }
        }
    });
    saveState();
}

function saveState() {
    localStorage.setItem('wc_2026_predictor_state', JSON.stringify({
        groupMatches: state.groupMatches,
        knockouts: state.knockouts
    }));
}

function resetToDefault() {
    localStorage.removeItem('wc_2026_predictor_state');
    localStorage.removeItem('wc_2026_live_cache');
    state.groupMatches = [];
    state.knockouts = {};
    initApp();
}

// 2. Standings & Score Calculations
function recalculateAllGroups() {
    GROUPS.forEach(g => {
        recalculateGroupStandings(g);
    });
}

function recalculateGroupStandings(groupLetter) {
    const groupTeams = TEAMS.filter(t => t.group === groupLetter);
    
    // Initialize stats
    const standings = groupTeams.map(t => {
        return { ...t, pts: 0, gd: 0, gf: 0, ga: 0, mp: 0, w: 0, d: 0, l: 0 };
    });

    const matches = state.groupMatches.filter(m => m.group === groupLetter);

    matches.forEach(match => {
        // A match counts if finished OR if user inputted scores for both
        const hasScores = match.score1 !== null && match.score2 !== null;
        
        if (match.finished || hasScores) {
            const hTeam = standings.find(t => t.id === match.homeTeam.id);
            const aTeam = standings.find(t => t.id === match.awayTeam.id);

            if (hTeam && aTeam) {
                hTeam.mp++;
                aTeam.mp++;

                hTeam.gf += match.score1;
                hTeam.ga += match.score2;
                hTeam.gd += (match.score1 - match.score2);

                aTeam.gf += match.score2;
                aTeam.ga += match.score1;
                aTeam.gd += (match.score2 - match.score1);

                if (match.score1 > match.score2) {
                    hTeam.pts += 3;
                    hTeam.w++;
                    aTeam.l++;
                } else if (match.score1 < match.score2) {
                    aTeam.pts += 3;
                    aTeam.w++;
                    hTeam.l++;
                } else {
                    hTeam.pts += 1;
                    aTeam.pts += 1;
                    hTeam.d++;
                    aTeam.d++;
                }
            }
        }
    });

    // Sort group: 1) Points, 2) GD, 3) GF, 4) Rating
    standings.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return b.rating - a.rating;
    });

    state.groupStandings[groupLetter] = standings;
}

// 3. Render Standings & Match Lists in Group Cards
function renderGroupStage() {
    const grid = document.getElementById('group-grid-container');
    if (!grid) return;
    grid.innerHTML = '';

    GROUPS.forEach(gLetter => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card glass-panel';
        
        const activeTab = state.activeTabs[gLetter];

        let html = `
            <div class="group-card-header">
                <h3>Group ${gLetter}</h3>
                <div class="group-card-header-actions">
                    <div class="group-card-tabs">
                        <button class="card-tab-btn ${activeTab === 'standings' ? 'active' : ''}" onclick="toggleGroupTab('${gLetter}', 'standings')">Table</button>
                        <button class="card-tab-btn ${activeTab === 'matches' ? 'active' : ''}" onclick="toggleGroupTab('${gLetter}', 'matches')">Matches</button>
                    </div>
                    <button class="sim-group-btn" onclick="simSingleGroup('${gLetter}')" title="Simulate matches in this group">
                        <span class="material-symbols-outlined" style="font-size: 14px;">casino</span>
                    </button>
                </div>
            </div>
            
            <!-- Table Tab Content -->
            <div class="tab-content ${activeTab === 'standings' ? 'active' : ''}">
                <table class="group-table">
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Team</th>
                            <th class="num-col">GD</th>
                            <th class="num-col">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Render standings rows
        const teams = state.groupStandings[gLetter];
        teams.forEach((team, idx) => {
            let rowClass = 'team-row';
            if (idx === 0) rowClass += ' qualify-top';
            else if (idx === 1) rowClass += ' qualify-second';
            else if (idx === 2) rowClass += ' qualify-third';
            else rowClass += ' eliminated';

            html += `
                <tr class="${rowClass}">
                    <td class="rank-num">${idx + 1}</td>
                    <td>
                        <div class="team-cell">
                            <img class="flag-img" src="https://flagcdn.com/w40/${team.flag}.png" alt="${team.name}">
                            <span class="team-name" title="${team.name}">${team.name}</span>
                        </div>
                    </td>
                    <td class="num-val">${team.gd > 0 ? '+' + team.gd : team.gd}</td>
                    <td class="points-val">${team.pts}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>

            <!-- Matches Tab Content -->
            <div class="tab-content ${activeTab === 'matches' ? 'active' : ''}">
                <div class="group-matches-list">
        `;

        // Render 6 group stage matches
        const matches = state.groupMatches.filter(m => m.group === gLetter);
        matches.forEach(match => {
            const hVal = match.score1 !== null ? match.score1 : '';
            const aVal = match.score2 !== null ? match.score2 : '';
            const isLocked = match.finished;

            html += `
                <div class="group-match-row">
                    <div class="group-match-team-info home">
                        <span class="group-match-team-name" title="${match.homeTeam.name}">${match.homeTeam.name}</span>
                        <img class="flag-img" src="https://flagcdn.com/w40/${match.homeTeam.flag}.png" alt="${match.homeTeam.name}">
                    </div>
                    
                    <div class="score-inputs-wrapper">
                        <input type="number" min="0" max="20" class="score-input" value="${hVal}" 
                            oninput="updateMatchScore(${match.id}, true, this.value)" ${isLocked ? 'disabled' : ''}>
                        <span class="group-match-vs">:</span>
                        <input type="number" min="0" max="20" class="score-input" value="${aVal}" 
                            oninput="updateMatchScore(${match.id}, false, this.value)" ${isLocked ? 'disabled' : ''}>
                    </div>

                    <div class="group-match-team-info away">
                        <img class="flag-img" src="https://flagcdn.com/w40/${match.awayTeam.flag}.png" alt="${match.awayTeam.name}">
                        <span class="group-match-team-name" title="${match.awayTeam.name}">${match.awayTeam.name}</span>
                    </div>
                    ${isLocked ? '<span class="match-status-badge">Live</span>' : ''}
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
        
        groupCard.innerHTML = html;
        grid.appendChild(groupCard);
    });
}

window.toggleGroupTab = function(groupLetter, tabName) {
    state.activeTabs[groupLetter] = tabName;
    renderGroupStage();
};

window.updateMatchScore = function(matchId, isHome, val) {
    const match = state.groupMatches.find(m => m.id === matchId);
    if (!match || match.finished) return;

    const parsedVal = val === '' ? null : parseInt(val);
    if (isHome) {
        match.score1 = parsedVal;
    } else {
        match.score2 = parsedVal;
    }

    saveState();
    recalculateGroupStandings(match.group);
    calculateWildcards();
    propagateGroupChanges();
};

// 4. Standings Calculation
function calculateWildcards() {
    const thirdPlaceTeams = [];
    GROUPS.forEach(g => {
        const team3 = state.groupStandings[g][2];
        thirdPlaceTeams.push({
            ...team3,
            group: g
        });
    });

    // Sort: 1) Points, 2) GD, 3) GF, 4) Rating
    thirdPlaceTeams.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return b.rating - a.rating;
    });

    state.wildcards = thirdPlaceTeams.slice(0, 8);

    // Render Wildcard Table
    const tbody = document.getElementById('wildcard-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    thirdPlaceTeams.forEach((team, idx) => {
        const isQualifying = idx < 8;
        const row = document.createElement('tr');
        row.className = isQualifying ? 'advancing' : 'eliminated-wildcard';
        
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td>Group ${team.group}</td>
            <td>
                <div class="team-cell">
                    <img class="flag-img" src="https://flagcdn.com/w40/${team.flag}.png" alt="${team.name}">
                    <span class="team-name">${team.name}</span>
                </div>
            </td>
            <td class="num-val">${team.rating}</td>
            <td>
                <span class="badge ${isQualifying ? 'success' : 'gray'}">${isQualifying ? 'Qualifies' : 'Eliminated'}</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 5. Populate Round of 32
function populateRound32() {
    const assignedWildcards = new Set();

    Object.keys(MATCH_CONFIGS).forEach(matchId => {
        matchId = parseInt(matchId);
        const config = MATCH_CONFIGS[matchId];
        if (config.round !== 'R32') return;

        let team1 = null;
        let team2 = null;

        // Team 1 Source
        if (config.team1Src.type === 'group-winner') {
            team1 = state.groupStandings[config.team1Src.group][0];
        } else if (config.team1Src.type === 'group-runner-up') {
            team1 = state.groupStandings[config.team1Src.group][1];
        }

        // Team 2 Source
        if (config.team2Src.type === 'group-winner') {
            team2 = state.groupStandings[config.team2Src.group][0];
        } else if (config.team2Src.type === 'group-runner-up') {
            team2 = state.groupStandings[config.team2Src.group][1];
        } else if (config.team2Src.type === 'wildcard') {
            const eligible = config.team2Src.eligibleGroups;
            const matchWildcard = state.wildcards.find(w => eligible.includes(w.group) && !assignedWildcards.has(w.id));

            if (matchWildcard) {
                team2 = matchWildcard;
                assignedWildcards.add(matchWildcard.id);
            } else {
                const fallbackWildcard = state.wildcards.find(w => !assignedWildcards.has(w.id));
                if (fallbackWildcard) {
                    team2 = fallbackWildcard;
                    assignedWildcards.add(fallbackWildcard.id);
                }
            }
        }

        // Update match state
        const currentMatch = state.knockouts[matchId];
        
        // If team changed, propagate the reset down the line (only if not locked by Live API)
        if (!currentMatch.finished) {
            if (currentMatch.team1?.id !== team1?.id) {
                currentMatch.team1 = team1;
                resetMatchWinner(matchId);
            }
            if (currentMatch.team2?.id !== team2?.id) {
                currentMatch.team2 = team2;
                resetMatchWinner(matchId);
            }
        }
    });

    saveState();
}

function resetMatchWinner(matchId) {
    const match = state.knockouts[matchId];
    if (!match || match.finished) return; // Do not reset live locked matches

    match.winner = null;
    match.loser = null;
    match.score1 = null;
    match.score2 = null;

    const config = MATCH_CONFIGS[matchId];
    if (config && config.dest) {
        const destMatchId = config.dest.matchId;
        const destSlot = config.dest.slot;
        const destMatch = state.knockouts[destMatchId];

        if (destMatch && !destMatch.finished) {
            destMatch[destSlot] = null;
            resetMatchWinner(destMatchId);
        }

        if (config.dest.loserMatchId) {
            const loserMatchId = config.dest.loserMatchId;
            const loserSlot = config.dest.loserSlot;
            const loserMatch = state.knockouts[loserMatchId];
            if (loserMatch && !loserMatch.finished) {
                loserMatch[loserSlot] = null;
                resetMatchWinner(loserMatchId);
            }
        }
    }
}

function propagateGroupChanges() {
    populateRound32();
    propagateKnockouts();
    renderKnockoutBracket();
    checkChampion();
}

function propagateKnockouts() {
    const matchSequence = [
        73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
        89, 90, 91, 92, 93, 94, 95, 96,
        97, 98, 99, 100,
        101, 102,
        103, 104
    ];

    matchSequence.forEach(matchId => {
        const match = state.knockouts[matchId];
        const config = MATCH_CONFIGS[matchId];
        if (!match || !config) return;

        // Fetch team 1 from source (only if not locked by Live API)
        if (!match.finished) {
            if (config.team1Src.type === 'match-winner') {
                const srcMatch = state.knockouts[config.team1Src.matchId];
                match.team1 = srcMatch ? srcMatch.winner : null;
            } else if (config.team1Src.type === 'match-loser') {
                const srcMatch = state.knockouts[config.team1Src.matchId];
                match.team1 = srcMatch ? srcMatch.loser : null;
            }

            // Fetch team 2 from source
            if (config.team2Src.type === 'match-winner') {
                const srcMatch = state.knockouts[config.team2Src.matchId];
                match.team2 = srcMatch ? srcMatch.winner : null;
            } else if (config.team2Src.type === 'match-loser') {
                const srcMatch = state.knockouts[config.team2Src.matchId];
                match.team2 = srcMatch ? srcMatch.loser : null;
            }

            // If either team is missing, reset winner
            if (!match.team1 || !match.team2) {
                match.winner = null;
                match.loser = null;
                match.score1 = null;
                match.score2 = null;
            }

            // If winner exists, ensure it is still one of the two teams. If not, reset.
            if (match.winner) {
                if (match.winner.id !== match.team1.id && match.winner.id !== match.team2.id) {
                    match.winner = null;
                    match.loser = null;
                    match.score1 = null;
                    match.score2 = null;
                }
            }
        }
    });

    saveState();
}

// 6. Render Knockout Bracket
function renderKnockoutBracket() {
    const listMap = {
        'left-r32': [73, 74, 75, 77, 81, 82, 83, 84],
        'left-r16': [89, 90, 93, 94],
        'left-qf': [97, 98],
        'left-sf': [101],
        'right-r32': [76, 78, 79, 80, 85, 86, 87, 88],
        'right-r16': [91, 92, 95, 96],
        'right-qf': [99, 100],
        'right-sf': [102]
    };

    Object.keys(listMap).forEach(listId => {
        const container = document.getElementById(listId);
        if (!container) return;
        container.innerHTML = '';

        const matchIds = listMap[listId];
        matchIds.forEach(mId => {
            const matchCard = buildMatchCardHTML(mId);
            container.appendChild(matchCard);
        });
    });

    const finalContainer = document.getElementById('match-final');
    if (finalContainer) {
        finalContainer.innerHTML = '';
        finalContainer.appendChild(buildMatchCardContent(104));
    }

    const thirdContainer = document.getElementById('match-third');
    if (thirdContainer) {
        thirdContainer.innerHTML = '';
        thirdContainer.appendChild(buildMatchCardContent(103));
    }
}

function buildMatchCardHTML(matchId) {
    const card = document.createElement('div');
    card.className = 'match-card glass-panel';
    card.id = `match-card-${matchId}`;
    card.appendChild(buildMatchCardContent(matchId));
    return card;
}

function buildMatchCardContent(matchId) {
    const match = state.knockouts[matchId];
    const config = MATCH_CONFIGS[matchId];
    const fragment = document.createDocumentFragment();

    const meta = document.createElement('div');
    meta.className = 'match-meta';
    
    // Add live status badge to knockout meta if match is live
    let liveBadgeHTML = '';
    if (match.finished) {
        liveBadgeHTML = '<span class="match-status-badge">Live</span>';
    }
    
    meta.innerHTML = `<span>Match ${matchId} ${liveBadgeHTML}</span><span>${config.venue}</span>`;
    fragment.appendChild(meta);

    const buildTeamRow = (team, isTeam1) => {
        const row = document.createElement('div');
        row.className = 'match-team';
        
        if (match.winner && team) {
            if (match.winner.id === team.id) row.classList.add('winner');
            else row.classList.add('loser');
        }

        const info = document.createElement('div');
        info.className = 'match-team-info';

        if (team) {
            info.innerHTML = `
                <img class="flag-img" src="https://flagcdn.com/w40/${team.flag}.png" alt="${team.name}">
                <span class="match-team-name">${team.name}</span>
            `;
            row.appendChild(info);

            const score = document.createElement('span');
            score.className = 'match-team-score';
            score.textContent = isTeam1 ? (match.score1 !== null ? match.score1 : '-') : (match.score2 !== null ? match.score2 : '-');
            row.appendChild(score);
            
            // Allow clicking to advance team if NOT locked by Live API
            if (!match.finished) {
                row.onclick = (e) => {
                    e.stopPropagation();
                    advanceWinningTeam(matchId, team.id);
                };
            }
        } else {
            let placeholderText = 'TBD';
            const src = isTeam1 ? config.team1Src : config.team2Src;
            if (src.type === 'group-winner') placeholderText = `Winner Gr. ${src.group}`;
            else if (src.type === 'group-runner-up') placeholderText = `Runner-up Gr. ${src.group}`;
            else if (src.type === 'wildcard') placeholderText = `3rd Place wildcard`;
            else if (src.type === 'match-winner') placeholderText = `Winner Match ${src.matchId}`;
            else if (src.type === 'match-loser') placeholderText = `Loser Match ${src.matchId}`;

            info.innerHTML = `
                <span class="material-symbols-outlined" style="font-size: 16px; color: var(--text-dimmed);">help_outline</span>
                <span class="match-team-name placeholder">${placeholderText}</span>
            `;
            row.appendChild(info);
        }

        return row;
    };

    fragment.appendChild(buildTeamRow(match.team1, true));
    fragment.appendChild(buildTeamRow(match.team2, false));

    return fragment;
}

function advanceWinningTeam(matchId, teamId) {
    const match = state.knockouts[matchId];
    if (!match || !match.team1 || !match.team2 || match.finished) return;

    const winner = match.team1.id === teamId ? match.team1 : match.team2;
    const loser = match.team1.id === teamId ? match.team2 : match.team1;

    if (match.winner && match.winner.id === winner.id) return;

    match.winner = winner;
    match.loser = loser;

    // Simulate score
    const isTeam1Winner = match.team1.id === winner.id;
    if (isTeam1Winner) {
        match.score1 = 2 + Math.floor(Math.random() * 2);
        match.score2 = Math.floor(Math.random() * 2);
    } else {
        match.score2 = 2 + Math.floor(Math.random() * 2);
        match.score1 = Math.floor(Math.random() * 2);
    }

    saveState();
    propagateKnockouts();
    renderKnockoutBracket();
    checkChampion();
}

function checkChampion() {
    const finalMatch = state.knockouts[104];
    const heroCard = document.getElementById('champion-card');
    if (!heroCard) return;

    if (finalMatch && finalMatch.winner) {
        const champ = finalMatch.winner;
        heroCard.innerHTML = `
            <img class="flag-img" src="https://flagcdn.com/w40/${champ.flag}.png" alt="${champ.name}">
            <span class="hero-name">${champ.name}</span>
        `;
        heroCard.style.borderColor = 'var(--accent-gold)';
    } else {
        heroCard.innerHTML = `<span class="placeholder-team">TBD</span>`;
        heroCard.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
}

// 7. Auto-Simulation and AI Predictor Engine

// Simulate a single group stage
window.simSingleGroup = function(gLetter) {
    const matches = state.groupMatches.filter(m => m.group === gLetter);

    matches.forEach(match => {
        // Skip finished live matches
        if (match.finished) return;

        const sim = runMatchSimulation(match.homeTeam.rating, match.awayTeam.rating);
        match.score1 = sim.goals1;
        match.score2 = sim.goals2;
    });

    saveState();
    recalculateGroupStandings(gLetter);
    calculateWildcards();
    propagateGroupChanges();
};

function runMatchSimulation(r1, r2) {
    const diff = (r1 - r2) / 12;
    const lam1 = Math.max(0.5, 1.4 + diff);
    const lam2 = Math.max(0.5, 1.4 - diff);

    const goals1 = poissonRandom(lam1);
    const goals2 = poissonRandom(lam2);

    return { goals1, goals2 };
}

function poissonRandom(lambda) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    do {
        k++;
        p *= Math.random();
    } while (p > L && k < 10);
    return k - 1;
}

function simAllGroups() {
    GROUPS.forEach(g => {
        window.simSingleGroup(g);
    });
}

function simAllKnockouts() {
    const matchSequence = [
        73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
        89, 90, 91, 92, 93, 94, 95, 96,
        97, 98, 99, 100,
        101, 102,
        103, 104
    ];

    propagateKnockouts();

    matchSequence.forEach(matchId => {
        const match = state.knockouts[matchId];
        if (!match || !match.team1 || !match.team2 || match.finished) return;

        const sim = runMatchSimulation(match.team1.rating, match.team2.rating);
        
        if (sim.goals1 === sim.goals2) {
            const ratingSum = match.team1.rating + match.team2.rating;
            if (Math.random() * ratingSum < match.team1.rating) {
                match.score1 = sim.goals1 + 1;
                match.score2 = sim.goals2;
                match.winner = match.team1;
                match.loser = match.team2;
            } else {
                match.score2 = sim.goals2 + 1;
                match.score1 = sim.goals1;
                match.winner = match.team2;
                match.loser = match.team1;
            }
        } else if (sim.goals1 > sim.goals2) {
            match.score1 = sim.goals1;
            match.score2 = sim.goals2;
            match.winner = match.team1;
            match.loser = match.team2;
        } else {
            match.score1 = sim.goals1;
            match.score2 = sim.goals2;
            match.winner = match.team2;
            match.loser = match.team1;
        }

        // Propagate winner downstream immediately
        const config = MATCH_CONFIGS[matchId];
        if (config && config.dest) {
            const destMatch = state.knockouts[config.dest.matchId];
            if (destMatch && !destMatch.finished) {
                destMatch[config.dest.slot] = match.winner;
            }
            if (config.dest.loserMatchId) {
                const loserMatch = state.knockouts[config.dest.loserMatchId];
                if (loserMatch && !loserMatch.finished) {
                    loserMatch[config.dest.loserSlot] = match.loser;
                }
            }
        }
    });

    saveState();
    renderKnockoutBracket();
    checkChampion();
}

// 8. Event Listeners
function setupEventListeners() {
    const btnGroup = document.getElementById('btn-group-view');
    const btnBracket = document.getElementById('btn-bracket-view');
    const viewGroup = document.getElementById('group-stage-view');
    const viewBracket = document.getElementById('bracket-view');

    btnGroup.addEventListener('click', () => {
        btnGroup.classList.add('active');
        btnBracket.classList.remove('active');
        viewGroup.classList.add('active');
        viewBracket.classList.remove('active');
    });

    btnBracket.addEventListener('click', () => {
        btnBracket.classList.add('active');
        btnGroup.classList.remove('active');
        viewBracket.classList.add('active');
        viewGroup.classList.remove('active');
    });

    document.getElementById('btn-sim-groups').addEventListener('click', () => {
        simAllGroups();
    });

    document.getElementById('btn-sim-knockouts').addEventListener('click', () => {
        simAllKnockouts();
    });

    document.getElementById('btn-sync-live').addEventListener('click', () => {
        fetchLiveTournamentData();
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all predictions and live scores?')) {
            resetToDefault();
        }
    });

    // Export Predictor Results
    const modal = document.getElementById('export-modal');
    const exportTextarea = document.getElementById('export-textarea');
    
    document.getElementById('btn-export').addEventListener('click', () => {
        let exportText = '🏆 FIFA WORLD CUP 2026 PREDICTION 🏆\n';
        exportText += '=======================================\n\n';
        
        const finalMatch = state.knockouts[104];
        if (finalMatch && finalMatch.winner) {
            exportText += `🥇 CHAMPION: ${finalMatch.winner.name} (${finalMatch.score1} - ${finalMatch.score2} vs ${finalMatch.loser.name})\n`;
        } else {
            exportText += `🥇 CHAMPION: TBD\n`;
        }

        const thirdMatch = state.knockouts[103];
        if (thirdMatch && thirdMatch.winner) {
            exportText += `🥉 THIRD PLACE: ${thirdMatch.winner.name} (${thirdMatch.score1} - ${thirdMatch.score2} vs ${thirdMatch.loser.name})\n\n`;
        } else {
            exportText += '\n';
        }

        exportText += '=== ROAD TO THE CHAMPIONSHIP ===\n';
        const sf101 = state.knockouts[101];
        const sf102 = state.knockouts[102];
        exportText += `Semifinal 1: ${sf101.team1?.name || 'TBD'} vs ${sf101.team2?.name || 'TBD'} -> Winner: ${sf101.winner?.name || 'TBD'}\n`;
        exportText += `Semifinal 2: ${sf102.team1?.name || 'TBD'} vs ${sf102.team2?.name || 'TBD'} -> Winner: ${sf102.winner?.name || 'TBD'}\n\n`;

        exportText += '=== QUALIFIED TEAMS ===\n';
        GROUPS.forEach(g => {
            const standings = state.groupStandings[g];
            exportText += `Group ${g}: 1. ${standings[0].name} | 2. ${standings[1].name} | 3. ${standings[2].name}\n`;
        });

        exportTextarea.value = exportText;
        modal.classList.add('active');
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    document.getElementById('btn-copy-predictions').addEventListener('click', () => {
        exportTextarea.select();
        document.execCommand('copy');
        alert('Predictions copied to clipboard!');
    });

    // Auto-update polling interval (refresh every 12 hours if tab remains open)
    setInterval(fetchLiveTournamentData, 12 * 60 * 60 * 1000);
}
