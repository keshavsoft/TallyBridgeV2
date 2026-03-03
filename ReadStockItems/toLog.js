import fs from "fs";

const LocalFuncReadFromTally = async () => {
    try {
        // Read template file
        let template = fs.readFileSync("./Import/ledgers.json", "utf8");

        const body = JSON.parse(template);

        console.log("Sending Voucher to Tally...");
        const response = await fetch('http://localhost:9000', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "TallyRequest": "Export",
                "Type": "collection",
                "Id": "Ledger"
            },
            body: JSON.stringify(body),
        });

        // const response = await fetch("http://localhost:9000", data, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "TallyRequest": "Export",
        //         "Type": "collection",
        //         "Id": "Ledger"
        //     }
        // });
        const LocalReponseData = await response.json();
        console.log("TALLY RESPONSE:");
        console.log(LocalReponseData.data.collection[0]);

    } catch (err) {
        console.error("Import Failed");
        console.log(err.response?.data || err.message);
    }
};

LocalFuncReadFromTally();