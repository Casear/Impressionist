/**
 * Load Image from Disk 
 *
 *
 * Load Image from disk and save in local storage of the browser
 * Documentation and example from: 
 *         https://hacks.mozilla.org/2012/02/saving-images-and-files-in-localstorage/
 *         http://robnyman.github.io/html5demos/localstorage/
 * Version 0.9 - Date 21/09/2013
 *
 */
function loadImages() {

		this.miclick;
		this.objme;
		
		
		this.Init = function() {

			$("#uploadImageFromDisk").change(function() {
				
			  this.miclick = false;
			  this.objme = this;
			  		
			  var storageFiles = JSON.parse(localStorage.getItem("storageFiles")) || {},
				  img = document.getElementById("previewimg"),
				  input = this,
				  click = this.miclick,
				  meobj = this;
				  
			  
			  
			  
			  
	
						  
		      if (typeof(storageFiles[this.files[0].name]) == "undefined"   ) {
					img.addEventListener("load", function () {
						if (!click){
						    var imgCanvas = document.createElement("canvas"),
							imgContext = imgCanvas.getContext("2d");

							// Make sure canvas is as big as the picture
							imgCanvas.width = img.width;
							imgCanvas.height = img.height;

							// Draw image into canvas element
							imgContext.drawImage(img, 0, 0, img.width, img.height);

							// Save image as a data URL
							storageFiles[input.files[0].name] = imgCanvas.toDataURL(input.files[0].type);

							// Save as JSON in localStorage
							try {
								localStorage.setItem("storageFiles", JSON.stringify(storageFiles));
								loadImages.createList();
							}
							catch (e) {
								console.log("Storage failed: " + e);                
							}
						  }
						}, false);
						loadImages.readURL(this);
						

				}
			else {
					// Use image from localStorage
					img.setAttribute("src", storageFiles[input.files[0].name]);
			}

		   });

			
		}
		

		this.createList = function () {
			var storageFiles = JSON.parse(localStorage.getItem("storageFiles"));
			var objme = this.objme;
			if ($.isPlainObject(storageFiles)) {
					  var i=0;
					 $("#listauploadImageFromDisk > ul").html("");
					 $.each(storageFiles,function(key,val){
						  $("#listauploadImageFromDisk > ul").append("<li ><a href='#' id='img_"+i+"' class='btn btn-info'>"+key+" </a><a id='img_delete_"+i+"' class='btn btn-danger' href='#'><i class='icon-trash'></i> Delete</a></li>");
						  $( " #img_"+i ).bind( "click", function() {loadImages.click(key)});
						  $( " #img_delete_"+i ).bind( "click", function() {loadImages.deleteImageclick(key)});
						  i++;
						
					});
					
			} else {
					$("#listauploadImageFromDisk").html("No hay imagenes en el almacen multimedia");
				
			}
			
		}
		
		this.click = function(val){
				var img = document.getElementById("previewimg");

				var storageFiles = JSON.parse(localStorage.getItem("storageFiles"));
				img.setAttribute("src", storageFiles[val]);
				this.miclick=true;
		}
		
		this.deleteImageclick = function(key) {
				var storageFiles = JSON.parse(localStorage.getItem("storageFiles"));
				delete storageFiles[key];
				try {
						localStorage.setItem("storageFiles", JSON.stringify(storageFiles));
						loadImages.createList();
				}
				catch (e) {
						console.log("Storage failed: " + e);                
				}
				
			
		}
		
		this.readURL = function(input) {

			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					$('#previewimg').attr('src', e.target.result);
				}

				reader.readAsDataURL(input.files[0]);
			}
		}
		
		

}		


	 /**
	 * Run!
	 * 
	 */

		var loadImages = new loadImages();
		loadImages.Init();
		loadImages.createList();
