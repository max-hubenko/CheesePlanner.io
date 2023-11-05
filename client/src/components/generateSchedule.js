import React, { useEffect, useState } from "react";
import addDays from "date-fns/addDays";
export function spacedRepetitionDate(record){

    var duedate = new Date(record.deadline);
    var today = new Date();
    var remaining = duedate - today;
    //2n^3+3n^2+n-6r=0 find n when r = remaining
    var n = 0;
    var r = remaining;
    for (var i = 0; i < 1000; i++){
        if (2*Math.pow(n,3)+3*Math.pow(n,2)+n-6*r >= 0){
            break;
        }
        n++;
    }
    //get all squared number from 1 to n
    var squared = [];
    for (var i = 1; i <= n; i++){
        squared.push(Math.pow(i,2)-1);
    }
    //get all dates from today + 1 to today + n
    var dates = [];
    for (var i = 1; i <= n; i++){
        dates.push(addDays(squared[i], i));
    }
    return dates;
}

