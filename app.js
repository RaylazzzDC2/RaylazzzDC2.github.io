import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

(async function () {
    const ip = await fetch("https://api.ipify.org?format=json").then((response) => response.json());

    const date = new Date().toISOString().split("T")[0];
    const data = {
        ip: ip.ip,
        date: date,
    };

    const firebaseConfig = {
        apiKey: "AIzaSyC1_IyV5vabwtaQbKD3Adls6vRfUZa1J6Y",
        authDomain: "database-f6ede.firebaseapp.com",
        projectId: "database-f6ede",
        storageBucket: "database-f6ede.firebasestorage.app",
        messagingSenderId: "946690310170",
        appId: "1:946690310170:web:0146ec2ea7b3de911191a3",
        measurementId: "G-1Q66ZD1RTB",
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    try {
        await addDoc(collection(db, "visits"), data);
        console.log("Data added to Firestore successfully");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
})();
