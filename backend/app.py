from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Expanded sample data with 30 players (3 pages)
SAMPLE_DATA = [
    {"rank": 1, "player": "AaronSplaron", "elo": 2150, "wins": 542, "losses": 123, "clan": "Elite"},
    {"rank": 2, "player": "CK Shiveringcow", "elo": 1940, "wins": 498, "losses": 145, "clan": "CK"},
    {"rank": 3, "player": "AsTre", "elo": 1830, "wins": 467, "losses": 167, "clan": "AST"},
    {"rank": 4, "player": "Sintrail", "elo": 1750, "wins": 445, "losses": 178, "clan": "KoR"},
    {"rank": 5, "player": "RiceHankCO", "elo": 1680, "wins": 423, "losses": 189, "clan": "RICE"},
    {"rank": 6, "player": "BKM Report", "elo": 1620, "wins": 410, "losses": 195, "clan": "BKM"},
    {"rank": 7, "player": "Kazperinooo", "elo": 1580, "wins": 389, "losses": 201, "clan": None},
    {"rank": 8, "player": "ARB Ragnar", "elo": 1520, "wins": 375, "losses": 210, "clan": "ARB"},
    {"rank": 9, "player": "venom", "elo": 1490, "wins": 362, "losses": 218, "clan": "VNM"},
    {"rank": 10, "player": "JavelinBro", "elo": 1450, "wins": 348, "losses": 225, "clan": None},
    {"rank": 11, "player": "WarMaster", "elo": 1420, "wins": 335, "losses": 232, "clan": "WAR"},
    {"rank": 12, "player": "SwiftBlade", "elo": 1390, "wins": 322, "losses": 240, "clan": "SB"},
    {"rank": 13, "player": "KnightKing", "elo": 1360, "wins": 310, "losses": 248, "clan": "KK"},
    {"rank": 14, "player": "DragonSlayer", "elo": 1330, "wins": 298, "losses": 255, "clan": "DS"},
    {"rank": 15, "player": "ShadowBlade", "elo": 1300, "wins": 285, "losses": 262, "clan": "SHD"},
    {"rank": 16, "player": "StormBringer", "elo": 1270, "wins": 273, "losses": 270, "clan": "STM"},
    {"rank": 17, "player": "IronHeart", "elo": 1240, "wins": 262, "losses": 278, "clan": "IRN"},
    {"rank": 18, "player": "FrostBite", "elo": 1210, "wins": 250, "losses": 285, "clan": "FST"},
    {"rank": 19, "player": "FireLord", "elo": 1180, "wins": 238, "losses": 292, "clan": "FIR"},
    {"rank": 20, "player": "ThunderGod", "elo": 1150, "wins": 227, "losses": 300, "clan": "THD"},
    {"rank": 21, "player": "BladeRunner", "elo": 1120, "wins": 215, "losses": 308, "clan": "BLD"},
    {"rank": 22, "player": "DarkKnight", "elo": 1090, "wins": 204, "losses": 315, "clan": "DRK"},
    {"rank": 23, "player": "MoonWalker", "elo": 1060, "wins": 192, "losses": 322, "clan": "MOON"},
    {"rank": 24, "player": "StarLord", "elo": 1030, "wins": 181, "losses": 330, "clan": "STAR"},
    {"rank": 25, "player": "SunWarrior", "elo": 1000, "wins": 170, "losses": 338, "clan": "SUN"},
    {"rank": 26, "player": "CloudStriker", "elo": 970, "wins": 159, "losses": 345, "clan": None},
    {"rank": 27, "player": "RainMaker", "elo": 940, "wins": 148, "losses": 352, "clan": "RAIN"},
    {"rank": 28, "player": "WindRider", "elo": 910, "wins": 138, "losses": 360, "clan": "WIND"},
    {"rank": 29, "player": "EarthShaker", "elo": 880, "wins": 127, "losses": 368, "clan": "ERTH"},
    {"rank": 30, "player": "LightBringer", "elo": 850, "wins": 117, "losses": 375, "clan": "LGHT"}
]

@app.route('/leaderboard')
def get_leaderboard():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    
    paginated_data = SAMPLE_DATA[start_idx:end_idx]
    total_pages = (len(SAMPLE_DATA) + per_page - 1) // per_page
    
    return jsonify({
        'data': paginated_data,
        'total_pages': total_pages,
        'current_page': page
    })

if __name__ == '__main__':
    app.run(port=3000) 