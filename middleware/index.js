var Campground=require("../models/campground"),
	Comment=require("../models/comments");
var middlewareObj={};
middlewareObj.checkCampgroundOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			req.flash("error","Campground not found")
			res.redirect("back");
		}
		else{
			if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
			if(foundCampground.author.id.equals(req.user._id)){
	// res.render("campgrounds/edit",{campground:foundCampground});
				next();
			}
			else{
				req.flash("error","You don't have permission to do that")
				res.redirect("back");
			}}
});
	}
	else{
		req.flash("error","You need to be Loggedin to do that")
		res.redirect("back");
	}
	

}
	

middlewareObj.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			if(foundComment.author.id.equals(req.user._id)){
	// res.render("campgrounds/edit",{campground:foundCampground});
				next();
			}
			else{
			req.flash("error","You don't have permission to do that")
				res.redirect("back");
			}}
});
	}
	else{
		req.flash("error","You need to be Loggedin to do that")
		res.redirect("back");
	}
	

}
middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be Loggedin to do that")
	res.redirect("/login");
}

module.exports=middlewareObj