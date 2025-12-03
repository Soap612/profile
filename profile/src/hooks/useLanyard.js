import { useState, useEffect } from 'react';

export function useLanyard(userId) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('wss://api.lanyard.rest/socket');

        ws.onopen = () => {
            // Initialize immediately
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { op, d } = message;

            if (op === 1) {
                // Hello opcode - time to identify
                const heartbeatInterval = d.heartbeat_interval;

                // Send Initialize
                ws.send(JSON.stringify({
                    op: 2,
                    d: { subscribe_to_ids: [userId] }
                }));

                // Start heartbeat loop
                const interval = setInterval(() => {
                    ws.send(JSON.stringify({ op: 3 }));
                }, heartbeatInterval);

                // Cleanup interval on close
                ws.onclose = () => clearInterval(interval);
            } else if (op === 0) {
                // Dispatch event
                if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
                    const presence = message.t === 'INIT_STATE' ? d[userId] : d;
                    if (presence) setData(presence);
                }
            }
        };

        return () => ws.close();
    }, [userId]);

    return data;
}
