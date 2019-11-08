// This file is a convenience utility to convert the cryptic table column value
// into the actual value that the user chose.

function convertTransactionType( transaction ) {
    // ENUM("Rent", "Buy", "Sell", "Rent out"),
    let servicesArray = [];
    if(services.indexOf('a')) {
        // option a was selected
        servicesArray.push("Rent");
    }

    if(services.indexOf('b')) {
        // option b selected
        servicesArray.push("Buy");
    }

    // Isn't there a way to declare an array with named indices?
    if(services.indexOf('c')) {
        // option b selected
        servicesArray.push("Sell");
    }

    if(services.indexOf('d')) {
        // option b selected
        servicesArray.push("Rent out");
    }
    return servicesArray;
}

function convertServicesType( services ) {
    let servicesArray = [];
    if(services.indexOf('a')) {
        // option a was selected
        servicesArray.push("In-person tours");
    }

    if(services.indexOf('b')) {
        // option b selected
        servicesArray.push("Online advertising");
    }

    // Isn't there a way to declare an array with named indices?
    if(services.indexOf('c')) {
        // option b selected
        servicesArray.push("Paint");
    }

    if(services.indexOf('d')) {
        // option b selected
        servicesArray.push("Print brochures");
    }

    if(services.indexOf('e')) {
        // option b selected
        servicesArray.push("Print advertising");
    }

    if(services.indexOf('f')) {
        // option b selected
        servicesArray.push("Staging");
    }

    if(services.indexOf('g')) {
        // option b selected
        servicesArray.push("Virtual tours");
    }

    if(services.indexOf('h')) {
        // option b selected
        servicesArray.push("Buy your house if you can't sell it");
    }

    return servicesArray;
}