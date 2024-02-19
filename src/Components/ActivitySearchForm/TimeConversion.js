
export class TimeConversion {

static conversiontable = {[" 5min"]: 300,["10 min"]: 600, ["15 min"]:900, ["20 min"]: 1200, ["30 min"]: 1800, ["45 min"]: 2700, ["1 h"]: 3600, ["1,5 hrs"]: 5400, ["2 hrs"]: 6200 }


static StringToSeconds(string){
    return this.conversiontable[string]
}

static SecondsToString(number){
   const keys = Object.keys(this.conversiontable)
   const values = Object.values(this.conversiontable)
   const index = values.indexOf(number)
   return keys[index]
}
}
