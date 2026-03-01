import fs from "fs";

const StartFunc = async () => {
    try {
        // Read template file
        let template = fs.readFileSync("./Data/fromTally.json", "utf8");

        const body = JSON.parse(template);

        const LocalNewArray = body.map(element => {
            return {
                LedgerName: element.metadata.name,
                LedgerParentName: element.parent.value,
                LedgerType: element.metadata.type
            }
        });

        fs.writeFileSync("./Data/asArray.json", JSON.stringify(LocalNewArray));

    } catch (err) {
        console.error("Import Failed");
        console.log(err.response?.data || err.message);
    }
};

StartFunc();