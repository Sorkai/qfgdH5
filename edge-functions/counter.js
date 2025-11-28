export async function onRequest({ request, env }) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // 绑定变量名为 visitCount
        const kv = env.visitCount;
        const KEY = "visitCount";

        let countStr = await kv.get(KEY);
        let count = parseInt(countStr || "0");

        count++;

        await kv.put(KEY, count.toString());

        return new Response(JSON.stringify({ count: count }), {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json;charset=UTF-8",
            },
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
    }
}