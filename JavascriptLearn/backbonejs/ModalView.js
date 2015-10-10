NoBugView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#noBugTemplate").html(), this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});

ReviewView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#reviewEmailTemplate").html());
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});

TimeOutView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#timeOutTemplate").html(),this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});


ResetTimeView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#resetTimeTemplate").html());
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});


ConfigView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#configSearchTemplate").html(),this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});


ServiceRequestView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#serviceRequestTemplate").html());
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});


InvalidateAnalysisView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#invalidateTemplate").html());
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});


AdditionalAnalysisView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#additionalAnalysisTemplate").html());
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});

AccountCommentsView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#accountPopUpTemplate").html(),this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
    
});
