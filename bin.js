const express = require('express');
const axios = require('axios');
const app = express();

// Use process.env.PORT to dynamically set the port on Render or fallback to 3000 for local development
const port = process.env.PORT || 3000; 

app.use(express.json()); // to parse JSON bodies

let Green = 500000;
let Red = 10000;
let Symbol = "BTCUSDT";

app.post('/update-thresholds', (req, res) => {
    const { green, red, symbol } = req.body;

    if (green) Green = parseFloat(green);
    if (red) Red = parseFloat(red);
    if (symbol) Symbol = symbol;

    console.log("Thresholds Updated Successfully");
    console.log("Green  :" + Green);
    console.log("Red  :" + Red);
    console.log("Symbol :" + Symbol);
    res.send({ message: 'Thresholds updated', Green, Red, Symbol });
});

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
    const expoPushToken = 'ExponentPushToken[l-W_SjC7wAhkccgjlM0wCe]';

    let price = await getCoinPrice(Symbol);

    if (price !== null) {
        console.log(`Initial price of ${Symbol} is ${price}`);
    }

    setInterval(async () => {
        try {
            price = await getCoinPrice(Symbol);
            if (price !== null) {
                console.log(`The price of ${Symbol} is ${price}`);

                if (price < Green) {
                    await sendPushNotification(
                        expoPushToken,
                        'Price near to Buy',
                        `Price dropped to ${price}`
                    );
                } else if (price > Red) {
                    await sendPushNotification(
                        expoPushToken,
                        'Price near to Sell',
                        `Price rose to ${price}`
                    );
                }
            }
        } catch (error) {
            console.error(`Error in price check loop: ${error.message}`);
        }
    }, 3000);
})();

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
