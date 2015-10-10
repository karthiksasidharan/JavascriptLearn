EditProjectModel = Backbone.Model.extend({
    defaults: {
    	projId:'',
    	projName:'',
    	projDesc:'',
    	deliveryEngineer:'',
    	autoPeriodicFreqValue:'',
    	autoPeriodicFreq:'',
    	projUsageValue:'',
    	projUsage:'',
    	pid:'',
    	pidDisplay:'',
    	reportType:'',
    	primaryEngr:'',
    	projUsageChanged:'',
    	lifeCycleStatus:'',
    	lifeCycleStatusText:'',
    	lifeCycleStatusDpd:'',
    	lcStatusDisplay:'',
    	lcStatusJustification:'',
    	osType : '',
    	startRel: ''
    },
    initialize: function(jsonData){
    	
    },
    setValues : function(data){
    	console.log("::"+data["deliveryEngr"]);
    	this.projId=data["projId"];
    	this.projName =data["projNameText"];
    	if(data["projDesc"]==null){
    		this.projDesc='';
    	}else{
    		this.projDesc=data["projDesc"];
    	}
    	this.osType = data["osType"];
    	this.startRel = data["startRel"];
    	
    	this.deliveryEngineer=data["deliveryEngr"];
    	this.autoPeriodicFreqValue=data["autoPeriodicRunFreq"];
    	console.log(data["autoPeriodicRunFreq"]);
		var autoFreq='<select id="autoPerFreq">';
		if(data["autoPeriodicRunFreq"]=='7'){
			autoFreq+='<option selected value="7">7 days</option>';
		}else{
			autoFreq+='<option  value="7">7 days</option>';
		}
		if(data["autoPeriodicRunFreq"]=='3'){
			autoFreq+='<option selected value="3">3 days</option>';
		}else{
			autoFreq+='<option  value="3">3 days</option>';
		}
		if(data["autoPeriodicRunFreq"]=='2'){
			autoFreq+='<option selected value="2">2 days</option>';
		}else{
			autoFreq+='<option  value="2">2 days</option>';
		}
		autoFreq+='</select>';
		this.autoPeriodicFreq=autoFreq;
		
		this.projUsageValue=data["projUsage"];
		var usage = '<select id="usageEdit" onchange="toggleLcDiv();">';
		if(data["projUsage"]=="I"){
			usage+='<option value="C">Customer Delivered</option>';
			usage+='<option value="I" selected >Internal Consumption</option>';
		}else{
			usage+='<option value="C" selected >Customer Delivered</option>';
			usage+='<option value="I">Internal Consumption</option>';
		}
		usage+='</select>';
		this.projUsage=usage;
		this.reportType=data["reportType"];
		this.primaryEngr=data["priEngr"];
		if(data["projUsage"]=="I"){
			this.pidDisplay='style="display:none;"';
			this.pid='';
		}else{
			this.pidDisplay='';
			
			var success = function(data){
				
				if(data!=null &&data.length>0){
					var temp='<select id="pidEdit" multiple="true">';
	
					for(var x in data["data"]){
						if(data["data"][x]["id"] >0){
							temp+='<option style="background-color:green;" value="'+data["data"][x]["name"]+'">'+data["data"][x]["name"]+'</option>';
			
						}else{
							temp+='<option  value="'+data["data"][x]["name"]+'">'+data["data"][x]["name"]+'</option>';
			
						}
		
					}
					temp+='</select>';
					this.pid=temp;
				}else{
					this.pid='';
				}
				
			};
			var error = function (XMLHttpRequest, textStatus, errorThrown){
				console.log("Error getting data"+errorThrown);
			};
			var param='prodFamily='+data["prodFamily"]+'"&osType='+data["osType"]+'&platform='+data["platfrom"];
			ajaxCall("/SORAServices/project/getPidsForSelectedProdFamily.json","GET","json",param,success,error,false);
		}  	
		this.projUsageChanged='';
		
		//populate the lcStatus
		
		this.lifeCycleStatus = data["lifeCycleStatus"];
		if(this.lifeCycleStatus != undefined && 
				this.lifeCycleStatus != null && 
				this.lifeCycleStatus != "" && this.projUsageValue == "C"){
			this.lcStatusDisplay = '';
			this.lifeCycleStatusDpd = getEditLcStatusDpd(this.lifeCycleStatus);
			//$('#editLcStatusDpd').val('status');
			this.lcStatusJustification = '';//setJustificationColumn('editLcStatusDpd','editProj',this.projId);
			this.lifeCycleStatusText = lcMap[this.lifeCycleStatus];
		}else{
			this.lcStatusDisplay = 'style= "display:none"';
			this.lifeCycleStatusDpd = '';
			this.lcStatusJustification = '';
			this.lifeCycleStatusText = '';
		}
		
    }
    
});

EditProjectView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#editProjectCws").html(), this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});

CustomerSelectionView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#customerSelectionCws").html());
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});


MergeSelectionView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#mergeProjectPopUp").html());
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});