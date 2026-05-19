const teams = [
    { id: 1, name: 'Ducati Lenovo Team', country: 'Italy', manufacturer: 'Ducati' },
    { id: 2, name: 'Monster Energy Yamaha MotoGP', country: 'Japan', manufacturer: 'Yamaha' },
    { id: 3, name: 'Red Bull KTM Factory Racing', country: 'Austria', manufacturer: 'KTM' },
    { id: 4, name: 'Aprilia Racing', country: 'Italy', manufacturer: 'Aprilia' }
];

const riders = [
    { id: 1, firstName: 'Marc', lastName: 'Marquez', number: 93, country: 'Spain', teamId: 1 },
    { id: 2, firstName: 'Francesco', lastName: 'Bagnaia', number: 63, country: 'Italy', teamId: 1 },
    { id: 3, firstName: 'Fabio', lastName: 'Quartararo', number: 20, country: 'France', teamId: 2 },
    { id: 4, firstName: 'Pedro', lastName: 'Acosta', number: 37, country: 'Spain', teamId: 3 },
    { id: 5, firstName: 'Jorge', lastName: 'Martin', number: 1, country: 'Spain', teamId: 4 }
];

const races = [
    {
        id: 1,
        name: 'Qatar Grand Prix',
        round: 1,
        date: '2026-03-29',
        status: 'completed',
        circuit: {
            name: 'Lusail International Circuit',
            country: 'Qatar',
            lengthKm: 5.38
        }
    },
    {
        id: 2,
        name: 'Spanish Grand Prix',
        round: 2,
        date: '2026-04-26',
        status: 'completed',
        circuit: {
            name: 'Circuito de Jerez',
            country: 'Spain',
            lengthKm: 4.42
        }
    },
    {
        id: 3,
        name: 'Dutch TT',
        round: 3,
        date: '2026-06-28',
        status: 'planned',
        circuit: {
            name: 'TT Circuit Assen',
            country: 'Netherlands',
            lengthKm: 4.54
        }
    }
];

const results = [
    { id: 1, raceId: 1, riderId: 1, teamId: 1, position: 1, points: 25 },
    { id: 2, raceId: 1, riderId: 2, teamId: 1, position: 2, points: 20 },
    { id: 3, raceId: 1, riderId: 3, teamId: 2, position: 3, points: 16 },
    { id: 4, raceId: 2, riderId: 5, teamId: 4, position: 1, points: 25 },
    { id: 5, raceId: 2, riderId: 4, teamId: 3, position: 2, points: 20 }
];

function getNextId(items) {
    if (items.length === 0) return 1;

    return Math.max(...items.map(item => item.id)) + 1;
}

module.exports = {
    teams,
    riders,
    races,
    results,
    getNextId
};
