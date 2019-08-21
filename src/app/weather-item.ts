export class weatherItem{

    id:string;
    cityName:string;
    countryName:string;
    temperature:number;
    weatherType:string;
    isFavorite:boolean;
    day:string;
    conditionImage:string;
    minTemp:number;
    maxTemp:number;

    constructor(id:string, cityName:string, countryName:string,isFavorite:boolean)
    {
        this.id=id;
        this.cityName=cityName;
        this.countryName=countryName;
        this.isFavorite=isFavorite;
    }
   

}