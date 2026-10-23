export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { userid, zoneid } = req.query;
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

    // Headers ထဲက သင်တွေ့တဲ့ Host နာမည်အမှန်ကို ဒီမှာပြောင်းထည့်ပါ
    const rapidApiHost = 'true-id-mobile-legends.p.rapidapi.com'; 
    
    // API ခေါ်မည့် URL (RapidAPI က ပြထားသည့်အတိုင်း လိုအပ်ပါက ပြင်နိုင်ပါသည်)
    const url = `https://${rapidApiHost}/?userid=${userid}&zoneid=${zoneid}`;

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
