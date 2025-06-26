public class AccountChartController {
     @AuraEnabled(cacheable=true)
     public static List<DataSet> fetchAccountByRating(){
        List<AggregateResult> result = [SELECT COUNT(Id) cnt, Rating FROM Account GROUP BY Rating];
        List<DataSet> dataSetList = new List<DataSet>();
        for(AggregateResult r:result){
            String status = (String)r.get('Rating');
            Integer total =(Integer)r.get('cnt');
            dataSetList.add(new DataSet(status,total));
        }
        return dataSetList;
     }
     public class DataSet{
        
        @AuraEnabled 
        public String label{get;set;}
        
        @AuraEnabled
        public Integer count{get;set;}

        public DataSet(String label,Integer count){
            this.label = label;
            this.count = count;
        }
     }
}