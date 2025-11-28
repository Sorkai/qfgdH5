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
        if (!kv) {
            // 调试辅助：打印出当前所有可用的环境变量 key
            const availableKeys = Object.keys(env).join(", ");
            throw new Error(`KV Namespace 'visitCount' not bound. Available bindings: [${availableKeys}]. Please configure it in EdgeOne Console -> Pages -> Settings -> Functions.`);
        }
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