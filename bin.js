const axios = require('axios');

async function getCoinPrice(symbol) {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    try {
        const response = await axios.get(url);
        return parseFloat(response.data.price); // Convert to number for comparison
    } catch (error) {
        console.error(`Error fetching price: ${error.message}`);
        return null;
    }
}

async function sendPushNotification(expoPushToken, title, body) {
    const url = 'https://exp.host/--/api/v2/push/send';

    const payload = {
        to: expoPushToken,
        sound: 'default',
        title: title,
        body: body,
        data: {
            extraData: 'Some extra data here',
        },
    };

    try {
        const response = await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(`Push notification sent: ${response.data.data.status}`);
        return response.data;
    } catch (error) {
        console.error(`Error sending push notification: ${error.message}`);
        return null;
    }
}

(async () => {
    const symbol = 'XTZUSDT';
    const expoPushToken = 'ExponentPushToken[l-W_SjC7wAhkccgjlM0wCe]'; // Replace with your Expo token
    const sellThreshold = 1.178; // Price threshold for sell notification
    const buyThreshold = 1;  // Example: Price threshold for buy notification
    let price = await getCoinPrice(symbol);

    if (price !== null) {
        console.log(`Initial price of ${symbol} is ${price}`);
    }

    setInterval(async () => {
        try {
            price = await getCoinPrice(symbol);
            if (price !== null) {
                console.log(`The price of ${symbol} is ${price}`);

                if (price > sellThreshold) {
                    await sendPushNotification(
                        expoPushToken,
                        'Price near to sell',
                        `Price dropped to ${price}`
                    );
                } else if (price < buyThreshold) {
                    await sendPushNotification(
                        expoPushToken,
                        'Price near to buy',
                        `Price rose to ${price}`
                    );
                }
            }
        } catch (error) {
            console.error(`Error in price check loop: ${error.message}`);
        }
    }, 1000);
})();
