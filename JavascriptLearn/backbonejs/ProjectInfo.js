var osTypVal;
var usageVal;
var reviewStatus;
var baselineVal;
var projectTypeMap={
		
		"SE":'Exposed',
		"RI":'Integrated in Range',
		"TP":'Technology Periodic',
		"MQ":'Other Exposed'
}

var lifeCycleSatusMap = {
		
		 "S":"Selected",
		 "D":"Delivered",
		 "A":"Accepted",
		 "DP":"Deployed",
		 "P":"Production",
		 "R":"Rejected",
		 "TV":"Testing/Validation"
   
}


ProjectInfoModel = Backbone.Model.extend({
    defaults: {
    	primaryEngineer: '',
    	creationDate: '',
    	projDescription: '',
    	bugListModDate:'',
    	productFamily:'',
    	osName:'',
    	baselineDate:'Not Available',
    	custName:'',
    	projName:'',
    	projectType:'',
    	bugCacheDate:'',
    	componentMapping:'',
    	trackNames:'',
    	platform:'',
    	lifeCycleStatus:'',
    	baselineSelected:'',
    	projectReviewStatus:'',
    	projectUsage:'',
    	release:'',
    	product:'',
    	productValue:'',
    	reportDate:'',
    	searchType:'',
    	timeZone:'',
    	osType:'',
    	startRel:'',
    	startRelTranslated:'',
    	projReviewState:'',
    	isMerged:'',
    	parentProjects:'',
    	bugListLastModifiedDateTime:'',
    	projectId:'',
    	deliveryEngineer:'',
    	custId: '',
    	isLocked:'',
    	cometsMode:'',
    	isConfigFileUploaded:'',
    	srProcStatus:'',
    	isFeaturesUploaded:'',
    	isHardwareUploaded:''
    	
    	
    },
    initialize: function(jsonData){
    	
    },
    setValues : function(jsonData){
    	this.projectId=jsonData.projId;
    	this.primaryEngineer=jsonData.priEngr;
    	this.creationDate =jsonData.creationDateStr;
    	this.projDescription=jsonData.projDesc;
    	this.bugListModDate=jsonData.bugListModDate;
    	this.productFamily=jsonData.prodFamily;
    	this.osName=jsonData.osName;
    	this.baselineDate = jsonData.baselineDate;
    	this.custName=jsonData.custName;
    	this.projName=jsonData.projName;
    	this.release=jsonData.startRelTranslated;
    	this.trackNames=jsonData.trackNames;
    	this.bugCacheDate=jsonData.bugCacheDate;
    	this.reportDate=jsonData.reportDate;
    	this.searchType=jsonData.searchTyp;
    	this.timeZone=jsonData.timeZone;		
    	this.osType=jsonData.osType;
		osTypVal = jsonData.osType;
    	this.startRel=jsonData.startRel;
    	this.startRelTranslated=jsonData.startRelTranslated;
    	this.projReviewState=jsonData.projReviewState;
    	this.isMerged=jsonData.isMerged;
    	this.parentProjects=jsonData.parentProjects;
    	this.bugListLastModifiedDateTime=jsonData.bugListLastModifiedDateTime;
    	this.deliveryEngineer=jsonData.deliveryEngr;
		this.pid = jsonData.pid;
		this.isLocked = jsonData.isLocked;
    	if(jsonData.osType=='T'){
    		product="Video Product :";
    		productValue=jsonData.videoPlatDisplaName;
    	}else if(jsonData.osType=='CUIP'){
    		product="IP Phone Generation:";
    		productValue=jsonData.videoPlat;
    	}else if(jsonData.osType=='OPT'){
    		product="Optical Product:";
    		productValue=jsonData.prodFamily;
    	}else if(jsonData.osType=='UCS'){
    		product="UCS Product:";
    		productValue=jsonData.videoPlat;
    	}else{
    		product="Product:";
    		productValue='NA';
    	}
    	if(jsonData.cmpMapLastModifiedDateTime!='' && jsonData.cmpMapLastModifiedDateTime!=null && jsonData.cmpMapLastModifiedDateTime!="null PST"){
    		this.componentMapping = jsonData.cmpMapLastModifiedDateTime;
    	}else{
    		this.componentMapping='Not Available';
    	}
    	
    	if(jsonData.commitPer == '1' && jsonData.searchTyp=='SE'){
    		this.projectType='Periodic';
    	}else if(jsonData.commitPer == '1' && jsonData.searchTyp=='MQ'){
    		this.projectType='Other Periodic';
    	}else{
    		this.projectType=projectTypeMap[jsonData.searchTyp];
    	}
    	
    	
    	
    	if((jsonData.searchTyp=='MQ' || jsonData.searchTyp=='SE' )&&jsonData.commitPer!=1&&jsonData.projUsage=='C'){
    		this.lifeCycleStatus=lifeCycleSatusMap[jsonData.lifeCycleStatus];
    		
    	}else{
    		this.lifeCycleStatus="NA"
    		
    	}
    	
    	if(jsonData.projReviewState == '1'){
    		this.projectReviewStatus="Review In Progress";
    	}else if(jsonData.projReviewState == '2'){
    		this.projectReviewStatus="Review Approved";
    	}else{
    		this.projectReviewStatus="NA";
    	}
		reviewStatus = this.projectReviewStatus;
    	this.blineAvl = jsonData.blineAvl;
    	if(jsonData.blineAvl == true && jsonData.baselineDate!=""){
    		this.baselineDate=jsonData.baselineDate;
    	}else{
    		this.baselineDate="Not Available";
    	}
    	if(jsonData.blineAvl==true){
    		this.baselineSelected=jsonData.baselineSelectedDateStr;
    	}else{
    		this.baselineSelected="Not Available";
    	}
		baselineVal = jsonData.blineAvl;
    	if(jsonData.osType =='N' || jsonData.osType=='OPT'){
    		this.platform=jsonData.nxosPlatform;
    	}else{
    		this.platform="NA";
    	}
    	
    	if(jsonData.projUsage=="I"){
    		this.projectUsage ="Internal Consumption ";
    	}else if(jsonData.projUsage=="C"){
    		this.projectUsage = "Customer Delivered ";
    	}else{
    		this.projectUsage = "NA";
    	}
    	usageVal = this.projectUsage;	
    	this.custId = jsonData.custId; //add to bin
    	this.cometsMode=jsonData.cometsMode;
    	this.isConfigFileUploaded=jsonData.isConfigFileUploaded;
    	this.srProcStatus=jsonData.srProcStatus;
    	this.isFeaturesUploaded=jsonData.isFeaturesUploaded;
    	this.isHardwareUploaded=jsonData.isHardwareUploaded;
    	
    	
    	
    	
    	
    },
    
    getBaselineDate:function(){
    	
    	if(this.baselineDate != null){
			return this.baselineDate +''+ this.timeZone;
		}else{
			return this.baselineDate;
		}
    },
    
    isPeriodic:function(){
    	
    	if (this.commitPer!= null && this.commitPer=="1" ||(this.searchType!=null &&
				this.searchType=="TP" && ((this.reportDate != null && !this.reportDate=="") ||
				(this.getBaselineDate() != null && ! this.getBaselineDate()=="")))) {

			return true;
		}
		return false;
    }
});


MergeProjectInfoView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#mergeInfoTemplate").html(), this.model );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});

ProjectInfoView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#projInfoTemplate").html(), this.model );
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
		if(osTypVal !=null && osTypVal!="" && (osTypVal!='OPT') && (osTypVal!='CUIP') && (osTypVal!='UCS')){
			dojo.byId('prodDisp').style.display = 'none';
			dojo.byId('prodValDisp').style.display = 'none';
			dojo.byId('platformDisp').style.display = 'none';
			dojo.byId('platformValDisp').style.display = 'none';
		}
		if(osTypVal !=null && osTypVal!="" && (osTypVal=='UCS')){
			dojo.byId('platformDisp').style.display = 'none';
			dojo.byId('platformValDisp').style.display = 'none';
		}
		if(osTypVal !=null && osTypVal!="" && (osTypVal =='CUIP')){
			dojo.byId('platformDisp').style.display = 'none';
			dojo.byId('platformValDisp').style.display = 'none';
		}
		if(usageVal!=null && usageVal!="" && ($.trim(usageVal)) != "Customer Delivered"){
			dojo.byId('pidDisp').style.display = 'none';
			dojo.byId('pidValDisp').style.display = 'none';
			dojo.byId('lifeCycleDisp').style.display = 'none';
			dojo.byId('lifeCycleValDisp').style.display = 'none';
		}
		if(reviewStatus !="NA"){
			dojo.byId('reviewDisp').style.display = 'block';
		}else{
			dojo.byId('reviewDisp').style.display = 'none';
		}
		if(!baselineVal){
			dojo.byId('baselineDisp').style.display = 'none';
		}
    }
});


