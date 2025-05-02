(async function () {
    const ip = await fetch("https://api.ipify.org?format=json").then((response) => response.json());

    const date = new Date().toISOString().split("T")[0];
    const data = {
        ip: ip.ip,
        date: date,
    };

    await fetch("https://raylazzzdc2.github.io/data.json")
        .then((response) => response.json())
        .then((json) => {
            json.list.push(data);

            return fetch("./data.json", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            });
        })
        .then((response) => {
            if (response.ok) {
                console.log("Data added successfully");
            } else {
                console.error("Error adding data");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
})();
