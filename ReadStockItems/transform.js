import fs from "fs";

const StartFunc = async () => {
    try {
        // Read template file
        let template = fs.readFileSync("./Data/fromTallyStockItems.json", "utf8");

        const body = JSON.parse(template);

        const LocalNewArray = body.map(element => {
            return {
                StockItemName: element.metadata.name,
                StockItemReservedName: element.metadata.reservedname,
                StockItemType: element.metadata.type
            }
        });

        fs.writeFileSync("./Data/asArrayStockItems.json", JSON.stringify(LocalNewArray));

    } catch (err) {
        console.error("Import Failed");
        console.log(err.response?.data || err.message);
    }
};

StartFunc();