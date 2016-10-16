import { SQLite } from 'ionic-native';
import { Injectable } from '@angular/core';

@Injectable()
export class DBService{
    public database: SQLite;
    constructor() {
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }

    getTask(){
        return this.database.executeSql("select * from tbltask", []);
    }

    saveTask(item){
        return this.database.executeSql("insert into tbltask (task, priority, status) values ('"+ item.task +"', '"+ item.priority +"', 'pending')", []);
    }
    
}