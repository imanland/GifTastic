//Giphy API key.
const KEY = "&api_key=" + "dc6zaTOxFJmzC";

//Giphy endpoint url
const APIURL = "https://api.giphy.com/v1/gifs/search?q=";

//Topics Array
var topics = ["OFFICE","HIMYM","GOT","BREAKING BAD"];


$(document).ready(function(){

	//Initially displays buttons in topics array when page loads.
	displayButtons();

	
	//Event handler for 'submit' button.
	//
	$("#submit-button").on("click", function(event){
		
		//Prevents default action from being triggered 
		event.preventDefault();
		 
		//Gets user data (newVillian) from input box
		var newVillian = $("#input-box").val();		
		 
		//If input box is not empty. Adds newVillan to 'topics'.
		//Calls displayButtons to render 'topics' into buttons. 
		if (newVillian !== "") 	 
		{
			topics.push(newVillian);

		 	displayButtons();
		}
		 	
		//Clears out the text in form.
		$("form")[0].reset();	
		
	});

		

	$("#buttons-div").on("click",".topic-button", function(){

		displayGifs($(this).attr("search-string"));
	});



	$("#gifs-div").on("click",".gif-img", function(){
		
 
		if(($(this).attr("animation"))=="false")
		{

			$(this).attr("src",$(this).attr("animated-src"));
		 	$(this).attr("animation", "true");
		}

		else
		 { 	
		 	$(this).attr("src", $(this).attr("still-src"));
		 	$(this).attr("animation", "false");
		 }
	});
	
});


function displayButtons()
{
	//'Clears out' div
	$("#buttons-div").empty();
	
	//Loop for each element in topics array.
	topics.forEach(function(element){
		
		//creates button element
		var newButton = $("<button>");		

	
		var searchString = element.trim().replace(" ", "+");
		
		//creates button attribute for search-string
		newButton.attr("search-string", searchString );
		
		//Adds classes and html to button
		newButton.addClass("topic-button btn-lg");
		newButton.html(element);
		
		//Appends button to div
		$("#buttons-div").append(newButton);
	});

}




function displayGifs(searchTerm)
{
	//'Clears out' div
	$("#gifs-div").empty();
	
	var queryURL = APIURL + searchTerm + "&limit=10" + KEY;

	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) 
    {
    	// loop for each element in response.data array
    	response.data.forEach(function(element){

    		//creates new <div> will class .thumbnail
    		var newDiv = $("<div>");
    		newDiv.addClass("thumbnail");

    		//create a new <img> with class .gif-img
    		var gifImage = $("<img>");
    		gifImage.addClass("gif-img");
    		
    		//sets attribute for animation flag
    		gifImage.attr("animation", "false" );

    		//sets attribute for alt if image doesn't load
    		gifImage.attr("alt", "giphy-gif" );

    		//sets attribute for animated source
    		gifImage.attr("animated-src", element.images.fixed_height_small.url );
    		
    		//sets attribute for still source
    		gifImage.attr("still-src", element.images.fixed_height_small_still.url );

    		//initially sets image source to still source 
    		gifImage.attr("src", element.images.fixed_height_small_still.url);
    		
    		//create a new <h4> with rating info.
    		var rating = $("<h4>");
    		rating.html("Rated: " + element.rating.toUpperCase()); 
    		
    		
    		//Appends new <img> and new <h4> to new <div>
    		newDiv.append(gifImage);
    		newDiv.append(rating);

    		//Appends new <div> to #gifs-div
    		$("#gifs-div").append(newDiv);
    		
    	});
   });

}