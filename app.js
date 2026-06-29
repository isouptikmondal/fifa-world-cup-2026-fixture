// --- FIFA World Cup 2026 Live Predictor Logic ---

// 1. Team Database
const TEAMS = [
    // Group A
    { id: 'MEX', apiId: 1, name: 'Mexico', group: 'A', flag: 'mx', rating: 83 },
    { id: 'KOR', apiId: 3, name: 'Korea Republic', group: 'A', flag: 'kr', rating: 81 },
    { id: 'RSA', apiId: 2, name: 'South Africa', group: 'A', flag: 'za', rating: 73 },
    { id: 'CZE', apiId: 4, name: 'Czechia', group: 'A', flag: 'cz', rating: 78 },
    
    // Group B
    { id: 'CAN', apiId: 5, name: 'Canada', group: 'B', flag: 'ca', rating: 77 },
    { id: 'SUI', apiId: 8, name: 'Switzerland', group: 'B', flag: 'ch', rating: 82 },
    { id: 'QAT', apiId: 7, name: 'Qatar', group: 'B', flag: 'qa', rating: 75 },
    { id: 'BIH', apiId: 6, name: 'Bosnia and Herzegovina', group: 'B', flag: 'ba', rating: 72 },
    
    // Group C
    { id: 'BRA', apiId: 9, name: 'Brazil', group: 'C', flag: 'br', rating: 89 },
    { id: 'MAR', apiId: 10, name: 'Morocco', group: 'C', flag: 'ma', rating: 85 },
    { id: 'HAI', apiId: 11, name: 'Haiti', group: 'C', flag: 'ht', rating: 65 },
    { id: 'SCO', apiId: 12, name: 'Scotland', group: 'C', flag: 'gb-sct', rating: 77 },
    
    // Group D
    { id: 'USA', apiId: 13, name: 'United States', group: 'D', flag: 'us', rating: 84 },
    { id: 'PAR', apiId: 14, name: 'Paraguay', group: 'D', flag: 'py', rating: 74 },
    { id: 'AUS', apiId: 15, name: 'Australia', group: 'D', flag: 'au', rating: 78 },
    { id: 'TUR', apiId: 16, name: 'Türkiye', group: 'D', flag: 'tr', rating: 80 },
    
    // Group E
    { id: 'GER', apiId: 17, name: 'Germany', group: 'E', flag: 'de', rating: 86 },
    { id: 'CUW', apiId: 18, name: 'CuraÃ§ao', group: 'E', flag: 'cw', rating: 63 },
    { id: 'CIV', apiId: 19, name: "Côte d'Ivoire", group: 'E', flag: 'ci', rating: 78 },
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
    { id: 'CPV', apiId: 30, name: 'Cabo Verde', group: 'H', flag: 'cv', rating: 71 },
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
    { id: 'COD', apiId: 42, name: 'Congo DR', group: 'K', flag: 'cd', rating: 72 },
    { id: 'UZB', apiId: 43, name: 'Uzbekistan', group: 'K', flag: 'uz', rating: 73 },
    { id: 'COL', apiId: 44, name: 'Colombia', group: 'K', flag: 'co', rating: 83 },
    
    // Group L
    { id: 'ENG', apiId: 45, name: 'England', group: 'L', flag: 'gb-eng', rating: 88 },
    { id: 'CRO', apiId: 46, name: 'Croatia', group: 'L', flag: 'hr', rating: 83 },
    { id: 'GHA', apiId: 47, name: 'Ghana', group: 'L', flag: 'gh', rating: 74 },
    { id: 'PAN', apiId: 48, name: 'Panama', group: 'L', flag: 'pa', rating: 76 }
];

// Stadium Database (16 host stadiums in US, Canada, Mexico)
const STADIUMS = {
    1: { name: 'Mexico City Stadium' },
    2: { name: 'Toronto Stadium' },
    3: { name: 'Monterrey Stadium' },
    4: { name: 'Dallas Stadium' },
    5: { name: 'Los Angeles Stadium' },
    6: { name: 'Miami Stadium' },
    7: { name: 'Philadelphia Stadium' },
    8: { name: 'Kansas City Stadium' },
    9: { name: 'Boston Stadium' },
    10: { name: 'Atlanta Stadium' },
    11: { name: 'New York/New Jersey Stadium' },
    12: { name: 'Seattle Stadium' },
    13: { name: 'BC Place Vancouver' },
    14: { name: 'San Francisco Bay Area Stadium' },
    15: { name: 'Guadalajara Stadium' },
    16: { name: 'Houston Stadium' }
};

const OFFICIAL_GROUP_MATCHES = FIFA_OFFICIAL_MATCHES
    .filter(match => match.id <= 72)
    .map(match => ({
        id: match.id,
        homeId: match.homeId,
        awayId: match.awayId,
        group: match.group
    }));

const OFFICIAL_SCHEDULES = Object.fromEntries(
    FIFA_OFFICIAL_MATCHES.map(match => [
        match.id,
        {
            utcDate: match.utcDate,
            localDate: match.localDate,
            stadiumId: match.stadiumId,
            venueName: match.venueName
        }
    ])
);

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// State object
let state = {
    groupMatches: [],   // Array of 72 group stage matches
    groupStandings: {}, // Map of Group letter -> Array of team objects (sorted 1 to 4)
    wildcards: [],      // Array of 8 qualified third place team objects
    knockouts: {},      // Map of Match ID -> match state
    activeTabs: {},      // Map of Group letter -> 'standings' | 'matches'
    activeFixtureFilter: 'all', // 'all' | 'group' | 'knockout' | 'live'
    matchSchedules: {},  // Match ID -> official UTC kickoff, IST display time and FIFA venue
    apiKnockoutTeams: {}, // Match ID -> official knockout participants from FIFA
    isCustomPredictionMode: false // Flag indicating if user has customized group stage predictions
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
    // 1. Initialize empty group matches & default schedules
    initGroupMatches();
    initDefaultSchedules();
    
    // 2. Initialize default layout states
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
            status: 'scheduled',
            finished: false
        };
    });

    // 3. Load from local prediction cache
    const savedState = localStorage.getItem('wc_2026_predictor_state');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            if (parsed.groupMatches && parsed.knockouts) {
                state.groupMatches = parsed.groupMatches;
                state.knockouts = parsed.knockouts;
                state.apiKnockoutTeams = parsed.apiKnockoutTeams || {};
                state.isCustomPredictionMode = parsed.isCustomPredictionMode || false;
            }
        } catch (e) {
            console.error("Failed to parse prediction cache.", e);
        }
    }

    // 4. Load the official FIFA snapshot/cache, then refresh it in the background.
    let officialMatches = FIFA_OFFICIAL_MATCHES;
    const officialCache = localStorage.getItem('wc_2026_fifa_cache_v1');
    if (officialCache) {
        try {
            const cachedMatches = JSON.parse(officialCache);
            if (Array.isArray(cachedMatches) && cachedMatches.length === 104) {
                officialMatches = cachedMatches;
            }
        } catch (error) {
            console.warn('Ignoring an invalid FIFA cache.', error);
        }
    }

    mergeOfficialData(officialMatches);
    setLiveIndicator('connected', 'FIFA Official • IST');
    fetchLiveTournamentData();

    // 5. Build state and render
    recalculateAllGroups();
    calculateWildcards();
    populateRound32();
    propagateKnockouts();
    updateAllViews();
}

function initGroupMatches() {
    state.groupMatches = [];
    OFFICIAL_GROUP_MATCHES.forEach(fixture => {
        const homeTeam = TEAMS.find(t => t.id === fixture.homeId);
        const awayTeam = TEAMS.find(t => t.id === fixture.awayId);
        if (homeTeam && awayTeam) {
            state.groupMatches.push({
                id: fixture.id,
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                score1: null,
                score2: null,
                status: 'scheduled',
                finished: false,
                group: fixture.group
            });
        } else {
            console.error("Failed to find team for fixture:", fixture);
        }
    });
}

const IST_DATE_FORMATTER = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
});

function formatIST(utcDate) {
    const parsedDate = new Date(utcDate);
    if (Number.isNaN(parsedDate.getTime())) return 'TBD';

    const parts = Object.fromEntries(
        IST_DATE_FORMATTER.formatToParts(parsedDate)
            .filter(part => part.type !== 'literal')
            .map(part => [part.type, part.value])
    );

    return parts.day + ' ' + parts.month + ' ' + parts.year + ' • ' + parts.hour + ':' + parts.minute + ' IST';
}

function updateSchedulesFromOfficial(matchesArray) {
    matchesArray.forEach(match => {
        const matchId = Number(match.id);
        if (!matchId || !match.utcDate) return;

        state.matchSchedules[matchId] = {
            utcDate: match.utcDate,
            localDate: match.localDate || '',
            stadiumId: String(match.stadiumId || ''),
            venueName: match.venueName || 'TBD Stadium',
            istDate: formatIST(match.utcDate)
        };
    });
}

function getISTDate(localDateStr, stadiumId, matchId) {
    const schedule = state.matchSchedules[Number(matchId)] || OFFICIAL_SCHEDULES[Number(matchId)];
    if (schedule && schedule.utcDate) return formatIST(schedule.utcDate);
    return localDateStr ? localDateStr + ' IST' : 'TBD';
}

function initDefaultSchedules() {
    state.matchSchedules = {};
    updateSchedulesFromOfficial(FIFA_OFFICIAL_MATCHES);
}

function getKnockoutPlaceholder(matchId, isTeam1) {
    const config = MATCH_CONFIGS[matchId];
    if (!config) return 'TBD';
    const src = isTeam1 ? config.team1Src : config.team2Src;
    if (src.type === 'group-winner') return `Winner Gr. ${src.group}`;
    if (src.type === 'group-runner-up') return `Runner-up Gr. ${src.group}`;
    if (src.type === 'wildcard') return `3rd Place wildcard`;
    if (src.type === 'match-winner') return `Winner Match ${src.matchId}`;
    if (src.type === 'match-loser') return `Loser Match ${src.matchId}`;
    return 'TBD';
}

function setLiveIndicator(status, text) {
    const indicator = document.getElementById('live-indicator');
    const statusText = document.getElementById('live-status-text');
    if (!indicator || !statusText) return;

    indicator.className = 'live-indicator ' + status;
    statusText.textContent = text;
}

const FIFA_API_URL = 'https://api.fifa.com/api/v3/calendar/matches?count=500&idCompetition=17&idSeason=285023&language=en';

function getFifaLocalizedValue(values, fallback = '') {
    if (!Array.isArray(values) || values.length === 0) return fallback;
    const english = values.find(item => String(item.Locale || '').toLowerCase().startsWith('en'));
    return (english || values[0]).Description || fallback;
}

function toLegacyLocalDate(isoDate) {
    if (!isoDate || isoDate.length < 16) return '';
    return isoDate.slice(5, 7) + '/' + isoDate.slice(8, 10) + '/' + isoDate.slice(0, 4) + ' ' + isoDate.slice(11, 16);
}

function normalizeFifaApiMatch(game) {
    const id = Number(game.MatchNumber);
    const venueName = getFifaLocalizedValue(game.Stadium && game.Stadium.Name, 'TBD Stadium');
    const stadiumEntry = Object.entries(STADIUMS).find(([, stadium]) => stadium.name === venueName);
    const homeScore = Number.isFinite(game.HomeTeamScore) ? game.HomeTeamScore : null;
    const awayScore = Number.isFinite(game.AwayTeamScore) ? game.AwayTeamScore : null;
    const matchStatus = Number(game.MatchStatus);
    const finished = matchStatus === 0 && homeScore !== null && awayScore !== null;
    const scheduled = matchStatus === 1;
    const homeId = game.Home ? game.Home.Abbreviation : null;
    const awayId = game.Away ? game.Away.Abbreviation : null;

    let winnerId = null;
    if (game.Winner && game.Home && game.Winner === game.Home.IdTeam) winnerId = homeId;
    if (game.Winner && game.Away && game.Winner === game.Away.IdTeam) winnerId = awayId;

    return {
        id,
        fifaId: game.IdMatch,
        utcDate: game.Date,
        localDate: toLegacyLocalDate(game.LocalDate),
        stadiumId: stadiumEntry ? stadiumEntry[0] : '',
        venueName,
        group: getFifaLocalizedValue(game.GroupName).replace('Group ', ''),
        stage: getFifaLocalizedValue(game.StageName, id <= 72 ? 'First Stage' : 'Knockout Stage'),
        homeId,
        awayId,
        homePlaceholder: game.PlaceHolderA || '',
        awayPlaceholder: game.PlaceHolderB || '',
        homeScore,
        awayScore,
        homePenaltyScore: Number.isFinite(game.HomeTeamPenaltyScore) ? game.HomeTeamPenaltyScore : null,
        awayPenaltyScore: Number.isFinite(game.AwayTeamPenaltyScore) ? game.AwayTeamPenaltyScore : null,
        winnerId,
        status: finished ? 'finished' : (scheduled ? 'scheduled' : 'live'),
        matchStatus,
        matchTime: game.MatchTime || '',
        attendance: game.Attendance || null
    };
}

async function fetchLiveTournamentData() {
    setLiveIndicator('syncing', 'Syncing FIFA...');
    try {
        const response = await fetch(FIFA_API_URL, {
            headers: { Accept: 'application/json' },
            cache: 'no-store'
        });
        if (!response.ok) throw new Error('FIFA API returned HTTP ' + response.status);

        const data = await response.json();
        if (!Array.isArray(data.Results) || data.Results.length !== 104) {
            throw new Error('FIFA returned an incomplete fixture list');
        }

        const officialMatches = data.Results.map(normalizeFifaApiMatch).sort((a, b) => a.id - b.id);
        localStorage.setItem('wc_2026_fifa_cache_v1', JSON.stringify(officialMatches));
        mergeOfficialData(officialMatches);
        setLiveIndicator('connected', 'FIFA Official • IST');

        recalculateAllGroups();
        calculateWildcards();
        populateRound32();
        propagateKnockouts();
        updateAllViews();
    } catch (error) {
        console.warn('Could not refresh FIFA right now; using the latest official snapshot.', error);
        setLiveIndicator('connected', 'FIFA Snapshot • IST');
    }
}

function getOfficialWinner(match, homeTeam, awayTeam) {
    if (match.winnerId === homeTeam?.id) return homeTeam;
    if (match.winnerId === awayTeam?.id) return awayTeam;
    if (match.homeScore > match.awayScore) return homeTeam;
    if (match.awayScore > match.homeScore) return awayTeam;
    if (match.homePenaltyScore > match.awayPenaltyScore) return homeTeam;
    if (match.awayPenaltyScore > match.homePenaltyScore) return awayTeam;
    return null;
}

function mergeOfficialData(matchesArray) {
    if (!Array.isArray(matchesArray)) return;
    updateSchedulesFromOfficial(matchesArray);

    matchesArray.forEach(officialMatch => {
        const matchId = Number(officialMatch.id);
        const homeTeam = TEAMS.find(team => team.id === officialMatch.homeId) || null;
        const awayTeam = TEAMS.find(team => team.id === officialMatch.awayId) || null;
        const hasOfficialScore = officialMatch.homeScore !== null && officialMatch.awayScore !== null;
        const isOfficialResult = officialMatch.status === 'finished';
        const isLive = officialMatch.status === 'live';

        if (matchId <= 72) {
            const localMatch = state.groupMatches.find(match => match.id === matchId);
            if (!localMatch) return;

            if (homeTeam) localMatch.homeTeam = homeTeam;
            if (awayTeam) localMatch.awayTeam = awayTeam;
            localMatch.group = officialMatch.group || localMatch.group;
            localMatch.status = officialMatch.status;
            localMatch.finished = isOfficialResult;

            if ((isOfficialResult || isLive) && hasOfficialScore) {
                localMatch.score1 = officialMatch.homeScore;
                localMatch.score2 = officialMatch.awayScore;
            }
            return;
        }

        const localKnockout = state.knockouts[matchId];
        if (!localKnockout) return;

        localKnockout.status = officialMatch.status;
        localKnockout.finished = isOfficialResult;

        if (homeTeam && awayTeam) {
            state.apiKnockoutTeams[matchId] = { team1: homeTeam, team2: awayTeam };
            localKnockout.team1 = homeTeam;
            localKnockout.team2 = awayTeam;
        }

        if ((isOfficialResult || isLive) && hasOfficialScore) {
            localKnockout.score1 = officialMatch.homeScore;
            localKnockout.score2 = officialMatch.awayScore;
        }

        if (isOfficialResult && homeTeam && awayTeam) {
            const winner = getOfficialWinner(officialMatch, homeTeam, awayTeam);
            localKnockout.winner = winner;
            localKnockout.loser = winner ? (winner.id === homeTeam.id ? awayTeam : homeTeam) : null;
        }
    });

    saveState();
}

function saveState() {
    localStorage.setItem('wc_2026_predictor_state', JSON.stringify({
        groupMatches: state.groupMatches,
        knockouts: state.knockouts,
        apiKnockoutTeams: state.apiKnockoutTeams,
        isCustomPredictionMode: state.isCustomPredictionMode
    }));
}

function resetToDefault() {
    localStorage.removeItem('wc_2026_predictor_state');
    localStorage.removeItem('wc_2026_live_cache');
    localStorage.removeItem('wc_2026_fifa_cache_v1');
    state.groupMatches = [];
    state.knockouts = {};
    state.apiKnockoutTeams = {};
    state.isCustomPredictionMode = false;
    initApp();
}

function recalculateAllGroups() {
    GROUPS.forEach(g => {
        recalculateGroupStandings(g);
    });
}

function recalculateGroupStandings(groupLetter) {
    const groupTeams = TEAMS.filter(t => t.group === groupLetter);
    const standings = groupTeams.map(t => {
        return { ...t, pts: 0, gd: 0, gf: 0, ga: 0, mp: 0, w: 0, d: 0, l: 0 };
    });

    const matches = state.groupMatches.filter(m => m.group === groupLetter);

    matches.forEach(match => {
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

// 3. Render Group Stage
function renderGroupStage() {
    const grid = document.getElementById('group-grid-container');
    if (!grid) return;
    grid.innerHTML = '';

    GROUPS.forEach(gLetter => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card glass-panel';
        
        const activeTab = state.activeTabs[gLetter];
        const teams = state.groupStandings[gLetter];

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

            <div class="tab-content ${activeTab === 'matches' ? 'active' : ''}">
                <div class="group-matches-list">
        `;

        const matches = state.groupMatches.filter(m => m.group === gLetter);
        matches.forEach(match => {
            const hVal = match.score1 !== null ? match.score1 : '';
            const aVal = match.score2 !== null ? match.score2 : '';
            const isLocked = match.finished;

            html += `
                <div class="group-match-row">
                    <div class="group-match-team-info home">
                        <span class="group-match-team-name" title="${match.homeTeam.name}">${match.homeTeam.name}</span>
                        <img class="flag-img" src="https://flagcdn.com/w40/${match.homeTeam.flag}.png" alt="">
                    </div>
                    
                    <div class="score-inputs-wrapper">
                        <input type="number" min="0" class="score-input" value="${hVal}" 
                            oninput="updateMatchScore(${match.id}, true, this.value)" ${isLocked ? 'disabled' : ''}>
                        <span class="group-match-vs">:</span>
                        <input type="number" min="0" class="score-input" value="${aVal}" 
                            oninput="updateMatchScore(${match.id}, false, this.value)" ${isLocked ? 'disabled' : ''}>
                    </div>

                    <div class="group-match-team-info away">
                        <img class="flag-img" src="https://flagcdn.com/w40/${match.awayTeam.flag}.png" alt="">
                        <span class="group-match-team-name" title="${match.awayTeam.name}">${match.awayTeam.name}</span>
                    </div>
                    ${isLocked
                        ? '<span class="match-status-badge">FT</span>'
                        : (match.status === 'live' ? '<span class="match-status-badge live">LIVE</span>' : '')}
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

    state.isCustomPredictionMode = true; // Mark as custom prediction mode

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

// 4. Wildcard Calculation
function calculateWildcards() {
    const thirdPlaceTeams = [];
    GROUPS.forEach(g => {
        const team3 = state.groupStandings[g][2];
        thirdPlaceTeams.push({
            ...team3,
            group: g
        });
    });

    thirdPlaceTeams.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return b.rating - a.rating;
    });

    state.wildcards = thirdPlaceTeams.slice(0, 8);

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

// 5. Populate Round of 32 (with Auto-Advancement to R16)
function populateRound32() {
    // Clear all R32 unplayed wildcard slots first in knockouts state
    Object.keys(MATCH_CONFIGS).forEach(matchId => {
        matchId = parseInt(matchId);
        const config = MATCH_CONFIGS[matchId];
        if (config.round !== 'R32') return;
        const currentMatch = state.knockouts[matchId];
        if (!currentMatch.finished) {
            currentMatch.team1 = null;
            currentMatch.team2 = null;
            resetMatchWinner(matchId);
        }
    });

    // Get the top 8 qualified wildcards
    const qualifiedWildcards = state.wildcards.slice(0, 8);
    const wildcardMatches = [74, 77, 79, 80, 81, 82, 85, 87];

    const assignment = {}; // matchId -> team
    const usedWildcardIds = new Set();

    // Use backtracking to find a valid assignment where each wildcard team goes to a match where its group is eligible
    function backtrack(matchIdx) {
        if (matchIdx === wildcardMatches.length) {
            return true;
        }

        const matchId = wildcardMatches[matchIdx];
        const config = MATCH_CONFIGS[matchId];
        const eligible = config.team2Src.eligibleGroups;

        for (let i = 0; i < qualifiedWildcards.length; i++) {
            const team = qualifiedWildcards[i];
            if (!usedWildcardIds.has(team.id) && eligible.includes(team.group)) {
                assignment[matchId] = team;
                usedWildcardIds.add(team.id);

                if (backtrack(matchIdx + 1)) {
                    return true;
                }

                delete assignment[matchId];
                usedWildcardIds.delete(team.id);
            }
        }
        return false;
    }

    const success = backtrack(0);
    const fallbackUsed = new Set();

    const useApiTeams = !state.isCustomPredictionMode && Object.keys(state.apiKnockoutTeams).length > 0;

    Object.keys(MATCH_CONFIGS).forEach(matchId => {
        matchId = parseInt(matchId);
        const config = MATCH_CONFIGS[matchId];
        if (config.round !== 'R32') return;

        let team1 = null;
        let team2 = null;

        if (useApiTeams && state.apiKnockoutTeams[matchId]) {
            team1 = state.apiKnockoutTeams[matchId].team1;
            team2 = state.apiKnockoutTeams[matchId].team2;
        } else {
            if (config.team1Src.type === 'group-winner') {
                team1 = state.groupStandings[config.team1Src.group][0];
            } else if (config.team1Src.type === 'group-runner-up') {
                team1 = state.groupStandings[config.team1Src.group][1];
            }

            if (config.team2Src.type === 'group-winner') {
                team2 = state.groupStandings[config.team2Src.group][0];
            } else if (config.team2Src.type === 'group-runner-up') {
                team2 = state.groupStandings[config.team2Src.group][1];
            } else if (config.team2Src.type === 'wildcard') {
                if (success) {
                    team2 = assignment[matchId] || null;
                } else {
                    // Fallback to greedy if backtracking fails
                    const eligible = config.team2Src.eligibleGroups;
                    const matchWildcard = qualifiedWildcards.find(w => eligible.includes(w.group) && !fallbackUsed.has(w.id));
                    if (matchWildcard) {
                        team2 = matchWildcard;
                        fallbackUsed.add(matchWildcard.id);
                    } else {
                        const fallbackWildcard = qualifiedWildcards.find(w => !fallbackUsed.has(w.id));
                        if (fallbackWildcard) {
                            team2 = fallbackWildcard;
                            fallbackUsed.add(fallbackWildcard.id);
                        }
                    }
                }
            }
        }

        const currentMatch = state.knockouts[matchId];
        
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
    if (!match || match.finished) return;

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
    updateAllViews();
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

        if (!match.finished) {
            if (config.team1Src.type === 'match-winner') {
                const srcMatch = state.knockouts[config.team1Src.matchId];
                match.team1 = srcMatch ? srcMatch.winner : null;
            } else if (config.team1Src.type === 'match-loser') {
                const srcMatch = state.knockouts[config.team1Src.matchId];
                match.team1 = srcMatch ? srcMatch.loser : null;
            }

            if (config.team2Src.type === 'match-winner') {
                const srcMatch = state.knockouts[config.team2Src.matchId];
                match.team2 = srcMatch ? srcMatch.winner : null;
            } else if (config.team2Src.type === 'match-loser') {
                const srcMatch = state.knockouts[config.team2Src.matchId];
                match.team2 = srcMatch ? srcMatch.loser : null;
            }

            if (!match.team1 || !match.team2) {
                match.winner = null;
                match.loser = null;
                match.score1 = null;
                match.score2 = null;
            }

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

// Helper to refresh all visible elements based on active view
function updateAllViews() {
    renderGroupStage();
    renderKnockoutBracket();
    checkChampion();
    
    const matchesView = document.getElementById('matches-view');
    if (matchesView && matchesView.classList.contains('active')) {
        renderMatchesTable();
    }
}

// 6. Render Knockout Bracket
function renderKnockoutBracket() {
    const listMap = {
        'left-r32': [74, 77, 73, 75, 83, 84, 81, 82],
        'left-r16': [89, 90, 93, 94],
        'left-qf': [97, 98],
        'left-sf': [101],
        'right-r32': [76, 78, 79, 80, 86, 88, 85, 87],
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
    
    let liveBadgeHTML = '';
    if (match.status === 'live') {
        liveBadgeHTML = '<span class="match-status-badge live">LIVE</span>';
    } else if (match.finished) {
        liveBadgeHTML = '<span class="match-status-badge">FT</span>';
    }

    const schedule = state.matchSchedules[matchId] || {};
    const venueName = schedule.venueName || config.venue || 'TBD Stadium';
    
    meta.innerHTML = `<span>Match ${matchId} ${liveBadgeHTML}</span><span>${venueName}</span>`;
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
            
            if (!match.finished) {
                row.onclick = (e) => {
                    e.stopPropagation();
                    advanceWinningTeam(matchId, team.id);
                };
            }
        } else {
            let placeholderText = getKnockoutPlaceholder(matchId, isTeam1);
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
    updateAllViews();
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

// Helper to get UTC timestamp from match local schedule (for sorting)
function getMatchTimestamp(matchId) {
    const schedule = state.matchSchedules[matchId];
    if (!schedule) return 0;
    if (schedule.utcDate) {
        const officialTimestamp = Date.parse(schedule.utcDate);
        if (!Number.isNaN(officialTimestamp)) return officialTimestamp;
    }
    try {
        const parts = schedule.localDate.split(' ');
        const dateParts = parts[0].split('/');
        const timeParts = parts[1].split(':');
        
        const month = parseInt(dateParts[0]) - 1;
        const day = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);
        
        const localTimeMs = Date.UTC(year, month, day, hour, minute);
        const stadium = STADIUMS[parseInt(schedule.stadiumId)] || { offset: -5 };
        const offsetHours = stadium.offset;
        
        const utcTimeMs = localTimeMs - (offsetHours * 60 * 60 * 1000);
        return utcTimeMs;
    } catch (e) {
        return 0;
    }
}

// 7. Render 'Match Table' Section (All 104 matches sorted chronologically in IST with Venues)
function renderMatchesTable() {
    const container = document.getElementById('fixtures-grid-container');
    if (!container) return;
    container.innerHTML = '';

    const filter = state.activeFixtureFilter;
    const visibleMatches = [];

    for (let id = 1; id <= 104; id++) {
        let match = null;
        let isKnockout = id >= 73;

        if (isKnockout) {
            match = state.knockouts[id];
        } else {
            match = state.groupMatches.find(m => m.id === id);
        }

        if (!match) continue;

        // Apply filters
        if (filter === 'group' && isKnockout) continue;
        if (filter === 'knockout' && !isKnockout) continue;
        if (filter === 'live' && match.status !== 'live' && !match.finished) continue;

        // Team info and flag setup
        const team1 = match.team1 || match.homeTeam || null;
        const team2 = match.team2 || match.awayTeam || null;

        const team1Name = team1 ? team1.name : (isKnockout ? getKnockoutPlaceholder(id, true) : 'TBD');
        const team2Name = team2 ? team2.name : (isKnockout ? getKnockoutPlaceholder(id, false) : 'TBD');

        const team1Flag = team1 ? `https://flagcdn.com/w40/${team1.flag}.png` : 'https://flagcdn.com/w40/un.png';
        const team2Flag = team2 ? `https://flagcdn.com/w40/${team2.flag}.png` : 'https://flagcdn.com/w40/un.png';

        const score1 = match.score1 !== null ? match.score1 : '-';
        const score2 = match.score2 !== null ? match.score2 : '-';

        // Retrieve schedule details
        const schedule = state.matchSchedules[id] || { localDate: '06/15/2026 12:00', stadiumId: '1' };
        const istDateStr = getISTDate(schedule.localDate, schedule.stadiumId, id);
        
        const stadium = STADIUMS[parseInt(schedule.stadiumId)] || { name: 'TBD Stadium' };
        const venueName = schedule.venueName || stadium.name;

        // Split date and time
        const dateParts = istDateStr.split(' â€¢ ');
        const dateKey = dateParts[0]; // e.g. "11 Jun 2026" or "12 Jun 2026"
        const timeVal = dateParts[1] || ''; // e.g. "23:30 IST"

        const timestamp = getMatchTimestamp(id);

        visibleMatches.push({
            id,
            match,
            isKnockout,
            team1Name,
            team2Name,
            team1Flag,
            team2Flag,
            score1,
            score2,
            dateKey,
            timeVal,
            venueName,
            timestamp
        });
    }

    if (visibleMatches.length === 0) {
        container.innerHTML = '<div class="no-fixtures" style="text-align: center; color: var(--text-dimmed); padding: 3rem;">No matches found matching this filter.</div>';
        return;
    }

    // Sort visible matches chronologically by timestamp
    visibleMatches.sort((a, b) => a.timestamp - b.timestamp);

    // Group sorted matches by dateKey
    const matchesByDate = new Map();
    visibleMatches.forEach(m => {
        if (!matchesByDate.has(m.dateKey)) {
            matchesByDate.set(m.dateKey, []);
        }
        matchesByDate.get(m.dateKey).push(m);
    });

    // Render grouped dates
    matchesByDate.forEach((matchesList, dateStr) => {
        const dateSection = document.createElement('div');
        dateSection.className = 'date-section';

        const title = document.createElement('div');
        title.className = 'date-section-title';
        title.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">calendar_today</span> ${dateStr}`;
        dateSection.appendChild(title);

        const table = document.createElement('div');
        table.className = 'horizontal-table';

        matchesList.forEach(m => {
            const row = document.createElement('div');
            row.className = `match-table-row glass-panel ${m.match.finished ? 'finished' : ''}`;

            row.innerHTML = `
                <div class="row-header-items">
                    <div class="match-cell num">Match ${m.id}</div>
                    <div class="match-cell time">${m.timeVal}</div>
                    <div class="match-cell stage">${m.isKnockout ? 'Knockout' : 'Group ' + m.match.group}</div>
                </div>
                <div class="row-main-items">
                    <div class="match-cell team home">
                        <span class="team-name" title="${m.team1Name}">${m.team1Name}</span>
                        <img class="flag-img" src="${m.team1Flag}" alt="">
                    </div>
                    <div class="match-cell score">
                        <span class="score-val">${m.score1}</span>
                        <span class="score-sep">:</span>
                        <span class="score-val">${m.score2}</span>
                    </div>
                    <div class="match-cell team away">
                        <img class="flag-img" src="${m.team2Flag}" alt="">
                        <span class="team-name" title="${m.team2Name}">${m.team2Name}</span>
                    </div>
                </div>
                <div class="row-footer-items">
                    <div class="match-cell venue">
                        <span class="material-symbols-outlined" style="font-size: 14px; color: var(--text-dimmed);">location_on</span>
                        <span>${m.venueName}</span>
                    </div>
                    <div class="match-cell status">
                        ${m.match.status === 'live'
                            ? '<span class="live-badge-small">LIVE</span>'
                            : (m.match.finished
                                ? '<span class="final-badge-small">FT</span>'
                                : (m.score1 !== '-' || m.score2 !== '-'
                                    ? '<span class="pred-badge-small">Predicted</span>'
                                    : '<span class="scheduled-badge-small">Scheduled</span>'))}
                    </div>
                </div>
            `;
            table.appendChild(row);
        });

        dateSection.appendChild(table);
        container.appendChild(dateSection);
    });
}

function filterFixtures(filterType) {
    state.activeFixtureFilter = filterType;
    
    // Toggle active filter button styling
    const filterIds = {
        'all': 'filter-all',
        'group': 'filter-group',
        'knockout': 'filter-knockout',
        'live': 'filter-live'
    };
    
    Object.keys(filterIds).forEach(k => {
        const btn = document.getElementById(filterIds[k]);
        if (btn) {
            if (k === filterType) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    });
    
    renderMatchesTable();
}

// 8. Auto-Simulation Engine
window.simSingleGroup = function(gLetter) {
    state.isCustomPredictionMode = true; // Mark as custom prediction mode

    const matches = state.groupMatches.filter(m => m.group === gLetter);

    matches.forEach(match => {
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
    updateAllViews();
}

// 9. Event Listeners and Tab controllers
function setupEventListeners() {
    const btnGroup = document.getElementById('btn-group-view');
    const btnBracket = document.getElementById('btn-bracket-view');
    const btnMatches = document.getElementById('btn-matches-view');
    
    const viewGroup = document.getElementById('group-stage-view');
    const viewBracket = document.getElementById('bracket-view');
    const viewMatches = document.getElementById('matches-view');

    function switchView(activeBtn, activeView) {
        [btnGroup, btnBracket, btnMatches].forEach(btn => btn.classList.remove('active'));
        [viewGroup, viewBracket, viewMatches].forEach(view => view.classList.remove('active'));
        
        activeBtn.classList.add('active');
        activeView.classList.add('active');
        
        if (activeView === viewMatches) {
            renderMatchesTable();
        }
    }

    btnGroup.addEventListener('click', () => switchView(btnGroup, viewGroup));
    btnBracket.addEventListener('click', () => switchView(btnBracket, viewBracket));
    btnMatches.addEventListener('click', () => switchView(btnMatches, viewMatches));

    // Match Table Filters click bindings
    document.getElementById('filter-all').addEventListener('click', () => filterFixtures('all'));
    document.getElementById('filter-group').addEventListener('click', () => filterFixtures('group'));
    document.getElementById('filter-knockout').addEventListener('click', () => filterFixtures('knockout'));
    document.getElementById('filter-live').addEventListener('click', () => filterFixtures('live'));

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
        let exportText = 'ðŸ† FIFA WORLD CUP 2026 PREDICTION ðŸ†\n';
        exportText += '=======================================\n\n';
        
        const finalMatch = state.knockouts[104];
        if (finalMatch && finalMatch.winner) {
            exportText += `ðŸ¥‡ CHAMPION: ${finalMatch.winner.name} (${finalMatch.score1} - ${finalMatch.score2} vs ${finalMatch.loser.name})\n`;
        } else {
            exportText += `ðŸ¥‡ CHAMPION: TBD\n`;
        }

        const thirdMatch = state.knockouts[103];
        if (thirdMatch && thirdMatch.winner) {
            exportText += `ðŸ¥‰ THIRD PLACE: ${thirdMatch.winner.name} (${thirdMatch.score1} - ${thirdMatch.score2} vs ${thirdMatch.loser.name})\n\n`;
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

    setInterval(fetchLiveTournamentData, 5 * 60 * 1000);
}



