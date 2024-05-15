export class AppURLConstants{

    public static appServiceContext = "/activity/"
    public static adminURL="/admin"
    public static searchActivities(page, size){
        return AppURLConstants.appServiceContext+"service/activities/search?page="+page+"&size="+size;
    }

    public static searchUserActivities(type,action,start,end,userTimeZone,userId,page, size){
        return AppURLConstants.appServiceContext+encodeURI("user-activities/"+type+"/"+action+"?"+ "from="+start+"&to="+end+"&userTimeZone="+ userTimeZone+ "&userId=" + userId+"&page="+page+"&size="+size );
    }
    public static downloadActivities = AppURLConstants.appServiceContext+"service/activities/download";
}


