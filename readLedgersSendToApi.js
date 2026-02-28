import fs from "fs";

const LocalFuncReadFromTally = async () => {
    try {
        // Read template file
        let template = fs.readFileSync("./Import/ledgers.json", "utf8");

        const body = JSON.parse(template);

        console.log("Sending Voucher to Tally...");
        const tallyRes = await fetch('http://localhost:9000', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "TallyRequest": "Export",
                "Type": "collection",
                "Id": "Ledger"
            },
            body: JSON.stringify(body),
        });


        await fetch("http://localhost:3000/fromTally", {
            method: "POST",
            headers: { "Content-Type": "application/octet-stream" },
               duplex: "half",
            body: tallyRes.body
        });
    } catch (err) {
        console.error("Import Failed");
        console.log(err.response?.data || err.message);
    }
};

LocalFuncReadFromTally();