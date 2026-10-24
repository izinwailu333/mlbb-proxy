export default async function handler(req, res) {
    // CORS ကို ခွင့်ပြုရန်
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { userid, zoneid } = req.query;
    const G2BULK_API_KEY = process.env.G2BULK_API_KEY;

    // သတိပြုရန် - အောက်ပါ Link သည် ဥပမာသာဖြစ်ပါသည်။ G2Bulk Document မှ ID စစ်သည့် Link အမှန်ဖြင့် အစားထိုးပါ။
    const url = `https://api.g2bulk.com/v1/games/mlbb/check?player_id=${userid}&server_id=${zoneid}`; 

    try {
        const response = await fetch(url, {
            method: 'GET', // G2Bulk မှ POST ဖြင့်တောင်းဆိုပါက 'POST' ဟု ပြင်ပါ။
            headers: {
                'X-API-Key': G2BULK_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from G2Bulk" });
    }
}
