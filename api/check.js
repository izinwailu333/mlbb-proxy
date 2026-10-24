export default async function handler(req, res) {
    // CORS ကို ခွင့်ပြုရန်
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // App မှ လှမ်းပို့လိုက်သော userid နှင့် zoneid ကို လက်ခံယူခြင်း
    const { userid, zoneid } = req.query;
    const G2BULK_API_KEY = process.env.G2BULK_API_KEY;

    // G2Bulk ၏ မှန်ကန်သော Player Check API လမ်းကြောင်း
    const url = 'https://api.g2bulk.com/v1/games/checkPlayerId';

    try {
        const response = await fetch(url, {
            method: 'POST', // G2Bulk စည်းမျဉ်းအရ POST ဖြင့်သာ ပို့ရမည်
            headers: {
                'X-API-Key': G2BULK_API_KEY,
                'Content-Type': 'application/json'
            },
            // G2Bulk တောင်းဆိုထားသော Data ပုံစံအတိုင်း Body တွင် ထည့်ပို့ခြင်း
            body: JSON.stringify({
                game: "mlbb",
                user_id: userid,
                server_id: zoneid
            })
        });
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from G2Bulk" });
    }
}
