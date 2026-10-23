export default async function handler(req, res) {
    // CORS ကို ခွင့်ပြုရန်
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { userid, zoneid } = req.query;
    
    // Vercel Environment ထဲက RapidAPI Key ကို ယူမယ်
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

    // သတိပြုရန် - အောက်ပါ Link နှင့် Host ကို သင်ရွေးထားသော RapidAPI မှ အချက်အလက်များဖြင့် ပြောင်းထည့်ရန်လိုသည်
    const rapidApiHost = 'YOUR_RAPIDAPI_HOST_HERE'; // ဥပမာ - mlbb-checker.p.rapidapi.com
    const url = `https://${rapidApiHost}/check?id=${userid}&zone=${zoneid}`; // API ရဲ့ တကယ့် လမ်းကြောင်း

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': rapidApiHost
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from RapidAPI" });
    }
}
