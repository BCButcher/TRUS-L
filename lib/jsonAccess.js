let fs = require("fs");

// Convenience class for accessing and storing data to and from the JSON file.


class DBAccess {
    constructor( fileName ) {
        this.dbJSONFile = fileName; 
        this.counter = null;
    }

    // Looking at the ids in use in the file, return an unused id
    getUniqueId() {
        if(this.counter == null) {
            // The counter hasn't been initalized for this session.
            // 
            // Retrieve the records from the file and find the largest id in use.
            // 
            // No matter whether a record is deleted or not,
            // if we always increase the id number by one 
            // we will not repeat the value (and thus the id).
            let recordsJSON = this.getRecords();
            if(recordsJSON.length == 0) {
            	this.counter = 0;
            } else {
                // The last position in the array will have the largest id
                // because we always append new records to the end of the existing list/file.
                let lastRecord = recordsJSON[recordsJSON.length-1];
                this.counter = ++lastRecord.id;
            }
        }
        return this.counter++;
    }

    // Read the db.json file and return all saved records as JSON
    getRecords() {
        // Not sure why but the current working directory isn't always what I think it is.
        // Uncomment the two lines below to find out what directory this is in.
        //console.log(process.cwd());
        //console.log(this.dbJSONFile);
        //return process.cwd();
        let rawData = fs.readFileSync(this.dbJSONFile);
        return JSON.parse(rawData);
    }

    // Take a record object, find it in the db.json file,
    // and delete it from that file.
    deleteRecord(id) {
        let jsonData = this.getRecords();
        let newJSONArray = [];
        let success = false;
        for(let i=0; i<jsonData.length; i++) {
            let record = jsonData[i];
            if(record.id == id) {
                const arrayStart = jsonData.slice(0,i);
                const arrayEnd = jsonData.slice(i+1,jsonData.length);
                newJSONArray = arrayStart.concat(arrayEnd);
                success = true;
                break;
            }
        }
        if(success) {
            // If it isn't successful, there's no changes to save.
            this.store(newJSONArray);
        }
        return success; // tells the server if we were able to find the record and delete it. 
    }
    
    updateRecord(id, newRecord) {
        let jsonData = this.getRecords();
        let newJSONArray = [];
        let success = false;
        for(let i=0; i<jsonData.length; i++) {
            let record = jsonData[i];
            if(record.id == id) {
            	record = newRecord;
            	success = true;
            }
            newJSONArray.push(record);
        }
        if(success) {
            // If it isn't successful, there's no changes to save.
            this.store(newJSONArray);
        }
        return success; // tells the server if we were able to find the record and delete it. 
    }

    addRecord(newRecord) {
        newRecord.id = this.getUniqueId();
        let jsonArray = this.getRecords();
        jsonArray.push(newRecord);
        this.store(jsonArray);
        return newRecord;
    }

    store(jsonArray) {
        fs.writeFileSync(this.dbJSONFile, JSON.stringify(jsonArray));
    }
}


module.exports = DBAccess;

