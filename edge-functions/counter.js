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
        // 尝试从 env 中获取，或者尝试全局变量（兼容某些旧版本或特定配置）
        // 注意：官方示例中有时直接使用全局变量名
        const kv = env.visitCount || (globalThis.visitCount);

        if (!kv) {
            // 调试辅助：打印出当前所有可用的环境变量 key 以及全局变量中疑似 KV 的内容
            const envKeys = Object.keys(env).join(", ");
            throw new Error(`KV Namespace 'visitCount' not bound. env keys: [${envKeys}]. Please configure it in EdgeOne Console.`);
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