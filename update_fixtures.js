/**
 * Download the official FIFA World Cup 2026 match feed and create the
 * browser-friendly snapshot consumed by app.js.
 *
 * Run: node update_fixtures.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const FIFA_API_URL = 'https://api.fifa.com/api/v3/calendar/matches?count=500&idCompetition=17&idSeason=285023&language=en';
const OUTPUT_PATH = path.join(__dirname, 'official-fixtures.js');

const STADIUM_IDS = {
    'Mexico City Stadium': '1',
    'Toronto Stadium': '2',
    'Monterrey Stadium': '3',
    'Dallas Stadium': '4',
    'Los Angeles Stadium': '5',
    'Miami Stadium': '6',
    'Philadelphia Stadium': '7',
    'Kansas City Stadium': '8',
    'Boston Stadium': '9',
    'Atlanta Stadium': '10',
    'New York/New Jersey Stadium': '11',
    'Seattle Stadium': '12',
    'BC Place Vancouver': '13',
    'San Francisco Bay Area Stadium': '14',
    'Guadalajara Stadium': '15',
    'Houston Stadium': '16'
};

function localizedValue(values, fallback = '') {
    if (!Array.isArray(values) || values.length === 0) return fallback;
    const english = values.find(item => String(item.Locale || '').toLowerCase().startsWith('en'));
    return (english || values[0]).Description || fallback;
}

function toLegacyLocalDate(isoDate) {
    if (!isoDate) return '';
    const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    return match ? `${match[2]}/${match[3]}/${match[1]} ${match[4]}:${match[5]}` : '';
}

function normalizeMatch(game) {
    const id = Number(game.MatchNumber);
    const venueName = localizedValue(game.Stadium && game.Stadium.Name, 'TBD Stadium');
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
        stadiumId: STADIUM_IDS[venueName] || '',
        venueName,
        group: localizedValue(game.GroupName).replace(/^Group\s+/i, ''),
        stage: localizedValue(game.StageName, id <= 72 ? 'First Stage' : 'Knockout Stage'),
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

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, {
            headers: {
                Accept: 'application/json',
                'User-Agent': 'FIFA-World-Cup-2026-IST-Fixture/1.0'
            }
        }, response => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                response.resume();
                fetchJson(new URL(response.headers.location, url).toString()).then(resolve, reject);
                return;
            }
            if (response.statusCode !== 200) {
                response.resume();
                reject(new Error(`FIFA API returned HTTP ${response.statusCode}`));
                return;
            }

            let body = '';
            response.setEncoding('utf8');
            response.on('data', chunk => { body += chunk; });
            response.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(new Error(`Invalid JSON from FIFA API: ${error.message}`));
                }
            });
        });
        request.setTimeout(30000, () => request.destroy(new Error('FIFA API request timed out')));
        request.on('error', reject);
    });
}

async function main() {
    console.log('Downloading all 104 matches from the official FIFA feed...');
    const data = await fetchJson(FIFA_API_URL);
    if (!Array.isArray(data.Results) || data.Results.length !== 104) {
        throw new Error(`Expected 104 FIFA matches, received ${data.Results ? data.Results.length : 0}`);
    }

    const matches = data.Results.map(normalizeMatch).sort((a, b) => a.id - b.id);
    const ids = new Set(matches.map(match => match.id));
    if (ids.size !== 104 || matches[0].id !== 1 || matches[103].id !== 104) {
        throw new Error('The FIFA response did not contain a complete Match 1-104 sequence');
    }

    const generatedAt = new Date().toISOString();
    const source = `// Generated by update_fixtures.js from the official FIFA API.\n` +
        `// Source: ${FIFA_API_URL}\n` +
        `const FIFA_OFFICIAL_UPDATED_AT = ${JSON.stringify(generatedAt)};\n` +
        `const FIFA_OFFICIAL_MATCHES = ${JSON.stringify(matches, null, 4)};\n`;

    fs.writeFileSync(OUTPUT_PATH, source, 'utf8');
    console.log(`Updated ${OUTPUT_PATH}`);
    console.log(`Snapshot time: ${generatedAt}`);
}

main().catch(error => {
    console.error(`Fixture update failed: ${error.message}`);
    process.exitCode = 1;
});
