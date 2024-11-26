// // // const axios = require('axios');

// // // async function getCandlestickData(symbol, interval) {
// // //     const url = 'https://api.binance.com/api/v3/klines';
// // //     try {
// // //         const response = await axios.get(url, {
// // //             params: {
// // //                 symbol: symbol,
// // //                 interval: interval,
// // //                 limit: 5,
// // //             }
// // //         });

// // //         response.data.forEach(candle => {
// // //             const [openTime, open, high, low, close, volume, closeTime] = candle;
// // //             console.log({
// // //                 openTime: new Date(openTime),
// // //                 open,
// // //                 high,
// // //                 low,
// // //                 close,
// // //                 volume,
// // //                 closeTime: new Date(closeTime)
// // //             });
// // //         });
// // //     } catch (error) {
// // //         console.error('Error fetching candlestick data:', error);
// // //     }
// // // }

// // // // Fetch 1-minute candle data for BTC/USDT
// // // getCandlestickData('BTCUSDT', '1m');






// // const axios = require('axios');

// // // Function to print a visual representation of each candlestick
// // function printCandle(open, high, low, close) {
// //     const maxPrice = Math.max(open, high, low, close);
// //     const minPrice = Math.min(open, high, low, close);

// //     // Set the total height of the "stick" representation
// //     const stickHeight = 10; // Adjust this for taller or shorter sticks
// //     const priceRange = maxPrice - minPrice;
// //     const priceStep = priceRange / stickHeight;

// //     // Find the positions of open, close, high, and low within the stick
// //     const openPos = Math.floor((open - minPrice) / priceStep);
// //     const closePos = Math.floor((close - minPrice) / priceStep);
// //     const highPos = stickHeight;  // The top of the stick
// //     const lowPos = 0;             // The bottom of the stick

// //     for (let i = stickHeight; i >= 0; i--) {
// //         if (i === highPos) {
// //             console.log("  │ H │");  // High price level
// //         } else if (i === openPos) {
// //             console.log("  │ O │");  // Open price level
// //         } else if (i === closePos) {
// //             console.log("  │ C │");  // Close price level
// //         } else if (i === lowPos) {
// //             console.log("  │ L │");  // Low price level
// //         } else if (i < highPos && i > lowPos) {
// //             console.log("  │   │");  // Middle of the stick
// //         }
// //     }
// //     console.log("───────────────"); // Divider after each candle
// // }

// // async function getCandlestickData(symbol, interval) {
// //     const url = 'https://api.binance.com/api/v3/klines';
// //     try {
// //         const response = await axios.get(url, {
// //             params: {
// //                 symbol: symbol,
// //                 interval: interval,
// //                 limit: 5 // Fetch last 5 candles for a short output
// //             }
// //         });

// //         // Format and log each candle as an ASCII chart
// //         response.data.forEach(candle => {
// //             const [openTime, open, high, low, close] = candle;
// //             console.log(`\nCandle for ${new Date(openTime).toLocaleTimeString()}`);
// //             printCandle(parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close));
// //         });
// //     } catch (error) {
// //         console.error('Error fetching candlestick data:', error);
// //     }
// // }

// // // Fetch 1-minute candle data for BTC/USDT
// // getCandlestickData('BTCUSDT', '1m');






// const axios = require('axios');

// // Function to generate a visual representation of each candlestick as an array of strings
// function generateCandle(open, high, low, close) {
//     const maxPrice = Math.max(open, high, low, close);
//     const minPrice = Math.min(open, high, low, close);

//     // Set the height of each "stick"
//     const stickHeight = 10;
//     const priceRange = maxPrice - minPrice;
//     const priceStep = priceRange / stickHeight;

//     const openPos = Math.floor((open - minPrice) / priceStep);
//     const closePos = Math.floor((close - minPrice) / priceStep);
//     const highPos = stickHeight;  // Top of the stick
//     const lowPos = 0;             // Bottom of the stick

//     // Create an array of strings representing each row of the candle
//     const candle = Array(stickHeight + 1).fill("     ");
//     for (let i = stickHeight; i >= 0; i--) {
//         if (i === highPos) {
//             candle[i] = " H ";
//         } else if (i === openPos) {
//             candle[i] = " O ";
//         } else if (i === closePos) {
//             candle[i] = " C ";
//         } else if (i === lowPos) {
//             candle[i] = " L ";
//         } else if (i < highPos && i > lowPos) {
//             candle[i] = " │ ";
//         }
//     }

//     return candle;
// }

// async function getCandlestickData(symbol, interval) {
//     const url = 'https://api.binance.com/api/v3/klines';
//     try {
//         const response = await axios.get(url, {
//             params: {
//                 symbol: symbol,
//                 interval: interval,
//                 limit: 5 // Fetch the last 5 candles
//             }
//         });

//         // Generate candles and collect them in an array
//         const candles = response.data.map(candle => {
//             const [openTime, open, high, low, close] = candle;
//             console.log(`Candle for ${new Date(openTime).toLocaleTimeString()}`);
//             return generateCandle(parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close));
//         });

//         // Print candles side by side
//         for (let i = 0; i <= 10; i++) {
//             let row = candles.map(candle => candle[i] || "     ").join(" ");
//             console.log(row);
//         }
//     } catch (error) {
//         console.error('Error fetching candlestick data:', error);
//     }
// }

// // Fetch 1-minute candle data for BTC/USDT
// getCandlestickData('BTCUSDT', '1m');


const axios = require('axios');

